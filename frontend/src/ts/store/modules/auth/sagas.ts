import actionCreator, { types } from './actions'
import api, { getMessageFromError } from '../../../services'
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

function* watchLastCreateRequest() {
	yield takeLatest(types.REGISTER_REQUEST, registerRequest)
}

export default [watchLastCreateRequest]
