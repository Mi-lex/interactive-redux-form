import React, { useState, useEffect } from 'react'
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

    let initialDate: Date

    if (input.value) {
        initialDate = new Date(input.value)
    }

    useEffect(() => {
        if (!selectedDate && input.value) {
            setValue(initialDate)
        }
    })

    return (
        <>
            <WrappedComponent
                autoOk
                {...input}
                value={selectedDate}
                invalidDateMessage="Неверный формат данных"
                onChange={setValue}
                {...((rest as unknown) as T)}
            />
            {touched && invalid && <span className="error_msg">{error}</span>}
        </>
    )
}

export default reduxFieldDatePickerWrapper
