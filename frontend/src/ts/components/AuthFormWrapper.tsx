import React from 'react'
import { Typography, Avatar, Box } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Copyright from './Copyright'

const useStyles = makeStyles((theme: Theme) => ({
	paper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		backgroundColor: theme.palette.secondary.main,
	},
}))

type AuthWrapperProps = {
	title?: 'Вход' | 'Регистрация'
	marginY?: number
	marginX?: number
}

const AuthFormWrapper: React.FC<AuthWrapperProps> = ({
	title,
	children,
	marginY = 8,
	marginX = 4,
}) => {
	const classes = useStyles()

	return (
		<Box component="div" className={classes.paper} my={marginY} mx={marginX}>
			<Avatar className={classes.avatar}>
				<LockOutlinedIcon />
			</Avatar>
			{title && (
				<Typography component="h1" variant="h5">
					{title}
				</Typography>
			)}
			{children}
			<Box mt={5}>
				<Copyright />
			</Box>
		</Box>
	)
}

export default AuthFormWrapper
