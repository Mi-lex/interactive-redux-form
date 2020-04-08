import { Register } from './../../types/auth'
import { AnyAction } from 'redux'
import { registerReducer, INITIAL_STATE } from './reducers'

import actionCreator from './actions'

describe('Auth reducers', () => {
	describe('register reducer', () => {
		it('should return initial state', () => {
			expect(registerReducer(undefined, {} as AnyAction)).toEqual(INITIAL_STATE)
		})

		it('should handle register request action', () => {
			const mockRegisterValues = {} as Register

			expect(
				registerReducer(
					undefined,
					actionCreator.registerRequest(mockRegisterValues),
				),
			).toEqual({
				...INITIAL_STATE,
				pending: true,
			})
		})

		it('should handle register success action', () => {
			expect(
				registerReducer(undefined, actionCreator.registerSuccess()),
			).toEqual({
				...INITIAL_STATE,
				pending: false,
				success: true,
            })
        })

		it('should handle register error action', () => {
			expect(registerReducer(undefined, actionCreator.registerError())).toEqual(
				{
					...INITIAL_STATE,
					pending: false,
					error: true,
				},
			)
        })

		it('should handle register reset action', () => {
			expect(registerReducer(undefined, actionCreator.registerReset())).toEqual(
				INITIAL_STATE,
			)
		})
	})
})
