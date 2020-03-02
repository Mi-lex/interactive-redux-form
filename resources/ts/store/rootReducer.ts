import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import passportReducer from './modules/passport/reducers'

export const rootReducer = combineReducers({
    form: formReducer,
    passport: passportReducer,
})

export type RootState = ReturnType<typeof rootReducer>
