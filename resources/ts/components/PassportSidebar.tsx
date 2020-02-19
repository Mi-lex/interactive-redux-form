import React from 'react'
import { Field } from 'redux-form'
import { Switcher, Select, DatePicker, TextField } from './MaterialReduxForm'
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

type Props = {
    paymentCash: boolean
}

const PassportSidebar: React.FC<Props> = (props: Props) => {
    const { paymentCash } = props
    const classes = useStyles()
    const variant = 'standard'

    return (
        <Grid item xs={12} sm={6} md={2} className={classes.root}>
            <Field component={TextField} name="client" fullWidth={true} variant={variant} label="Клиент" />
            <Field component={TextField} name="type" fullWidth={true} variant={variant} label="Тип" />
            <Field
                component={TextField}
                name="orderName"
                multiline
                fullWidth={true}
                variant={variant}
                label="Название"
            />
            <Divider variant="fullWidth" className={classes.divider} />
            <Field name="paymentCash" label="Наличными" color="primary" component={Switcher} />
            <FormControl className={classes.formControl}>
                <InputLabel>Организация</InputLabel>
                <Field
                    label="Организация"
                    name="organization"
                    variant={variant}
                    disabled={paymentCash}
                    component={Select}
                >
                    <MenuItem value="etalon">Эталон</MenuItem>
                    <MenuItem value="standard">Стандарт</MenuItem>
                    <MenuItem value="presscenter">Прессцентр</MenuItem>
                </Field>
            </FormControl>
            <Field component={TextField} name="bill" fullWidth disabled={paymentCash} variant={variant} label="Счет" />
            <Field component={DatePicker} name="paymentDate" fullWidth disabled={paymentCash} label="от" />
        </Grid>
    )
}

export default PassportSidebar
