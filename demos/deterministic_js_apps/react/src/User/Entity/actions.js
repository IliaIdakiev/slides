export const actionTypes = {
  LOAD_USER: 'LOAD_USER',
  LOAD_USER_SUCCESS: 'LOAD_USER_SUCCESS',
  LOAD_USER_FAIL: 'LOAD_USER_FAIL'
};

export function loadUser(username) {
  return {
    type: actionTypes.LOAD_USER,
    payload: { username }
  };
}

export function loadUserSuccess(user) {
  return {
    type: actionTypes.LOAD_USER_SUCCESS,
    payload: { user }
  };
}

export function loadUserFail(error) {
  return {
    type: actionTypes.LOAD_USER_FAIL,
    payload: { error }
  };
}