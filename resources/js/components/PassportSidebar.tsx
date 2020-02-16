import React from 'react';
import { useSelector } from 'react-redux';
import { Field } from 'redux-form';
import TextField from '@material-ui/core/TextField';
import { Grid, Divider, FormControl, InputLabel, MenuItem, Switch, Select, FormControlLabel } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MaterialPicker from './MaterialPicker';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                marginBottom: theme.spacing(2),
            },
        },
        divider: {
            // backgroundColor: theme.palette.primary.main,
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
        },
        formControl: {
            minWidth: '100%',
        },
    }),
);

const Switcher: React.FC = ({ input, ...rest }) => (
    <FormControlLabel
        control={<Switch onChange={(ev, value) => input.onChange(value)} {...input} {...rest} color="primary" />}
        label="Наличными"
    />
);

const renderSelectField = ({ input, label, fullwidth, children, ...rest }) => (
    <>
        <Select {...input} onChange={value => input.onChange(value)}>
            {children}
        </Select>
    </>
);

const renderTextField = ({ label, input, meta: { touched, invalid, error }, ...custom }) => (
    <TextField label={label} error={touched && invalid} helperText={touched && error} {...input} {...custom} />
);

const PassportSidebar: React.FC = () => {
    const classes = useStyles();
    const variant = 'standard';

    return (
        <Grid item xs={12} sm={6} md={2} className={classes.root}>
            <Field component={renderTextField} name="client" fullWidth={true} variant={variant} label="Клиент" />
            <Field component={renderTextField} name="type" fullWidth={true} variant={variant} label="Тип" />
            <Field component={renderTextField} name="orderName" fullWidth={true} variant={variant} label="Название" />
            <Divider variant="fullWidth" className={classes.divider} />
            <Field name="paymentCash" component={Switcher} />
            <FormControl className={classes.formControl}>
                <InputLabel>Организация</InputLabel>
                <Field label="Организация" name="organization" variant={variant} component={renderSelectField}>
                    <MenuItem value="etalon">Эталон</MenuItem>
                    <MenuItem value="standard">Стандарт</MenuItem>
                    <MenuItem value="presscenter">Прессцентр</MenuItem>
                </Field>
            </FormControl>
            <Field component={renderTextField} name="bill" fullWidth={true} variant={variant} label="Счет" />
            <Field component={MaterialPicker} name="paymentDate" fullWidth={true} label="от" />
        </Grid>
    );
};

export default PassportSidebar;
