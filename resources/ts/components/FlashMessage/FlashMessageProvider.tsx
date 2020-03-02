import React, { PureComponent } from 'react'
import Snackbar, { SnackbarProps as FlashMessageProps } from '@material-ui/core/Snackbar'
import Button from '@material-ui/core/Button'
import FlashMessageContext from './FlashMessageContext'
import { ButtonProps } from '@material-ui/core/Button'
import { FlashMessageProviderValue } from './FlashMessageContext'

interface FlashMessageProviderProps {
    BtnProps?: Partial<ButtonProps>
    children: React.ReactNode
    FlashProps?: Partial<FlashMessageProps>
}

interface FlashMessageProviderState {
    action?: string
    message?: string
    open: boolean
    handleAction?: () => void
}

export default class FlashMessageProvider extends PureComponent<FlashMessageProviderProps, FlashMessageProviderState> {
    contextValue: FlashMessageProviderValue

    constructor(props: FlashMessageProviderProps) {
        super(props)
        this.contextValue = {
            showMessage: this.showMessage,
        }

        this.state = {
            message: null,
            open: false,
        }
    }

    showMessage = (message: string, action?: string, handleAction?: () => void) => {
        this.setState({ open: true, message, action, handleAction })
    }

    handleActionClick = () => {
        this.handleClose()
        this.state.handleAction()
    }

    handleClose = () => {
        this.setState({ open: false, handleAction: null })
    }

    render() {
        const { action, message, open } = this.state

        const { BtnProps = {}, children, FlashProps: SnackProps = {} } = this.props

        return (
            <>
                <FlashMessageContext.Provider value={this.contextValue}>{children}</FlashMessageContext.Provider>
                <Snackbar
                    {...SnackProps}
                    open={open}
                    message={message || ''}
                    action={
                        action != null && (
                            <Button color="secondary" size="small" {...BtnProps} onClick={this.handleActionClick}>
                                {action}
                            </Button>
                        )
                    }
                    onClose={this.handleClose}
                />
            </>
        )
    }
}
