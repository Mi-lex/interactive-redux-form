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

    return formOrder
}

export default axios.create({
    baseURL: baseUrl,
})
