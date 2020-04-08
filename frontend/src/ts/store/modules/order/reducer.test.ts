import { AnyAction } from 'redux'
import actionCreator from './actions'
import reducer, { INITIAL_STATE } from './reducers'
import { Order } from '../../types/order'

describe('Order reducer', () => {
	it('should return initial state', () => {
		expect(reducer(undefined, {} as AnyAction)).toEqual(INITIAL_STATE)
	})

	it('should handle fetch order request action', () => {
		expect(reducer(undefined, actionCreator.fetchOrdersRequest())).toEqual({
			...INITIAL_STATE,
			pending: true,
		})
	})

	it('should handle fetch order success action', () => {
		const mockOrders = [{ id: 1 }, { id: 2 }] as Order[]

		expect(
			reducer(undefined, actionCreator.fetchOrdersSuccess(mockOrders)),
		).toEqual({
			...INITIAL_STATE,
			pending: false,
			list: mockOrders,
		})
	})

	it('should handle fetch order error action', () => {
		const mockErrorMessage = 'Error'

		expect(
			reducer(undefined, actionCreator.fetchOrdersError(mockErrorMessage)),
		).toEqual({
			...INITIAL_STATE,
			pending: false,
			error: mockErrorMessage,
		})
	})
})
