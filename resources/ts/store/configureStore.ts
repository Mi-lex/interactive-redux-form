import createSagaMiddleWare from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, applyMiddleware } from 'redux'
import rootSaga from './rootSaga'
import { rootReducer } from './rootReducer'

const configureStore = () => {
    const sagaMiddleWare = createSagaMiddleWare()

    const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleWare)))

    sagaMiddleWare.run(rootSaga)

    return store
}

export default configureStore
