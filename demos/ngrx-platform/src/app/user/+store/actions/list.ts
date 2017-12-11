import { Action } from '@ngrx/store';
import { type } from '../../../shared/type-cache';
import { IUser } from '../interfaces/user';

export const ActionTypes = {
  LOAD_USERS: type('[USER LIST] Load users'),
  LOAD_USERS_SUCCESS: type('[USER LIST] Load users success')
};


export class LoadUsers implements Action {
  type = ActionTypes.LOAD_USERS;
  constructor(public payload: null = null) { }
}

export class LoadUsersSuccess implements Action {
  type = ActionTypes.LOAD_USERS_SUCCESS;
  constructor(public payload: { users: IUser[] }) { }
}

export type Actions = LoadUsers | LoadUsersSuccess;
