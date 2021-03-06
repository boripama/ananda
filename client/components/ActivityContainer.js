import React, { Component } from 'react';
import axios from 'axios';
import {
  Segment,
  Grid,
  Header,
  Icon,
  Button,
} from 'semantic-ui-react';
import { Comments, MapContainer } from './index';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


class ActivityContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: props.liked,
      nbrOfLikes: props.activity.likes.length
    };
    this.removeLike = this.removeLike.bind(this);
    this.addLike = this.addLike.bind(this);
  }

  addLike() {
    this.setState({ liked: true, nbrOfLikes: this.state.nbrOfLikes + 1 });
    axios.post(`/api/activities/${this.props.activity.id}/like`);
  }

  removeLike() {
    this.setState({ liked: false, nbrOfLikes: this.state.nbrOfLikes - 1 });
    axios.delete(`/api/activities/${this.props.activity.id}/like`);
  }

  render() {
    return (
      <Segment>
        <Header size="large">
          <div>
            <Link to={`/activity/${this.props.activity.id}`}>{this.props.activity.title} </Link>
            by
            <Link to={`/profile/${this.props.activity.user.id}`}> {this.props.activity.user.name}</Link>
          </div>
        </Header>
        <Grid columns={2}>
          <Grid.Column>
            <MapContainer activity={this.props.activity} />
          </Grid.Column>
          <Grid.Column>
            <div>
              <Header size="small">Duration: </Header> {this.props.activity.durationTimestamp} min
            </div>
            <br /><br />
            <div>
              <Header size="small">Pace: </Header> {this.props.activity.paceTimestamp} min/mile
            </div>
            <br /><br />
            <div>
              <Header size="small">Miles: </Header> {this.props.activity.distance.toFixed(2)} miles
            </div>
            <br /><br />
            {
              this.state.liked
                ? <Button color={'red'} onClick={this.removeLike}><Icon name={'thumbs outline down'}>  Unlike</Icon></Button>
                : <Button color={'green'} onClick={this.addLike}><Icon name={'thumbs outline up'}>  Like </Icon></Button>
            }
            <div>
              {this.state.nbrOfLikes !== 1
                ? <small>{`${this.state.nbrOfLikes} likes`}</small>
                : <small>{`${this.state.nbrOfLikes} like`}</small>
              }
            </div>
          </Grid.Column>
        </Grid>
        <Comments activityId={this.props.activity.id} comments={this.props.activity.comments} />
      </Segment>
    );
  }
}


const mapState = (state, ownProps) => {
  return {
    user: state.user,
    liked: ownProps.activity.likes.some(like => {
      return like.id === state.user.id;
    }),
  };
};

const mapDispatch = null;


export default connect(mapState, mapDispatch)(ActivityContainer);

