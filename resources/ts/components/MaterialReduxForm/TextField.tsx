import React from 'react'
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
    return <TextField label={label} error={touched && invalid} helperText={touched && error} {...input} {...custom} />
}

export default TextInput
