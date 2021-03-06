import React, { useState } from 'react'
import { Snackbar, Button } from '@material-ui/core'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert'

import { FlashMessageProviderProps, MessageOptions } from './types'

function Alert(props: AlertProps) {
	return <MuiAlert elevation={6} variant="filled" {...props} />
}

type Props = FlashMessageProviderProps &
	MessageOptions & {
		open?: boolean
		handleClose?: () => void
		children: string
	}

/**
 * Component for showing messages.
 * When used by itself without FlashMessageProvider
 * basically represents Snackbar and MuiAlert material ui component
 */
const FlashMessageComponent: React.FC<Props> = (props: Props) => {
	const [open, setOpen] = useState<boolean>(true)
	const defaultActions = () => {}
	const {
		SnackProps,
		BtnProps,
		actionName,
		handleAction = defaultActions,
		onClose = defaultActions,
		type = 'info',
		children,
	} = props

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
					<Button
						color="primary"
						size="small"
						{...BtnProps}
						onClick={handleActionClick}
					>
						{actionName}
					</Button>
				)
			}
			onClose={handleClose}
		>
			<Alert severity={type} onClose={handleClose}>
				<span>{children || ''}</span>
			</Alert>
		</Snackbar>
	)
}

export default FlashMessageComponent
