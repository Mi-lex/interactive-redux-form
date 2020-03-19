import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Redirect, useParams } from 'react-router-dom'
import { InjectedFormProps, reduxForm } from 'redux-form'
import Container from '@material-ui/core/Container'
import LinearProgress from '@material-ui/core/LinearProgress'
import Paper from '@material-ui/core/Paper'

import { FlashMessageComponent } from '../components/FlashMessage'
import PassportControl from '../components/PassportControl'
import PassportForm from '../components/PassportForm'
import actionCreator from '../store/modules/passport/actions'
import { RootState } from '../store/rootReducer'
import { Order } from '../store/types'
import PageHeader from '../components/PageHeader'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'

type PassportProps = InjectedFormProps & {
    createOrderSuccess: boolean
    createOrderError: string
    updateOrderSuccess: boolean
    updateOrderError: boolean
    fetchOrderSuccess: boolean
    fetchOrderError: boolean
    requestPending: boolean
    initialValues: Order
}

const textStyle = '#5d80b6'
const greyLabels = '#caccce'

const theme = createMuiTheme({
    overrides: {
        MuiFormControlLabel: {
            root: {
                textTransform: 'lowercase',
            },
        },
        MuiFormLabel: {
            root: {
                textTransform: 'lowercase',
            },
            filled: {
                color: greyLabels,
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

const Passport = (props: PassportProps) => {
    const {
        initialValues,
        createOrderSuccess,
        createOrderError,
        requestPending,
        // updateOrderSuccess,
        // updateOrderError,
        // fetchOrderSuccess,
        fetchOrderError,
    } = props

    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(() => {
        if (id) {
            dispatch(actionCreator.fetchOrderRequest(id))
        } else {
            dispatch(actionCreator.fetchOrderSuccess(null))
        }

        return () => {
            dispatch(actionCreator.createCleanUp())
        }
    }, [id])

    const createNewPassport = (): void => {
        dispatch(actionCreator.createOrderRequest())
    }

    const updatePassport = (): void => {
        dispatch(actionCreator.updateOrderRequest())
    }

    const onCloseErrorMessage = () => {
        dispatch(actionCreator.createOrderError(null))
    }

    return (
        <ThemeProvider theme={theme}>
            <PageHeader>
                <PassportControl
                    editMode={Boolean(id)}
                    createNewPassport={createNewPassport}
                    updatePassport={updatePassport}
                />
            </PageHeader>
            {requestPending && <LinearProgress color="secondary" />}
            <Paper elevation={0}>
                {createOrderSuccess && !id && <Redirect to={`/passport/${initialValues.id}`} />}
                {/* {successMessage && <FlashMessageComponent type="success">{successMessage}</FlashMessageComponent>} */}
                {(createOrderError || fetchOrderError) && (
                    <FlashMessageComponent type="error" onClose={onCloseErrorMessage}>
                        {createOrderError || 'Что-то пошло не так'}
                    </FlashMessageComponent>
                )}
                <Container style={{ paddingTop: 10 }}>
                    <form action="POST" className="passportForm">
                        <PassportForm />
                    </form>
                </Container>
            </Paper>
        </ThemeProvider>
    )
}

const Decorated = reduxForm({
    form: 'passport',
    enableReinitialize: true,
})(Passport)

const Connected = connect((state: RootState) => {
    const { success: createOrderSuccess, error: createOrderError, pending: createOrderPending } = state.passport.create
    const { success: updateOrderSuccess, error: updateOrderError, pending: updateOrderPending } = state.passport.update
    const {
        success: fetchOrderSuccess,
        error: fetchOrderError,
        pending: fetchOrderPending,
        fetched,
    } = state.passport.fetch

    return {
        initialValues: fetched || {
            payment: {
                payed_by_cash: false,
            },
            elements: [{}, {}],
        },
        createOrderSuccess,
        createOrderError,
        updateOrderSuccess,
        updateOrderError,
        fetchOrderSuccess,
        fetchOrderError,
        requestPending: createOrderPending || updateOrderPending || fetchOrderPending,
    }
})(Decorated)

export default Connected
