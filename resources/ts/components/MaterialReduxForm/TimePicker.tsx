import React, { useState, useEffect } from 'react'
import { WrappedFieldProps } from 'redux-form'
import { KeyboardTimePicker, KeyboardTimePickerProps } from '@material-ui/pickers'
import AccessAlarm from '@material-ui/icons/AccessAlarm'

interface Props extends WrappedFieldProps, KeyboardTimePickerProps {}

const InlineTimePicker: React.FC<Props> = (props: Props) => {
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
            <KeyboardTimePicker
                ampm={false}
                autoOk
                name={name}
                variant="inline"
                label={label}
                fullWidth
                invalidDateMessage="Неверный формат данных"
                value={selectedDate}
                onChange={setValue}
                format={'HH:mm'}
                keyboardIcon={<AccessAlarm />}
            />
            {touched && error && <span className="error_msg">{error}</span>}
        </>
    )
}

export default InlineTimePicker
