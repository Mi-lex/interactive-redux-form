import { Reducer } from 'redux'
import { Order } from '../../types/order'
import { types } from './actions'

interface PassportState {
	requestPending: boolean
	errorMessage?: string
	list: Order[]
}

const INITIAL_STATE: PassportState = {
	requestPending: false,
	errorMessage: '',
	list: [],
}

const reducer: Reducer<PassportState> = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case types.FETCH_ORDERS_REQUEST:
			return {
				...state,
				requestPending: true,
			}
		case types.FETCH_ORDERS_SUCCESS:
			return {
				...state,
				requestPending: false,
				list: action.payload,
			}
		case types.FETCH_ORDERS_ERROR:
			return {
				...state,
				requestPending: false,
				errorMessage: action.payload,
			}
		default:
			return state
	}
}

export default reducer
