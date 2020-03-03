import actionCreator, { types, messages } from './actions'
import { call, put, takeLatest, select } from 'redux-saga/effects'
import { change } from 'redux-form'
import api, { getMessageFromError } from '../../../services'

function* createOrderRequest() {
    try {
        const order = yield call(api.post, 'passport')

        yield put(change('passport', 'id', order.data.id))
        yield put(change('passport', 'created_at', order.data.created_at))
        yield put(actionCreator.createOrderSuccess(messages.createOrder.success))
    } catch (error) {
        const message = getMessageFromError(error)

        yield put(actionCreator.createOrderError(message))
    }
}

function* updateOrderRequest() {
    try {
        const formValues = yield select(state => state.form.passport.values)
        yield call(api.patch, `/passport/${formValues.id}`, JSON.stringify(formValues))
    } catch (error) {
        const message = getMessageFromError(error)

        yield put(actionCreator.createOrderError(message))
    }
}

function* watchLastCreateRequest() {
    yield takeLatest(types.CREATE_ORDER_REQUEST, createOrderRequest)
}

function* watchLastUpdateRequest() {
    yield takeLatest(types.UPDATE_ORDER_REQUEST, updateOrderRequest)
}

export default [watchLastCreateRequest, watchLastUpdateRequest]
