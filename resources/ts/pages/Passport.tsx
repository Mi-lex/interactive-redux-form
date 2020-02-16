import React from 'react'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import { reduxForm } from 'redux-form'
import { inputOptions } from '../store/data'
import PassportControl from '../components/PassportControl'
import PassportForm from '../components/PassportForm'

const Passport = (): JSX.Element => {
    return (
        <Paper>
            <Container>
                <form action="POST" className="passportForm">
                    <PassportControl />
                    <PassportForm />
                </form>
            </Container>
        </Paper>
    )
}

const DecoratedPassportForm = reduxForm({
    form: 'passport',

    initialValues: {
        orderId: '63590',
        orders: Array(3).fill({}),
        orderDate: new Date().getTime(),

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
})(Passport)

export default DecoratedPassportForm
