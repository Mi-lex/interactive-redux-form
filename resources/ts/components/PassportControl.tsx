import React from 'react'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
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

type Props = {
    createNewPassport: () => void
    updatePassport: () => void
}

const PassportControl: React.FC<Props> = (props: Props) => {
    const { createNewPassport, updatePassport } = props
    const classes = useStyles()

    return (
        <Box display="flex" className={classes.container} justifyContent="flex-end" alignItems="center" mb={2} py={1}>
            <IconButton
                size="medium"
                aria-label="добавить документ"
                color="primary"
                onClick={createNewPassport}
                style={{ marginRight: 'auto' }}
            >
                <NoteAdd fontSize="large" />
            </IconButton>

            <IconButton size="medium" aria-label="обновить документ" color="primary" onClick={updatePassport}>
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
