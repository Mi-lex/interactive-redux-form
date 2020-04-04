import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import { FormSubmitHandler } from 'redux-form'
import { LinearProgress } from '@material-ui/core'

import RegisterForm from '../components/RegisterForm'
import actionCreator from '../store/modules/auth/actions'
import { RootState } from '../store/rootReducer'
import { Register as IRegister } from '../store/types/auth'

const Register: React.FC = () => {
	const dispatch = useDispatch()
	const { pending, success } = useSelector(
		(state: RootState) => state.auth.register,
	)
	const onSubmit: FormSubmitHandler = (values) => {
		dispatch(actionCreator.registerRequest(values as IRegister))
	}

	return (
		<>
			{pending && <LinearProgress color="secondary" />}
			{success && <Redirect to="login" />}
			<RegisterForm onSubmit={onSubmit} />
		</>
	)
}

export default Register
