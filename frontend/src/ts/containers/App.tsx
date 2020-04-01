import React from 'react'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import DateFnsUtils from '@date-io/date-fns'
import Container from '@material-ui/core/Container'
import Drawer from '@material-ui/core/Drawer'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import ruLocale from 'date-fns/locale/ru'

import SideList from '../components/SideList'
import Orders from '../pages/Orders'
import Passport from '../pages/Passport'
import Login from '../pages/Login'
import Register from '../pages/Register'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/rootReducer'
import { toggleDrawer } from '../store/modules/drawer/actions'
import ProtectedRoute from '../components/ProtectedRoute'

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
					<Container maxWidth="xl">
						<ProtectedRoute path="/" exact>
							<Orders />
						</ProtectedRoute>
						<ProtectedRoute path="/passport/:id?" exact>
							<Passport />
						</ProtectedRoute>
					</Container>
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
