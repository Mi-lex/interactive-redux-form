import actionCreator, { types } from './actions'
import { put, takeLatest, call, takeEvery } from 'redux-saga/effects'
import { getMessageFromError } from '../../../services'
import { protectedRouteRequest } from '../auth/sagas'

function* fetchOrdersRequest() {
	try {
		const response = yield call(protectedRouteRequest, {
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
	yield takeEvery(types.FETCH_ORDERS_REQUEST, fetchOrdersRequest)
}

export default [watchLastFetchRequest]
