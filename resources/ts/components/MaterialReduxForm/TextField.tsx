import React, { useState, useEffect } from 'react'
import { WrappedFieldProps } from 'redux-form'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'

type Props = WrappedFieldProps & TextFieldProps

const TextInput: React.FC<Props> = props => {
    const {
        label,
        input,
        meta: { touched, invalid, error },
        ...custom
    } = props

    const [value, setValue] = useState('')

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    return (
        <TextField
            {...input}
            value={value}
            onChange={onChangeHandler}
            label={label}
            error={error}
            helperText={touched && error}
            {...custom}
        />
    )
}

export default TextInput
