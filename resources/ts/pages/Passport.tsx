import React, { useEffect } from 'react'
import { RootState } from '../store/rootReducer'
import actionCreator from '../store/modules/passport/actions'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import { reduxForm, change } from 'redux-form'
import PassportControl from '../components/PassportControl'
import PassportForm from '../components/PassportForm'
import { useFlashMessage } from '../components/FlashMessage'
import LinearProgress from '@material-ui/core/LinearProgress'

const Passport = (): JSX.Element => {
    const dispatch = useDispatch()
    const { requestPending: pending, requestSuccess: success, errorMessage, currentOrder } = useSelector(
        (state: RootState) => state.passport,
        shallowEqual,
    )

    const flashMessage = useFlashMessage()

    const createNewPassport = (): void => {
        if (currentOrder) {
            flashMessage.show({
                message: 'Завершите работу с текущим паспортом',
                type: 'warning',
            })
            return
        }
        dispatch(actionCreator.createOrderRequest())
    }

    if (success && currentOrder) {
        dispatch(change('passport', 'order.id', currentOrder.id))
        dispatch(change('passport', 'order.created_at', currentOrder.created_at))

        flashMessage.show({
            message: 'Создан новый паспорт',
            type: 'success',
        })
    }

    if (errorMessage) {
        flashMessage.show({
            message: errorMessage,
            type: 'error',
        })
    }

    useEffect(() => {
        return () => {
            dispatch(actionCreator.createOrderError(null))
            dispatch(actionCreator.createOrderSuccess(null))
        }
    }, [])

    return (
        <Paper>
            {pending && <LinearProgress color="secondary" />}
            <Container>
                <form action="POST" className="passportForm">
                    <PassportControl createNewPassport={createNewPassport} />
                    <PassportForm />
                </form>
            </Container>
        </Paper>
    )
}

const DecoratedPassportForm = reduxForm({
    form: 'passport',

    initialValues: {
        order_elements: [{}, {}],
    },
})(Passport)

export default DecoratedPassportForm
