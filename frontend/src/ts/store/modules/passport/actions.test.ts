import actionCreator, { types } from './actions'

describe('Passport actions', () => {
	describe('Order request action', () => {
		it('create order request action', () => {
			expect(actionCreator.createOrderRequest()).toEqual({
				type: types.CREATE_ORDER_REQUEST,
			})
		})

		it('create order request success action', () => {
			expect(actionCreator.createOrderSuccess()).toEqual({
				type: types.CREATE_ORDER_SUCCESS,
			})
		})

		it('create order error action', () => {
			const EXPECTED_MESSAGE = 'Error message'

			expect(actionCreator.createOrderError(EXPECTED_MESSAGE)).toEqual({
				type: types.CREATE_ORDER_ERROR,
				payload: EXPECTED_MESSAGE,
			})
		})
	})

	describe('Update order actions', () => {
		it('update order request action', () => {
			expect(actionCreator.updateOrderRequest()).toEqual({
				type: types.UPDATE_ORDER_REQUEST,
			})
		})

		it('update order success action', () => {
			expect(actionCreator.updateOrderSuccess()).toEqual({
				type: types.UPDATE_ORDER_SUCCESS,
			})
		})

		it('update order error action', () => {
			const expectedMessage = 'ERROR_MESSAGE'

			expect(actionCreator.updateOrderError(expectedMessage)).toEqual({
				type: types.UPDATE_ORDER_ERROR,
				payload: expectedMessage,
			})
		})
	})

	describe('Fetch order actions', () => {
		it('fetch order request action', () => {
			const orderId = 1

			expect(actionCreator.fetchOrderRequest(orderId)).toEqual({
				type: types.FETCH_ORDER_REQUEST,
				payload: orderId,
			})
		})

		it('fetch order success action', () => {
			expect(actionCreator.fetchOrderSuccess({})).toEqual({
				type: types.FETCH_ORDER_SUCCESS,
				payload: {},
			})
		})

		it('fetch order error action', () => {
			const expectedMessage = 'ERROR_MESSAGE'

			expect(actionCreator.updateOrderError(expectedMessage)).toEqual({
				type: types.UPDATE_ORDER_ERROR,
				payload: expectedMessage,
			})
		})
	})

	it('create passport cleanup action', () => {
		expect(actionCreator.passportCleanUp()).toEqual({
			type: types.PASSPORT_CLEAN_UP,
		})
	})
})
