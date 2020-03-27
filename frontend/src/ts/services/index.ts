import axios from 'axios'
import format from 'date-fns/format'
import parse from 'date-fns/parse'

import { FetchedOrder, FormOrder, PaperJoinerName } from '../store/types'
import { FormPostAction, PostPrintActionName } from './../store/types'
import { convertFormat } from './../utils'

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
		console.log(token)
	} else {
		console.error(
			'CSRF token not found: https://laravel.com/docs/csrf#csrf-x-csrf-token',
		)
	}
}

interface ErrorsObj {
	[key: string]: string
}

interface ErrorResponse {
	data: {
		message: string
		errors?: ErrorsObj
	}
}

interface ErrorWithResponse {
	response: ErrorResponse
}

interface AcceptedError extends ErrorWithResponse, Error {}

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

/**
 * Get data from the server and prepare it for the form
 * @param order fetched passport object
 * @return acceptable object for redux-form state
 */
export const getFormData = (order: FetchedOrder): FormOrder => {
	const formOrder = {} as FormOrder

	if (order.paper_joiner) {
		const joinerType = order.paper_joiner.type

		// To check corresponding checkbox
		formOrder.paper_joiner_checks = {
			[joinerType]: true,
		}

		formOrder.paper_joiner = {
			[joinerType]: order.paper_joiner.body,
		}
	}

	if (order.post_actions) {
		formOrder.post_actions = {}
		formOrder.post_actions_checks = {}

		order.post_actions.forEach(({ type, body, additional, elements }) => {
			formOrder.post_actions_checks[type] = true

			formOrder.post_actions = {
				...formOrder.post_actions,
				[type]: {
					...body,
					additional: [additional],
					elements,
				},
			}
		})
	}

	formOrder.created_at = format(new Date(order.created_at), 'dd.MM.yy')

	if (order.completion_date) {
		formOrder.completion_date = format(
			new Date(order.completion_date),
			'dd.MM.yy',
		)
	}

	if (order.completion_time) {
		formOrder.completion_time = convertFormat(
			order.completion_time,
			'HH:mm:ss',
			'HH:mm',
		)
	}

	if (order.payment) {
		formOrder.payment = Object.assign(
			order.payment,
			// if order is not payed by cash &&
			// there is also payment operation info
			// parse date to acceptable format
			order.payment.payed_by_cash !== true &&
				order.payment.operation !== undefined
				? {
						operation: {
							...order.payment.operation,
							date: format(new Date(order.payment.operation.date), 'dd.MM.yy'),
						},
				  }
				: {},
		)
	}

	return Object.assign(order, formOrder)
}

/**
 * Prepare form data for sending to the server
 * @param order form data that stored in the state
 * @return acceptable data for a server to update order info
 */
export const getRequestData = (order: FormOrder): FormOrder => {
	const requestOrder: FormOrder = {
		...order,
		post_actions: {},
	}

	if (order.paper_joiner_checks) {
		const selectedJoiner = (Object.entries(order.paper_joiner_checks) as Array<
			[PaperJoinerName, boolean]
		>).find(([_, value]) => value)

		if (selectedJoiner) {
			const joinerName = selectedJoiner[0]
			const joinerBody = order.paper_joiner
				? order.paper_joiner[joinerName]
				: {}

			requestOrder.paper_joiner = {
				[selectedJoiner[0]]: {
					...joinerBody,
				},
			}
		}
	}

	if (order.post_actions_checks) {
		const selectedActions = Object.entries(order.post_actions_checks) as Array<
			[PostPrintActionName, boolean]
		>

		selectedActions.forEach(([actionName, value]) => {
			if (value) {
				const formPostAction = order.post_actions[actionName] as FormPostAction

				const {
					elements = null,
					additional = [],
					...actionBody
				} = formPostAction

				requestOrder.post_actions = {
					...requestOrder.post_actions,
					[actionName]: {
						body: actionBody,
						elements: elements,
						additional: additional[0],
					},
				}
			}
		})
	}

	if (order.completion_time) {
		requestOrder.completion_time = convertFormat(
			order.completion_time,
			'HH:mm',
			'HH:mm:ss',
		)
	}

	if (order.payment && order.payment.operation) {
		const parsed = parse(order.payment.operation.date, 'dd.MM.yy', new Date())

		requestOrder.payment = {
			...order.payment,
			operation: {
				...order.payment.operation,
				date: format(parsed, 'yyyy-MM-dd'),
			},
		}
	}

	if (order.completion_date) {
		const parsed = parse(order.completion_date, 'dd.MM.yy', new Date())
		requestOrder.completion_date = format(parsed, 'yyyy-MM-dd')
	}

	const parsedCreatedAt = parse(order.created_at, 'dd.MM.yy', new Date())
	requestOrder.created_at = format(parsedCreatedAt, 'yyyy-MM-dd')

	return requestOrder
}

export default axios.create({
	baseURL: baseUrl,
})
