import React from 'react';
import { reduxForm } from 'redux-form';
import { inputOptions } from '../store/data';
import { Grid } from '@material-ui/core';
import PassportSidebar from './PassportSidebar';

const PassportForm = (): JSX.Element => {
    return (
        <Grid container>
            {/* Sidebar */}
            <PassportSidebar />
            {/* Initial */}
            <Grid item container xs={12} sm={6} md={10}>
                {/* Initial info packaging */}
                <Grid item container xs={12} sm={6}>
                    <Grid item xs={12} sm={6}></Grid>
                    <Grid item xs={12} sm={6}></Grid>
                </Grid>
                {/* Important info */}
                <Grid item xs={12} sm={6}></Grid>
                {/* Making Details */}
                <Grid item container xs={12} sm={6} md={10}></Grid>
            </Grid>
        </Grid>
    );
};

const DecoratedPassportForm = reduxForm({
    form: 'passport',

    initialValues: {
        orders: Array(3).fill({}),

        revanish: {
            type: inputOptions.varnishMaterial[0],

            info: [''],
        },

        hotStamp: {
            label: inputOptions.hotStampLabels[0],

            info: [''],
        },

        laminate: {
            type: inputOptions.laminateMaterial[0],

            info: [''],
        },

        embossing: {
            type: inputOptions.embossingTypes[0],

            info: [''],
        },

        stampCut: {
            info: [''],
        },
    },
})(PassportForm);

export default DecoratedPassportForm;
