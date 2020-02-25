import React from 'react'
import { Field } from 'redux-form'
import { Grid } from '@material-ui/core'
import TextField from './MaterialReduxForm/TextField'

const Details = () => {
    const variant = 'standard'
    return (
        <Grid container item xs={12} spacing={3}>
            <Grid item xs={12} md={3}>
                <Field fullWidth component={TextField} name="isCut" type="number" variant={variant} label="Обрезной" />
            </Grid>
            <Grid item xs={12} md={3}>
                <Field fullWidth component={TextField} name="circulation" type="text" variant={variant} label="Тираж" />
            </Grid>
            <Grid item xs={12} md={3}>
                <Field fullWidth component={TextField} name="repeat" type="number" variant={variant} label="Повтор" />
            </Grid>
        </Grid>
    )
}

export default Details
