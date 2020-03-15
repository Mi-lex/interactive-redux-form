import { combineReducers } from 'redux'
import { Action, Order } from '../../types'
import { types } from './actions'

interface InitialState {
    pending: boolean
    success: boolean
    error: string | boolean
}

interface CreateOrderState extends InitialState {
    error: string
}

interface UpdateOrderState extends InitialState {
    error: boolean
}

interface FetchOrderState extends UpdateOrderState {
    fetched: Order
}

const CREATE_INITIAL_STATE: CreateOrderState = {
    pending: false,
    success: false,
    error: null,
}

const UPDATE_INITIAL_STATE: UpdateOrderState = {
    pending: false,
    success: false,
    error: false,
}

const FETCH_INITIAL_STATE: FetchOrderState = {
    pending: false,
    success: false,
    error: false,
    fetched: {},
}

const createReducer = (state = CREATE_INITIAL_STATE, action: Action): CreateOrderState => {
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
        case types.CREATE_CLEAN_UP:
            return CREATE_INITIAL_STATE
        default:
            return state
    }
}

const updateReducer = (state = UPDATE_INITIAL_STATE, action: Action): UpdateOrderState => {
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
            return { ...state, error: true, pending: false }
        default:
            return state
    }
}

const fetchReducer = (state = FETCH_INITIAL_STATE, action: Action): FetchOrderState => {
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
            return { ...state, error: true, pending: false }
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
