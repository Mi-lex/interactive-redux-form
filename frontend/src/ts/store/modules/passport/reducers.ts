import { combineReducers } from 'redux'
import { Action, Order } from '../../types'
import { types } from './actions'

interface PassportState {
	pending: boolean
	success: boolean
	error: string | null
}

interface FetchOrderState extends PassportState {
	fetched: Partial<Order>
}

const INITIAL_STATE: PassportState = {
	pending: false,
	success: false,
	error: null,
}

const FETCH_INITIAL_STATE: FetchOrderState = {
	...INITIAL_STATE,
	fetched: {},
}

const createReducer = (
	state = INITIAL_STATE,
	action: Action,
): PassportState => {
	switch (action.type) {
		case types.CREATE_ORDER_REQUEST:
			return { ...state, pending: true }
		case types.CREATE_ORDER_SUCCESS:
			return {
				...state,
				success: true,
				pending: false,
			}
		case types.CREATE_ORDER_ERROR:
			return { ...state, error: action.payload, pending: false }
		case types.PASSPORT_CLEAN_UP:
			return INITIAL_STATE
		default:
			return state
	}
}

const updateReducer = (
	state = INITIAL_STATE,
	action: Action,
): PassportState => {
	switch (action.type) {
		case types.UPDATE_ORDER_REQUEST:
			return { ...state, pending: true }
		case types.UPDATE_ORDER_SUCCESS:
			return {
				...state,
				success: true,
				pending: false,
			}
		case types.UPDATE_ORDER_ERROR:
			return { ...state, error: action.payload, pending: false }
		case types.PASSPORT_CLEAN_UP:
			return INITIAL_STATE
		default:
			return state
	}
}

const fetchReducer = (
	state = FETCH_INITIAL_STATE,
	action: Action,
): FetchOrderState => {
	switch (action.type) {
		case types.FETCH_ORDER_REQUEST:
			return { ...state, pending: true }
		case types.FETCH_ORDER_SUCCESS:
			return {
				...state,
				success: true,
				pending: false,
				fetched: action.payload,
			}
		case types.FETCH_ORDER_ERROR:
			return { ...state, error: action.payload, pending: false }
		default:
			return state
	}
}

const reducer = combineReducers({
	create: createReducer,
	update: updateReducer,
	fetch: fetchReducer,
})

export default reducer
