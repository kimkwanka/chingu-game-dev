/* eslint-disable no-underscore-dangle */
import React from 'react';
import { connect } from 'react-redux';
import TeamOverview from './TeamOverview';

class Overview extends React.Component {
  componentWillMount() {
  //  this.props.dispatch({ type: 'SORT_BY_ID' });
  }
  render() {
    const teamOverviews = this.props.teams.map((team) => {
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
  teams: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  dispatch: React.PropTypes.func.isRequired,
};

export default connect(store => ({
  isAdmin: store.user.admin,
  teams: store.teams,
}))(Overview);
