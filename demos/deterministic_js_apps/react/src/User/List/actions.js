export const actionTypes = {
  LOAD_USERS: 'LOAD_USERS',
  LOAD_USERS_SUCCESS: 'LOAD_USERS_SUCCESS',
  LOAD_USERS_FAIL: 'LOAD_USERS_FAIL'
};

export function loadUsers(page, pageSize, lastUserId) {
  return {
    type: actionTypes.LOAD_USERS,
    payload: { page, pageSize, lastUserId }
  };
}

export function loadUsersSuccess(users) {
  return {
    type: actionTypes.LOAD_USERS_SUCCESS,
    payload: { users }
  };
}

export function loadUsersFail(error) {
  return {
    type: actionTypes.LOAD_USERS_FAIL,
    payload: { error }
  };
}