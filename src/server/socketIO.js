import { Users, Teams } from './db';
import tasksReducer from '../reducers/tasksReducer';

const socketIO = (socket) => {
  // console.log('User connected');
  socket.on('disconnect', () => {
    // console.log('User disconnected');
  });
  socket.on('TASK_ACTION', (action) => {
    Users.findById(action.byUser)
    .populate('team')
    .exec((userErr, dbUser) => {
      if (dbUser.team.tasks.length === 0) {
        // console.log('TASKS_NOT_INITIALIZED', action);
        socket.emit('TASKS_NOT_INITIALIZED', action);
      } else {
        const tmpTasks = tasksReducer(dbUser.team.tasks.toObject(), action);
        dbUser.team.tasks = tmpTasks;
        dbUser.team.save((dbSaveErr, savedTeam) => {
          if (dbSaveErr) {
            console.log('DB Save Tasks Error', dbSaveErr);
          } else {
            // console.log('Updated: ', savedTeam);
          }
          socket.emit('TASK_ACTION_SUCCESS', action);
          socket.broadcast.emit('TASK_ACTION_TEAM_MEMBER', action);
        });
      }
    });
  });
  socket.on('INIT_TASKS', ({ tasks, originalAction }) => {
    // console.log('GOT NEW TASKS');
    Users.findById(originalAction.byUser)
    .populate('team')
    .exec((userErr, dbUser) => {
      const tmpTasks = tasksReducer(tasks, originalAction);
      dbUser.team.tasks = tmpTasks;
      dbUser.team.save((dbSaveErr, savedTeam) => {
        if (dbSaveErr) {
          console.log('DB Save Tasks Error', dbSaveErr);
        } else {
          // console.log('Updated: ', savedTeam);
        }
        socket.emit('TASK_ACTION_SUCCESS', originalAction);
        socket.broadcast.emit('TASK_ACTION_TEAM_MEMBER', originalAction);
      });
    });
  });
  socket.on('TEAM_MEMBER_LOGIN', ({ userName, lastLogin }) => {
    // console.log('SOMEONE LOGGED IN:', userName, lastLogin);
    socket.broadcast.emit('TEAM_MEMBER_LOGIN', { userName, lastLogin });
  });
  socket.on('CHANGE_TEAM_NAME', (action) => {
    Users.findById(action.byUser)
    .populate('team')
    .exec((userErr, dbUser) => {
      dbUser.team.name = action.name;
      dbUser.team.save((dbSaveErr, savedTeam) => {
        if (dbSaveErr) {
          console.log('DB Save Team Error', dbSaveErr);
        } else {
          socket.emit('CHANGE_TEAM_NAME_SUCCESS', action);
          socket.broadcast.emit('CHANGE_TEAM_NAME_OTHER_TEAM_MEMBER', action);
          // console.log('Updated: ', savedTeam);
        }
      });
    });
  });
  socket.on('GET_ALL_TEAM_DATA', () => {
    Teams.find({})
    .populate('members')
    .exec((err, teams) => {
      // console.log('Sent all team data');
      socket.emit('GET_ALL_TEAM_DATA_SUCCESS', teams);
    });
  });
};

export default socketIO;
