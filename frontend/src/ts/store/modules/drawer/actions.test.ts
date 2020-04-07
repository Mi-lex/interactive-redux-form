import { toggleDrawer, types } from './actions'

describe('Drawer actions', () => {
	it('should create action to toggle drawer', () => {
		const expectedAction = {
			type: types.TOGGLE_DRAWER,
			payload: undefined,
		}

		expect(toggleDrawer()).toEqual(expectedAction)
	})

	it('should create action to open drawer', () => {
		const open = true

		const expectedAction = {
			type: types.TOGGLE_DRAWER,
			payload: open,
		}

		expect(toggleDrawer(true)).toEqual(expectedAction)
    })
    
	it('should create action to close drawer', () => {
		const open = false

		const expectedAction = {
			type: types.TOGGLE_DRAWER,
			payload: open,
		}

		expect(toggleDrawer(false)).toEqual(expectedAction)
	})
})
