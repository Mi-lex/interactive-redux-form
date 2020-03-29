import React from 'react'
import { reduxForm } from 'redux-form'
import LoginForm from '../components/LoginForm'
import { loginValidator } from '../helpers/validators'

const Login: React.FC = () => {
	return <LoginForm />
}

const Decorated = reduxForm({
	form: 'Login',
	validate: loginValidator,
})(Login)

export default Decorated
