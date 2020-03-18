export const TOGGLE_DRAWER = 'standard/orders/FETCH_ORDERS_REQUEST'

export const toggleDrawer = (willOpen: boolean = null) => ({
    type: TOGGLE_DRAWER,
    payload: willOpen,
})

export const types = {
    TOGGLE_DRAWER
}