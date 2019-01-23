import userService from '../user-service';
import { loadUserSuccess, loadUserFail } from './actions'
import { connectEffect } from '../../utils'

export const getUser = connectEffect(userService.getUser, loadUserSuccess, loadUserFail);