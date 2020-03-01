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

    return <TextField {...input} label={label} error={invalid} helperText={touched && error} {...custom} />
}

export default TextInput
