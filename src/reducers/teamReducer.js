import tasks from './tasksReducer';

const teamMember = (state = {
  name: '',
  avatar: '',
  lastLogin: '',
}, action) => state;

const team = (state = {
  name: '',
  tasks: [],
  id: false,
  members: [],
}, action) => {
  switch (action.type) {
    case 'HYDRATE_TEAM':
      // console.log('TEAM:', action.team);
      return action.team;
    case 'CHANGE_TEAM_NAME': {
      return Object.assign({}, state, { name: action.name });
    }
    case 'ADD_TASK':
    case 'SET_TASK_INCOMPLETE':
    case 'SET_TASK_COMPLETE':
      return Object.assign({}, state, { tasks: tasks(state.tasks, action) });
    case 'CHANGE_TEAM_MEMBER_LAST_LOGIN': {
      const members = state.members.slice(0).map((member) => {
        if (member.name !== action.userName) {
          return member;
        }
        // console.log('YAY. ', member.name);
        return Object.assign({}, member, { lastLogin: action.lastLogin });
      });
      return Object.assign({}, state, { members });
    }
    default:
      return state;
  }
};

export default team;
