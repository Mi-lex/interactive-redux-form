import React from 'react'
import Select, { SelectProps } from '@material-ui/core/Select'
import { WrappedFieldProps } from 'redux-form'

type Props = SelectProps & WrappedFieldProps

const SelectField: React.FC<Props> = ({ input, label, children, ...rest }) => (
    <Select {...input} onChange={input.onChange} {...rest}>
        {children}
    </Select>
)

export default SelectField
