import React from 'react'
import { useSelector } from 'react-redux'
import { Field, formValueSelector } from 'redux-form'
import { DatePicker, TextField, Select, Switcher } from '../components/MaterialReduxForm'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import { paymentOrgOptions } from '../store/consts'

const selector: Function = formValueSelector('passport')

const PaymentBlock = () => {
    const paymentCash = useSelector(state => selector(state, 'payment.payed_by_cash'))
    const variant = 'standard'
    return (
        <>
            <Field name="payment.payed_by_cash" label="Наличными" props={{ color: 'primary' }} component={Switcher} />
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
                        component={DatePicker}
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
