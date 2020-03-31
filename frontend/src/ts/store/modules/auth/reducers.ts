import { Action } from './../../types'
import { types } from './actions'
import { combineReducers } from 'redux'

interface AuthState {
	pending: boolean
	success: boolean
	error: string | boolean | null
}

const INITIAL_STATE: AuthState = {
	pending: false,
	success: false,
	error: false,
}

const registerReducer = (state = INITIAL_STATE, action: Action): AuthState => {
	switch (action.type) {
		case types.REGISTER_REQUEST:
			return {
				...state,
				pending: true,
			}
		case types.REGISTER_SUCCESS:
			return {
				...state,
				pending: false,
				success: true,
			}
		case types.REGISTER_ERROR:
			return {
				...state,
				pending: false,
				error: true,
			}
		case types.REGISTER_RESET:
			return INITIAL_STATE
		default:
			return state
	}
}

interface LoginState extends AuthState {
	remember: boolean
	user: {
		isLoggedIn: boolean
		accessToken: string
	}
}

const storedUser = localStorage.getItem('user')

const LOGIN_INITIAL_STATE: LoginState = {
	...INITIAL_STATE,
	remember: false,
	user: storedUser
		? JSON.parse(storedUser)
		: {
				isLoggedIn: false,
				accessToken: '',
		  },
}

const loginReducer = (
	state = LOGIN_INITIAL_STATE,
	action: Action,
): LoginState => {
	switch (action.type) {
		case types.LOGIN_REQUEST:
			return {
				...state,
				remember: action.payload.remember,
				pending: true,
			}
		case types.REFRESH_TOKEN_REQUEST:
			return {
				...state,
				remember: false,
				pending: true,
			}
		case types.LOGIN_SUCCESS:
			const user = {
				isLoggedIn: true,
				accessToken: action.payload,
			}

			if (state.remember) {
				localStorage.setItem('user', JSON.stringify(user))
			}

			return {
				...state,
				pending: false,
				remember: false,
				success: true,
				user,
			}
		case types.LOGIN_ERROR:
			return {
				...state,
				remember: false,
				pending: false,
				error: true,
			}
		case types.LOGOUT:
			return {
				...state,
				user: {
					isLoggedIn: false,
					accessToken: '',
				},
			}
		default:
			return state
	}
}

const reducer = combineReducers({
	register: registerReducer,
	login: loginReducer,
})

export default reducer
