import React, { useEffect } from 'react'
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
    const { requestPending: pending, requestSuccess: success, errorMessage } = useSelector(
        (state: RootState) => state.passport,
        shallowEqual,
    )

    const createNewPassport = (): void => {
        if (success) {
            dispatch(actionCreator.createOrderError('Завершите работу с текущим паспортом'))

            return
        }
        dispatch(actionCreator.createOrderRequest())
    }

    const updatePassport = (): void => {
        const formValues = useSelector((state: RootState) => state.form.passport.values)
    }

    const onCloseErrorMessage = () => {
        dispatch(actionCreator.createOrderError(null))
    }

    return (
        <Paper>
            {success && <FlashMessageComponent type="success">Создан новый пасспорт</FlashMessageComponent>}
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
        order_elements: [{}, {}],
    },
})(Passport)

export default DecoratedPassportForm
