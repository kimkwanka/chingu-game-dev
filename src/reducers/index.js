import { combineReducers } from 'redux';
import user from './userReducer';
import team from './teamReducer';

export default combineReducers({ user, team });
