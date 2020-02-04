import React from 'react';
import { Field } from 'redux-form';
import PassportBtn from './PassportBtn';
import DatePicker from './DatePicker';
import classes from '../../css/modules/DatePickerField.module.css';

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
        <label ref={calendar} className="d-flex align-items-center justify-content-between">
            <span>{label}</span>
            <div>
                <Field
                    className={`${classes.input} ${className}`}
                    component={DatePicker}
                    name={name}
                    placeholder={placeholder}
                    {...restProps}
                />
                <PassportBtn onClick={handleIconClick} iconName="calendar" size="sm" />
            </div>
        </label>
    );
};

export default DatePickerField;
