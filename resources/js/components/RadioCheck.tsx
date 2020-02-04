import React from 'react';
import { Field } from 'redux-form';

type InputType = 'radio' | 'checkbox';

type Props = {
    name?: string;
    groupName: string;
    label: string;
    type: InputType;
    className?: string;
};

const RadioCheck = (props: Props): JSX.Element => {
    const { name = '', groupName, label, classes, className = '', type } = props;
    return (
        <label className={`${classes.container} ${className}`}>
            <span>{label}</span>
            <Field name={groupName} component="input" type={type} value={name} />
            <span className={classes.checkmark}></span>
        </label>
    );
};
export default RadioCheck;
