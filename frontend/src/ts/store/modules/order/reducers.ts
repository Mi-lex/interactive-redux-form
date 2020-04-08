import { Reducer } from 'redux'
import { FetchedOrder } from '../../types/order'
import { types } from './actions'

interface PassportState {
	pending: boolean
	error: string | null
	list: FetchedOrder[]
}

export const INITIAL_STATE: PassportState = {
	pending: false,
	error: null,
	list: [],
}

const reducer: Reducer<PassportState> = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case types.FETCH_ORDERS_REQUEST:
			return {
				...state,
				pending: true,
			}
		case types.FETCH_ORDERS_SUCCESS:
			return {
				...state,
				pending: false,
				list: action.payload,
			}
		case types.FETCH_ORDERS_ERROR:
			return {
				...state,
				pending: false,
				error: action.payload,
			}
		default:
			return state
	}
}

export default reducer
