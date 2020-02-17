import React from 'react'
import { Grid, TextField } from '@material-ui/core'
import { Field } from 'redux-form'
import PassportSidebar from './PassportSidebar'
import InitialInfo from './InitialInfo'
import renderTextField from './MaterialReduxForm/TextField'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import OrderElementsTable from './OrderElementsTable'
import FinalForm from './FinalForm'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                marginBottom: theme.spacing(1),
            },
        },
        halfWidth: {
            width: '45%',
        },
    }),
)

const PassportForm = (): JSX.Element => {
    const variant = 'standard'
    const classes = useStyles()

    return (
        <Grid container spacing={3}>
            {/* Sidebar */}
            <PassportSidebar />
            {/* Initial */}
            <Grid item container xs={12} sm={6} md={10} justify="space-between" className={classes.root}>
                {/* Initial info packaging */}
                <InitialInfo />
                {/* Important info */}
                <Grid item container xs={12} md={6} className={classes.root} direction="column">
                    <TextField fullWidth label="Важно" multiline rows="8" variant="outlined" />
                    <Field
                        className={classes.halfWidth}
                        component={renderTextField}
                        name="isCut"
                        type="number"
                        variant={variant}
                        label="Обрезной"
                    />
                    <Field
                        className={classes.halfWidth}
                        component={renderTextField}
                        name="circulation"
                        type="text"
                        variant={variant}
                        label="Тираж"
                    />
                    <Field
                        className={classes.halfWidth}
                        component={renderTextField}
                        name="repeat"
                        type="number"
                        variant={variant}
                        label="Повтор"
                    />
                </Grid>
                {/* Elements */}
                <OrderElementsTable />
            </Grid>
            {/* FinalForm */}
            <FinalForm />
        </Grid>
    )
}

export default PassportForm
