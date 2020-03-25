import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import passportReducer from './modules/passport/reducers'
import orderReducer from './modules/order/reducers'
import drawerReducer from './modules/drawer/reducers'

export const rootReducer = combineReducers({
    form: formReducer,
    passport: passportReducer,
    order: orderReducer,
    drawer: drawerReducer,
})

export type RootState = ReturnType<typeof rootReducer>
