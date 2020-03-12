import actionCreator, { types } from './actions'
import { call, put, takeLatest } from 'redux-saga/effects'
import api, { getMessageFromError } from '../../../services'

function* fetchOrdersRequest() {
    try {
        const response = yield call(api.get, 'orders')
        
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
