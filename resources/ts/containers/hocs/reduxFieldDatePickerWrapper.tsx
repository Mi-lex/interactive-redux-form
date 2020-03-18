import React, { useEffect, useState } from 'react'
import { WrappedFieldProps } from 'redux-form'
import parse from 'date-fns/parse'

type OwnProps = {
    format: string
}

const reduxFieldDatePickerWrapper = <T extends {}>(
    WrappedComponent: React.ComponentType<T>,
): React.ComponentType<T & WrappedFieldProps> => (props: WrappedFieldProps & T & OwnProps) => {
    const {
        input,
        meta: { touched, invalid, error },
        format,
        ...rest
    } = props

    const parser = format
        ? (dateValue: string) => parse(dateValue, format, new Date())
        : (dateValue: string) => new Date(dateValue)

    const [selectedDate, setValue] = useState(() => {
        return input.value ? 
        parser(input.value)
        : null
    })

    useEffect(() => {
        if (!selectedDate && input.value) {
            const parsed = parser(input.value)

            setValue(parsed)
        }
    })

    return (
        <WrappedComponent
            autoOk
            {...input}
            value={selectedDate}
            helperText={touched && invalid && error}
            invalidDateMessage="Неверный формат данных"
            onChange={setValue}
            format={format}
            {...((rest as unknown) as T)}
        />
    )
}

export default reduxFieldDatePickerWrapper
