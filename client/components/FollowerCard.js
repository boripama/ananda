import React from 'react';
import {
  Image,
  Card,
  Button,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { addFollower, removeSuggested } from '../store';

const FollowerCard = (props) => {
  const { sug, user, add } = props;
  const handleApprove = () => {
    const follower = { status: 'allowed', userId: user.id, followerId: sug.id};
    add(follower, sug.id);
  };
  const handleDecline = () => {
    const follower = { status: 'ignored', userId: user.id, followerId: sug.id};
    add(follower, sug.id);
  };
  return (
    <Card>
      <Card.Content>
        <Image floated="right" size="mini" src={sug.image} />
        <Card.Header>{sug.name ? sug.name : sug.email}</Card.Header>
        <Card.Meta>Followers of Elliot</Card.Meta>
        <Card.Description>
          {sug.name ? sug.name : sug.email} wants to follow you.
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button basic color="green" onClick={handleApprove}>Approve</Button>
          <Button basic color="red" onClick={handleDecline}>Decline</Button>
        </div>
      </Card.Content>
    </Card>
  );

};


const mapState = ({ user }) => ({ user });
const mapDispatch = (dispatch) => {
  return {
    add: (follower, id) => {
      dispatch(addFollower(follower));
      dispatch(removeSuggested(id));
    }
  };
};

export default connect(mapState, mapDispatch)(FollowerCard);
