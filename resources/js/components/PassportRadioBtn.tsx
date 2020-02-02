import React from 'react';
import { Field } from 'redux-form';

type Props = {
    name: string;
    groupName: string;
    label: string;
};

const PassportRadioBtn = (props: Props): JSX.Element => {
    const { name, groupName, label } = props;
    return (
        <div className="radioBtn">
            <label htmlFor={name}>{label}</label>
            <Field name={groupName} id={name} component="input" type="radio" value={name} />
        </div>
    );
};
export default PassportRadioBtn;
