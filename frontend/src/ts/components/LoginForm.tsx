import React from 'react'
import { Field } from 'redux-form'
import { Link as RouterLink } from 'react-router-dom'
import { Button, FormControlLabel, Grid, Link } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'

import AuthFormWrapper from './AuthFormWrapper'
import { Checkbox, TextField } from './MaterialReduxForm'
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

const LoginForm = () => {
	const classes = useStyles()

	return (
		<SideBackgroundWrapper>
			<AuthFormWrapper title="Вход">
				<form className={classes.form} noValidate>
					<Field
						component={TextField}
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email адрес"
						name="email"
						autoComplete="email"
						autoFocus
					/>
					<Field
						component={TextField}
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="пароль"
						type="password"
						id="password"
						autoComplete="current-password"
					/>

					<FormControlLabel
						control={
							<Field component={Checkbox} color="primary" name="remember" />
						}
						label="Запомнить меня"
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Вход
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href="#" variant="body2">
								Забыли пароль ?
							</Link>
						</Grid>
						<Grid item>
							<Link component={RouterLink} to="/register" variant="body2">
								Регистрация
							</Link>
						</Grid>
					</Grid>
				</form>
			</AuthFormWrapper>
		</SideBackgroundWrapper>
	)
}

export default LoginForm
