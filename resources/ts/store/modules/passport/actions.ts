import { Order } from '../../types'

const CREATE_ORDER_REQUEST = 'standard/passport/CREATE_ORDER_REQUEST'
const CREATE_ORDER_SUCCESS = 'standard/passport/CREATE_ORDER_SUCCESS'
const CREATE_ORDER_ERROR = 'standard/passport/CREATE_ORDER_ERROR'

const UPDATE_ORDER_REQUEST = 'standard/passport/UPDATE_ORDER_REQUEST'
const UPDATE_ORDER_SUCCESS = 'standard/passport/UPDATE_ORDER_SUCCESS'
const UPDATE_ORDER_ERROR = 'standard/passport/UPDATE_ORDER_ERROR'

const FETCH_ORDER_REQUEST = 'standard/passport/FETCH_ORDER_REQUEST'
const FETCH_ORDER_SUCCESS = 'standard/passport/FETCH_ORDER_SUCCESS'
const FETCH_ORDER_ERROR = 'standard/passport/FETCH_ORDER_ERROR'

const CREATE_CLEAN_UP = 'standard/passport/CREATE_CLEAN_UP'

export const createOrderRequest = () => ({
    type: CREATE_ORDER_REQUEST,
})

export const createOrderSuccess = () => ({
    type: CREATE_ORDER_SUCCESS,
})

export const createOrderError = (errorMessage: string) => ({
    type: CREATE_ORDER_ERROR,
    payload: errorMessage,
})

export const updateOrderRequest = () => ({
    type: UPDATE_ORDER_REQUEST,
})

export const updateOrderError = () => ({
    type: CREATE_ORDER_ERROR,
})

export const createCleanUp = () => ({
    type: CREATE_CLEAN_UP,
})

export const fetchOrderRequest = (id: number | string) => ({
    type: FETCH_ORDER_REQUEST,
    payload: id
})

export const fetchOrderSuccess = (order: Order) => ({
    type: FETCH_ORDER_SUCCESS,
    payload: order,
})

export const fetchOrderError = (errorMessage: string) => ({
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
    CREATE_CLEAN_UP,

    FETCH_ORDER_REQUEST,
    FETCH_ORDER_SUCCESS,
    FETCH_ORDER_ERROR,
}

export default {
    createOrderRequest,
    createOrderSuccess,
    createOrderError,
    updateOrderRequest,
    createCleanUp,
    fetchOrderRequest,
    fetchOrderSuccess,
    fetchOrderError,
}

export const messages = {
    createOrder: {
        success: 'Паспорт успешно создан',
        error: 'Что-то произошло не так',
    },

    updateOrder: {
        success: 'Изменения успешно сохранены',
        error: 'Произошла ошибка',
    },
}
