import React from 'react'
import { Box, IconButton } from '@material-ui/core'
import { makeStyles, Theme } from '@material-ui/core/styles'
import NoteAdd from '@material-ui/icons/NoteAdd'
import LibraryAdd from '@material-ui/icons/LibraryAdd'
import DoneAll from '@material-ui/icons/DoneAll'
import Print from '@material-ui/icons/Print'

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        borderBottom: `1px solid ${theme.palette.primary.main}`,
    },
}))

const PassportControl: React.FC = () => {
    const classes = useStyles()

    return (
        <Box display="flex" className={classes.container} justifyContent="flex-end" alignItems="center" mb={2} py={1}>
            <IconButton size="medium" aria-label="добавить документ" color="primary" style={{ marginRight: 'auto' }}>
                <NoteAdd fontSize="large" />
            </IconButton>

            <IconButton size="medium" aria-label="добавить документ" color="primary">
                <LibraryAdd fontSize="large" />
            </IconButton>
            <IconButton size="medium" aria-label="завершить заполнение" color="primary">
                <DoneAll fontSize="large" />
            </IconButton>
            <IconButton size="medium" aria-label="печать" color="primary">
                <Print fontSize="large" />
            </IconButton>
        </Box>
    )
}

export default PassportControl
