import React from 'react'
import { Field } from 'redux-form'
import { Divider, Grid } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import { TextField } from './MaterialReduxForm'
import PaymentBlock from './PaymentBlock'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			'& > *': {
				marginBottom: theme.spacing(2),
			},
		},
		divider: {
			marginTop: theme.spacing(2),
			marginBottom: theme.spacing(2),
		},
		formControl: {
			minWidth: '100%',
		},
	}),
)

const PassportSidebar: React.FC = () => {
	const classes = useStyles()
	const variant = 'standard'

	return (
		<Grid item xs={12} sm={6} md={3} className={classes.root}>
			<Field
				component={TextField}
				name="customer.name"
				fullWidth
				variant={variant}
				label="Клиент"
			/>
			<Field
				component={TextField}
				name="type"
				fullWidth
				variant={variant}
				label="Тип"
			/>
			<Field
				component={TextField}
				name="name"
				multiline
				fullWidth
				variant={variant}
				label="Название"
			/>
			<Divider variant="fullWidth" className={classes.divider} />
			<PaymentBlock />
		</Grid>
	)
}

export default PassportSidebar
