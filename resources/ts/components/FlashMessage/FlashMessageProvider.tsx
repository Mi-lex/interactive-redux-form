import React, { PureComponent } from 'react'
import Snackbar, { SnackbarProps as FlashMessageProps } from '@material-ui/core/Snackbar'
import Button from '@material-ui/core/Button'
import FlashMessageContext from './FlashMessageContext'
import { ButtonProps } from '@material-ui/core/Button'
import { FlashMessageProviderValue } from './FlashMessageContext'
import MuiAlert, { AlertProps, Color as AlertType } from '@material-ui/lab/Alert'

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

interface FlashMessageProviderProps {
    BtnProps?: Partial<ButtonProps>
    children: React.ReactNode
    FlashProps?: Partial<FlashMessageProps>
}

export interface MessageOptions {
    message: string
    type?: AlertType
    actionName?: string
    handleAction?: () => void
    onClose?: () => void
}

interface FlashMessageProviderState extends MessageOptions {
    open: boolean
}

export default class FlashMessageProvider extends PureComponent<FlashMessageProviderProps, FlashMessageProviderState> {
    contextValue: FlashMessageProviderValue

    constructor(props: FlashMessageProviderProps) {
        super(props)
        this.contextValue = {
            show: this.show,
        }

        this.state = {
            message: null,
            open: false,
            type: 'info',
        }
    }

    show = (options: MessageOptions) => {
        const { message, type = 'info', actionName = null, handleAction = () => {}, onClose = () => {} } = options

        this.setState({ open: true, message, type, actionName, handleAction, onClose })
    }

    handleActionClick = () => {
        this.handleClose()
        this.state.handleAction()
    }

    handleClose = () => {
        this.setState({ open: false, handleAction: null })
        this.state.onClose()
    }

    render() {
        const { actionName, message, open, type } = this.state

        const { BtnProps = {}, children, FlashProps: SnackProps = {} } = this.props

        return (
            <>
                <FlashMessageContext.Provider value={this.contextValue}>{children}</FlashMessageContext.Provider>
                <Snackbar
                    {...SnackProps}
                    open={open}
                    action={
                        actionName != null && (
                            <Button color="primary" size="small" {...BtnProps} onClick={this.handleActionClick}>
                                {actionName}
                            </Button>
                        )
                    }
                    onClose={this.handleClose}
                >
                    <Alert severity={type} onClose={this.handleClose}>
                        {message || ''}
                    </Alert>
                </Snackbar>
            </>
        )
    }
}
