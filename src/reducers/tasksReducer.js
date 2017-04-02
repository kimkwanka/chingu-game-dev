const task = (state = {
  name: '',
  completed: false,
  id: '',
  completedTime: -1,
  category: '',
}, action) => {
  switch (action.type) {
    case 'SET_TASK_COMPLETE':
      return Object.assign({}, state, { completed: true, completedTime: Date.now(), byUser: action.byUser });
    case 'SET_TASK_INCOMPLETE':
      return Object.assign({}, state, { completed: false, completedTime: -1, byUser: action.byUser });
    default:
      return state;
  }
};
const tasks = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TASK': {
      let alreadyAdded = false;
      state.forEach((t) => {
        if (t.id === action.task.id) {
          alreadyAdded = true;
        }
      });
      return alreadyAdded ? state : state.concat(action.task);
    }
    case 'SET_TASK_INCOMPLETE':
    case 'SET_TASK_COMPLETE':
      return state.map(t => ((t.id === action.taskId) ? task(t, action) : t));
    default:
      return state;
  }
};
export default tasks;
