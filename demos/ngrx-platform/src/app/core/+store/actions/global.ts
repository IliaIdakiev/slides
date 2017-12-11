import { Action } from '@ngrx/store';
import { type } from '../../../shared/type-cache';

export const ActionTypes = {
  SET_FETCHING: type('[GLOBAL] Set Fetching')
};

export class SetFetching implements Action {
  type = ActionTypes.SET_FETCHING;
  constructor(public payload: { isFetching: boolean }) { }
}

export type Actions = SetFetching;
