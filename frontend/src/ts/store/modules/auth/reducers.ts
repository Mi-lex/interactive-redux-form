import { types } from './actions'
import { Action, combineReducers } from 'redux'

interface InitialState {
	pending: boolean
	success: boolean
	error: string | boolean | null
}

const INITIAL_STATE: InitialState = {
	pending: false,
	success: false,
	error: false,
}

const registerReducer = (
	state = INITIAL_STATE,
	action: Action,
): InitialState => {
	switch (action.type) {
		case types.REGISTER_REQUEST:
			return {
				...state,
				pending: true,
			}
		case types.REGISTER_SUCCESS:
			return {
				...state,
				pending: false,
				success: true,
			}
		case types.REGISTER_ERROR:
			return {
				...state,
				pending: false,
				error: true,
			}
		case types.REGISTER_RESET:
			return INITIAL_STATE
		default:
			return state
	}
}

const reducer = combineReducers({
	register: registerReducer,
})

export default reducer
