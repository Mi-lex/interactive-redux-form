import React from 'react';
import Container from '@material-ui/core/Container';
import { reduxForm } from 'redux-form';
import { inputOptions } from '../store/data';
import FormControl from '../components/FormControl';
import InitialForm from '../components/InitialForm';
import OrderElementsForm from '../components/OrderElementsTable';
import FinalForm from '../components/FinalForm';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
    spacing: 6,
});

theme.spacing(2);

const PassportForm = (): JSX.Element => {
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <form action="POST" className="passportForm">
                    <FormControl />
                    <InitialForm />
                    <OrderElementsForm />
                    <FinalForm />
                </form>
            </Container>
        </ThemeProvider>
    );
};

const DecoratedPassportForm = reduxForm({
    form: 'passport',
    initialValues: {
        orders: Array(3).fill({}),
        revanish: {
            type: inputOptions.varnishMaterial[0],
            info: [''],
        },
        hotStamp: {
            label: inputOptions.hotStampLabels[0],
            info: [''],
        },
        laminate: {
            type: inputOptions.laminateMaterial[0],
            info: [''],
        },
        embossing: {
            type: inputOptions.embossingTypes[0],
            info: [''],
        },
        stampCut: {
            info: [''],
        },
    },
})(PassportForm);

export default DecoratedPassportForm;