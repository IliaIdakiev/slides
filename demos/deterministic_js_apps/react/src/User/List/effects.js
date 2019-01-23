import userService from '../user-service';
import { loadUsersSuccess, loadUsersFail } from './actions'
import { connectEffect } from '../../utils'

export const getUsers = connectEffect(userService.getUsers, loadUsersSuccess, loadUsersFail);