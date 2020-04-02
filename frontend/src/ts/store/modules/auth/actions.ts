import { Register, Auth } from './../../types'

const LOGIN_REQUEST = 'standard/auth/LOGIN_REQUEST'
const LOGIN_SUCCESS = 'standard/auth/LOGIN_SUCCESS'
const LOGIN_ERROR = 'standard/auth/LOGIN_ERROR'
const LOGOUT = 'standard/auth/LOGOUT'

const REFRESH_TOKEN_REQUEST = 'standard/auth/REFRESH_TOKEN_REQUEST'
const REFRESH_TOKEN_SUCCESS = 'standard/auth/REFRESH_TOKEN_SUCCESS'
const REFRESH_TOKEN_ERROR = 'standard/auth/REFRESH_TOKEN_ERROR'

const REGISTER_REQUEST = 'standard/auth/REGISTER_REQUEST'
const REGISTER_SUCCESS = 'standard/auth/REGISTER_SUCCESS'
const REGISTER_ERROR = 'standard/auth/REGISTER_ERROR'
const REGISTER_RESET = 'standard/auth/REGISTER_RESET'

export const registerRequest = (registerFields: Register) => ({
	type: REGISTER_REQUEST,
	payload: registerFields,
})

export const registerSuccess = () => ({
	type: REGISTER_SUCCESS,
})

export const registerError = () => ({
	type: REGISTER_ERROR,
})

export const registerReset = () => ({
	type: REGISTER_RESET,
})

export const loginRequest = (loginFields: Auth) => ({
	type: LOGIN_REQUEST,
	payload: loginFields,
})

export const loginSuccess = (token: string) => ({
	type: LOGIN_SUCCESS,
	payload: token,
})

export const loginError = () => ({
	type: LOGIN_ERROR,
})

export const logout = () => ({
	type: LOGOUT,
})

export const refreshTokenRequest = () => ({
	type: REFRESH_TOKEN_REQUEST,
})

export const refreshTokenSuccess = (token: string) => ({
	type: REFRESH_TOKEN_SUCCESS,
	payload: token,
})

export const refreshTokenError = () => ({
	type: REFRESH_TOKEN_ERROR,
})

export const types = {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	LOGOUT,

	REFRESH_TOKEN_REQUEST,
	REFRESH_TOKEN_SUCCESS,
	REFRESH_TOKEN_ERROR,

	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	REGISTER_ERROR,
	REGISTER_RESET,
}

export default {
	loginRequest,
	loginSuccess,
	loginError,
	logout,

	refreshTokenRequest,
	refreshTokenSuccess,
	refreshTokenError,

	registerRequest,
	registerSuccess,
	registerError,
	registerReset,
}
