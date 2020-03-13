import actionCreator, { types, messages } from './actions'
import { call, put, takeLatest, select } from 'redux-saga/effects'
import api, { getMessageFromError } from '../../../services'

function* createOrderRequest() {
    try {
        const response = yield call(api.post, 'passport')

        yield put(actionCreator.fetchOrderSuccess(response.data))
        yield put(actionCreator.createOrderSuccess())
    } catch (error) {
        const message = getMessageFromError(error)

        yield put(actionCreator.createOrderError(message))
    }
}

function* updateOrderRequest() {
    // should be tested
    try {
        const formValues = yield select(state => state.form.passport.values)
        yield call(api.patch, `/passport/${formValues.id}`, JSON.stringify(formValues))
    } catch (error) {
        const message = getMessageFromError(error)

        yield put(actionCreator.createOrderError(message))
    }
}

type FetchAction = {
    payload: Number
}

function* fetchOrderRequest({ payload: orderId } : FetchAction) {
    try {
        const response = yield call(api.get, `passport/${orderId}`)

        yield put(actionCreator.fetchOrderSuccess(response.data))
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

function* watchLastFetchRequest() {
    yield takeLatest(types.FETCH_ORDER_REQUEST, fetchOrderRequest)
}

export default [watchLastCreateRequest, watchLastUpdateRequest, watchLastFetchRequest]
