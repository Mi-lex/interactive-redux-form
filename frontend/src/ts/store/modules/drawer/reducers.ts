import { Action } from './../../types/common'
import { types } from './actions'
import { Reducer } from 'redux'

type DrawerState = {
	open: boolean | undefined
}

export const initialState: DrawerState = {
	open: false,
}

const reducer: Reducer<DrawerState> = (
	state = initialState,
	action: Action,
) => {
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
