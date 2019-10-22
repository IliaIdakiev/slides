import { IEntityState } from './entity';
import { IUserListState } from './list';
import { ActionReducerMap } from '@ngrx/store';
import { reducer as listReducer } from '../reducers/list';
import { reducer as entityReducer } from '../reducers/entity';

export const moduleReducerName = 'user';

export interface IUserState {
  readonly entity: IEntityState;
  readonly list: IUserListState;
}

export const reducers: ActionReducerMap<IUserState> = {
  entity: entityReducer,
  list: listReducer
};
