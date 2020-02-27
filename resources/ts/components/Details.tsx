import React from 'react'
import { FormSection, Field } from 'redux-form'
import { Grid } from '@material-ui/core'
import TextField from './MaterialReduxForm/TextField'

const Details = () => {
    const variant = 'standard'
    return (
        <FormSection name="order">
            <Grid container item xs={12} spacing={3}>
                <Grid item xs={12} md={3}>
                    <Field
                        fullWidth
                        component={TextField}
                        name="is_cut"
                        type="number"
                        variant={variant}
                        label="Обрезной"
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <Field
                        fullWidth
                        component={TextField}
                        name="circulation"
                        type="text"
                        variant={variant}
                        label="Тираж"
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
                        label="Повтор"
                    />
                </Grid>
            </Grid>
        </FormSection>
    )
}

export default Details