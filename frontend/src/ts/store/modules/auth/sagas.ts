import actionCreator, { types } from './actions'
import api from '../../../services'
import { call, put, select, takeLatest } from 'redux-saga/effects'
import { Action } from '../../types'
import { reset, stopSubmit } from 'redux-form'
import { status } from '../../constants'
import { AxiosRequestConfig } from 'axios'
import { RootState } from '../../rootReducer'

function* registerRequest(action: Action) {
	try {
		const data = JSON.stringify(action.payload)

		yield call(api.post, 'auth/register', data, {
			headers: {
				'Content-Type': 'application/json',
			},
		})

		yield put(reset('register'))
		yield put(actionCreator.registerSuccess())
	} catch (error) {
		if (
			error.response &&
			error.response.status === status.UNPROCESSABLE_ENTITY
		) {
			yield put(stopSubmit('register', error.response.data.errors))
		}

		yield put(actionCreator.registerError())
	}
}

function* loginRequest(action: Action) {
	try {
		delete action.payload.rememberMe

		const loginData = JSON.stringify(action.payload)

		const response = yield call(api.post, 'auth/login', loginData, {
			headers: {
				'Content-Type': 'application/json',
			},
		})

		yield put(actionCreator.loginSuccess(response.headers.authorization))
	} catch (error) {
		if (
			error.response &&
			error.response.status === status.UNPROCESSABLE_ENTITY
		) {
			yield put(stopSubmit('login', error.response.data.errors))
		}

		yield put(actionCreator.loginError())
	}
}

function* refreshTokenRequest() {
	try {
		const response = yield call(protectedRouteRequest, {
			method: 'post',
			url: 'auth/refresh',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		yield put(actionCreator.refreshTokenSuccess(response.headers.authorization))
	} catch (error) {
		yield put(actionCreator.refreshTokenError())
	}
}

/**
 *	Make request to the protected route,
 *	if token is expired, make refresh token request
 *	and repeat intended request
 * @param requestOptions - axios request params
 */
export function* protectedRouteRequest(
	requestOptions: AxiosRequestConfig,
): any {
	function* request() {
		const authToken: string = yield select(
			(state: RootState) => state.auth.login.user.accessToken,
		)

		requestOptions.headers = {
			...requestOptions.headers,
			Authorization: authToken,
		}

		// @ts-ignore
		return yield call(api, requestOptions)
	}

	try {
		return yield request()
	} catch (error) {
		const { response } = error

		if (response && response.status === status.UNAUTHORIZED) {
			if (response.data.message === 'Token has expired') {
				yield call(refreshTokenRequest)

				return yield call(request)
			} else {
				// If refresh time is expired, logout
				yield put(actionCreator.logout())
				throw Error('Unauthorized')
			}
		} else {
			throw Error(error)
		}
	}
}

function* watchLastRegisterRequest() {
	yield takeLatest(types.REGISTER_REQUEST, registerRequest)
}

function* watchLastLoginRequest() {
	yield takeLatest(types.LOGIN_REQUEST, loginRequest)
}

function* watchLatestRefreshTokenRequest() {
	yield takeLatest(types.REFRESH_TOKEN_REQUEST, refreshTokenRequest)
}

export default [
	watchLastRegisterRequest,
	watchLastLoginRequest,
	watchLatestRefreshTokenRequest,
]
