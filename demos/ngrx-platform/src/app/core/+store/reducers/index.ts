import { ActionReducerMap } from '@ngrx/store';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { State as GlobalState, reducer as globalReducer } from './global';

export interface State {
  global: GlobalState;
  router: RouterReducerState;
}

export const reducers: ActionReducerMap<State> = {
  global: globalReducer,
  router: routerReducer
};
