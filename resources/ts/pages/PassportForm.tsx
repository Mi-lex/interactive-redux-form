import React from 'react'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import PassportControl from '../components/PassportControl'
import InitialForm from '../components/InitialForm'
import OrderElementsForm from '../components/OrderElementsTable'
import FinalForm from '../components/FinalForm'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

const theme = createMuiTheme({
    spacing: 6,
})

theme.spacing(2)

const PassportForm = (): JSX.Element => {
    return (
        <ThemeProvider theme={theme}>
            <Paper>
                <Container>
                    <form action="POST" className="passportForm">
                        <PassportControl />

                        <InitialForm />

                        <OrderElementsForm />

                        <FinalForm />
                    </form>
                </Container>
            </Paper>
        </ThemeProvider>
    )
}

// const DecoratedPassportForm = reduxForm({
//     form: 'passport',

//     initialValues: {
//         orders: Array(3).fill({}),

//         revanish: {
//             type: inputOptions.varnishMaterial[0],

//             info: [''],
//         },

//         hotStamp: {
//             label: inputOptions.hotStampLabels[0],

//             info: [''],
//         },

//         laminate: {
//             type: inputOptions.laminateMaterial[0],

//             info: [''],
//         },

//         embossing: {
//             type: inputOptions.embossingTypes[0],

//             info: [''],
//         },

//         stampCut: {
//             info: [''],
//         },
//     },
// })(PassportForm);

export default PassportForm
