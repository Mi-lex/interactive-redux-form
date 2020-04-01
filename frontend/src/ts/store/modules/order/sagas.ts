import actionCreator, { types } from './actions'
import { put, takeLatest } from 'redux-saga/effects'
import { getMessageFromError } from '../../../services'
import { protectedRouteRequest } from '../auth/sagas'

function* fetchOrdersRequest() {
	try {
		const response = yield* protectedRouteRequest({
			method: 'get',
			url: 'orders',
			headers: {
				'Content-Type': 'application/json',
			},
		})

		yield put(actionCreator.fetchOrdersSuccess(response.data))
	} catch (error) {
		const message = getMessageFromError(error)

		yield put(actionCreator.fetchOrdersError(message))
	}
}

function* watchLastFetchRequest() {
	yield takeLatest(types.FETCH_ORDERS_REQUEST, fetchOrdersRequest)
}

export default [watchLastFetchRequest]
