import React from 'react';
import { reduxForm } from 'redux-form';
import { inputOptions } from '../store/data';
import FormControl from './FormControl';
import InitialForm from './InitialForm';
import OrderElementsForm from './OrderElementsTable';
import FinalForm from './FinalForm';

const PassportForm = (): JSX.Element => {
    return (
        <div className="container-fluid">
            <form action="POST" className="passportForm">
                <FormControl />
                <InitialForm />
                <OrderElementsForm />
                <FinalForm />
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
