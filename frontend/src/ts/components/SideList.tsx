import React from 'react'
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DescriptionIcon from '@material-ui/icons/Description'
import Box from '@material-ui/core/Box'
import OrderIcon from '@material-ui/icons/ShoppingCart'
import CustomerIcon from '@material-ui/icons/People'
import BarChartIcon from '@material-ui/icons/BarChart'
import AssignmentIcon from '@material-ui/icons/Assignment'

type Props = {
	closeDrawer: () => void
}

const SideList: React.FC<Props> = ({ closeDrawer }) => {
	const menuLinkItems = [
		{
			path: '/passport',
			name: 'Пасспорт',
			IconComponent: <DescriptionIcon />,
		},
		{
			path: '/',
			name: 'Заказы',
			IconComponent: <OrderIcon />,
		},
		{
			path: '#',
			name: 'Клиенты',
			IconComponent: <CustomerIcon />,
		},
		{
			path: '#',
			name: 'Статистика',
			IconComponent: <BarChartIcon />,
		},
		{
			path: '#',
			name: 'Канбан доска',
			IconComponent: <AssignmentIcon />,
		},
	]

	return (
		<Box
			component={'div'}
			width={250}
			role="presentation"
			onClick={closeDrawer}
			onKeyDown={closeDrawer}
		>
			<List>
				{menuLinkItems.map(({ path, name, IconComponent }) => (
					<ListItem button component={Link} to={path} key={name}>
						<ListItemIcon>{IconComponent}</ListItemIcon>
						<ListItemText primary={name} />
					</ListItem>
				))}
			</List>
		</Box>
	)
}

export default SideList
