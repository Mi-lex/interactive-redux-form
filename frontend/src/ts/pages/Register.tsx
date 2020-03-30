import React, { useEffect } from 'react'
import actionCreator from '../store/modules/auth/actions'
import RegisterForm from '../components/RegisterForm'
import { FormSubmitHandler, reset } from 'redux-form'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/rootReducer'
import { Redirect } from 'react-router'
import { Register as IRegister } from '../store/types'
import { LinearProgress } from '@material-ui/core'

const Register: React.FC = () => {
	const dispatch = useDispatch()
	const { pending, success, error } = useSelector(
		(state: RootState) => state.auth.register,
	)
	const onSubmit: FormSubmitHandler = (values) => {
		dispatch(actionCreator.registerRequest(values as IRegister))
	}

	useEffect(() => {
		return () => {
			dispatch(actionCreator.registerReset())
		}
	}, [])

	return (
		<>
			{pending && <LinearProgress color="secondary" />}
			{success && <Redirect to="login" />}
			<RegisterForm onSubmit={onSubmit} />
		</>
	)
}

export default Register
