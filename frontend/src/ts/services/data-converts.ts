import {
	FetchedOrder,
	FormOrder,
	FormPostAction,
	PaperJoinerName,
	PostPrintActionName,
} from '../store/types/order'
import format from 'date-fns/format'
import { convertFormat } from '../helpers/utils'

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

	if (order['similar_order_id']) {
		requestOrder['is_similar_order'] = true
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

				const { elements = null, additional = [null], ...actionBody } =
					formPostAction || {}

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
		requestOrder.payment = {
			...order.payment,
			operation: {
				...order.payment.operation,
				date: convertFormat(
					order.payment.operation.date,
					'dd.MM.yy',
					'yyyy-MM-dd',
				),
			},
		}
	}

	if (order.completion_date) {
		requestOrder.completion_date = convertFormat(
			order.completion_date,
			'dd.MM.yy',
			'yyyy-MM-dd',
		)
	}

	requestOrder.created_at = convertFormat(
		order.created_at,
		'dd.MM.yy',
		'yyyy-MM-dd',
	)

	return requestOrder
}
