import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import format from 'date-fns/format'

import { FlashMessageComponent } from '../components/FlashMessage'
import OrderTable from '../components/OrderTable/OrderTable'
import actionCreator from '../store/modules/order/actions'
import { RootState } from '../store/rootReducer'
import { Paper } from '@material-ui/core'

const Orders = () => {
	const orders = useSelector((state: RootState) => state.order.list)
	const pending = useSelector((state: RootState) => state.order.pending)
	const errorMessage = useSelector((state: RootState) => state.order.error)

	const dispatch = useDispatch()

	const data = orders.map((order) => {
		const { id, name = '', type = '', manager, customer } = order

		return {
			id,
			name,
			type,
			createdAt: format(new Date(order.created_at), 'dd.MM.yy'),
			completionDate: order.completion_date
				? format(new Date(order.completion_date), 'dd.MM.yy')
				: '-',
			managerSecondName: manager ? manager.second_name : 'отсутствует',
			customerName: customer ? customer.name : 'отсутстсует',
			paymentOrgType:
				order.payment && !order.payment.payed_by_cash
					? order.payment.operation!.organization.name
					: 'наличные',
		}
	})

	useEffect(() => {
		dispatch(actionCreator.fetchOrdersRequest())

		return () => {
			dispatch(actionCreator.fetchOrdersError(''))
		}
	}, [])

	return (
		<>
			{errorMessage && (
				<FlashMessageComponent type="error">
					{errorMessage}
				</FlashMessageComponent>
			)}
			<Paper>
				<OrderTable data={data} pending={pending} />
			</Paper>
		</>
	)
}

export default Orders
