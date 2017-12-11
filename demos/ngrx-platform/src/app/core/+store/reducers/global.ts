import { Actions, ActionTypes } from '../actions/global';

export interface State {
  fetching: boolean;
  fetchingCounter: number;
}

const initialState: State = {
  fetching: false,
  fetchingCounter: 0
};

const actionMap: { [name: string]: (state: State, payload: any) => State } = {
  [ActionTypes.SET_FETCHING]: (state: State, { isFetching }: { isFetching: boolean }) => {
    const fetchingCounter = state.fetchingCounter + (isFetching ? 1 : -1);
    if (fetchingCounter < 0) {
      throw new Error('Fething COUNTET IS < 0 !!!!');
    }
    const fetching = !(fetchingCounter === 0);
    return { fetchingCounter, fetching };
  }
};

export function reducer(state: State = initialState, action: Actions) {
  const mapAction = actionMap[action.type];
  return mapAction ? Object.assign({}, state, mapAction(state, action.payload)) : state;
}
