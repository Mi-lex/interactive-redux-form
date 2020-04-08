/**
 * The HOC wraps material date/time pickers
 * so they can be used with redux-form Field
 * component altogether
 */
import React, { useEffect, useState } from 'react'
import { WrappedFieldProps } from 'redux-form'
import parse from 'date-fns/parse'

type OwnProps = {
	format: string
}

const reduxFieldDatePickerWrapper = <T extends {}>(
	WrappedComponent: React.ComponentType<T>,
): React.ComponentType<T & WrappedFieldProps & OwnProps> => (
	props: WrappedFieldProps & T & OwnProps,
) => {
	const {
		input,
		meta: { touched, invalid, error },
		format,
		...rest
	} = props

	const parser = format
		? (dateValue: string) => parse(dateValue, format, new Date())
		: (dateValue: string) => new Date(dateValue)

	const [selectedDate, setValue] = useState<Date | null>(() => {
		return input.value ? parser(input.value) : null
	})

	useEffect(() => {
		if (input.value) {
			setValue(parser(input.value))
		} else {
			setValue(null)
		}
	}, [input.value])

	return (
		<WrappedComponent
			autoOk
			{...input}
			value={selectedDate}
			helperText={touched && error}
			error={touched && invalid}
			invalidDateMessage="Неверный формат данных"
			onChange={setValue}
			format={format}
			{...((rest as unknown) as T)}
		/>
	)
}

export default reduxFieldDatePickerWrapper
