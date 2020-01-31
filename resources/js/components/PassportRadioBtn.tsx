import React from 'react';
import { Field } from 'redux-form';

type PassportRadioBtnPropType = {
    name: string;
    groupName: string;
    label: string;
};

const PassportRadioBtn = ({ name, groupName, label }: PassportRadioBtnPropType): JSX.Element => {
    return (
        <div className="radioBtn">
            <label htmlFor={name}>{label}</label>
            <Field name={groupName} id={name} component="input" type="radio" value={name} />
        </div>
    );
};
export default PassportRadioBtn;
