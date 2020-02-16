import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore } from 'redux'
import { rootReducer } from './rootReducer'

export const rootStore = createStore(
    rootReducer,
    composeWithDevTools(),
    //  applyMiddleware(...middleware),
)
