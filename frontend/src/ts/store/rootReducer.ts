import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import passportReducer from './modules/passport/reducers'
import orderReducer from './modules/order/reducers'
import drawerReducer from './modules/drawer/reducers'
import authReducer from './modules/auth/reducers'

export const rootReducer = combineReducers({
    form: formReducer,
    passport: passportReducer,
    order: orderReducer,
    drawer: drawerReducer,
    auth: authReducer
})

export type RootState = ReturnType<typeof rootReducer>
