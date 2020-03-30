import React from 'react'
import { reduxForm } from 'redux-form'
import RegisterForm from '../components/RegisterForm'
import { registerValidator } from '../helpers/validators'

const Register: React.FC = () => {
	return <RegisterForm />
}

const Decorated = reduxForm({
	form: 'register',
	validate: registerValidator
})(Register)

export default Decorated

