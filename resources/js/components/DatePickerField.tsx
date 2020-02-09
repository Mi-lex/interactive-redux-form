import React from 'react';
import { Field } from 'redux-form';
import PassportBtn from './PassportBtn';
import DatePicker, { registerLocale } from 'react-datepicker';
import { Box } from '@material-ui/core';
import classes from '../../css/modules/DatePickerField.module.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import ru from 'date-fns/locale/ru';

registerLocale('ru', ru);

type Input = {
    value: string;
    onChange: Function;
};

type DatePickerProps = {
    input?: Input;
    placeholder: string;
    minDate: Date;
    maxDate: Date;
    children?: React.ReactNode;
};

const FieldDatePicker = (props: DatePickerProps): JSX.Element => {
    const { input = null, placeholder, minDate, maxDate, ...restProps } = props;
    return (
        <DatePicker
            locale="ru"
            dateFormat="dd.MM.yy"
            selected={input.value}
            onChange={input.onChange}
            minDate={minDate}
            maxDate={maxDate}
            disabledKeyboardNavigation
            placeholderText={placeholder}
            {...restProps}
        />
    );
};

type Props = {
    label: string;
    name: string;
    placeholder: string;
    minDate?: Date;
    className: string;
};

const DatePickerField = (props: Props): JSX.Element => {
    const { label, name, className, placeholder, ...restProps } = props;
    const calendar = React.createRef<HTMLLabelElement>();

    const handleIconClick = (): void => {
        calendar.current.click();
    };

    return (
        <Box component="label" ref={calendar} mb={2} display="flex" justifyContent="space-between" alignItems="center">
            <span>{label}</span>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Field
                    className={`${classes.input} ${className}`}
                    component={FieldDatePicker}
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
