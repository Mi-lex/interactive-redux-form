import axios from 'axios'
import { AcceptedError } from '../store/types/common'

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequested'

const baseUrl = '/api'

if (process.env.NODE_ENV === 'production') {
	const token = document.head.querySelector('meta[name="csrf-token"]')

	if (token) {
		axios.defaults.headers.common['X-CSRF-TOKEN'] = token.getAttribute(
			'content',
		)
	} else {
		console.error(
			'CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token',
		)
	}
} else {
}

export const getMessageFromError = (error: Readonly<AcceptedError>): string => {
	let message = 'Something went wrong'
	if (error.response) {
		if (error.response.data.errors) {
			message = Object.values(error.response.data.errors)
				.map((input) => input.toString())
				.join('')
		} else {
			message = error.response.data.message
		}
	} else if (error.message) {
		message = error.message
	}

	console.error(error)
	return message
}

const api = axios.create({
	baseURL: baseUrl,
})

export default api
