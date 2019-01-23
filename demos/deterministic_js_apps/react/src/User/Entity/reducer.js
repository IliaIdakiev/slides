import { actionTypes } from './actions';
const initialState = {
  item: null,
  loading: true,
  error: null
};

const handlers = {
  [actionTypes.LOAD_USER]: function (state, { payload }) {
    return { loading: true };
  },
  [actionTypes.LOAD_USER_SUCCESS]: function (state, { payload: { user } }) {
    return { loading: false, item: user };
  },
  [actionTypes.LOAD_USER_FAIL]: function (state, { payload: { error } }) {
    return { loading: false, error };
  }
}

export function reducer(state = initialState, action) {
  const handler = handlers[action.type];
  return handler ? { ...state, ...handler(state, action) } : state;
}