import { State as ListState, reducer as listReducer } from './list';
import { ActionReducerMap } from '@ngrx/store/src/models';

export interface State {
  list: ListState;
}

export const reducers: ActionReducerMap<State> = {
  list: listReducer
};
