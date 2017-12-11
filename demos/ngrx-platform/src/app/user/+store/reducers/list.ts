import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { IUser } from '../interfaces/user';
import { ActionTypes, Actions } from '../actions/list';

export type State = EntityState<IUser>;

export const adapter = createEntityAdapter<IUser>({
  selectId: (user: IUser) => user.id
});

export const initialState = adapter.getInitialState({});

const actionMap: { [name: string]: (state: State, payload: any) => State } = {
  [ActionTypes.LOAD_USERS_SUCCESS]: (state: State, { users }: { users: IUser[] }) => {
    return { ...adapter.addAll(users, state) };
  }
};

export function reducer(state: State = initialState, action: Actions) {
  const mapAction = actionMap[action.type];
  return mapAction ? Object.assign({}, state, mapAction(state, action.payload)) : state;
}
