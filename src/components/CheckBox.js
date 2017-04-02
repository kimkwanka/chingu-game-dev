import React from 'react';
import { connect } from 'react-redux';
import { addTask, setTaskComplete, setTaskIncomplete } from '../actions/taskActions';

import socket from '../client/socket';

class CheckBox extends React.Component {

  componentDidMount() {
    this.props.dispatch(addTask({
      name: this.props.label,
      id: this.props.id,
      completed: false,
      completedTime: -1,
      category: this.props.category,
    }));
  }

  findTaskIndex = (id) => {
    let index = -1;
    const tasks = this.props.tasks;
    if (tasks) {
      for (let i = 0; i < tasks.length; i += 1) {
        if (tasks[i].id === id) {
          index = i;
          break;
        }
      }
    }
    return index;
  }

  handleChange = (e) => {
    const action = e.target.checked ? setTaskComplete : setTaskIncomplete;
    socket.emit('TASK_ACTION', action(this.props.id, this.props.userName));
    // console.log('TASK_ACTION', action(this.props.id, this.props.userName));
  };

  render() {
    let isChecked = '';
    const index = this.findTaskIndex(this.props.id);
    if (index !== -1) {
      isChecked = this.props.tasks[index].completed ? 'checked' : '';
    }
    return (
      <div className="checkBox">
        <input type="checkbox" id={this.props.id} value={this.props.id} onChange={this.handleChange} checked={isChecked} />
        <label htmlFor={this.props.id}>{this.props.label}</label>
      </div>
    );
  }
}
CheckBox.propTypes = {
  category: React.PropTypes.string.isRequired,
  userName: React.PropTypes.string.isRequired,
  tasks: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  id: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  dispatch: React.PropTypes.func.isRequired,
};

export default connect(store => ({
  userName: store.user.name,
  tasks: store.team.tasks,
}))(CheckBox);
