import { createStore } from 'redux';
import { rootReducer } from './rootReducer';

export const rootStore = createStore(rootReducer);