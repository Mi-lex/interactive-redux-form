import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useParams } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import LinearProgress from '@material-ui/core/LinearProgress'
import Paper from '@material-ui/core/Paper'
import { ThemeProvider } from '@material-ui/core/styles'

import { useFlashMessage } from '../components/FlashMessage'
import PageHeader from '../components/PageHeader'
import PassportControl from '../components/PassportControl'
import PassportForm from '../components/PassportForm'
import actionCreator from '../store/modules/passport/actions'
import { RootState } from '../store/rootReducer'
import passportTheme from '../themes/passportTheme'

const Passport: React.FC = () => {
	const { create, update, fetch } = useSelector(
		(state: RootState) => state.passport,
	)
	const requestPending = create.pending || update.pending || fetch.pending

	const { id } = useParams()
	const dispatch = useDispatch()

	const flash = useFlashMessage()

	useEffect(() => {
		if (id) {
			dispatch(actionCreator.fetchOrderRequest(id))
		} else {
			// this is also kind of cleanup
			dispatch(actionCreator.fetchOrderSuccess({}))
		}

		return () => {
			dispatch(actionCreator.createCleanUp())
		}
	}, [id])

	useEffect(() => {
		if (create.error) {
			flash.show({
				message: create.error,
				type: 'error',
				onClose: onCloseErrorMessage,
			})
		}
	}, [create.error])

	useEffect(() => {
		if (fetch.error || update.error) {
			flash.show({
				message: create.error || 'Что-то пошло не так',
				type: 'error',
				onClose: onCloseErrorMessage,
			})
		}
	}, [fetch.error, update.error])

	const createNewPassport = (): void => {
		dispatch(actionCreator.createOrderRequest())
	}

	const updatePassport = (): void => {
		dispatch(actionCreator.updateOrderRequest())
	}

	const onCloseErrorMessage = () => {
		dispatch(actionCreator.createOrderError(''))
	}

	return (
		<ThemeProvider theme={passportTheme}>
			<PageHeader>
				<PassportControl
					editMode={Boolean(id)}
					createNewPassport={createNewPassport}
					updatePassport={updatePassport}
				/>
			</PageHeader>
			{requestPending && <LinearProgress color="secondary" />}
			<Paper elevation={0}>
				{create.success && !id && (
					<Redirect to={`/passport/${fetch.fetched.id}`} />
				)}
				<Container style={{ paddingTop: 10 }}>
					<PassportForm />
				</Container>
			</Paper>
		</ThemeProvider>
	)
}

export default Passport
