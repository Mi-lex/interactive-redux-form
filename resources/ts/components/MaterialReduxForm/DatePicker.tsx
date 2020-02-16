/**
 * Component represents combine version of Redux Form Field
 * and material date picker
 */
import React, { useState, useEffect } from 'react'
import { KeyboardDatePicker, KeyboardDatePickerProps } from '@material-ui/pickers'
import { WrappedFieldProps } from 'redux-form'

interface WrappedPickerProps extends WrappedFieldProps, KeyboardDatePickerProps {}

const DatePicker: React.FC<WrappedFieldProps> = (props: WrappedPickerProps): JSX.Element => {
    const {
        input,
        label,
        name,
        meta: { touched, error },
        ...rest
    } = props
    const [selectedDate, setValue] = useState(() => {
        return input.value ? new Date(input.value) : null
    })

    useEffect(() => {
        if (selectedDate) {
            const date = new Date(selectedDate).getTime()
            input.onChange(date)
        }

        if (!selectedDate && input.value) {
            setValue(new Date(input.value))
        }
    })

    return (
        <>
            <KeyboardDatePicker
                autoOk
                {...input}
                name={name}
                label={label}
                invalidDateMessage="Неверная дата"
                fullWidth
                variant="inline"
                value={selectedDate}
                onChange={setValue}
                format={'dd.MM.yyyy'}
                {...rest}
            />
            {touched && error && <span className="error_msg">{error}</span>}
        </>
    )
}

export default DatePicker
