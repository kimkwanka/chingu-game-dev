import React from 'react';
import { connect } from 'react-redux';
import { changeTeamName } from '../actions/teamActions';
import socket from '../client/socket';
import TeamOverview from './TeamOverview';

class Overview extends React.Component {
  constructor() {
    super();
    this.state = {
      teams: [],
    };
  }
  sortById(a, b) {
    if (a._id.length > b._id.length) {
      return 1;
    } else if (a._id.length < b._id.length) {
      return -1;
    } else {
      if (a._id > b._id) {
        return 1;
      } else if (a._id < b._id) {
        return -1;
      } 
    }
    return 0;
  }
  componentDidMount() {
    socket.emit('GET_ALL_TEAM_DATA', {});
    socket.on('GET_ALL_TEAM_DATA_SUCCESS', (data) => {
      console.log('GET_ALL_TEAM_DATA_SUCCESS:', data);
      this.state = {
        teams: data.sort(this.sortById),
      };
      this.forceUpdate();
    });
  }
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
  userName: React.PropTypes.string.isRequired,
  isAdmin: React.PropTypes.bool.isRequired,
  teamMembers: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  teamName: React.PropTypes.string.isRequired,
  tasks: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  dispatch: React.PropTypes.func.isRequired,
};
Overview.defaultProps = {
  team: {},
};

export default connect(store => ({
  teamMembers: store.team.members,
  teamName: store.team.name,
  userName: store.user.name,
  isAdmin: store.user.admin,
  userAvatar: store.user.avatar,
  loggedIn: store.user.loggedIn,
  tasks: store.team.tasks,
}))(Overview);
