import { apiURL } from '../constants';
import { handleResponse } from '../utils';

function getUsers(since) {
  return handleResponse(fetch(`${apiURL}/users${since ? `/${since}` : ''}`));
}

function getUser(username) {
  return handleResponse(fetch(`${apiURL}/users/${username}`));

}

export default {
  getUsers,
  getUser
}