import { IUserListState } from '../reducers/list';

export const getIsLoaded = (state: IUserListState) => state.isLoaded;
export const getUsers = (state: IUserListState) => state.users;
