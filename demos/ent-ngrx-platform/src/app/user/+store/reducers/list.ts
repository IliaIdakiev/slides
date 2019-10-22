import { IUser } from 'src/app/shared/interfaces';
import { createReducer, on } from '@ngrx/store';
import { loadUsers, loadUsersSuccess } from '../actions/list';

export interface IUserListState { isLoaded: boolean; users: IUser[]; }
const initialState: IUserListState = { isLoaded: false, users: null };
export const reducer = createReducer<IUserListState>(
  initialState,
  on(loadUsers, state => ({ ...state, isLoaded: false })),
  on(loadUsersSuccess, (state, { payload: { users } }) =>
    ({ ...state, users, isLoaded: true }))
);
