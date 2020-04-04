import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useLocation } from 'react-router'
import { FormSubmitHandler } from 'redux-form'
import { LinearProgress } from '@material-ui/core'

import LoginForm from '../components/LoginForm'
import actionCreator from '../store/modules/auth/actions'
import { RootState } from '../store/rootReducer'
import { Auth, IntendedLocationState } from '../store/types'

const Login: React.FC = () => {
	const dispatch = useDispatch()
	const {
		pending,
		user: { isLoggedIn },
	} = useSelector((state: RootState) => state.auth.login)

	const location = useLocation<IntendedLocationState>()
	const { intendedPath = '' } = location.state || { intendedPath: '' }

	const onSubmit: FormSubmitHandler = (values) => {
		dispatch(actionCreator.loginRequest(values as Auth))
	}

	return (
		<>
			{pending && <LinearProgress color="secondary" />}
			{isLoggedIn && <Redirect to={intendedPath} />}
			<LoginForm onSubmit={onSubmit} />
		</>
	)
}

export default Login
