import { messages } from './../store/modules/passport/actions'
import { Auth } from './../store/types'

const email = {
	rule: new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i),
	message: 'Некорректный e-mail',
}

const passwordRules = [
	// (?=.*[\u0401\u0451\u0410-\u044fA-z]) - the string must contain at
	// least 1 lowercase or uppercase alphabetical cyrillic or latin character
	{
		rule: new RegExp(/^(?=.*[\u0401\u0451\u0410-\u044fA-z])/i),
		message:
			'Пароль должен содержать хотя бы один русский или латинский символ',
	},
	// (?=.*[0-9]) - the string must contain at least 1 numeric character
	{
		rule: new RegExp(/(?=.*[0-9])/i),
		message: 'Пароль должен содержать хотя бы одну цифру',
	},
]

const requiredMessage = 'Поле обязательно'

export const loginValidator = (values: Auth) => {
	const errors = {} as Auth

	if (!values.email) {
		errors.email = requiredMessage
	} else if (!email.rule.test(values.email)) {
		errors.email = email.message
	}

	const MIN_PASS_LENGTH = 8

	if (!values.password) {
		errors.password = requiredMessage
	} else if (values.password.length < MIN_PASS_LENGTH) {
		errors.password = `Пароль должен содержать минимум ${MIN_PASS_LENGTH} символов`
	} else {
		passwordRules.forEach(({ rule, message }) => {
			if (!rule.test(values.password)) {
				errors.password = message
			}
		})
	}

	return errors
}
