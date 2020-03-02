import React, { useEffect } from 'react'
import { RootState } from '../store/rootReducer'
import actionCreator from '../store/modules/passport/actions'
import { useDispatch, useSelector } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import { reduxForm, change } from 'redux-form'
import PassportControl from '../components/PassportControl'
import PassportForm from '../components/PassportForm'
import { useFlashMessage } from '../components/FlashMessage'
import LinearProgress from '@material-ui/core/LinearProgress'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'

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
    const dispatch = useDispatch()
    const pending = useSelector((state: RootState) => state.passport.requestPending)
    const currentOrder = useSelector((state: RootState) => state.passport.currentOrder)
    const flashMessage = useFlashMessage()

    const createNewPassport = (): void => {
        if (currentOrder) {
            flashMessage.show({
                message: 'Завершите работу с текущим паспортом',
                type: 'error',
            })
            return
        }
        dispatch(actionCreator.createOrderRequest())
    }

    useEffect(() => {
        console.log(currentOrder)

        if (currentOrder) {
            dispatch(change('passport', 'order.id', currentOrder.id))
            dispatch(change('passport', 'order.created_at', currentOrder.created_at))

            flashMessage.show({
                message: 'Создан новый паспорт',
                type: 'success',
            })
        }
    }, [currentOrder])

    return (
        <ThemeProvider theme={theme}>
            <Paper>
                <Container>
                    <form action="POST" className="passportForm">
                        {pending && <LinearProgress color="secondary" />}
                        <PassportControl createNewPassport={createNewPassport} />
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
        // order: {
        //     id: 63590,
        //     created_at: new Date().getTime(),
        // },
        order_elements: [{}, {}],
    },
})(Passport)

export default DecoratedPassportForm
