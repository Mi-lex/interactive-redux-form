import { toggleDrawer } from './actions'
import reducer, { initialState } from './reducers'
import { AnyAction } from 'redux'

describe('drawer reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {} as AnyAction)).toEqual(initialState)
	})

	it('should handle open drawer', () => {
		expect(reducer(undefined, toggleDrawer(true))).toEqual({
			...initialState,
			open: true,
		})
	})

	it('should handle close drawer', () => {
		expect(reducer(undefined, toggleDrawer(false))).toEqual({
			...initialState,
			open: false,
		})
	})
})
