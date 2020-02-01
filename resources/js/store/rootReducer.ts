import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

export const rootReducer = combineReducers({
    form: formReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
