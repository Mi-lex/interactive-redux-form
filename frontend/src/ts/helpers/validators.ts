import { Auth, Register } from '../store/types/auth'

const email = {
	rule: new RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,16}$/i),
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

const nonNumeralField = {
	rule: new RegExp(/^[\u0401\u0451\u0410-\u044fA-z]{2,}$/i),
	message: 'Поле не должно содержать цифры и знаки',
}

const minimumSymbolAmountMessage = (amount: string | number) =>
	`Поле должно содержать минимум ${amount} символов`

const requiredMessage = 'Поле обязательно'

export const loginValidator = (values: Auth) => {
	const errors = {} as Auth

	if (!values.email) {
		errors.email = requiredMessage
	} else if (!email.rule.test(values.email)) {
		errors.email = email.message
	}

	if (!values.password) {
		errors.password = requiredMessage
	}

	return errors
}

export const registerValidator = (values: Register) => {
	// validate email
	const errors = loginValidator(values) as Register

	const SIMILAR_FIELDS = ['first_name', 'second_name', 'middle_name'] as const
	const FIELD_MIN_LENGTH = 2

	SIMILAR_FIELDS.forEach((field) => {
		if (!values[field]) {
			errors[field] = requiredMessage
		} else if (values[field].length < FIELD_MIN_LENGTH) {
			errors[
				field
			] = `Поле должно содержать минимум ${FIELD_MIN_LENGTH} символа`
		} else if (!nonNumeralField.rule.test(values[field])) {
			errors[field] = nonNumeralField.message
		}
	})

	const MIN_PASS_LENGTH = 8

	if (!values.password) {
		errors.password = requiredMessage
	} else if (values.password.length < MIN_PASS_LENGTH) {
		errors.password = minimumSymbolAmountMessage(MIN_PASS_LENGTH)
	} else {
		passwordRules.forEach(({ rule, message }) => {
			if (!rule.test(values.password)) {
				errors.password = message
			}
		})
	}

	if (!values['password_confirmation']) {
		errors['password_confirmation'] = requiredMessage
	} else if (values['password_confirmation'] !== values.password) {
		errors['password_confirmation'] = 'Поля не совпадают'
	}

	return errors
}
