import actionCreator, { types, messages } from './actions'
import { call, put, takeLatest, take, select } from 'redux-saga/effects'
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

function* fetchOrderRequest() {
    try {
        const { payload: orderId } = yield take(types.FETCH_ORDER_REQUEST)
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

function* watchFetchRequest() {
    yield takeLatest(types.CREATE_CLEAN_UP, fetchOrderRequest)
}

function* watchLastUpdateRequest() {
    yield takeLatest(types.UPDATE_ORDER_REQUEST, updateOrderRequest)
}

export default [watchLastCreateRequest, watchLastUpdateRequest, watchFetchRequest]
