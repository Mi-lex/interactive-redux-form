import React, { Suspense } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import DateFnsUtils from '@date-io/date-fns'
import Container from '@material-ui/core/Container'
import Drawer from '@material-ui/core/Drawer'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import ruLocale from 'date-fns/locale/ru'

import ProtectedRoute from '../components/ProtectedRoute'
import SideList from '../components/SideList'
import { toggleDrawer } from '../store/modules/drawer/actions'
import { RootState } from '../store/rootReducer'

import { FlashMessageProvider } from '../components/FlashMessage'
import SuspenseFallback from '../components/SuspenseFallback'

const Login = React.lazy(() => import('../pages/Login'))
const Orders = React.lazy(() => import('../pages/Orders'))
const Passport = React.lazy(() => import('../pages/Passport'))
const Register = React.lazy(() => import('../pages/Register'))

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
				<Suspense fallback={<SuspenseFallback />}>
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
				</Suspense>
			</Switch>
		</Router>
	)
}

export default App
