import { Data } from './data'
import React from 'react'
import { mount } from 'enzyme'
import OrderTable from './OrderTable'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'

const mockStore = configureStore([])

describe('order table', () => {
	// snapshot test
	it('renders order table correctly', () => {
		const mockedData: Data = [
			{
				id: 1,
				name: 'name',
				type: 'note',
				completionDate: '11.09.19',
				createdAt: '10.09.19',
				customerName: 'client',
				managerSecondName: 'Ivanov',
				paymentOrgType: 'cash',
			},
		]

		// Page header inside of order table component uses
		// redux store values
		const headerStore = mockStore()

		const WrappedOrderTable = mount(
			<Provider store={headerStore}>
				<BrowserRouter>
					<OrderTable data={mockedData} pending={false} />,
				</BrowserRouter>
			</Provider>,
		)

		expect(WrappedOrderTable).toMatchSnapshot()
	})
})
