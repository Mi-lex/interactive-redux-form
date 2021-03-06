import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useParams } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import LinearProgress from '@material-ui/core/LinearProgress'
import Paper from '@material-ui/core/Paper'

import { useFlashMessage } from '../components/FlashMessage'
import PageHeader from '../components/PageHeader'
import PassportControl from '../components/PassportControl'
import PassportForm from '../components/PassportForm'
import actionCreator from '../store/modules/passport/actions'
import { RootState } from '../store/rootReducer'

const Passport: React.FC = () => {
	const dispatch = useDispatch()
	const { create, update, fetch } = useSelector(
		(state: RootState) => state.passport,
	)
	const { id } = useParams()
	const flash = useFlashMessage()

	const requestPending = create.pending || update.pending || fetch.pending

	useEffect(() => {
		if (id) {
			dispatch(actionCreator.fetchOrderRequest(id))
		} else {
			// this is also kind of cleanup
			dispatch(actionCreator.fetchOrderSuccess({}))
		}

		return () => {
			dispatch(actionCreator.passportCleanUp())
		}
	}, [id])

	useEffect(() => {
		const occurredError = create.error || fetch.error || update.error

		if (occurredError) {
			flash.show({
				message: occurredError,
				type: 'error',
			})
		}
	}, [fetch.error, update.error, create.error])

	const createNewPassport = (): void => {
		dispatch(actionCreator.createOrderRequest())
	}

	const updatePassport = (): void => {
		dispatch(actionCreator.updateOrderRequest())
	}

	return (
		<>
			<PageHeader>
				<PassportControl
					editMode={Boolean(id)}
					createNewPassport={createNewPassport}
					updatePassport={updatePassport}
				/>
			</PageHeader>
			{requestPending && <LinearProgress color="secondary" />}
			<Paper>
				{create.success && !id && (
					<Redirect to={`/passport/${fetch.fetched.id}`} />
				)}
				<PassportForm />
			</Paper>
		</>
	)
}

export default Passport
