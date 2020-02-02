import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Field, FieldArray, reduxForm, formValueSelector, InjectedFormProps } from 'redux-form';
import { RootState } from '../store/rootReducer';
import PassportBtn from './PassportBtn';
import { getDateString } from '../utils';
import FormDatePicker from './DatePicker';
import OrderElementsTable from './OrderElementsTable';
import FixingpaperSubForm from './FixingpaperSubForm';
import classes from '../../css/modules/PassportForm.module.css';
import ReduxCreatableSelect from './ReduxCreatableSelect';
import { inputOptions } from '../store/data';
import FieldWithComment from './FieldWithComment';

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
            <form action="POST" className="passportForm container-fluid">
                <div className={classes.header}>
                    <div className={classes.header__leftBlock}>
                        <PassportBtn size="md" iconName="createNewPassport" />
                        <Field
                            name="manager"
                            className="!later"
                            placeholder="менеджер"
                            component={ReduxCreatableSelect}
                            isClearable={true}
                            options={inputOptions.managers}
                        />
                        <Field
                            name="search"
                            type="text"
                            className="search"
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
                <div className="row">
                    <div className="col">
                        <div className="initialInfo">
                            <label htmlFor="orderNumber">Заказ</label>
                            <Field
                                name="id"
                                component="input"
                                type="number"
                                className="field"
                                placeholder={'34567'}
                                disabled
                            />
                            <label>от</label>
                            <Field name="date" component="input" type="text" disabled placeholder={currentDate} />
                        </div>
                        <Field name="client" component="input" type="text" placeholder="клиент" />
                        <Field name="type" component="input" type="text" placeholder="тип" />
                        <Field name="name" component="textarea" placeholder="имя" />
                    </div>
                    <div className="col">
                        <div className="field">
                            <label htmlFor="make_till_date">Изготовить до</label>
                            <Field
                                component={FormDatePicker}
                                name="make_till_date"
                                placeholder={currentDate}
                                minDate={new Date()}
                            />
                            <label htmlFor="make_till_date">
                                <PassportBtn size="md" iconName="calendar" />
                            </label>
                        </div>
                        <div className="field">
                            <label htmlFor="is_cut">обрезной</label>
                            <Field name="is_cut" component="input" type="text" placeholder="000 x 000" />
                        </div>
                        <div className="field">
                            <label htmlFor="circulation">тираж</label>
                            <Field name="circulation" component="input" type="number" min="0" placeholder="000" />
                        </div>
                        <div className="field">
                            <label htmlFor="repeat">повтор</label>
                            <Field name="repeat" component="input" type="checkbox" />
                            <Field name="repeat_times" component="input" disabled={!repeat} type="number" />
                        </div>
                    </div>
                    <div className="col">
                        <div className="field">
                            {`изготовить к `}
                            <Field name="make_till_time" component="input" type="time" />
                        </div>
                        <div className="field">
                            {`упаковать по `}
                            <Field name="amount_in_package" component="input" type="number" placeholder="0000" />
                            {` шт.`}
                        </div>
                        <div className="field">
                            <Field name="packaging" component="select" placeholder="0000">
                                <option value="in_box">в коробку</option>
                            </Field>
                        </div>
                        <div className="field">
                            образец на упаковку
                            <Field name="sample_on_package" component="input" type="checkbox" />
                        </div>
                        <div className="field">
                            по видам
                            <Field name="sort_by_types" component="input" type="checkbox" />
                        </div>
                    </div>
                    <div className="col">
                        <div className="field">
                            Доставить
                            <Field name="delivery" checked component="input" type="checkbox" />
                        </div>
                        <div className="field">
                            <Field name="address" component="textarea" placeholder="куда" />
                        </div>
                        <div className="field">
                            ярлк
                            <Field name="label" component="input" type="checkbox" />
                        </div>
                        <div className="field">
                            стрейч-пленка
                            <Field name="stretch-wrap" component="input" type="checkbox" />
                        </div>
                        <div className="field">
                            паллетирование
                            <Field name="palleting" component="input" type="checkbox" />
                        </div>
                    </div>
                    <div className="col">
                        <Field
                            name="organization"
                            className="!later"
                            placeholder="организация"
                            component={ReduxCreatableSelect}
                            isClearable={true}
                            options={inputOptions.organizations}
                        />
                        <div className="field">
                            Счет <Field name="bill_account_number" component="input" type="text" />
                        </div>
                        <div className="field">
                            от <Field component={FormDatePicker} name="payment_date" />
                        </div>
                    </div>
                </div>

                <section className="orderElemmentsInfo">
                    <FieldArray name="orders" component={OrderElementsTable} />
                </section>
                <div className="row">
                    <FixingpaperSubForm />
                    <div className="col">
                        <div className="row">
                            <div className="col">
                                <FieldWithComment name="toRevanishInfo" expandable={true} className="!later">
                                    Лакировать
                                    <Field
                                        component={ReduxCreatableSelect}
                                        name="toRevanishWith"
                                        options={inputOptions.varnishMaterial}
                                    />
                                </FieldWithComment>
                                <FieldWithComment name="toHotStamp" expandable={true} className="!later">
                                    Конгрев
                                    <Field
                                        component={ReduxCreatableSelect}
                                        name="toHotStampWith"
                                        options={inputOptions.hotStampMaterial}
                                    />
                                </FieldWithComment>
                            </div>
                            <div className="col">
                                <FieldWithComment name="toLaminateInfo" expandable={true} className="!later">
                                    Ламинировать
                                    <Field
                                        component={ReduxCreatableSelect}
                                        name="toLaminateWith"
                                        options={inputOptions.laminateMaterial}
                                    />
                                </FieldWithComment>
                                <FieldWithComment name="toEmbossInfo" expandable={true} className="!later">
                                    Тиснить фольгой
                                    <Field
                                        component={ReduxCreatableSelect}
                                        name="toEmbossWith"
                                        options={inputOptions.embossMaterial}
                                    />
                                </FieldWithComment>
                            </div>
                            <div className="col">
                                <label>
                                    Биговать
                                    <Field name="creasing" component="input" type="checkbox" />
                                </label>
                                <label>
                                    Фальцевать
                                    <Field name="bookFolding" component="input" type="checkbox" />
                                </label>
                                <label>
                                    Перфорация
                                    <Field name="perforation" component="input" type="checkbox" />
                                </label>
                                <Field component="textarea" name="afterPrintInfo" />
                                <FieldWithComment name="toStampCutInfo" expandable={true} className="!later">
                                    Вырубить штампом
                                    <Field component="input" type="text" name="toStampCutWhat" />
                                </FieldWithComment>
                            </div>
                            <div className="col">
                                <label htmlFor="importantInfo">Важно</label>
                                <Field component="textarea" name="importantInfo" id="importantInfo" />
                            </div>
                        </div>
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
