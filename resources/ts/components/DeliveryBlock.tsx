import React from 'react'
import { useSelector } from 'react-redux'
import { Field, formValueSelector } from 'redux-form'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'

import ColoredControlLabel from './ColoredControlLabel'
import { Checkbox, TextareaAutosize } from '../components/MaterialReduxForm'

const selector: Function = formValueSelector('passport')

const DeliveryBlock = () => {
    const requiredDelivery = useSelector(state => selector(state, 'delivery.should_be_delivered'))

    return (
        <>
            <FormControl fullWidth style={{ marginBottom: 2 }}>
                <FormControlLabel
                    className="coloredLabel"
                    control={<Field name="delivery.should_be_delivered" component={Checkbox} />}
                    label="Доставить"
                />
            </FormControl>
            {requiredDelivery && (
                <Field
                    component={TextareaAutosize}
                    name="delivery.address"
                    label="Адрес"
                    type="text"
                    fullWidth
                    rowsMin={6}
                    variant="outlined"
                />
            )}
        </>
    )
}

export default DeliveryBlock
