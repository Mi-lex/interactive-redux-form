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
	}),
)

const PassportForm: React.FC = () => {
	const classes = useStyles()

	return (
		<form action="POST" className="passportForm">
			<Grid container spacing={2}>
				{/* Sidebar */}
				<PassportSidebar />
				{/* Initial */}
				<Grid
					item
					container
					xs={12}
					sm={6}
					md={10}
					justify="space-between"
					className={classes.root}
				>
					{/* Initial info packaging */}
					<InitialInfo />
					{/* Details */}
					<Details />
					{/* Elements */}
					<ElementsTable />
					{/* FinalForm (Lower one) */}
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
