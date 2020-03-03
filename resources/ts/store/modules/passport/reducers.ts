import { Action, Order } from '../../types'
import { types } from './actions'

interface PassportState {
    requestPending: boolean
    requestSuccess: boolean
    errorMessage?: string
}

const INITIAL_STATE: PassportState = {
    requestPending: false,
    requestSuccess: false,
    errorMessage: null,
}

const reducer = (state = INITIAL_STATE, action: Action): PassportState => {
    switch (action.type) {
        case types.CREATE_ORDER_REQUEST:
            return { ...state, requestPending: true }
        case types.CREATE_ORDER_SUCCESS:
            return { ...state, requestSuccess: action.payload, requestPending: false }
        case types.CREATE_ORDER_ERROR:
            return { ...state, errorMessage: action.payload, requestPending: false }
        default:
            return state
    }
}

export default reducer
