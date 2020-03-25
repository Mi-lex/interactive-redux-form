import React, { PureComponent } from 'react'

import FlashMessageComponent from './FlashMessageComponent'
import FlashMessageContext, {
	FlashMessageProviderValue,
} from './FlashMessageContext'
import {
	FlashMessageProviderProps,
	FlashMessageProviderState,
	MessageOptions,
} from './types'

/**
 * Usage of this provider allows to show
 * flash message inside components.
 * *useFlashMessage* hook returns object,
 * which have **show** method
 */
export default class FlashMessageProvider extends PureComponent<
	FlashMessageProviderProps,
	FlashMessageProviderState
> {
	contextValue: FlashMessageProviderValue

	constructor(props: FlashMessageProviderProps) {
		super(props)
		this.contextValue = {
			show: this.show,
		}

		this.state = {
			message: '',
			open: false,
			type: 'info',
		}
	}

	show = (options: MessageOptions) => {
		const {
			message,
			type = 'info',
			actionName = '',
			handleAction = () => {},
			onClose = () => {},
		} = options

		this.onClose = onClose

		this.setState({
			open: true,
			message,
			type,
			actionName,
			handleAction,
		})
	}

	onClose = () => {}

	handleClose = () => {
		this.setState({ open: false })
		this.onClose()
	}

	render() {
		const { actionName, message, open, type, handleAction } = this.state
		const { BtnProps = {}, children, SnackProps = {} } = this.props

		return (
			<>
				<FlashMessageContext.Provider value={this.contextValue}>
					{children}
				</FlashMessageContext.Provider>
				<FlashMessageComponent
					open={open}
					SnackProps={SnackProps}
					BtnProps={BtnProps}
					actionName={actionName}
					handleAction={handleAction}
					handleClose={this.handleClose}
					type={type}
				>
					{message || ''}
				</FlashMessageComponent>
			</>
		)
	}
}
