import actionCreator, { types } from './actions'
import api, {
	getMessageFromError,
	protectedRouteRequest,
} from '../../../services'
import { call, put, takeLatest } from 'redux-saga/effects'
import { Action } from '../../types'
import { reset, stopSubmit } from 'redux-form'
import { status } from '../../consts'

function* registerRequest(action: Action) {
	try {
		const data = JSON.stringify(action.payload)
		console.log(data)

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
			console.log(error.response.data)

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

		yield put(actionCreator.loginSuccess(response.data['access_token']))
	} catch (error) {
		console.log(error.response)

		if (
			error.response &&
			error.response.status === status.UNPROCESSABLE_ENTITY
		) {
			yield put(stopSubmit('login', error.response.data.errors))
		}

		yield put(actionCreator.loginError())
	}
}

function* watchLastRegisterRequest() {
	yield takeLatest(types.REGISTER_REQUEST, registerRequest)
}

function* watchLastLoginRequest() {
	yield takeLatest(types.LOGIN_REQUEST, loginRequest)
}

export default [watchLastRegisterRequest, watchLastLoginRequest]
