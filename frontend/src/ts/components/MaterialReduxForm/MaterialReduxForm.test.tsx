import React from 'react'
import Checkbox from './Checkbox'
import TextField from './TextField'
import { render, fireEvent } from '@testing-library/react'
import { reduxForm, Field, reducer as formReducer } from 'redux-form'
import { Provider } from 'react-redux'
import { Store, createStore, combineReducers } from 'redux'

interface TestInitialValues {
	[key: string]: any
}

const createReduxFormWrapper = (initialValues: TestInitialValues = {}) => {
	const store = createStore(
		combineReducers({
			form: formReducer,
		}),
	)

	const connector = reduxForm({
		form: 'test',
		initialValues,
	})

	const ReduxFormWrapper: React.FC = ({ children }) => {
		const EmptyComponent = () => <>{children}</>
		const WrappedEmptyComponent = connector(EmptyComponent)
		return (
			<Provider store={store}>
				<WrappedEmptyComponent />
			</Provider>
		)
	}

	return { store, ReduxFormWrapper }
}

describe('material ui wrappers for redux form Field component', () => {
	let store: Store
	let ReduxFormWrapper: React.FC

	beforeEach(() => {
		const createValueReduxFormValue = createReduxFormWrapper()
		ReduxFormWrapper = createValueReduxFormValue.ReduxFormWrapper
		store = createValueReduxFormValue.store
	})

	describe('checkbox wrapper', () => {
		const checkboxName = 'testCheckbox'
		let container: HTMLElement
		let checkbox: HTMLInputElement | null

		beforeEach(() => {
			container = render(
				<ReduxFormWrapper>
					<Field component={Checkbox} name={checkboxName} />
				</ReduxFormWrapper>,
			).container

			checkbox = container.querySelector(`[name="${checkboxName}"]`)
		})

		it('correctly renders checkbox', () => {
			expect(checkbox).toBeInTheDocument()
			expect(checkbox!.checked).toBe(false)
		})

		it('checkbox values reflects in the redux form state', () => {
			fireEvent.click(checkbox!)

			expect(checkbox!.checked).toBe(true)

			const checkBoxStateValue = store.getState().form.test.values[checkboxName]

			expect(checkBoxStateValue).toBe(true)
		})

		it('initialize with redux form initial value', () => {
			const initialValues = {
				[checkboxName]: true,
			}

			const WrapperWithValues = createReduxFormWrapper(initialValues)
				.ReduxFormWrapper

			const { container } = render(
				<WrapperWithValues>
					<Field component={Checkbox} name={checkboxName} />
				</WrapperWithValues>,
			)

			const checkbox: HTMLInputElement | null = container.querySelector(
				'[name="testCheckbox"]',
			)
			expect(checkbox!.checked).toBe(true)
		})
	})

	describe('text field wrapper', () => {
		const textFieldName = 'testTextField'
		let container: HTMLElement
		let textField: HTMLInputElement | null

		beforeEach(() => {
			container = render(
				<ReduxFormWrapper>
					<Field component={TextField} name={textFieldName} />
				</ReduxFormWrapper>,
			).container

			textField = container.querySelector(`[name="${textFieldName}"]`)
		})

		it('correctly renders text field', () => {
			expect(textField).toBeInTheDocument()
			expect(textField!.value).toBe('')
		})

		it('text field values reflects in the redux form state', () => {
			const testText = 'test text'
			fireEvent.change(textField!, { target: { value: testText } })

			expect(textField!.value).toBe(testText)

			const textFieldStateValue = store.getState().form.test.values[
				textFieldName
			]

			expect(textFieldStateValue).toBe(testText)
		})

		it('initialize with redux form initial value', () => {
			const initialTextValue = 'initial text'
			const initialValues = {
				[textFieldName]: initialTextValue,
			}

			const WrapperWithValues = createReduxFormWrapper(initialValues)
				.ReduxFormWrapper

			const { container } = render(
				<WrapperWithValues>
					<Field component={TextField} name="testTextField" />
				</WrapperWithValues>,
			)

			const textField: HTMLInputElement | null = container.querySelector(
				`[name="${textFieldName}"]`,
			)
			expect(textField!.value).toBe(initialTextValue)
		})
	})
})
