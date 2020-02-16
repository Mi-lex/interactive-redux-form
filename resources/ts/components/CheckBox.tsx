import React from 'react';
import RadioCheck from './RadioCheck';
import classes from '../../css/modules/CheckBox.module.css';

type Props = {
    name: string;
    label: string;
    className?: string;
    classes: any;
};

const CheckBox = ({ name, label, ...restProps }: Props): JSX.Element => (
    <RadioCheck classes={classes} groupName={name} label={label} type="checkbox" {...restProps} />
);

export default CheckBox;
