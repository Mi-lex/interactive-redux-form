import React, { useEffect, useState } from 'react'
import { WrappedFieldProps } from 'redux-form'

const reduxFieldDatePickerWrapper = <T extends {}>(
    WrappedComponent: React.ComponentType<T>,
): React.ComponentType<T & WrappedFieldProps> => (props: WrappedFieldProps & T) => {
    const {
        input,
        meta: { touched, invalid, error },
        ...rest
    } = props

    const [selectedDate, setValue] = useState(() => {
        return input.value ? new Date(input.value) : null
    })

    useEffect(() => {
        if (!selectedDate && input.value) {
            setValue(new Date(input.value))
        }

        if (!input.value) {
            setValue(null)
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
            {...((rest as unknown) as T)}
        />
    )
}

export default reduxFieldDatePickerWrapper
