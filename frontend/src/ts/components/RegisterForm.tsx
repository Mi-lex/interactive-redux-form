import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Button, Grid, Link, TextField } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import { Field } from 'redux-form'

import AuthFormWrapper from './AuthFormWrapper'
import SideBackgroundWrapper from './SideBackgroundWrapper'

const useStyles = makeStyles((theme: Theme) => ({
	form: {
		width: '100%',
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}))

const RegisterForm = () => {
	const classes = useStyles()

	return (
		<SideBackgroundWrapper>
			<AuthFormWrapper title="Регистрация">
				<form className={classes.form}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<Field
								component={TextField}
								variant="outlined"
								fullWidth
								id="firstName"
								label="Имя"
								name="firstName"
								autoFocus
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Field
								component={TextField}
								variant="outlined"
								fullWidth
								id="lastName"
								label="Фамилия"
								name="lastName"
							/>
						</Grid>
						<Grid item xs={12}>
							<Field
								component={TextField}
								variant="outlined"
								fullWidth
								id="middleName"
								label="Отчество"
								name="middleName"
							/>
						</Grid>
						<Grid item xs={12}>
							<Field
								component={TextField}
								variant="outlined"
								fullWidth
								id="email"
								label="Email адрес"
								name="email"
								autoComplete="email"
							/>
						</Grid>
						<Grid item xs={12}>
							<Field
								component={TextField}
								variant="outlined"
								fullWidth
								name="password"
								label="Пароль"
								type="password"
								id="password"
								autoComplete="current-password"
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Зарегистрироваться
					</Button>
					<Grid container justify="flex-end">
						<Grid item>
							<Link component={RouterLink} to="/login" variant="body2">
								Уже есть аккаунт ? Войти
							</Link>
						</Grid>
					</Grid>
				</form>
			</AuthFormWrapper>
		</SideBackgroundWrapper>
	)
}

export default RegisterForm
