import { Action } from './../../types'
import { types } from './actions'

type DrawerState = {
	open: boolean
}

const initialState: DrawerState = {
	open: false,
}

const reducer = (state = initialState, action: Action): DrawerState => {
	switch (action.type) {
		case types.TOGGLE_DRAWER:
			return {
				...state,
				open: action.payload !== undefined ? action.payload : !state.open,
			}
		default:
			return state
	}
}

export default reducer
