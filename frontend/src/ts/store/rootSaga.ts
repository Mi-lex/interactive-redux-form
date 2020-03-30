import { SagaType } from './types'
import { all, fork } from 'redux-saga/effects'
import passportSagas from './modules/passport/sagas'
import orderSagas from './modules/order/sagas'
import authSagas from './modules/auth/sagas'

const allSagas: SagaType[] = [...passportSagas, ...orderSagas, ...authSagas]

export default function* rootSaga() {
    yield all(allSagas.map(saga => fork(saga)))
}
