import { Order } from '../../types'

const CREATE_ORDER_REQUEST = 'standard/passport/CREATE_ORDER_REQUEST'
const CREATE_ORDER_SUCCESS = 'standard/passport/CREATE_ORDER_SUCCESS'
const CREATE_ORDER_ERROR = 'standard/passport/CREATE_ORDER_ERROR'

const UPDATE_ORDER_REQUEST = 'standard/passport/UPDATE_ORDER_REQUEST'
const UPDATE_ORDER_SUCCESS = 'standard/passport/UPDATE_ORDER_SUCCESS'
const UPDATE_ORDER_ERROR = 'standard/passport/UPDATE_ORDER_ERROR'

export const createOrderRequest = () => ({
    type: CREATE_ORDER_REQUEST,
})

export const createOrderSuccess = (success: string) => ({
    type: CREATE_ORDER_SUCCESS,
    payload: success,
})

export const createOrderError = (errorMessage: string) => ({
    type: CREATE_ORDER_ERROR,
    payload: errorMessage,
})

export const updateOrderRequest = () => ({
    type: UPDATE_ORDER_REQUEST,
})

export const types = {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_ERROR,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_ERROR,
}

export default { createOrderRequest, createOrderSuccess, createOrderError, updateOrderRequest }

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
