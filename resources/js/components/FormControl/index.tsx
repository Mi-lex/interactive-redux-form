import React from 'react';
import PassportBtn from '../PassportBtn';
import { Field } from 'redux-form';
import ReduxCreatableSelect from '../ReduxCreatableSelect';
import { inputOptions } from '../../store/data';
import classes from '../../../css/modules/FormControl.module.css';
import Box from '@material-ui/core/Box';

const FormControl: React.FC = () => {
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2} mt={2}>
            <Box display="flex">
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
                    className="passInputBorder"
                    placeholder="по слову или по полю"
                    component="input"
                />
                <PassportBtn size="md" iconName="search" />
            </Box>
            <div className="headerRightBlock">
                <PassportBtn size="md" iconName="addPassport" />
                <PassportBtn size="md" iconName="approveForm" />
                <PassportBtn size="md" iconName="print" />
            </div>
        </Box>
    );
};

export default FormControl;
