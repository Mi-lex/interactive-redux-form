import React from 'react'
import { WrappedFieldProps } from 'redux-form'
import TextField, { TextFieldProps } from '@material-ui/core/TextField'
// import { Theme, withStyles } from '@material-ui/core/styles'

// const StyledField = withStyles((theme: Theme) => ({
//     root: {
//         '& .MuiFormLabel-filled': {
//             color: theme.palette.primary.dark,
//         },
//         '& label.Mui-focused': {
//             color: theme.palette.secondary.dark,
//         },
//         '& .MuiInput-underline.Mui-focused:after': {
//             borderBottomColor: theme.palette.secondary.dark,
//         },
//     },
// }))(TextField)

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
