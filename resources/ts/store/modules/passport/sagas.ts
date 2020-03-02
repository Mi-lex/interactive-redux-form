import actionCreator, { types } from './actions'
import { call, put, takeLatest } from 'redux-saga/effects'
import api, { getMessageFromError } from '../../../services'

function* createOrderRequest() {
    try {
        const order = yield call(api.post, 'passport')
        
        yield put(actionCreator.createOrderSuccess(order.data))
    } catch (error) {
        const message = getMessageFromError(error)

        yield put(actionCreator.createOrderError(message))
    }
}

function* watchLastCreateRequest() {
    yield takeLatest(types.CREATE_ORDER_REQUEST, createOrderRequest)
}

export default [watchLastCreateRequest]
