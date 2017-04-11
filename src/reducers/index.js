import { combineReducers } from 'redux';
import user from './userReducer';
import team from './teamReducer';
import teams from './allTeamsReducer';

export default combineReducers({ user, team, teams });
