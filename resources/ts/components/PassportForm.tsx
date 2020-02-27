import React from 'react'
import { useSelector } from 'react-redux'
import { formValueSelector } from 'redux-form'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import InitialInfo from './InitialInfo'
import PassportSidebar from './PassportSidebar'
import ElementsTable from './ElementsTable'
import PaperJoinerForm from './PaperJoinerForm'
import PostPrintForm from './PostprintForm'
import Details from './Details'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            '& > *': {
                marginBottom: theme.spacing(1),
            },
        },
    }),
)

const selector: Function = formValueSelector('passport')

const PassportForm = (): JSX.Element => {
    const { requiredDelivery, paymentCash } = useSelector(state => ({
        requiredDelivery: selector(state, 'delivery.should_be_delivered'),
        paymentCash: selector(state, 'payment.payed_by_cash'),
    }))

    const classes = useStyles()

    return (
        <Grid container spacing={2}>
            {/* Sidebar */}
            <PassportSidebar paymentCash={paymentCash} />
            {/* Initial */}
            <Grid item container xs={12} sm={6} md={10} justify="space-between" className={classes.root}>
                {/* Initial info packaging */}
                <InitialInfo requiredDelivery={requiredDelivery} />
                {/* Details */}
                <Details />
                {/* Elements */}
                <ElementsTable />
                {/* FinalForm (Lower one) */}
                <PaperJoinerForm />
                <PostPrintForm />
            </Grid>
        </Grid>
    )
}

export default PassportForm
