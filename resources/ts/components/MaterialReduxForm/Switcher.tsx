import React from 'react'
import { WrappedFieldProps } from 'redux-form'
import { FormControlLabelProps } from '@material-ui/core/FormControlLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch, { SwitchProps } from '@material-ui/core/Switch'

type Props = WrappedFieldProps & SwitchProps & FormControlLabelProps

const Switcher: React.FC<Props> = ({ input, label, ...rest }: Props) => (
    <FormControlLabel
        control={<Switch {...input} onChange={(_, value) => input.onChange(value)} {...rest} />}
        label={label}
    />
)

export default Switcher
