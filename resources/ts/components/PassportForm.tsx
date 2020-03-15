import React  from 'react'
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

const PassportForm = (): JSX.Element => {
    const classes = useStyles()

    return (
        <Grid container spacing={2}>
            {/* Sidebar */}
            <PassportSidebar />
            {/* Initial */}
            <Grid item container xs={12} sm={6} md={10} justify="space-between" className={classes.root}>
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
    )
}

export default PassportForm
