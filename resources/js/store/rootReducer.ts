import { createStore, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    form: formReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const rootStore = createStore(rootReducer);
