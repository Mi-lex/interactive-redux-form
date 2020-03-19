import React from 'react'
import { useSelector } from 'react-redux'
import { Field, formValueSelector } from 'redux-form'
import { KeyboardDatePicker, TextField, Select, Checkbox } from '../components/MaterialReduxForm'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { paymentOrgOptions } from '../store/consts'

const selector: Function = formValueSelector('passport')

const PaymentBlock = () => {
    const paymentCash = useSelector(state => selector(state, 'payment.payed_by_cash'))
    const variant = 'standard'
    return (
        <>
            <FormControl fullWidth>
                <FormControlLabel
                    label="Наличными"
                    control={
                        <Field
                            name="payment.payed_by_cash"
                            props={{ color: 'primary' }}
                            className="coloredLabel"
                            component={Checkbox}
                        />
                    }
                />
            </FormControl>
            {!paymentCash && (
                <>
                    <FormControl fullWidth>
                        <InputLabel>Организация</InputLabel>
                        <Field
                            component={Select}
                            label="Организация"
                            name="payment.operation.org_type"
                            variant={variant}
                            options={paymentOrgOptions}
                        />
                    </FormControl>
                    <Field
                        component={TextField}
                        name="payment.operation.account_number"
                        fullWidth
                        variant={variant}
                        label="Счет"
                    />
                    <Field
                        component={KeyboardDatePicker}
                        name="payment.operation.date"
                        fullWidth
                        props={{
                            format: 'dd.MM.yy',
                        }}
                        label="от"
                    />
                </>
            )}
        </>
    )
}

export default PaymentBlock
