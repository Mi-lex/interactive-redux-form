import React from 'react'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'
import Grid from '@material-ui/core/Grid'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import { RootState } from '../store/rootReducer'
import Details from './Details'
import ElementsTable from './ElementsTable'
import InitialInfo from './InitialInfo'
import PaperJoinerForm from './PaperJoinerForm'
import PassportSidebar from './PassportSidebar'
import PostPrintForm from './PostprintForm'

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			'& > *': {
				marginBottom: theme.spacing(1),
			},
		},
		mainColumns: {
			padding: theme.spacing(2),
		},
	}),
)

const PassportForm: React.FC = () => {
	const classes = useStyles()

	return (
		<form action="POST" className="passportForm">
			<Grid container spacing={3} className={classes.mainColumns}>
				{/* Sidebar */}
				<PassportSidebar />
				{/* Initial info packaging */}
				<InitialInfo />
			</Grid>
			<Grid spacing={3} container className={classes.mainColumns}>
				<Grid item md={3} />
				<Grid item xs={12} md={9} spacing={2} container>
					<ElementsTable />
					<PaperJoinerForm />
					<PostPrintForm />
				</Grid>
			</Grid>
		</form>
	)
}

const Decorated = reduxForm({
	form: 'passport',
	enableReinitialize: true,
})(PassportForm)

const Connected = connect((state: RootState) => ({
	initialValues: state.passport.fetch.fetched || {
		payment: {
			payed_by_cash: false,
		},
		elements: [{}, {}],
	},
}))(Decorated)

export default Connected
