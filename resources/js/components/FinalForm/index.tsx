import React from 'react';
import AfterPrintSubform from './components/AfterPrintSubform';
import PaperJoinerForm from './components/PaperJoinerForm';
import Grid from '@material-ui/core/Grid';

const FinalForm: React.FC = () => {
    return (
        <Grid container className="row" spacing={6}>
            <Grid item xs={12} md={4}>
                <PaperJoinerForm />
            </Grid>
            <Grid item xs={12} md={8}>
                <AfterPrintSubform />
            </Grid>
        </Grid>
    );
};

export default FinalForm;
