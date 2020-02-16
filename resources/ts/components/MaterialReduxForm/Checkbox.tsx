import React from 'react'
import { WrappedFieldProps } from 'redux-form'
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox'

type Props = WrappedFieldProps & CheckboxProps

const CheckboxField: React.FC<Props> = props => {
    const {
        input,
        value,
        meta: { touched, invalid, error },
        ...custom
    } = props
    return (
        <>
            <Checkbox
                {...input}
                checked={input.value ? true : false}
                onChange={input.onChange}
                color="primary"
                value={value}
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            {touched && error && <span className="error_msg">{error}</span>}
        </>
    )
}

export default CheckboxField
