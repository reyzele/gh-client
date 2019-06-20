import { combineReducers } from 'redux'
import { createActions, handleActions } from 'redux-actions'

// Actions
export const { networkError, clearNetworkErrors } = createActions(
  'NETWORK_ERROR',
  'CLEAR_NETWORK_ERRORS'
)

// Selectors
export const getIsNetworkErrorPresent = state => state.network.error
export const getMessage = state => state.network.message

// Reducers
const error = handleActions(
  {
    [clearNetworkErrors]: () => null,
    [networkError]: () => true
  },
  null
)

const message = handleActions(
  {
    [clearNetworkErrors]: () => null,
    [networkError]: (_state, action) => action.payload.message
  },
  null
)

export default combineReducers({
  error,
  message
})
