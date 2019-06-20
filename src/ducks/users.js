import { combineReducers } from 'redux'
import { createSelector } from 'reselect'
import { createActions, handleActions } from 'redux-actions'

// Actions
export const { userRequest, userSuccess, userFailure } = createActions(
  'USER_REQUEST',
  'USER_SUCCESS',
  'USER_FAILURE'
)

// Selectors
export const getData = state => state.users.data
export const getError = state => state.users.error
export const getIsFetched = state => state.users.isFetched
export const getIsFetching = state => state.users.isFetching
export const dataSelector = createSelector(
  getData,
  data => {
    if (data) {
      const { login, avatar_url, followers, public_repos } = data

      return { login, avatar_url, followers, public_repos }
    }
  }
)

// Reducers
export const data = handleActions(
  {
    [userSuccess]: (_state, action) => action.payload.data
  },
  null
)

export const error = handleActions(
  {
    [userFailure]: (_state, action) => action.payload.message
  },
  null
)

export const isFetched = handleActions(
  {
    [userSuccess]: () => true,
    [userFailure]: () => false
  },
  false
)

export const isFetching = handleActions(
  {
    [userRequest]: () => true,
    [userSuccess]: () => false,
    [userFailure]: () => false
  },
  false
)

export default combineReducers({
  data,
  error,
  isFetched,
  isFetching
})
