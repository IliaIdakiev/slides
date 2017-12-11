import { createFeatureSelector, createSelector } from '@ngrx/store';
import { getIsFetching } from './global';

const getGlobalState = createFeatureSelector('global');

export const getGlobalIsFetching = createSelector(getGlobalState, getIsFetching);
