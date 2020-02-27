import { all, fork } from 'redux-saga/effects'

const allSagas: GeneratorFunction[] = []

export default function* rootSaga() {
    yield all(allSagas.map(saga => fork(saga)))
}
