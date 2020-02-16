import React from 'react';
import RadioCheck from './RadioCheck';
import classes from '../../css/modules/RadioBtn.module.css';

type Props = {
    name: string;
    groupName: string;
    label: string;
    classes: any;
};

const RadioBtn = ({ groupName, label, name, ...restProps }: Props): JSX.Element => (
    <RadioCheck classes={classes} groupName={groupName} label={label} type="radio" name={name} {...restProps} />
);

export default RadioBtn;
