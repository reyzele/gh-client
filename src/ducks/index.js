import { combineReducers } from 'redux'
import auth from './auth'
import users from './users'
import followers from './followers'
import network from './network'
export * from './auth'
export * from './users'
export * from './followers'
export * from './network'

export default combineReducers({
  auth,
  users,
  followers,
  network
})
