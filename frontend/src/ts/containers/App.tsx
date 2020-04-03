import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import DateFnsUtils from '@date-io/date-fns'
import Container from '@material-ui/core/Container'
import Drawer from '@material-ui/core/Drawer'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import ruLocale from 'date-fns/locale/ru'

import ProtectedRoute from '../components/ProtectedRoute'
import SideList from '../components/SideList'
import Login from '../pages/Login'
import Orders from '../pages/Orders'
import Passport from '../pages/Passport'
import Register from '../pages/Register'
import { toggleDrawer } from '../store/modules/drawer/actions'
import { RootState } from '../store/rootReducer'

import { FlashMessageProvider } from '../components/FlashMessage'

const App: React.FC = () => {
	const dispatch = useDispatch()
	const isDrawerOpen = useSelector((state: RootState) => state.drawer.open)

	const closeDrawer = () => {
		dispatch(toggleDrawer(false))
	}

	return (
		<Router>
			<Drawer open={isDrawerOpen} onClose={closeDrawer}>
				<SideList closeDrawer={closeDrawer} />
			</Drawer>
			<Switch>
				<MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
					<FlashMessageProvider>
						<Container maxWidth="xl">
							<ProtectedRoute path="/" exact>
								<Orders />
							</ProtectedRoute>
							<ProtectedRoute path="/passport/:id?" exact>
								<Passport />
							</ProtectedRoute>
						</Container>
					</FlashMessageProvider>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="/register">
						<Register />
					</Route>
				</MuiPickersUtilsProvider>
			</Switch>
		</Router>
	)
}

export default App
