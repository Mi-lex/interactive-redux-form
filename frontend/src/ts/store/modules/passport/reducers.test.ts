import { AnyAction } from 'redux'
import actionCreator from './actions'
import {
	INITIAL_STATE,
	FETCH_INITIAL_STATE,
	createReducer,
	updateReducer,
	fetchReducer,
} from './reducers'

describe('Passport reducer', () => {
	describe('create reducer', () => {
		it('should return initial state', () => {
			expect(createReducer(undefined, {} as AnyAction)).toEqual(INITIAL_STATE)
		})

		it('should handle CREATE_ORDER_REQUEST', () => {
			expect(
				createReducer(undefined, actionCreator.createOrderRequest()),
			).toEqual({
				...INITIAL_STATE,
				pending: true,
			})
		})

		it('should handle CREATE_ORDER_SUCCESS', () => {
			expect(
				createReducer(undefined, actionCreator.createOrderSuccess()),
			).toEqual({
				...INITIAL_STATE,
				pending: false,
				success: true,
			})
		})
		it('should handle CREATE_ORDER_ERROR', () => {
			expect(
				createReducer(undefined, actionCreator.createOrderError('error')),
			).toEqual({
				...INITIAL_STATE,
				pending: false,
				error: 'error',
			})
		})
	})

	describe('update reducer', () => {
		it('should return initial state', () => {
			expect(updateReducer(undefined, {} as AnyAction)).toEqual(INITIAL_STATE)
		})

		it('should handle UPDATE_ORDER_REQUEST', () => {
			expect(
				updateReducer(undefined, actionCreator.updateOrderRequest()),
			).toEqual({
				...INITIAL_STATE,
				pending: true,
			})
		})

		it('should handle UPDATE_ORDER_SUCCESS', () => {
			expect(
				updateReducer(undefined, actionCreator.updateOrderSuccess()),
			).toEqual({
				...INITIAL_STATE,
				pending: false,
				success: true,
			})
		})
		it('should handle UPDATE_ORDER_ERROR', () => {
			expect(
				updateReducer(undefined, actionCreator.updateOrderError('error')),
			).toEqual({
				...INITIAL_STATE,
				pending: false,
				error: 'error',
			})
		})
	})

	describe('fetch reducer', () => {
		it('should return initial state', () => {
			expect(fetchReducer(undefined, {} as AnyAction)).toEqual(
				FETCH_INITIAL_STATE,
			)
		})

		it('should handle FETCH_ORDER_REQUEST', () => {
			const mockOrderId = 1
			expect(
				fetchReducer(undefined, actionCreator.fetchOrderRequest(mockOrderId)),
			).toEqual({
				...FETCH_INITIAL_STATE,
				pending: true,
			})
		})

		it('should handle FETCH_ORDER_SUCCESS', () => {
			expect(
				fetchReducer(undefined, actionCreator.fetchOrderSuccess({})),
			).toEqual({
				...FETCH_INITIAL_STATE,
				pending: false,
				success: true,
				fetched: {},
			})
		})

		it('should handle FETCH_ORDER_ERROR', () => {
			expect(
				fetchReducer(undefined, actionCreator.fetchOrderError('error')),
			).toEqual({
				...FETCH_INITIAL_STATE,
				pending: false,
				error: 'error',
			})
		})
	})
})
