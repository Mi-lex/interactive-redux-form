import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { RootState } from '../store/rootReducer'
import actionCreator from '../store/modules/passport/actions'
import { useDispatch, useSelector, shallowEqual, connect } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import { reduxForm, formValueSelector, change } from 'redux-form'
import PassportControl from '../components/PassportControl'
import PassportForm from '../components/PassportForm'
import { FlashMessageComponent } from '../components/FlashMessage'
import LinearProgress from '@material-ui/core/LinearProgress'

const formSelector = formValueSelector('passport')

const Passport = (): JSX.Element => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const { requestPending: pending, successMessage, errorMessage } = useSelector(
        (state: RootState) => state.passport,
        shallowEqual,
    )

    useEffect(() => {
        if (id) {
          console.log('IMGOING CRAZY', id)  
        }

        return () => {
            dispatch(actionCreator.createOrderSuccess(null))
        }
    }, [])

    const createNewPassport = (): void => {
        if (successMessage) {
            dispatch(actionCreator.createOrderError('Завершите работу с текущим паспортом'))

            return
        }
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
            {successMessage && <FlashMessageComponent type="success">{successMessage}</FlashMessageComponent>}
            {errorMessage && (
                <FlashMessageComponent type="error" onClose={onCloseErrorMessage}>
                    {errorMessage}
                </FlashMessageComponent>
            )}
            {pending && <LinearProgress color="secondary" />}
            <Container>
                <form action="POST" className="passportForm">
                    <PassportControl createNewPassport={createNewPassport} updatePassport={updatePassport} />
                    <PassportForm />
                </form>
            </Container>
        </Paper>
    )
}

const DecoratedPassportForm = reduxForm({
    form: 'passport',

    initialValues: {
        elements: [{}, {}],
    },
})(Passport)

export default DecoratedPassportForm
