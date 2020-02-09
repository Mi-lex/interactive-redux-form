import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import FilterListIcon from '@material-ui/icons/FilterList';
import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';

const useToolbarStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(1),
        },
        highlight:
            theme.palette.type === 'light'
                ? {
                      color: theme.palette.secondary.main,
                      backgroundColor: lighten(theme.palette.secondary.light, 0.85),
                  }
                : {
                      color: theme.palette.text.primary,
                      backgroundColor: theme.palette.secondary.dark,
                  },
        title: {
            flex: '1 1 100%',
        },
    }),
);

export default function OrderTableToolbar() {
    const classes = useToolbarStyles();

    return (
        <Toolbar className={classes.root}>
            <Tooltip title="Фильтровать список">
                <IconButton aria-label="Фильтровать список">
                    <FilterListIcon />
                </IconButton>
            </Tooltip>
        </Toolbar>
    );
}
