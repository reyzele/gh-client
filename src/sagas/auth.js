import { call, put, select, take } from 'redux-saga/effects'
import { setTokenApi, clearTokenApi } from 'api'
import { authorize, logout, getIsAuthorized } from 'ducks'
import {
  getTokenFromLocalStorage,
  setTokenToLocalStorage,
  removeTokenFromLocalStorage
} from 'localStorage'

export function* authFlow() {
  while (true) {
    const isAuthorized = yield select(getIsAuthorized)
    const localStorageToken = yield call(getTokenFromLocalStorage)

    let token

    if (!isAuthorized && localStorageToken) {
      token = localStorageToken
      yield put(authorize())
    } else {
      const action = yield take(authorize)

      token = action.payload
    }

    yield call(setTokenApi, token)
    yield call(setTokenToLocalStorage, token)

    yield take(logout)

    yield call(removeTokenFromLocalStorage)
    yield call(clearTokenApi)
  }
}
