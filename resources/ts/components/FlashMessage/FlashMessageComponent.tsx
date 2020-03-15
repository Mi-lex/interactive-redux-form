import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'
import React, { useState } from 'react'

import { FlashMessageProviderProps, MessageOptions } from './types'

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

type Props = FlashMessageProviderProps & MessageOptions & { open?: boolean; handleClose?: () => void }

const FlashMessageComponent: React.FC<Props> = (props: Props) => {
    const [open, setOpen] = useState(true)

    const { SnackProps, BtnProps, actionName, handleAction, onClose = () => {}, type = 'info', children } = props

    React.useEffect(() => {
        if (props.open !== undefined) {
            setOpen(props.open)
        }
    }, [props.open])

    const handleActionClick = () => {
        handleClose()
        handleAction()
    }

    const handleClose =
        props.handleClose !== undefined
            ? props.handleClose
            : () => {
                  setOpen(false)
                  onClose()
              }

    return (
        <Snackbar
            autoHideDuration={5000}
            {...SnackProps}
            open={open}
            action={
                actionName != null && (
                    <Button color="primary" size="small" {...BtnProps} onClick={handleActionClick}>
                        {actionName}
                    </Button>
                )
            }
            onClose={handleClose}
        >
            <Alert severity={type} onClose={handleClose}>
                {children || ''}
            </Alert>
        </Snackbar>
    )
}

export default FlashMessageComponent
