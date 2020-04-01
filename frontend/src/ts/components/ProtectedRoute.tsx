import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../store/rootReducer'

const ProtectedRoute: React.FC<RouteProps> = ({
	children,
	path,
	...rest
}: RouteProps) => {
	const isLoggedIn = useSelector(
		(state: RootState) => state.auth.login.user.isLoggedIn,
	)

	return (
		<Route
			path={path}
			{...rest}
			render={({ location }) =>
				isLoggedIn ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { intendedPath: location },
						}}
					/>
				)
			}
		/>
	)
}

export default ProtectedRoute
