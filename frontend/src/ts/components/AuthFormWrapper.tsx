import React from 'react'
import { Typography, Avatar, Box } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Copyright from './Copyright'

const useStyles = makeStyles((theme: Theme) => ({
	paper: {
		margin: theme.spacing(8, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
}))

type AuthWrapperProps = {
	title?: 'Вход' | 'Регистрация'
}

const AuthFormWrapper: React.FC<AuthWrapperProps> = ({ title, children }) => {
	const classes = useStyles()

	return (
		<div className={classes.paper}>
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
		</div>
	)
}

export default AuthFormWrapper
