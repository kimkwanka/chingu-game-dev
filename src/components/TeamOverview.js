import React from 'react';

class TeamOverview extends React.Component {
  constructor() {
    super();
    this.state = {
      tmpTeamName: '',
    };
  }
  componentDidMount() {
    this.state = {
      tmpTeamName: this.props.team.name,
    };
    this.forceUpdate();
  }
  getTotalProgress = () => {
    const tasks = this.props.team.tasks;
    const totalTasks = tasks ? tasks.length : 0;
    let completedTasks = 0;
    tasks.forEach((t) => {
      if (t.completed) {
        completedTasks += 1;
      }
    });
    return `${completedTasks}/${totalTasks}`;
  };
  getCategories = () => {
    const tasks = this.props.team.tasks;
    const categories = [];

    tasks.forEach((t) => {
      if (categories.indexOf(t.category) === -1) {
        categories.push(t.category);
      }
    });
    return categories;
  };
  getCategoryProgress = (cat) => {
    const tasks = this.props.team.tasks;
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
  };

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
      subProgresses.push(
        <h3>
          {categories[i]}: {cp}
        </h3>,
      );
    });

    this.props.team.members.forEach((tm) => {
      const lastLoginStr =
        tm.lastLogin !== -1 ? new Date(tm.lastLogin).toLocaleString() : '---';
      const timeZoneOffset =
        tm.timeZoneOffset > 1
          ? `Time Zone: UTC +${tm.timeZoneOffset / 3600}`
          : `Time Zone: UTC ${tm.timeZoneOffset / 3600}`;
      const lastLogin = this.props.isAdmin ? (
        <p className="tmLastLogin">{`Last login: ${lastLoginStr}`}</p>
      ) : null;
      members.push(
        <div className="teamMember">
          <img
            className="tmAvatar"
            src={`https://i.pravatar.cc/100?u=${tm.name}`}
            alt=""
          />
          <h2 className="tmName">{tm.name}</h2>
          {lastLogin}
          <p className="tmTimeZone">{timeZoneOffset}</p>
        </div>,
      );
    });
    const progress = this.props.isAdmin ? (
      <div className="teamProgress">
        <h1 className="teamProgressTotal">Total Progress: {totalProgress}</h1>
        {subProgresses}
      </div>
    ) : null;
    return (
      <div className="teamContent">
        <h1 className="teamName">{this.props.team.name}</h1>
        <h2 className="teamId">{this.props.team._id}</h2>
        <div className="teamMembers">{members}</div>
        {progress}
      </div>
    );
  }
}

TeamOverview.propTypes = {
  isAdmin: React.PropTypes.bool.isRequired,
  team: React.PropTypes.shape({
    _id: React.PropTypes.string,
    name: React.PropTypes.string,
    members: React.PropTypes.arrayOf(React.PropTypes.object),
    tasks: React.PropTypes.arrayOf(React.PropTypes.object),
  }).isRequired,
};
TeamOverview.defaultProps = {
  team: {},
};

export default TeamOverview;
