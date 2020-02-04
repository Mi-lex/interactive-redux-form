import React from 'react';
import PassportBtn from './PassportBtn';
import { Field } from 'redux-form';
import ReduxCreatableSelect from './ReduxCreatableSelect';
import { inputOptions } from '../store/data';
import classes from '../../css/modules/FormControl.module.css';

const FormControl: React.FC = () => {
    return (
        <div className={`align-items-center d-flex justify-content-between mb-3 mt-4`}>
            <div className={`${''} d-flex`}>
                <PassportBtn size="md" iconName="createNewPassport" />
                <Field
                    name="manager"
                    className={classes.managerSearch}
                    placeholder="менеджер"
                    component={ReduxCreatableSelect}
                    options={inputOptions.managers}
                />
                <Field
                    name="search"
                    type="text"
                    className="passInputBorder pl-2 mr-1"
                    placeholder="по слову или по полю"
                    component="input"
                />
                <PassportBtn size="md" iconName="search" />
            </div>
            <div className="headerRightBlock">
                <PassportBtn size="md" iconName="addPassport" />
                <PassportBtn size="md" iconName="approveForm" />
                <PassportBtn size="md" iconName="print" />
            </div>
        </div>
    );
};

export default FormControl;
