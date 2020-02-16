import React from 'react'
import Select, { SelectProps } from '@material-ui/core/Select'
import { WrappedFieldProps } from 'redux-form'

type Props = SelectProps & WrappedFieldProps

const SelectField: React.FC<Props> = ({ input, label, children, ...rest }) => (
    <Select {...input} onChange={value => input.onChange(value)} {...rest}>
        {children}
    </Select>
)

export default SelectField
