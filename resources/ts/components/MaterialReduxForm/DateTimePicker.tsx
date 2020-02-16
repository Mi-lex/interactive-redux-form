import React, { useState, useEffect } from 'react'
import { WrappedFieldProps } from 'redux-form'
import { KeyboardDateTimePicker, KeyboardDateTimePickerProps } from '@material-ui/pickers'

interface Props extends WrappedFieldProps, KeyboardDateTimePickerProps {}

const InlineDateTimePickerDemo: React.FC<Props> = (props: Props) => {
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
            <KeyboardDateTimePicker
                autoOk
                name={name}
                variant="inline"
                minDate="2020-01-16"
                maxDate="2025-01-16"
                ampm={false}
                label={label}
                fullWidth
                invalidDateMessage="Неверный формат данных"
                minDateMessage="Дата выполнение не может предшествовать сегодняшней"
                value={selectedDate}
                onChange={setValue}
                format={'dd.MM.yyyy hh:mm'}
            />
            {touched && error && <span className="error_msg">{error}</span>}
        </>
    )
}

export default InlineDateTimePickerDemo
