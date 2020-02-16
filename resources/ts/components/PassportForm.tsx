import React from 'react'
import { Grid, TextField } from '@material-ui/core'
import PassportSidebar from './PassportSidebar'
import InitialInfo from './InitialInfo'

const PassportForm = (): JSX.Element => {
    return (
        <Grid container spacing={3}>
            {/* Sidebar */}
            <PassportSidebar />
            {/* Initial */}
            <Grid item container xs={12} sm={6} md={10} spacing={3} justify="space-between">
                {/* Initial info packaging */}
                <InitialInfo />
                {/* Important info */}
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth label="Важно" multiline rows="8" variant="outlined" />
                </Grid>
                {/* Making Details */}
                <Grid item container xs={12} sm={6} md={10}></Grid>
            </Grid>
        </Grid>
    )
}

export default PassportForm
