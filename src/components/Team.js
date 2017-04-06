import React from 'react';
import { connect } from 'react-redux';
import { changeTeamName } from '../actions/teamActions';
import socket from '../client/socket';
import TimeZones from './TimeZones';

const formatOffset = (offset) => {
  const hour = offset - (offset % 1);
  const minutes = (offset % 1) > 0 ? `:${(offset % 1) * 60}` : '';
  return `${hour}${minutes}`;
};

class Team extends React.Component {
  constructor() {
    super();
    this.state = {
      tmpTeamName: '',
    };
  }
  componentDidMount() {
    this.state = {
      tmpTeamName: this.props.teamName,
    };
    this.forceUpdate();
  }
  getTotalProgress = () => {
    const tasks = this.props.tasks;
    const totalTasks = tasks ? tasks.length : 0;
    let completedTasks = 0;
    tasks.forEach((t) => {
      if (t.completed) {
        completedTasks += 1;
      }
    });
    return `${completedTasks}/${totalTasks}`;
  }
  getCategories = () => {
    const tasks = this.props.tasks;
    const categories = [];

    tasks.forEach((t) => {
      if (categories.indexOf(t.category) === -1) {
        categories.push(t.category);
      }
    });
    return categories;
  }
  getCategoryProgress = (cat) => {
    const tasks = this.props.tasks;
    let totalTasks = 0;
    let completedTasks = 0;
    tasks.forEach((t) => {
      if (t.category === cat) {
        totalTasks += 1;
        if (t.completed) {
          completedTasks += 1;
        }
      }
    });
    return `${completedTasks}/${totalTasks}`;
  }
  handleChange = (e) => {
    this.state = {
      tmpTeamName: e.target.value,
    };
  }
  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleClick();
    }
  }
  handleClick = () => {
    socket.emit('CHANGE_TEAM_NAME', changeTeamName(this.state.tmpTeamName, this.props.userName));
    // console.log('CHANGE_TEAM_NAME', changeTeamName(this.state.tmpTeamName, this.props.userName));
  }

  render() {
    const totalProgress = this.getTotalProgress();
    const members = [];
    const categories = this.getCategories();
    const catProgress = [];

    categories.forEach((c) => {
      catProgress.push(this.getCategoryProgress(c));
    });

    const subProgresses = [];
    catProgress.forEach((cp, i) => {
      subProgresses.push(<h3>{categories[i]}: {cp}</h3>);
    });

    this.props.teamMembers.forEach((tm) => {
      const lastLogin = (tm.lastLogin !== -1) ? new Date(tm.lastLogin).toLocaleString() : '---';
      const offsetStr = formatOffset(tm.timeZoneOffset / 3600);
      const timeZoneOffset = (tm.timeZoneOffset > 1) ? `UTC +${offsetStr}` : `UTC ${offsetStr}`;
      members.push(
        <div className="teamMember">
          <img className="tmAvatar" src={tm.avatar} alt="" />
          <h2 className="tmName">{tm.name}</h2>
          <p className="tmLastLogin">{`Last login: ${lastLogin}`}</p>
          <p className="tmTimeZone">{timeZoneOffset}</p>
        </div>);
    });

    return (
      <div className="teamContent">        
        <h1 className="teamName">{this.props.teamName}</h1>
        <div className="teamNameChange">
          <input onKeyPress={this.handleKeyPress} onChange={this.handleChange} className="teamNameInput" type="text" value={this.state.tmpTeamName} />
          <button onClick={this.handleClick} className="teamNameInputOKButton">OK</button>
        </div>
        <div className="teamMembers">
          {members}
        </div>
        <TimeZones teamMembers={this.props.teamMembers} />
        <div className="teamProgress">
          <h1 className="teamProgressTotal">Total Progress: {totalProgress}</h1>
          {subProgresses}
        </div>
      </div>
    );
  }
}

Team.propTypes = {
  userName: React.PropTypes.string.isRequired,
  // userAvatar: React.PropTypes.string.isRequired,
  teamMembers: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  teamName: React.PropTypes.string.isRequired,
  tasks: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  dispatch: React.PropTypes.func.isRequired,
};
Team.defaultProps = {
  team: {},
};

export default connect(store => ({
  teamMembers: store.team.members,
  teamName: store.team.name,
  userName: store.user.name,
  userAvatar: store.user.avatar,
  loggedIn: store.user.loggedIn,
  tasks: store.team.tasks,
}))(Team);
