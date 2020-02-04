import React, { FC } from 'react';
import FieldWithComment from './FieldWithComment';
import { Field } from 'redux-form';
import { inputOptions } from '../store/data';
import ReduxCreatableSelect from './ReduxCreatableSelect';
import classes from '../../css/modules/AfterPrintSubform.module.css';
import CheckBox from './CheckBox';

const AfterPrintSubform: FC = () => {
    return (
        <div className={`d-flex ${classes.container}`}>
            <div className={classes.col}>
                <FieldWithComment name="toRevanishInfo" expandable={true} className="passInputmb">
                    <span className="mb-1 d-block">Лакировать</span>
                    <Field
                        component={ReduxCreatableSelect}
                        className="passInputmb"
                        name="toRevanishWith"
                        options={inputOptions.varnishMaterial}
                    />
                </FieldWithComment>
                <FieldWithComment name="toHotStampInfo" expandable={true} className="passInputmb">
                    <span className="mb-1 d-block">Конгрев</span>
                    <Field
                        component={ReduxCreatableSelect}
                        className="passInputmb"
                        name="toHotStampWith"
                        options={inputOptions.hotStampMaterial}
                    />
                </FieldWithComment>
            </div>
            <div className={classes.col}>
                <FieldWithComment name="toLaminateInfo" expandable={true} className="passInputmb">
                    <span className="mb-1 d-block">Ламинировать</span>
                    <Field
                        component={ReduxCreatableSelect}
                        className="passInputmb"
                        name="toLaminateWith"
                        options={inputOptions.laminateMaterial}
                    />
                </FieldWithComment>
                <FieldWithComment name="toEmbossInfo" expandable={true} className="passInputmb">
                    <span className="mb-1 d-block">Тиснить фольгой</span>
                    <Field
                        component={ReduxCreatableSelect}
                        className="passInputmb"
                        name="toEmbossWith"
                        options={inputOptions.embossMaterial}
                    />
                </FieldWithComment>
            </div>
            <div className={classes.col}>
                <CheckBox name="creasing" className="passInputmb" label="Биговать" />
                <CheckBox name="bookFolding" className="passInputmb" label="Фальцевать" />
                <CheckBox name="perforation" className="passInputmb" label="Перфорация" />
                <Field component="textarea" className="passInputBorder passInputmb" name="afterPrintInfo" />
                <FieldWithComment name="toStampCutInfo" expandable={true} className="passInputmb">
                    <span className="mb-1 d-block">Вырубить штампом</span>
                    <Field
                        component="input"
                        type="text"
                        name="toStampCutWhat"
                        className="passInputBorder passInputmb passInputSize"
                    />
                </FieldWithComment>
            </div>
            <div className={classes.col}>
                <label htmlFor="importantInfo">Важно</label>
                <Field
                    className="passInputBorder w-100 h-75"
                    component="textarea"
                    name="importantInfo"
                    id="importantInfo"
                />
            </div>
        </div>
    );
};

export default AfterPrintSubform;
