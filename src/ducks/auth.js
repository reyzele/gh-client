import { combineReducers } from 'redux'
import { createActions, handleActions } from 'redux-actions'

// Actions
export const { authorize, logout } = createActions('AUTHORIZE', 'LOGOUT')

// Selctors
export const getIsAuthorized = state => state.auth.isAuthorized

// Reducers
const isAuthorized = handleActions(
  {
    [authorize]: () => true,
    [logout]: () => false
  },
  false
)

export default combineReducers({
  isAuthorized
})
