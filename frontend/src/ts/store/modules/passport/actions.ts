import { Order } from '../../types/order'

const CREATE_ORDER_REQUEST = 'standard/passport/CREATE_ORDER_REQUEST'
const CREATE_ORDER_SUCCESS = 'standard/passport/CREATE_ORDER_SUCCESS'
const CREATE_ORDER_ERROR = 'standard/passport/CREATE_ORDER_ERROR'

const UPDATE_ORDER_REQUEST = 'standard/passport/UPDATE_ORDER_REQUEST'
const UPDATE_ORDER_SUCCESS = 'standard/passport/UPDATE_ORDER_SUCCESS'
const UPDATE_ORDER_ERROR = 'standard/passport/UPDATE_ORDER_ERROR'

const FETCH_ORDER_REQUEST = 'standard/passport/FETCH_ORDER_REQUEST'
const FETCH_ORDER_SUCCESS = 'standard/passport/FETCH_ORDER_SUCCESS'
const FETCH_ORDER_ERROR = 'standard/passport/FETCH_ORDER_ERROR'

const PASSPORT_CLEAN_UP = 'standard/passport/PASSPORT_CLEAN_UP'

export const createOrderRequest = () => ({
	type: CREATE_ORDER_REQUEST,
})

export const createOrderSuccess = () => ({
	type: CREATE_ORDER_SUCCESS,
})

export const createOrderError = (errorMessage: string | null) => ({
	type: CREATE_ORDER_ERROR,
	payload: errorMessage,
})

export const updateOrderRequest = () => ({
	type: UPDATE_ORDER_REQUEST,
})

export const updateOrderSuccess = () => ({
	type: UPDATE_ORDER_SUCCESS,
})

export const updateOrderError = (errorMessage: string | null) => ({
	type: UPDATE_ORDER_ERROR,
	payload: errorMessage,
})

export const passportCleanUp = () => ({
	type: PASSPORT_CLEAN_UP,
})

export const fetchOrderRequest = (id: number | string) => ({
	type: FETCH_ORDER_REQUEST,
	payload: id,
})

export const fetchOrderSuccess = (order: Partial<Order>) => ({
	type: FETCH_ORDER_SUCCESS,
	payload: order,
})

export const fetchOrderError = (errorMessage: string | null) => ({
	type: FETCH_ORDER_ERROR,
	payload: errorMessage,
})

export const types = {
	CREATE_ORDER_REQUEST,
	CREATE_ORDER_SUCCESS,
	CREATE_ORDER_ERROR,
	UPDATE_ORDER_REQUEST,
	UPDATE_ORDER_SUCCESS,
	UPDATE_ORDER_ERROR,

	PASSPORT_CLEAN_UP,

	FETCH_ORDER_REQUEST,
	FETCH_ORDER_SUCCESS,
	FETCH_ORDER_ERROR,
}

export default {
	createOrderRequest,
	createOrderSuccess,
	createOrderError,

	updateOrderRequest,
	updateOrderSuccess,
	updateOrderError,

	passportCleanUp,
	fetchOrderRequest,
	fetchOrderSuccess,
	fetchOrderError,
}
