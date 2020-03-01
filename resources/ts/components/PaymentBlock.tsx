import React from 'react'
import { useSelector } from 'react-redux'
import { formValueSelector } from 'redux-form'
import { Field } from 'redux-form'
import { DatePicker, TextField, Select, Switcher } from '../components/MaterialReduxForm'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'

const selector: Function = formValueSelector('passport')

const PaymentBlock = () => {
    const paymentCash = useSelector(state => selector(state, 'payment.payed_by_cash'))
    const variant = 'standard'
    return (
        <>
            <Field name="payment.payed_by_cash" label="Наличными" props={{ color: 'primary' }} component={Switcher} />
            <FormControl fullWidth>
                <InputLabel>Организация</InputLabel>
                <Field
                    label="Организация"
                    name="payment_org_type"
                    variant={variant}
                    disabled={paymentCash}
                    component={Select}
                >
                    <MenuItem value="эталон">Эталон</MenuItem>
                    <MenuItem value="стандарт">Стандарт</MenuItem>
                    <MenuItem value="прессцентр">Прессцентр</MenuItem>
                </Field>
            </FormControl>
            <Field
                component={TextField}
                name="account_number"
                fullWidth
                disabled={paymentCash}
                variant={variant}
                label="Счет"
            />
            <Field component={DatePicker} name="payment.date" fullWidth disabled={paymentCash} label="от" />
        </>
    )
}

export default PaymentBlock
