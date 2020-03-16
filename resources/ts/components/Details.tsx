import React from 'react'
import { Field } from 'redux-form'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'

import Checkbox from './MaterialReduxForm/Checkbox'
import TextField from './MaterialReduxForm/TextField'

const Details = () => {
    const variant = 'standard'
    return (
        <Grid container item xs={12} spacing={3}>
            <Grid item xs={12} md={3}>
                <Field fullWidth component={TextField} name="is_cut" type="number" variant={variant} label="Обрезной" />
            </Grid>
            <Grid item xs={12} md={3}>
                <Field fullWidth component={TextField} name="circulation" type="text" variant={variant} label="Тираж" />
            </Grid>
            <Grid item xs={12} md={3} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                {/* Повтор - Checkbox */}
                <FormControlLabel
                    labelPlacement="end"
                    control={<Field component={Checkbox} name="is_similar_order" />}
                    label="Повтор"
                />
            </Grid>
            <Grid item xs={12} md={3}>
                {/* Повтор - номер повторяемого заказа */}
                <Field
                    fullWidth
                    component={TextField}
                    name="similar_order_id"
                    type="number"
                    variant={variant}
                    label=" "
                />
            </Grid>
        </Grid>
    )
}

export default Details
