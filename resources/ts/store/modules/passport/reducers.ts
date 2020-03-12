import { Action } from '../../types'
import { types } from './actions'

interface PassportState {
    requestPending: boolean
    successMessage?: string
    errorMessage?: string
}

const INITIAL_STATE: PassportState = {
    requestPending: false,
    successMessage: null,
    errorMessage: null,
}

const reducer = (state = INITIAL_STATE, action: Action): PassportState => {
    switch (action.type) {
        case types.CREATE_ORDER_REQUEST:
            return { ...state, requestPending: true }
        case types.CREATE_ORDER_SUCCESS:
            return { ...state, successMessage: action.payload, requestPending: false }
        case types.CREATE_ORDER_ERROR:
            return { ...state, errorMessage: action.payload, requestPending: false }
        default:
            return state
    }
}

export default reducer
