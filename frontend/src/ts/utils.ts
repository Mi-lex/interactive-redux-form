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
