import { ForkEffect } from 'redux-saga/effects'

export type PartialRecord<K extends keyof any, T> = {
	[P in K]?: T
}

export type IntendedLocationState = Readonly<{
	intendedPath: string
}>

/**
 * Remove from T the keys that are in common with K
 */
export type Optionalize<T extends K, K> = Omit<T, keyof K>

export type Action = Readonly<{
	type: string
	payload?: any
}>

export type SagaType = () => Generator<ForkEffect<never>, void, unknown>

export interface ErrorsObj {
	[key: string]: string
}

export interface ErrorResponse {
	data: {
		message: string
		errors?: ErrorsObj
	}
}

export interface ErrorWithResponse {
	response: ErrorResponse
}

export interface AcceptedError extends ErrorWithResponse, Error {}
