import React from 'react'
import { Provider } from 'react-redux'
import { render, fireEvent } from '@testing-library/react'
import configureStore from '../../store/configureStore'
import { reduxForm } from 'redux-form'
import ElementsTable from './ElementsTable'

describe('order elements table', () => {
	const store = configureStore()
	let Elements: JSX.Element

	beforeEach(() => {
		const WrappedElementsTable = reduxForm({
			form: 'test',
		})(ElementsTable)

		Elements = (
			<Provider store={store}>
				<WrappedElementsTable />
			</Provider>
		)
	})

	const elementsTableLegend = 'Добавить элементы заказа'

	it('shows action text when there is no element yet added', () => {
		const { getByText } = render(Elements)
		getByText(elementsTableLegend)
	})

	it('removes action text when user adds elements', async () => {
		const { getByLabelText, queryByText } = render(Elements)
		const addBtn = getByLabelText('добавить елемент')

		fireEvent.click(addBtn)

		expect(queryByText(elementsTableLegend)).not.toBeInTheDocument()
	})
})
