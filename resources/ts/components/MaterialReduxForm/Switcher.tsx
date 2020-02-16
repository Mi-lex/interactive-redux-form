import React from 'react'
import { WrappedFieldProps } from 'redux-form'
import { FormControlLabelProps } from '@material-ui/core/FormControlLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch, { SwitchProps } from '@material-ui/core/Switch'

type Props = WrappedFieldProps & SwitchProps & FormControlLabelProps

const Switcher: React.FC<Props> = ({ input, color, label, ...rest }: Props) => (
    <FormControlLabel
        control={<Switch onChange={(ev, value) => input.onChange(value)} {...input} {...rest} color={color} />}
        label={label}
    />
)

export default Switcher
