import React from 'react'
import renderSwitcher from './MaterialReduxForm/Switcher'
import renderSelect from './MaterialReduxForm/Select'
import renderDatePicker from './MaterialReduxForm/DatePicker'
import renderTextField from './MaterialReduxForm/TextField'
import { useSelector } from 'react-redux'
import { Field } from 'redux-form'
import { Grid, Divider, FormControl, InputLabel, MenuItem } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                marginBottom: theme.spacing(2),
            },
        },
        divider: {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
        },
        formControl: {
            minWidth: '100%',
        },
    }),
)

const PassportSidebar: React.FC = () => {
    const classes = useStyles()
    const variant = 'standard'

    return (
        <Grid item xs={12} sm={6} md={2} className={classes.root}>
            <Field component={renderTextField} name="client" fullWidth={true} variant={variant} label="Клиент" />
            <Field component={renderTextField} name="type" fullWidth={true} variant={variant} label="Тип" />
            <Field component={renderTextField} name="orderName" fullWidth={true} variant={variant} label="Название" />
            <Divider variant="fullWidth" className={classes.divider} />
            <Field name="paymentCash" label="Наличными" color="primary" component={renderSwitcher} />
            <FormControl className={classes.formControl}>
                <InputLabel>Организация</InputLabel>
                <Field label="Организация" name="organization" variant={variant} component={renderSelect}>
                    <MenuItem value="etalon">Эталон</MenuItem>
                    <MenuItem value="standard">Стандарт</MenuItem>
                    <MenuItem value="presscenter">Прессцентр</MenuItem>
                </Field>
            </FormControl>
            <Field component={renderTextField} name="bill" fullWidth={true} variant={variant} label="Счет" />
            <Field component={renderDatePicker} name="paymentDate" fullWidth={true} label="от" />
        </Grid>
    )
}

export default PassportSidebar
