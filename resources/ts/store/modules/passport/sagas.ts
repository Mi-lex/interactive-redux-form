import actionCreator, { types } from './actions'
import { call, put, takeLatest } from 'redux-saga/effects'
import { change } from 'redux-form'
import api, { getMessageFromError } from '../../../services'

function* createOrderRequest() {
    try {
        const order = yield call(api.post, 'passport')

        yield put(change('passport', 'order.id', order.data.id))
        yield put(change('passport', 'order.created_at', order.data.created_at))
        yield put(actionCreator.createOrderSuccess(true))
    } catch (error) {
        const message = getMessageFromError(error)

        yield put(actionCreator.createOrderError(message))
    }
}

function* watchLastCreateRequest() {
    yield takeLatest(types.CREATE_ORDER_REQUEST, createOrderRequest)
}

export default [watchLastCreateRequest]
