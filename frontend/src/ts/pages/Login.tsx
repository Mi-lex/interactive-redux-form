import React, { useEffect } from 'react'
import actionCreator from '../store/modules/auth/actions'
import { FormSubmitHandler, reset } from 'redux-form'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/rootReducer'
import { Redirect, useLocation } from 'react-router'
import { Auth, IntendedLocationState } from '../store/types'
import { LinearProgress } from '@material-ui/core'
import LoginForm from '../components/LoginForm'

const Login: React.FC = () => {
	const dispatch = useDispatch()
	const {
		pending,
		error,
		user: { isLoggedIn },
	} = useSelector((state: RootState) => state.auth.login)

	const location = useLocation<IntendedLocationState>()
	const { intendedPath = '' } = location.state || { intendedPath: '' }

	const onSubmit: FormSubmitHandler = (values) => {
		dispatch(actionCreator.loginRequest(values as Auth))
	}

	useEffect(() => {
		return () => {}
	}, [])

	return (
		<>
			{pending && <LinearProgress color="secondary" />}
			{isLoggedIn && <Redirect to={intendedPath} />}
			<LoginForm onSubmit={onSubmit} />
		</>
	)
}

export default Login
