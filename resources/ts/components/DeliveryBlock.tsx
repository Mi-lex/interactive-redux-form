import React from 'react'
import { formValueSelector } from 'redux-form'
import { useSelector } from 'react-redux'
import { Field } from 'redux-form'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { Checkbox, TextareaAutosize } from '../components/MaterialReduxForm'

const selector: Function = formValueSelector('passport')

const DeliveryBlock = () => {
    const requiredDelivery = useSelector(state => selector(state, 'delivery.should_be_delivered'))
    return (
        <>
            <FormControl fullWidth style={{ marginBottom: 2 }}>
                <FormControlLabel
                    control={<Field name="delivery.should_be_delivered" component={Checkbox} />}
                    label="Доставить"
                />
            </FormControl>
            <Field
                component={TextareaAutosize}
                name="delivery.adress"
                label="Адрес"
                type="text"
                fullWidth
                rowsMin={6}
                variant="outlined"
                disabled={!requiredDelivery}
            />
        </>
    )
}

export default DeliveryBlock
