import React, { FormEventHandler, FormEvent } from 'react'
import { Field, reduxForm, FormSubmitHandler } from 'redux-form'
import { Link as RouterLink } from 'react-router-dom'
import { Button, Grid, Link } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'

import { registerValidator } from '../helpers/validators'
import AuthFormWrapper from './AuthFormWrapper'
import { TextField } from './MaterialReduxForm'
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

type Props = {
	handleSubmit: () => void
}

const RegisterForm: React.FC<Props> = ({ handleSubmit }) => {
	const classes = useStyles()

	return (
		<SideBackgroundWrapper>
			<AuthFormWrapper title="Регистрация" marginY={1}>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<Field
								component={TextField}
								variant="outlined"
								fullWidth
								id="firstName"
								label="Имя"
								name="first_name"
								autoFocus
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Field
								component={TextField}
								variant="outlined"
								fullWidth
								id="secondName"
								label="Фамилия"
								name="second_name"
							/>
						</Grid>
						<Grid item xs={12}>
							<Field
								component={TextField}
								variant="outlined"
								fullWidth
								id="middleName"
								label="Отчество"
								name="middle_name"
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
						<Grid item xs={12}>
							<Field
								component={TextField}
								variant="outlined"
								fullWidth
								name="password_confirmation"
								label="Подтверждение"
								type="password"
								id="password_confirmation"
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
const Decorated = reduxForm({
	form: 'register',
	validate: registerValidator,
	// @ts-ignore
})(RegisterForm)

export default Decorated
