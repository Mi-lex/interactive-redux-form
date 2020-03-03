import React, { PureComponent } from 'react'
import FlashMessageComponent from './FlashMessageComponent'
import FlashMessageContext from './FlashMessageContext'
import { FlashMessageProviderValue } from './FlashMessageContext'
import { FlashMessageProviderProps, FlashMessageProviderState, MessageOptions } from './types'

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
        console.log('showing')

        const { message, type = 'info', actionName = null, handleAction = () => {}, onClose = () => {} } = options

        this.setState({ open: true, message, type, actionName, handleAction, onClose })
    }

    handleClose = () => {
        console.log('closing')

        console.log(this.state.open)

        this.setState({ open: false })
        this.state.onClose()
    }

    render() {
        const { actionName, message, open, type, handleAction } = this.state

        const { BtnProps = {}, children, SnackProps = {} } = this.props

        console.log('something happening')

        return (
            <>
                <FlashMessageContext.Provider value={this.contextValue}>{children}</FlashMessageContext.Provider>
                <FlashMessageComponent
                    open={open}
                    SnackProps={SnackProps}
                    BtnProps={BtnProps}
                    actionName={actionName}
                    handleAction={handleAction}
                    handleClose={this.handleClose}
                    type={type}
                >
                    {message}
                </FlashMessageComponent>
            </>
        )
    }
}
