import axios from 'axios'

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
    } else {
        message = error.message
    }

    return message
}

export default axios.create({
    baseURL: baseUrl,
})