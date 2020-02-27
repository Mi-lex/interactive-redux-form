import React from 'react'
import { Field } from 'redux-form'
import { Switcher, Select, DatePicker, TextField } from './MaterialReduxForm'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
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

type Props = {
    paymentCash: boolean
}

const PassportSidebar: React.FC<Props> = (props: Props) => {
    const { paymentCash } = props
    const classes = useStyles()
    const variant = 'standard'

    return (
        <Grid item xs={12} sm={6} md={2} className={classes.root}>
            <Field component={TextField} name="customer.name" fullWidth={true} variant={variant} label="Клиент" />
            <Field component={TextField} name="order.type" fullWidth={true} variant={variant} label="Тип" />
            <Field
                component={TextField}
                name="order.name"
                multiline
                fullWidth={true}
                variant={variant}
                label="Название"
            />
            <Divider variant="fullWidth" className={classes.divider} />
            <Field name="payment.payed_by_cash" label="Наличными" color="primary" component={Switcher} />
            <FormControl className={classes.formControl}>
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
        </Grid>
    )
}

export default PassportSidebar
