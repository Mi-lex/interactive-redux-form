import React from 'react'
import { WrappedFieldProps } from 'redux-form'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'
import TextareaAutosize, { TextareaAutosizeProps } from '@material-ui/core/TextareaAutosize'

type AutoSizeProps = TextareaAutosizeProps & {
    inputRef: any
}

const renderTextareaAutosize: React.FC<AutoSizeProps> = props => {
    const { inputRef, ...custom } = props

    return <TextareaAutosize {...custom} />
}

type Props = WrappedFieldProps &
    TextFieldProps & {
        rowsMin: number | string
    }

const TextareaAutosizeField: React.FC<Props> = props => {
    const {
        label,
        input,
        rowsMin,
        meta: { touched, invalid, error },
        ...custom
    } = props

    return (
        <TextField
            {...input}
            InputProps={{
                inputComponent: renderTextareaAutosize as any,
                inputProps: { rowsMin },
            }}
            label={label}
            error={error}
            helperText={touched && error}
            {...custom}
        />
    )
}

export default TextareaAutosizeField
