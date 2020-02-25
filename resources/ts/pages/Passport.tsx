import React from 'react'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import { reduxForm } from 'redux-form'
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
        order: {
            id: 63590,
            date: new Date().getTime(),
        },
        orders: Array(2).fill({}),
    },
})(Passport)

export default DecoratedPassportForm
