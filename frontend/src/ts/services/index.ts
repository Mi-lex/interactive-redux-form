import axios from 'axios'
import { AcceptedError } from '../store/types/common'

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequested'

let baseUrl: string

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
	baseUrl = 'http://127.0.0.1:8000/api'
} else {
	baseUrl = '/api'

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
}

export const getMessageFromError = (error: AcceptedError): string => {
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

export const setDefaultAuthHeader = (token: string): void => {
	api.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default api
