import React from 'react'
import Select, { SelectProps } from '@material-ui/core/Select'
import { WrappedFieldProps } from 'redux-form'
import MenuItem from '@material-ui/core/MenuItem'

interface SelectOption {
    name: string
    value: string
}

type Props = SelectProps & WrappedFieldProps & {
    options: SelectOption[]
}

const SelectField: React.FC<Props> = ({ input, children, options = [], ...rest }) => (
    <Select {...input} onChange={input.onChange} {...rest}>
        {options.map(option => (
            <MenuItem key={option.value} value={option.value}>{option.name}</MenuItem>
        ))}
    </Select>
)

export default SelectField
