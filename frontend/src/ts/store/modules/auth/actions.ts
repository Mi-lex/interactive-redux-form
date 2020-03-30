import { Register } from './../../types'
const LOGIN_REQUEST = 'standard/auth/LOGIN_REQUEST'
const LOGIN_SUCCESS = 'standard/auth/LOGIN_SUCCESS'
const LOGIN_ERROR = 'standard/auth/LOGIN_ERROR'

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


export const types = {
	LOGIN_REQUEST,
	LOGIN_SUCCESS,
	LOGIN_ERROR,
	REGISTER_REQUEST,
	REGISTER_SUCCESS,
	REGISTER_ERROR,
	REGISTER_RESET
}

export default { registerRequest, registerSuccess, registerError, registerReset }
