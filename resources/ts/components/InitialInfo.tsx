import React from 'react'
import { Field, FormSection } from 'redux-form'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AccessAlarm from '@material-ui/icons/AccessAlarm'

import { Checkbox, DatePicker, Select, TextareaAutosize, TextField, TimePicker } from '../components/MaterialReduxForm'
import { packageOptions } from '../store/consts'
import DeliveryBlock from './DeliveryBlock'

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

const InitialInfo: React.FC = () => {
    const variant = 'standard'
    const classes = useStyles()

    return (
        <>
            <Grid item container xs={12} md={6} spacing={3}>
                {/* Left column */}
                <Grid item xs={12} md={6} className={classes.root}>
                    <Field
                        component={TextField}
                        name="id"
                        type="number"
                        fullWidth
                        variant={variant}
                        disabled={true}
                        label="Заказ"
                    />
                    <Field
                        component={DatePicker}
                        variant="inline"
                        name="completion_date"
                        fullWidth
                        props={{
                            format: 'dd.MM.yy',
                        }}
                        label="Изготовить до"
                    />
                    <Field
                        component={TextField}
                        name="package.capacity"
                        type="number"
                        min={0}
                        fullWidth
                        variant={variant}
                        label="Упаковать по"
                    />
                    <DeliveryBlock />
                </Grid>
                {/* Right column */}
                <Grid item xs={12} md={6} className={classes.root}>
                    <Field
                        component={DatePicker}
                        name="created_at"
                        fullWidth
                        props={{
                            format: 'dd.MM.yy',
                        }}
                        label="от"
                        disabled={true}
                    />
                    <Field
                        component={TimePicker}
                        name="completion_time"
                        fullWidth
                        props={{
                            format: 'HH:mm',
                            keyboardIcon: <AccessAlarm />,
                        }}
                        label="к"
                        variant={variant}
                    />
                    <FormControl className={classes.formControl}>
                        <InputLabel>В</InputLabel>
                        <Field name="package.type" variant={variant} options={packageOptions} component={Select} />
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
                    name="important_info"
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
