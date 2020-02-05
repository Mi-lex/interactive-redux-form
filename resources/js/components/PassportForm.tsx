import React from 'react';
import { FieldArray, reduxForm } from 'redux-form';
import OrderElementsTable from './OrderElementsTable';
import FixingpaperSubForm from './FixingpapeSubForm';
import { inputOptions } from '../store/data';
import AfterPrintSubform from './AfterPrintSubform';
import FormControl from './FormControl';
import InitialForm from './InitialForm';

const PassportForm = (): JSX.Element => {
    return (
        <div className="container-fluid">
            <form action="POST" className="passportForm">
                <FormControl />
                <InitialForm />
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

export default DecoratedPassportForm;
