import { createFeatureSelector, createSelector } from '@ngrx/store';
import { moduleReducerName, IUserState } from '../reducers';
import { getEntity } from './entity';
import { getIsLoaded, getUsers } from './list';

const getUserModule = createFeatureSelector<IUserState>(moduleReducerName);
const getUserListState = createSelector(getUserModule, s => s.list);
const getUserEntityState = createSelector(getUserModule, s => s.entity);

export const getUserListStateIsLoaded = createSelector(getUserListState, getIsLoaded);
export const getUserListStateUsers = createSelector(getUserListState, getUsers);

/* Entity Selectors */
export const getUserEntityStateEntity = createSelector(getUserEntityState, getEntity);
