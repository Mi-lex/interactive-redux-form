import React from 'react'
import PostprintForm from './components/PostprintForm'
import PaperJoinerForm from './components/PaperJoinerForm'
import Grid from '@material-ui/core/Grid'

const FinalForm: React.FC = () => {
    return (
        <Grid container className="row" spacing={3}>
            <Grid item xs={12} md={4}>
                <PaperJoinerForm />
            </Grid>
            <Grid item xs={12} md={8}>
                <PostprintForm />
            </Grid>
        </Grid>
    )
}

export default FinalForm
