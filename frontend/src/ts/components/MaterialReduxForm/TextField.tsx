import React from 'react'
import { WrappedFieldProps } from 'redux-form'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'

interface InnerTextFieldProps<P = {}> {
    InputProps: P
}

export type Props = WrappedFieldProps & TextFieldProps & InnerTextFieldProps

const TextInput: React.FC<Props> = <P extends {}>(props: Props) => {
    const {
        label,
        input,
        InputProps,
        meta: { touched, invalid, error },
        ...custom
    } = props

    return (
        <TextField
            {...input}
            label={label}
            error={invalid}
            InputProps={InputProps}
            helperText={touched && error}
            {...custom}
        />
    )
}

export default TextInput
