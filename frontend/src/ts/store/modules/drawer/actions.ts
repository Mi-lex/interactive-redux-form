export const TOGGLE_DRAWER = 'standard/drawer/TOGGLE'

export const toggleDrawer = (willOpen?: boolean) => ({
	type: TOGGLE_DRAWER,
	payload: willOpen,
})

export const types = {
	TOGGLE_DRAWER,
}
