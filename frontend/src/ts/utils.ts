import format from 'date-fns/format'
import parse from 'date-fns/parse'

/**
 * Function for concatenating several class names from classes obj
 */
export const classesExtractor = (
	classes: any,
	classNames: string[],
): string => {
	return classNames.map((name) => classes[name]).join(' ')
}

export const generateUniqueId = (): string =>
	(Date.now() + Math.random()).toString(36)

/**
 * Convert date from one string format
 * to another
 */
export let convertFormat: (
	value: string,
	initialFormat: string,
	resultFormat: string,
	fallback?: Date,
) => string

convertFormat = (value, initialFormat, resultFormat, fallback = new Date()) => {
	const parsed = parse(value, initialFormat, fallback)
	return format(parsed, resultFormat)
}

export const hasOwnProp = (object: Object, prop: string) => {
	return Object.prototype.hasOwnProperty.call(object, prop)
}
