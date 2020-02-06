import React from 'react';
import { Field } from 'redux-form';
import Box from '@material-ui/core/Box';

type InputType = 'radio' | 'checkbox';

type Props = {
    name?: string;
    groupName: string;
    label: string;
    type: InputType;
    className?: string;
};

const RadioCheck = (props: Props): JSX.Element => {
    const { name = '', groupName, label, classes, className = '', type, ...restProps } = props;
    return (
        <Box component="label" className={`${classes.container} ${className}`} {...restProps}>
            <span>{label}</span>
            <Field name={groupName} component="input" type={type} value={name} />
            <span className={classes.checkmark}></span>
        </Box>
    );
};
export default RadioCheck;
