import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Field, FieldArray, reduxForm, formValueSelector, InjectedFormProps } from 'redux-form';
import { RootState } from '../store/rootReducer';
import { getDateString } from '../utils';
import OrderElementsTable from './OrderElementsTable';
import FixingpaperSubForm from './FixingpapeSubForm';
import ReduxCreatableSelect from './ReduxCreatableSelect';
import { inputOptions } from '../store/data';

import DatePickerField from './DatePickerField';
import AfterPrintSubform from './AfterPrintSubform';
import CheckBox from './CheckBox';
import FormControl from './FormControl';
import FieldLabel from './FieldLabel';

const selector: Function = formValueSelector('passport');

type MapState = {
    repeat: boolean;
};

const mapStateToProps = (state: RootState): MapState => {
    const repeat: boolean = selector(state, 'repeat');
    return {
        repeat,
    };
};

type PropsFromRedux = ConnectedProps<typeof mapStateToProps>;

type PassportFormProps = PropsFromRedux & InjectedFormProps;

const connector = connect(mapStateToProps);

const PassportForm = ({ repeat }: PassportFormProps): JSX.Element => {
    const currentDate: string = getDateString(new Date());

    return (
        <div className="container-fluid">
            <form action="POST" className="passportForm">
                <FormControl />
                <div className="row">
                    <div className="col-3">
                        <div className="d-flex">
                            <FieldLabel labelText="Заказ" labelClassName="mr-3">
                                <Field
                                    name="id"
                                    component="input"
                                    type="number"
                                    className="passInputBorder passInputSize"
                                    placeholder={'34567'}
                                    disabled
                                    style={{
                                        width: '84px',
                                    }}
                                />
                            </FieldLabel>
                            <FieldLabel labelText="от">
                                <Field
                                    name="date"
                                    component="input"
                                    type="text"
                                    className="passInputBorder passInputSize"
                                    disabled
                                    placeholder={currentDate}
                                    style={{
                                        width: '84px',
                                    }}
                                />
                            </FieldLabel>
                        </div>
                        <Field
                            className="w-100 passInputBorder passInputmb passInputSize"
                            name="client"
                            component="input"
                            type="text"
                            placeholder="клиент"
                        />
                        <Field
                            className="w-100 passInputBorder passInputmb passInputSize"
                            name="type"
                            component="input"
                            type="text"
                            placeholder="тип"
                        />
                        <Field
                            className="w-100 passInputBorder"
                            name="name"
                            component="textarea"
                            placeholder="название"
                        />
                    </div>
                    <div className="col-3">
                        <DatePickerField
                            label="Изготовить до"
                            name="make_till"
                            className="passInputBorder passInputSize"
                            placeholder={currentDate}
                            minDate={new Date()}
                        />
                        <FieldLabel labelText="обрезной">
                            <Field
                                className="passInputBorder passInputSize"
                                name="is_cut"
                                component="input"
                                type="text"
                                placeholder="000 x 000"
                            />
                        </FieldLabel>
                        <FieldLabel labelText="тираж">
                            <Field
                                className="passInputBorder passInputSize"
                                name="circulation"
                                component="input"
                                type="number"
                                min="0"
                                placeholder="000"
                            />
                        </FieldLabel>
                        <div className="d-flex justify-content-between align-items-center">
                            <CheckBox name="repeat" className="w-50 mr-3" label="Повтор" />
                            <Field
                                className="passInputBorder passInputSize w-50"
                                name="repeat_times"
                                component="input"
                                disabled={!repeat}
                                type="number"
                            />
                        </div>
                    </div>
                    <div className="col-2">
                        <FieldLabel labelText="к">
                            <Field
                                className="passInputBorder passInputSize"
                                name="make_till_time"
                                component="input"
                                type="time"
                                required="required"
                            />
                            <span>часам</span>
                        </FieldLabel>
                        <FieldLabel labelText="упаковать по">
                            <Field
                                className="passInputBorder passInputSize w-25"
                                name="amount_in_package"
                                component="input"
                                type="number"
                                min={0}
                                placeholder="0000"
                            />
                            {` шт.`}
                        </FieldLabel>
                        <Field
                            className="passInputBorder passInputSize passInputmb w-100"
                            name="packaging"
                            component="select"
                            placeholder="0000"
                        >
                            <option value="in_box">в коробку</option>
                        </Field>
                        <CheckBox name="sample_on_package" className="passInputmb" label="образец на упаковку" />
                        <CheckBox name="sort_by_types" className="passInputmb" label="по видам" />
                    </div>
                    <div className="col-2">
                        <CheckBox name="delivery" className="passInputmb" label="Доставить" />
                        <Field
                            name="address"
                            className="passInputmb passInputBorder"
                            component="textarea"
                            placeholder="куда"
                        />
                        <CheckBox className="passInputmb" name="label" label="ярклык" />
                        <CheckBox className="passInputmb" name="stretch-wrap" label="стрейч-пленка" />
                        <CheckBox className="passInputmb" name="palleting" label="паллетирование" />
                    </div>
                    <div className="col-2">
                        <Field
                            name="organization"
                            className="passInputSize passInputmb"
                            placeholder="организация"
                            component={ReduxCreatableSelect}
                            isClearable={true}
                            options={inputOptions.organizations}
                        />
                        <FieldLabel labelText="Счет">
                            <Field
                                name="bill_account_number"
                                className="passInputBorder passInputSize w-75"
                                component="input"
                                type="text"
                            />
                        </FieldLabel>
                        <DatePickerField
                            label="от"
                            name="payment_date"
                            className="passInputBorder passInputSize"
                            placeholder={currentDate}
                        />
                    </div>
                </div>

                <section className="orderElemmentsInfo">
                    <FieldArray name="orders" component={OrderElementsTable} />
                </section>
                <div className="row">
                    <div className="col">
                        <FixingpaperSubForm />
                    </div>
                    <div className="col-8">
                        <AfterPrintSubform />
                    </div>
                </div>
            </form>
        </div>
    );
};

const DecoratedPassportForm = reduxForm({
    form: 'passport',
    initialValues: {
        orders: Array(3).fill({}),
        toRevanishWith: inputOptions.varnishMaterial[0],
        toRevanishInfo: [{}],
        toHotStampWith: inputOptions.hotStampMaterial[0],
        toHotStampInfo: [{}],
        toLaminateWith: inputOptions.laminateMaterial[0],
        toLaminateInfo: [{}],
        toEmbossWith: inputOptions.embossMaterial[0],
        toEmbossInfo: [{}],
        toStampCutInfo: [{}],
    },
})(PassportForm);

export default connector(DecoratedPassportForm);
