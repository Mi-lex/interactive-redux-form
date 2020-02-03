import React from 'react';
import { Field } from 'redux-form';
import classes from '../../css/modules/PassportRadioBtn.module.css';

type Props = {
    name: string;
    groupName: string;
    label: string;
};

const PassportRadioBtn = (props: Props): JSX.Element => {
    const { name, groupName, label } = props;
    return (
        <label className={classes.container}>
            <span>{label}</span>
            <Field name={groupName} id={name} component="input" type="radio" value={name} />
            <span className={classes.checkmark}></span>
        </label>
    );
};
export default PassportRadioBtn;
