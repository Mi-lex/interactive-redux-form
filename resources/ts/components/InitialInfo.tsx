import React from 'react'
import { Field, FormSection } from 'redux-form'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormGroup from '@material-ui/core/FormGroup'
import { DatePicker, TextField, Select, Checkbox, TimePicker, TextareaAutosize } from '../components/MaterialReduxForm'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AccessAlarm from '@material-ui/icons/AccessAlarm'

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
        halfWidth: {
            width: '45%',
        },
    }),
)

type Props = {
    requiredDelivery: boolean
}

const InitialInfo: React.FC<Props> = props => {
    const { requiredDelivery } = props
    const variant = 'standard'
    const classes = useStyles()

    return (
        <>
            <Grid item container xs={12} md={6} spacing={3}>
                {/* Left column */}
                <Grid item xs={12} md={6} className={classes.root}>
                    <Field
                        component={TextField}
                        name="order.id"
                        type="number"
                        fullWidth={true}
                        variant={variant}
                        disabled={true}
                        label="Заказ"
                    />
                    <Field
                        component={DatePicker}
                        variant="inline"
                        name="order.completion_date"
                        props={{
                            format: 'dd.MM.yy',
                            fullWidth: true,
                        }}
                        label="Изготовить до"
                    />
                    <Field
                        component={TextField}
                        name="package.capacity"
                        type="number"
                        min={0}
                        fullWidth={true}
                        variant={variant}
                        label="Упаковать по"
                    />
                    <FormControl fullWidth style={{ marginBottom: 2 }}>
                        <FormControlLabel
                            control={<Field name="delivery.should_be_delivered" component={Checkbox} />}
                            label="Доставить"
                        />
                    </FormControl>
                    <Field
                        component={TextareaAutosize}
                        name="delivery.adress"
                        label="Адрес"
                        type="text"
                        fullWidth
                        rowsMin={6}
                        variant="outlined"
                        disabled={!requiredDelivery}
                    />
                </Grid>
                {/* Right column */}
                <Grid item xs={12} md={6} className={classes.root}>
                    <Field
                        component={DatePicker}
                        name="order.date"
                        props={{
                            format: 'dd.MM.yy',
                            fullWidth: true,
                        }}
                        label="от"
                        disabled={true}
                    />
                    <Field
                        component={TimePicker}
                        name="order.time"
                        props={{
                            format: 'HH:mm',
                            keyboardIcon: <AccessAlarm />,
                        }}
                        fullWidth={true}
                        // keyboardIcon={<AccessAlarm />}
                        label="к"
                        variant={variant}
                    />
                    <FormControl className={classes.formControl}>
                        <InputLabel>В</InputLabel>
                        <Field name="package.type" variant={variant} component={Select}>
                            <MenuItem value="коробку">коробку</MenuItem>
                            <MenuItem value="пачку">пачку</MenuItem>
                        </Field>
                    </FormControl>
                    <FormSection name="package">
                        <FormGroup>
                            <FormControlLabel
                                control={<Field component={Checkbox} name="sample" />}
                                label="Образец на упаковку"
                            />
                            <FormControlLabel control={<Field component={Checkbox} name="sort" />} label="По видам" />
                            <FormControlLabel control={<Field component={Checkbox} name="label" />} label="Ярлык" />
                            <FormControlLabel
                                control={<Field component={Checkbox} name="palleting" />}
                                label="Паллетирование"
                            />
                            <FormControlLabel
                                control={<Field component={Checkbox} name="stretch_film" />}
                                label="Стреч-пленка"
                            />
                        </FormGroup>
                    </FormSection>
                </Grid>
            </Grid>
            <Grid item container xs={12} md={6} className={classes.root} direction="column">
                <Field
                    component={TextareaAutosize}
                    name="order.important_info"
                    label="Важно"
                    type="text"
                    fullWidth
                    rowsMin={8}
                    variant="outlined"
                />
            </Grid>
        </>
    )
}

export default InitialInfo
