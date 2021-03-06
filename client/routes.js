
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import history from './history';
import {
  Main, Login, Signup, NewActivity,
  SingleActivity, AllActivities, UserAccount, UserProfile, LandingPage
} from './components';
import { me } from './store';


/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <Router history={history}>
        <Main>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/activity/:id" component={SingleActivity} />
            <Route path="/users/:id" component={UserAccount} />
            <Route path="/home" component={LandingPage} />
            {
              isLoggedIn &&
              <Switch>
                {/* Routes placed here are only available after logging in */}
                <Route path="/activities" component={AllActivities} />
                <Route exact path="/" component={LandingPage} />
                <Route path="/home" component={LandingPage} />
                <Route path="/uploadActivity" component={NewActivity} />
                <Route path="/profile/:id" component={UserProfile} />
              </Switch>
            }
            {/* Displays our Login component as a fallback */}
            <Route component={LandingPage} />
          </Switch>
        </Main>
      </Router>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    }
  };
};

export default connect(mapState, mapDispatch)(Routes);

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};

