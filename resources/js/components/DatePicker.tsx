import React, { ReactNode } from 'react';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import DatePicker, { registerLocale } from 'react-datepicker';
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
    children?: ReactNode;
};

const FormDatePicker = (props: DatePickerProps): JSX.Element => {
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

export default FormDatePicker;
