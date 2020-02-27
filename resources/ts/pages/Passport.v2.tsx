import React from 'react'
import { reduxForm } from 'redux-form'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import blue from '@material-ui/core/colors/blue'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import PassportControl from '../components/PassportControl'
import PassportForm from '../components/PassportForm'

const textStyle = blue[700]

const theme = createMuiTheme({
    overrides: {
        MuiFormLabel: {
            filled: {
                color: textStyle,
            },
        },
        MuiInput: {
            root: {
                color: textStyle,
            },
        },
        MuiInputBase: {
            root: {
                color: textStyle,
            },
        },
    },
})

const Passport = (): JSX.Element => {
    return (
        <ThemeProvider theme={theme}>
            <Paper>
                <Container>
                    <form action="POST" className="passportForm">
                        <PassportControl />
                        <PassportForm />
                    </form>
                </Container>
            </Paper>
        </ThemeProvider>
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
