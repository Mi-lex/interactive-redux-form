import React, { useEffect } from 'react'
import { Order } from '../store/types'
import { useParams, Redirect } from 'react-router-dom'
import { RootState } from '../store/rootReducer'
import actionCreator from '../store/modules/passport/actions'
import { useDispatch, connect } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import { reduxForm, InjectedFormProps } from 'redux-form'
import PassportControl from '../components/PassportControl'
import PassportForm from '../components/PassportForm'
import { FlashMessageComponent } from '../components/FlashMessage'
import LinearProgress from '@material-ui/core/LinearProgress'

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

const Passport = (props: PassportProps) => {
    const {
        initialValues,
        createOrderSuccess,
        createOrderError,
        requestPending,
        updateOrderSuccess,
        updateOrderError,
        fetchOrderSuccess,
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
        <Paper>
            {createOrderSuccess && !id && <Redirect to={`/passport/${initialValues.id}`} />}
            {/* {successMessage && <FlashMessageComponent type="success">{successMessage}</FlashMessageComponent>} */}
            {createOrderError && (
                <FlashMessageComponent type="error" onClose={onCloseErrorMessage}>
                    {createOrderError}
                </FlashMessageComponent>
            )}
            {requestPending && <LinearProgress color="secondary" />}
            <Container>
                <form action="POST" className="passportForm">
                    <PassportControl
                        editMode={Boolean(id)}
                        createNewPassport={createNewPassport}
                        updatePassport={updatePassport}
                    />
                    <PassportForm />
                </form>
            </Container>
        </Paper>
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
        fetched: initialValues,
    } = state.passport.fetch

    return {
        initialValues,
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
