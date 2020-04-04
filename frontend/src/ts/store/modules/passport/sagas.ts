import { call, put, select, takeLatest } from 'redux-saga/effects'

import { getMessageFromError } from '../../../services'
import { getFormData, getRequestData } from '../../../services/data-converts'
import { Action } from '../../types/common'
import { protectedRouteRequest } from '../auth/sagas'
import actionCreator, { types } from './actions'

function* createOrderRequest() {
	try {
		const response = yield call(protectedRouteRequest, {
			method: 'post',
			url: 'passport',
			headers: {
				'Content-Type': 'application/json',
			},
		})

		const formOrder = getFormData(response.data)
		yield put(actionCreator.fetchOrderSuccess(formOrder))
		yield put(actionCreator.createOrderSuccess())
	} catch (error) {
		const message = getMessageFromError(error)

		yield put(actionCreator.createOrderError(message))
	}
}

function* updateOrderRequest() {
	try {
		const formValues = yield select((state) => state.form.passport.values)
		const requestData = getRequestData(formValues)

		const response = yield call(protectedRouteRequest, {
			method: 'patch',
			url: `/passport/${formValues.id}`,
			data: requestData,
			headers: {
				'Content-Type': 'application/json',
			},
		})

		const formOrder = getFormData(response.data)

		yield put(actionCreator.updateOrderSuccess())
		yield put(actionCreator.fetchOrderSuccess(formOrder))
	} catch (error) {
		const message = getMessageFromError(error)

		yield put(actionCreator.updateOrderError(message))
	}
}

function* fetchOrderRequest(action: Action) {
	try {
		const { payload: orderId } = action
		const response = yield call(protectedRouteRequest, {
			method: 'get',
			url: `passport/${orderId}`,
			headers: {
				'Content-Type': 'application/json',
			},
		})

		const formOrder = getFormData(response.data)

		yield put(actionCreator.fetchOrderSuccess(formOrder))
	} catch (error) {
		const message = getMessageFromError(error)

		yield put(actionCreator.fetchOrderError(message))
	}
}

function* watchLastCreateRequest() {
	yield takeLatest(types.CREATE_ORDER_REQUEST, createOrderRequest)
}

function* watchLastUpdateRequest() {
	yield takeLatest(types.UPDATE_ORDER_REQUEST, updateOrderRequest)
}

function* watchLatestFetchRequest() {
	yield takeLatest(types.FETCH_ORDER_REQUEST, fetchOrderRequest)
}

export default [
	watchLastCreateRequest,
	watchLastUpdateRequest,
	watchLatestFetchRequest,
]
