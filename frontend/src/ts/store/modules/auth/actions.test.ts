import actionCreator, { types } from './actions'
import { Auth, Register } from '../../types/auth'

describe('Auth actions', () => {
	describe('Login actions', () => {
		it('create login request action', () => {
			const userValues: Auth = {
				email: 'expected@expected.ex',
				password: 'password',
			}

			expect(actionCreator.loginRequest(userValues)).toEqual({
				type: types.LOGIN_REQUEST,
				payload: userValues,
			})
		})

		it('create login error action', () => {
			expect(actionCreator.loginError()).toEqual({
				type: types.LOGIN_ERROR,
			})
		})

		it('create login success action', () => {
			const token = 'token'

			expect(actionCreator.loginSuccess(token)).toEqual({
				type: types.LOGIN_SUCCESS,
				payload: token,
			})
		})

		it('create login logout action', () => {
			expect(actionCreator.logout()).toEqual({
				type: types.LOGOUT,
			})
		})
	})

	describe('Register actions', () => {
		it('create register request action', () => {
			const registerValues: Register = {
				first_name: 'first name',
				second_name: 'second name',
				middle_name: 'middle name',
				email: 'expected@expected.ex',
				password: 'password',
				password_confirmation: 'password',
			}

			expect(actionCreator.registerRequest(registerValues)).toEqual({
				type: types.REGISTER_REQUEST,
				payload: registerValues,
			})
		})

		it('create register error action', () => {
			expect(actionCreator.registerError()).toEqual({
				type: types.REGISTER_ERROR,
			})
		})

		it('create register success action', () => {
			expect(actionCreator.registerSuccess()).toEqual({
				type: types.REGISTER_SUCCESS,
			})
		})
	})
})
