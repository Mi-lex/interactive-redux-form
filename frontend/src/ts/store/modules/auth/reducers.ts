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

const storedUser =
	localStorage.getItem('user') || sessionStorage.getItem('user')

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

const removeUserFromStorage = () => {
	localStorage.removeItem('user')
	sessionStorage.removeItem('user')
}

const loginReducer = (
	state = LOGIN_INITIAL_STATE,
	action: Action,
): LoginState => {
	switch (action.type) {
		case types.LOGIN_REQUEST:
			// Cleanup storage. This makes working with storage more predictable
			removeUserFromStorage()

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
		case types.REFRESH_TOKEN_SUCCESS:
			const user = {
				isLoggedIn: true,
				accessToken: action.payload,
			}

			const jsonUser = JSON.stringify(user)

			// There could not be stored user in case of
			// login success, because there is storage cleanup in login request.
			// "The local storage" condition  is needed for refresh token case, because
			// 'state.remember' value can be lost due to page reloading,
			// and refresh action will choose storage
			// relying on location of user data
			const memoryAdapter =
				state.remember || localStorage.getItem('user')
					? localStorage
					: sessionStorage
			memoryAdapter.setItem('user', jsonUser)

			return {
				...state,
				pending: false,
				success: true,
				user,
			}
		case types.LOGIN_ERROR:
		case types.REFRESH_TOKEN_ERROR:
			return {
				...state,
				remember: false,
				pending: false,
				error: true,
			}
		case types.LOGOUT:
			removeUserFromStorage()

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
