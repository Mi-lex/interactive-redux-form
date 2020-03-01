import React from 'react'
import { WrappedFieldProps } from 'redux-form'
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox'

type Props = WrappedFieldProps & CheckboxProps

const CheckboxField: React.FC<Props> = props => {
    const { input, ...custom } = props
    return (
        <>
            <Checkbox
                {...input}
                checked={input.value ? true : false}
                onChange={input.onChange}
                color="primary"
                {...custom}
            />
        </>
    )
}

export default CheckboxField
