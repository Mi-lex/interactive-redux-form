import React from 'react';
import PassportBtn from './PassportBtn';
import Box from '@material-ui/core/Box';
import { makeStyles, Theme } from '@material-ui/core/styles';
// import Input from '@material-ui/core/Input';
// import TextareaAutosize from '@material-ui/core/TextareaAutosize';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        borderBottom: `1px solid ${theme.palette.primary.main}`,
    },
}));

const PassportControl: React.FC = () => {
    const classes = useStyles();

    return (
        <Box display="flex" className={classes.container} justifyContent="flex-end" alignItems="center" mb={2} py={2}>
            <PassportBtn size="md" style={{ marginRight: 'auto' }} iconName="createNewPassport" />
            {/* <Input placeholder="Важно" name="important" inputComponent={TextareaAutosize} /> */}
            <PassportBtn size="md" iconName="addPassport" />
            <PassportBtn size="md" iconName="approveForm" />
            <PassportBtn size="md" iconName="print" />
        </Box>
    );
};

export default PassportControl;
