import React from 'react';
import { Field } from 'redux-form';
import PassportBtn from './PassportBtn';
import DatePicker from './DatePicker';
import classes from '../../css/modules/DatePickerField.module.css';
import { Box } from '@material-ui/core';

type Props = {
    label: string;
    name: string;
    placeholder: string;
    minDate?: Date;
    className: string;
};

const DatePickerField = (props: Props): JSX.Element => {
    const { label, name, className, placeholder, ...restProps } = props;
    const calendar = React.createRef();

    const handleIconClick = () => {
        calendar.current.click();
    };

    return (
        <Box component="label" ref={calendar} mb={2} display="flex" justifyContent="space-between" alignItems="center">
            <span>{label}</span>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Field
                    className={`${classes.input} ${className}`}
                    component={DatePicker}
                    name={name}
                    placeholder={placeholder}
                    {...restProps}
                />
                <PassportBtn onClick={handleIconClick} iconName="calendar" size="sm" />
            </Box>
        </Box>
    );
};

export default DatePickerField;
