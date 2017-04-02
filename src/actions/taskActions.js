export function addTask(task) {
  return {
    type: 'ADD_TASK',
    task,
  };
}
export function setTaskComplete(taskId, byUser) {
  return {
    type: 'SET_TASK_COMPLETE',
    taskId,
    byUser,
  };
}
export function setTaskIncomplete(taskId, byUser) {
  return {
    type: 'SET_TASK_INCOMPLETE',
    taskId,
    byUser,
  };
}
