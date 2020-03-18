import format from 'date-fns/format'
import parse from 'date-fns/parse'
import { PostPrintActionName } from './../store/types'
import axios from 'axios'
import { FetchedOrder, FormOrder, PaperJoinerName } from '../store/types'
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequested'

let baseUrl: string

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    baseUrl = 'http://127.0.0.1:8000/api'
} else {
    baseUrl = '/api'
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
    let message
    if (error.response) {
        if (error.response.data.errors) {
            message = Object.values(error.response.data.errors)
                .map(input => input.toString())
                .join('')
        } else {
            message = error.response.data.message
        }
    } else if (error.message) {
        message = error.message
    }

    return message
}

export const getFormData = (order: FetchedOrder): FormOrder => {
    const formOrder: FormOrder = { ...order, paper_joiner: {}, post_actions: {} }

    if (order.paper_joiner) {
        const joinerType: PaperJoinerName = order.paper_joiner.type

        formOrder.paper_joiner_checks = {
            [joinerType]: true,
        }
        delete order.paper_joiner.body.id

        formOrder.paper_joiner = {
            [joinerType]: order.paper_joiner.body,
        }
    }

    if (order.post_actions) {
        formOrder.post_actions = {}
        formOrder.post_actions_checks = {}

        order.post_actions.forEach(({ type, body, additional, elements }) => {
            delete body.id

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
        formOrder.completion_date = format(new Date(order.completion_date), 'dd.MM.yy')
    }

    if (order.completion_time) {
        const parsed = parse(order.completion_time, 'HH:mm:ss', new Date())
        formOrder.completion_time = format(parsed, 'HH:mm')
    }

    return formOrder
}

export const getRequestData = (order: FormOrder): FormOrder => {
    const requestOrder: FormOrder = { ...order, paper_joiner: {}, post_actions: {} }

    if (order.paper_joiner_checks) {
        const selectedJoiner = (Object.entries(order.paper_joiner_checks) as Array<[PaperJoinerName, boolean]>).find(
            (_, value) => value,
        )

        if (selectedJoiner) {
            const joinerName = selectedJoiner[0]
            const joinerBody = order.paper_joiner ? order.paper_joiner[joinerName] : {}

            requestOrder.paper_joiner = {
                [selectedJoiner[0]]: {
                    ...joinerBody,
                },
            }
        }
    }

    if (order.post_actions_checks) {
        const selectedActions = Object.entries(order.post_actions_checks) as Array<[PostPrintActionName, boolean]>

        selectedActions.forEach(([actionName, value]) => {
            if (value) {
                const { elements = null, additional = null, ...actionBody } = order.post_actions
                    ? order.post_actions[actionName]
                    : {}

                requestOrder.post_actions = {
                    ...requestOrder.post_actions,
                    [actionName]: {
                        body: actionBody,
                    },
                }

                if (elements) {
                    requestOrder.post_actions[actionName].elements = elements
                }

                if (additional && additional.length > 0) {
                    requestOrder.post_actions[actionName].additional = additional[0]
                }
            }
        })
    }

    if (order.completion_time) {
        const parsed = parse(order.completion_time, 'HH:mm', new Date())
        requestOrder.completion_time = format(parsed, 'HH:mm:ss')
    }

    if (order.payment && order.payment.operation) {
        const parsed = parse(order.payment.operation.date, 'dd.MM.yy', new Date())
        requestOrder.payment.operation.date = format(parsed, 'yyyy-MM-dd')
    }

    if (order.completion_date) {
        const parsed = parse(order.completion_date, 'dd.MM.yy', new Date())
        requestOrder.completion_date = format(parsed, 'yyyy-MM-dd')
    }

    return requestOrder
}

export default axios.create({
    baseURL: baseUrl,
})
