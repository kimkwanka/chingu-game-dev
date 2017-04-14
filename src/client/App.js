import React from 'react';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import getRoutes from '../shared/routes';
import { getHydratedStore } from '../shared/store';
import { changeTeamMemberLastLogin } from '../actions/teamActions';

import socket from '../client/socket';

const store = getHydratedStore();
const teamMembers = store.getState().team.members;

const isOnMyTeam = (userName) => {
  let ret = false;
  teamMembers.forEach((tm) => {
    if (userName === tm.name) {
      ret = true;
    }
  });
  return ret;
};
socket.on('error', () => {
  console.log('Failed to connect');
  socket.disconnect();
  // socket.connect();
});

socket.on('connect', () => {
  // console.log('connect');
  const user = store.getState().user;
  if (user.loggedIn) {
    socket.emit('TEAM_MEMBER_LOGIN', { userName: user.name, lastLogin: user.lastLogin });
  }
});
socket.on('TEAM_MEMBER_LOGIN', ({ userName, lastLogin }) => {
  if (isOnMyTeam(userName)) {
    // console.log('TEAM_MEMBER_LOGIN', userName, lastLogin);
    store.dispatch(changeTeamMemberLastLogin(userName, lastLogin));
  }
});
socket.on('TASK_ACTION_SUCCESS', (action) => {
  // console.log('Action successfull', action);
  store.dispatch(action);
});

socket.on('TASKS_NOT_INITIALIZED', (action) => {
  // console.log('TASKS_NOT_INITIALIZED', action);
  socket.emit('INIT_TASKS', { tasks: store.getState().team.tasks, originalAction: action });
});

socket.on('TASK_ACTION_TEAM_MEMBER', (action) => {
  if (isOnMyTeam(action.byUser)) {
    store.dispatch(action);
  }
});

socket.on('CHANGE_TEAM_NAME_SUCCESS', (action) => {
  // console.log('CHANGE_TEAM_NAME_SUCCESS', action);
  store.dispatch(action);
});

socket.on('CHANGE_TEAM_NAME_OTHER_TEAM_MEMBER', (action) => {
  if (isOnMyTeam(action.byUser)) {
    store.dispatch(action);
  }
});

export default class extends React.Component {
  render() {
    return (<Provider store={store}>
      <Router routes={getRoutes(store)} history={browserHistory} />
    </Provider>);
  }
}
