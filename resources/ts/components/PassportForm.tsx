import React from 'react'
import { Field } from 'redux-form'
import PassportSidebar from './PassportSidebar'
import FinalForm from './FinalForm'
import InitialInfo from './InitialInfo'
import OrderElementsTable from './OrderElementsTable'
import renderTextField from './MaterialReduxForm/TextField'
import { Grid, TextField } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

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
                {/* FinalForm */}
                <FinalForm />
            </Grid>
        </Grid>
    )
}

export default PassportForm
