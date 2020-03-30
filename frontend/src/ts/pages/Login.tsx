import React, { useEffect } from 'react'
import actionCreator from '../store/modules/auth/actions'
import { FormSubmitHandler, reset } from 'redux-form'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/rootReducer'
import { Redirect } from 'react-router'
import { Auth } from '../store/types'
import { LinearProgress } from '@material-ui/core'
import LoginForm from '../components/LoginForm'

const Login: React.FC = () => {
	const dispatch = useDispatch()
	const {
		pending,
		success,
		error,
		user: { isLoggedIn },
	} = useSelector((state: RootState) => state.auth.login)
	const onSubmit: FormSubmitHandler = (values) => {
		dispatch(actionCreator.loginRequest(values as Auth))
	}

	useEffect(() => {
		return () => {}
	}, [])

	return (
		<>
			{pending && <LinearProgress color="secondary" />}
			{success && isLoggedIn && <Redirect to="/" />}
			<LoginForm onSubmit={onSubmit} />
		</>
	)
}

export default Login
