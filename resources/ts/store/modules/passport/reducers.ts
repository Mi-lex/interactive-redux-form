import { Action, Order } from '../../types'
import { types } from './actions'

interface PassportState {
    requestPending: boolean
    requestSuccess: boolean
    errorMessage?: string
    currentOrder: Order
}

const INITIAL_STATE: PassportState = {
    requestPending: false,
    requestSuccess: false,
    errorMessage: null,
    currentOrder: null,
}

const reducer = (state = INITIAL_STATE, action: Action): PassportState => {
    switch (action.type) {
        case types.CREATE_ORDER_REQUEST:
            return { ...state, requestPending: true }
        case types.CREATE_ORDER_SUCCESS:
            return { ...state, requestSuccess: true, requestPending: false, currentOrder: action.payload }
        case types.CREATE_ORDER_ERROR:
            return { ...state, errorMessage: action.payload, requestPending: false }
        default:
            return state
    }
}

export default reducer
