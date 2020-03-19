import React from 'react'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles, Theme } from '@material-ui/core/styles'
import DoneAll from '@material-ui/icons/DoneAll'
import LibraryAdd from '@material-ui/icons/LibraryAdd'
import NoteAdd from '@material-ui/icons/NoteAdd'
import Print from '@material-ui/icons/Print'

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        borderBottom: `1px solid ${theme.palette.primary.main}`,
    },
}))

type Props = {
    createNewPassport: () => void
    updatePassport: () => void
    editMode: boolean
}

const PassportControl: React.FC<Props> = (props: Props) => {
    const { createNewPassport, updatePassport, editMode } = props
    const classes = useStyles()

    return (
        <Box display="flex" className={classes.container} justifyContent="flex-end" alignItems="center">
            {!editMode && (
                <IconButton
                    size="medium"
                    aria-label="добавить документ"
                    color="inherit"
                    onClick={createNewPassport}
                    style={{ marginRight: 'auto' }}
                >
                    <NoteAdd fontSize="large" />
                </IconButton>
            )}

            {editMode && (
                <>
                    <IconButton size="medium" aria-label="обновить документ" color="inherit">
                        <LibraryAdd fontSize="large" />
                    </IconButton>
                    <IconButton
                        size="medium"
                        aria-label="завершить заполнение"
                        color="inherit"
                        onClick={updatePassport}
                    >
                        <DoneAll fontSize="large" />
                    </IconButton>
                </>
            )}
            <IconButton size="medium" aria-label="печать" color="inherit">
                <Print fontSize="large" />
            </IconButton>
        </Box>
    )
}

export default PassportControl
