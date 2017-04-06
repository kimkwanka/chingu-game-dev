/* eslint-disable no-underscore-dangle */
import React from 'react';
import { connect } from 'react-redux';
import { changeTeamName } from '../actions/teamActions';
import socket from '../client/socket';
import TeamOverview from './TeamOverview';

const sortById = (a, b) => {
  if (a._id.length > b._id.length) {
    return 1;
  } else if (a._id.length < b._id.length) {
    return -1;
  }
  if (a._id > b._id) {
    return 1;
  } else if (a._id < b._id) {
    return -1;
  }
  return 0;
};

class Overview extends React.Component {
  constructor() {
    super();
    this.state = {
      teams: [],
    };
    socket.on('GET_ALL_TEAM_DATA_SUCCESS', this.consumeSocketData);
  }
  componentWillMount() {
    socket.emit('GET_ALL_TEAM_DATA', {});
  }
  componentWillUnmount() {
    socket.removeListener('GET_ALL_TEAM_DATA_SUCCESS', this.consumeSocketData);
  }
  consumeSocketData = (data) => {
    console.log('test');
    this.state = {
      teams: data.sort(sortById),
    };
    this.forceUpdate();
  };
  render() {
    const teamOverviews = this.state.teams.map((team) => {
      if (team._id !== 'game-dev-team-76') {
        return <TeamOverview isAdmin={this.props.isAdmin} team={team} />;
      }
      return null;
    });
    return (
      <div className="teamOverview">
        {teamOverviews}
      </div>
    );
  }
}


Overview.propTypes = {
  isAdmin: React.PropTypes.bool.isRequired,
};

export default connect(store => ({
  isAdmin: store.user.admin,
}))(Overview);
