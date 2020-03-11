import React from 'react'
import { WrappedFieldProps } from 'redux-form'
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox'

type Props = WrappedFieldProps &
    CheckboxProps & {
        changeAction: () => void
    }

const CheckboxField: React.FC<Props> = props => {
    const { input, changeAction = () => {}, ...custom } = props

    const onCheckHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
        changeAction()
        input.onChange(ev.target.checked)
    }

    return (
        <>
            <Checkbox
                {...input}
                checked={input.value ? true : false}
                onChange={onCheckHandler}
                color="primary"
                {...custom}
            />
        </>
    )
}

export default CheckboxField
