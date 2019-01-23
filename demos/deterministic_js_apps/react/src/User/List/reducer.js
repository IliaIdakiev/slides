import { actionTypes } from './actions';

const initialState = {
  loading: true,
  items: null,
  error: null
};

const handlers = {
  [actionTypes.LOAD_USERS]: function (state, { payload }) {
    return { loading: true };
  },
  [actionTypes.LOAD_USERS_SUCCESS]: function (state, { payload: { users } }) {
    return { loading: false, items: users };
  },
  [actionTypes.LOAD_USERS_FAIL]: function (state, { payload: { error } }) {
    return { loading: false, error };
  }
}

export function reducer(state = initialState, action) {
  const handler = handlers[action.type];
  return handler ? { ...state, ...handler(state, action) } : state;
}