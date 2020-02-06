import React, { FC } from 'react';
import FieldWithComment from './FieldWithComment';
import { Field } from 'redux-form';
import { inputOptions } from '../store/data';
import ReduxCreatableSelect from './ReduxCreatableSelect';
import classes from '../../css/modules/AfterPrintSubform.module.css';
import CheckBox from './CheckBox';
import Box from '@material-ui/core/Box';

const AfterPrintSubform: FC = () => {
    return (
        <Box display="flex">
            <div className={classes.col}>
                <FieldWithComment name="revanish" expandable={true} className="passInputmb">
                    <Box mb={2}>Лакировать</Box>
                    <Field
                        component={ReduxCreatableSelect}
                        className="passInputmb"
                        name="type"
                        options={inputOptions.varnishMaterial}
                    />
                </FieldWithComment>
                <FieldWithComment name="hotStamp" expandable={true} className="passInputmb">
                    <Box mb={2}>Конгрев</Box>
                    <Field
                        component={ReduxCreatableSelect}
                        className="passInputmb"
                        name="label"
                        options={inputOptions.hotStampMaterial}
                    />
                </FieldWithComment>
            </div>
            <div className={classes.col}>
                <FieldWithComment name="laminate" expandable={true} className="passInputmb">
                    <Box mb={2}>Ламинировать</Box>
                    <Field
                        component={ReduxCreatableSelect}
                        className="passInputmb"
                        name="type"
                        options={inputOptions.laminateMaterial}
                    />
                </FieldWithComment>
                <FieldWithComment name="embossing" expandable={true} className="passInputmb">
                    <Box mb={2}>Тиснить фольгой</Box>
                    <Field
                        component={ReduxCreatableSelect}
                        className="passInputmb"
                        name="type"
                        options={inputOptions.embossMaterial}
                    />
                </FieldWithComment>
            </div>
            <div className={classes.col}>
                <CheckBox name="creasing" className="passInputmb" label="Биговать" />
                <CheckBox name="bookFolding" className="passInputmb" label="Фальцевать" />
                <CheckBox name="perforation" className="passInputmb" label="Перфорация" />
                <Field component="textarea" rows={3} className="passInputBorder passInputmb" name="afterPrintInfo" />
                <FieldWithComment name="stampCut" expandable={true} className="passInputmb">
                    <Box mb={2}>Вырубить штампом</Box>
                    <Field
                        component="input"
                        type="text"
                        name="label"
                        className="passInputBorder passInputmb passInputSize"
                    />
                </FieldWithComment>
            </div>
            <div className={classes.col}>
                <Box component="label" display="block" mb={2} htmlFor="importantInfo">
                    Важно
                </Box>
                <Field
                    className="passInputBorder w-100 h-75"
                    component="textarea"
                    name="importantInfo"
                    id="importantInfo"
                />
            </div>
        </Box>
    );
};

export default AfterPrintSubform;
