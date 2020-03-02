import { SagaType } from './types'
import { all, fork } from 'redux-saga/effects'
import passportSagas from './modules/passport/sagas'

const allSagas: SagaType[] = [...passportSagas]

export default function* rootSaga() {
    yield all(allSagas.map(saga => fork(saga)))
}
