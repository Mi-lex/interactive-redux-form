import React from 'react'
import { reduxForm } from 'redux-form'
import LoginForm from '../components/LoginForm'

const Login: React.FC = () => {
	return <LoginForm />
}

const Decorated = reduxForm({
	form: 'Login',
})(Login)

export default Decorated
