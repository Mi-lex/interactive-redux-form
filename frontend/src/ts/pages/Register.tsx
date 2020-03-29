import React from 'react'
import { reduxForm } from 'redux-form'
import RegisterForm from '../components/RegisterForm'

const Register: React.FC = () => {
	return <RegisterForm />
}

const Decorated = reduxForm({
	form: 'Register',
})(Register)

export default Decorated

