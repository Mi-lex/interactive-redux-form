import { Order } from '../../types'

const FETCH_ORDERS_REQUEST = 'standard/orders/FETCH_ORDERS_REQUEST'
const FETCH_ORDERS_SUCCESS = 'standard/orders/FETCH_ORDERS_SUCCESS'
const FETCH_ORDERS_ERROR = 'standard/orders/FETCH_ORDERS_ERROR'

export const fetchOrdersRequest = () => ({
    type: FETCH_ORDERS_REQUEST
});

export const fetchOrdersSuccess = (orders: Order[]) => ({
    type: FETCH_ORDERS_SUCCESS,
    payload: orders,
})

export const fetchOrdersError = (errorMessage: string) => ({
    type: FETCH_ORDERS_ERROR,
    payload: errorMessage,
})

export const types = {
    FETCH_ORDERS_REQUEST,
    FETCH_ORDERS_SUCCESS,
    FETCH_ORDERS_ERROR,
} 

export default { fetchOrdersRequest, fetchOrdersSuccess, fetchOrdersError }
