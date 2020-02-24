import React from 'react'
import { Field } from 'redux-form'
import { Grid, Box, FormControl, FormControlLabel, InputLabel, MenuItem, FormGroup } from '@material-ui/core'
import {
    DatePicker,
    TextField,
    Select,
    Checkbox,
    DateTimePicker,
    TextareaAutosize,
} from '../components/MaterialReduxForm'
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
                {/* Заказ */}
                <Grid item container className={classes.root} style={{ paddingBottom: 0 }}>
                    <Grid component={Box} item xs={12} md={6}>
                        <Field
                            component={TextField}
                            name="order.id"
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
                        component={DatePicker}
                        name="order.date"
                        fullWidth={true}
                        label="от"
                        variant={variant}
                        disabled={true}
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
                        <FormControlLabel control={<Field name="delivery.should_be_delivered" component={Checkbox} />} label="Доставить" />
                    </FormControl>
                    <Field
                        component={TextareaAutosize}
                        name="adress"
                        label="Адрес"
                        type="text"
                        fullWidth
                        rowsMin={6}
                        variant="outlined"
                        disabled={!requiredDelivery}
                    />
                </Grid>
                {/* Right column */}
                <Grid item xs={12} md={6} className={classes.root} style={{ paddingTop: 0 }}>
                    <Field
                        component={DateTimePicker}
                        name="makeTill"
                        fullWidth={true}
                        label="Изготовить до"
                        variant={variant}
                    />
                    <FormControl className={classes.formControl}>
                        <InputLabel>В</InputLabel>
                        <Field name="packageType" variant={variant} component={Select}>
                            <MenuItem value="box">коробку</MenuItem>
                            <MenuItem value="pack">пачку</MenuItem>
                        </Field>
                    </FormControl>
                    <FormGroup>
                        <FormControlLabel
                            control={<Field component={Checkbox} name="sampleOnPackage" />}
                            label="Образец на упаковку"
                        />
                        <FormControlLabel
                            control={<Field component={Checkbox} name="sortByTypes" />}
                            label="По видам"
                        />
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
            <Grid item container xs={12} md={6} className={classes.root} direction="column">
                <Field
                    component={TextareaAutosize}
                    name="importantInfo"
                    label="Важно"
                    type="text"
                    fullWidth
                    rowsMin={8}
                    variant="outlined"
                />
                <Field
                    className={classes.halfWidth}
                    component={TextField}
                    name="isCut"
                    type="number"
                    variant={variant}
                    label="Обрезной"
                />
                <Field
                    className={classes.halfWidth}
                    component={TextField}
                    name="circulation"
                    type="text"
                    variant={variant}
                    label="Тираж"
                />
                <Field
                    className={classes.halfWidth}
                    component={TextField}
                    name="repeat"
                    type="number"
                    variant={variant}
                    label="Повтор"
                />
            </Grid>
        </>
    )
}

export default InitialInfo
