import React from 'react'
import Grid from '@material-ui/core/Grid'
import renderDatePicker from './MaterialReduxForm/DatePicker'
import renderTextField from './MaterialReduxForm/TextField'
import renderSelect from './MaterialReduxForm/Select'
import Checkbox from './MaterialReduxForm/Checkbox'
import renderDateTimePicker from './MaterialReduxForm/DateTimePicker'
import { Field } from 'redux-form'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormGroup from '@material-ui/core/FormGroup'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import TextField from '@material-ui/core/TextField'
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

const InitialInfo = () => {
    const variant = 'standard'
    const classes = useStyles()

    return (
        <Grid item container xs={12} md={6} spacing={3}>
            {/* Заказ */}
            <Grid item container xs={12} spacing={1} style={{ paddingBottom: 0 }}>
                <Grid item xs={12} md={6}>
                    <Field
                        component={renderTextField}
                        name="orderId"
                        type="number"
                        fullWidth={true}
                        variant={variant}
                        value="69590"
                        disabled={true}
                        label="Заказ"
                    />
                </Grid>
            </Grid>
            {/* Left column */}
            <Grid item xs={12} md={6} className={classes.root} style={{ paddingTop: 0 }}>
                <Field
                    component={renderDatePicker}
                    name="orderDate"
                    fullWidth={true}
                    label="от"
                    variant={variant}
                    disabled={true}
                />
                <Field
                    component={renderTextField}
                    name="amount_in_package"
                    type="number"
                    min={0}
                    fullWidth={true}
                    variant={variant}
                    value="69590"
                    label="Упаковать по"
                />
                <TextField
                    style={{ marginTop: '10px' }}
                    fullWidth
                    label="Доставить"
                    multiline
                    rows="8"
                    variant="outlined"
                />
            </Grid>
            {/* Right column */}
            <Grid item xs={12} md={6} className={classes.root} style={{ paddingTop: 0 }}>
                <Field
                    component={renderDateTimePicker}
                    name="makeTill"
                    fullWidth={true}
                    label="Изготовить до"
                    variant={variant}
                />
                <FormControl className={classes.formControl}>
                    <InputLabel>В</InputLabel>
                    <Field name="packageType" variant={variant} component={renderSelect}>
                        <MenuItem value="box">коробку</MenuItem>
                        <MenuItem value="pack">пачку</MenuItem>
                    </Field>
                </FormControl>
                <FormGroup>
                    <FormControlLabel
                        control={<Field component={Checkbox} name="sampleOnPackage" />}
                        label="Образец на упаковку"
                    />
                    <FormControlLabel control={<Field component={Checkbox} name="sortByTypes" />} label="По видам" />
                    <FormControlLabel control={<Field component={Checkbox} name="label" />} label="Ярлык" />
                    <FormControlLabel
                        control={<Field component={Checkbox} name="palleting" />}
                        label="Паллетирование"
                    />
                    <FormControlLabel
                        control={<Field component={Checkbox} name="stretchWrap" />}
                        label="Стреч-пленка"
                    />
                </FormGroup>
            </Grid>
        </Grid>
    )
}

export default InitialInfo
