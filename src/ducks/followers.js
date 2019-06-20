import { combineReducers } from 'redux'
import { createActions, handleActions } from 'redux-actions'

export const {
  followersRequest,
  followersSuccess,
  followersFailure
} = createActions('FOLLOWERS_REQUEST', 'FOLLOWERS_SUCCESS', 'FOLLOWERS_FAILURE')

export const getIds = state => state.followers.ids,
  getErrorFollowers = state => state.followers.error,
  getIsFetchedFollowers = state => state.followers.isFetched,
  getIsFetchingFollowers = state => state.followers.isFetching

const ids = handleActions(
  {
    [followersSuccess]: (_state, action) => action.payload.data
  },
  []
)

const error = handleActions(
  {
    [followersFailure]: (_state, action) => action.payload.message
  },
  null
)

const isFetched = handleActions(
  {
    [followersSuccess]: () => true,
    [followersFailure]: () => false
  },
  false
)

const isFetching = handleActions(
  {
    [followersRequest]: () => true,
    [followersSuccess]: () => false,
    [followersFailure]: () => false
  },
  false
)

export default combineReducers({
  ids,
  error,
  isFetched,
  isFetching
})
