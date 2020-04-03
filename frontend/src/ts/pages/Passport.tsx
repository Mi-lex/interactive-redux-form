import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import { Redirect, useParams } from 'react-router-dom'
import { InjectedFormProps, reduxForm } from 'redux-form'
import Container from '@material-ui/core/Container'
import LinearProgress from '@material-ui/core/LinearProgress'
import Paper from '@material-ui/core/Paper'

import PassportControl from '../components/PassportControl'
import PassportForm from '../components/PassportForm'
import actionCreator from '../store/modules/passport/actions'
import { RootState } from '../store/rootReducer'
import { Order } from '../store/types'
import PageHeader from '../components/PageHeader'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

import { useFlashMessage } from '../components/FlashMessage'

type FormProps = {
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
const anotherGrey = '#98999b'

const theme = createMuiTheme({
	overrides: {
		MuiFormControlLabel: {
			root: {
				textTransform: 'lowercase',
				color: anotherGrey,
			},
		},
		MuiFormLabel: {
			root: {
				textTransform: 'lowercase',
				color: anotherGrey,
				'&.$Mui-disabled': {
					color: anotherGrey,
				},
				'& + .MuiInput-underline:before': {
					borderBottomStyle: 'dotted',
				},
			},
			filled: {
				color: greyLabels,
				'& + .MuiInput-underline:before': {
					display: 'none',
				},
			},
		},
		MuiInput: {
			root: {
				color: textStyle,
				'&.$Mui-disabled': {
					color: textStyle,
				},
				'& .MuiIconButton-root': {
					color: anotherGrey,
				},
			},
		},
		MuiInputBase: {
			root: {
				color: textStyle,
			},
		},
		MuiCheckbox: {
			root: {
				color: anotherGrey,
			},
		},
	},
})

type Injected = InjectedFormProps<FormProps>

const Passport: React.FC<FormProps & InjectedFormProps<{}, FormProps>> = (
	props: FormProps,
) => {
	const {
		initialValues,
		createOrderSuccess,
		createOrderError,
		requestPending,
		// updateOrderSuccess,
		updateOrderError,
		fetchOrderError,
	} = props

	const dispatch = useDispatch()
	const { id } = useParams()

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
		if (createOrderError) {
			flash.show({
				message: createOrderError,
				type: 'error',
				onClose: onCloseErrorMessage,
			})
		}
	}, [createOrderError])

	useEffect(() => {
		if (fetchOrderError || updateOrderError) {
			const message = updateOrderError
				? createOrderError
				: 'Что-то пошло не так'

			flash.show({
				message,
				type: 'error',
				onClose: onCloseErrorMessage,
			})
		}
	}, [fetchOrderError, updateOrderError])

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
				{createOrderSuccess && !id && (
					<Redirect to={`/passport/${initialValues.id}`} />
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

const Decorated = reduxForm<{}, FormProps>({
	form: 'passport',
	enableReinitialize: true,
})(Passport)

const Connected = connect((state: RootState) => {
	const create = state.passport.create
	const update = state.passport.update
	const fetch = state.passport.fetch

	return {
		initialValues: fetch.fetched || {
			payment: {
				payed_by_cash: false,
			},
			elements: [{}, {}],
		},
		createOrderSuccess: create.success,
		createOrderError: create.error,
		updateOrderSuccess: update.success,
		updateOrderError: update.error,
		fetchOrderError: fetch.error,
		requestPending: create.pending || update.pending || fetch.pending,
	}
	// @ts-ignore
})(Decorated)

export default Connected
