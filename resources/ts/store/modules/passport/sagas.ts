import actionCreator, { types } from './actions'
import { call, put, takeLatest } from 'redux-saga/effects'
import api, { getMessageFromError } from '../../../services'

function* createOrderRequest() {
    try {
        const order = yield call(api.post, 'passport')
        console.log(order.data);
        
        yield put(actionCreator.createOrderSuccess(order.data))
    } catch (error) {
        console.log(error)
        console.log(error.response);
        

        const message = getMessageFromError(error)

        yield put(actionCreator.createOrderError(message))
    }
}

function* watchLastCreateRequest() {
    yield takeLatest(types.CREATE_ORDER_REQUEST, createOrderRequest)
}

export default [watchLastCreateRequest]
