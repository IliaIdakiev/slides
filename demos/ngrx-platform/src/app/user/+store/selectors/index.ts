import { adapter } from '../reducers/list';
import { State } from '../reducers';
import { createFeatureSelector } from '@ngrx/store';
import { createSelector } from '@ngrx/store/src/selector';

export const getUsersState = createFeatureSelector<State>('users');
export const getUserListState = createSelector(getUsersState, (s) => s.list);

export const {
  selectAll: getAllUsers,
  selectEntities: getUsersEntities,
  selectIds: getAllUserId,
  selectTotal: getUserCount
} = adapter.getSelectors(getUserListState);
