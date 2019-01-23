import { combineReducers } from 'redux';
import { reducer as userReducer } from '../User/reducer';

export const reducer = combineReducers({
  users: userReducer
});