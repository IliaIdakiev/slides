import { combineReducers } from 'redux';
import { reducer as entityReducer } from './Entity/reducer';
import { reducer as listReducer } from './List/reducer';

export const reducer = combineReducers({
  entity: entityReducer,
  list: listReducer
});