import { ButtonProps } from '@material-ui/core/Button'
import { SnackbarProps } from '@material-ui/core/Snackbar'
import { Color as AlertType } from '@material-ui/lab/Alert'

export interface FlashMessageProviderProps {
	BtnProps?: Partial<ButtonProps>
	children?: React.ReactNode
	SnackProps?: Partial<SnackbarProps>
}

export interface MessageOptions {
	message?: string
	type?: AlertType
	actionName?: string
	handleAction?: () => void
	onClose?: () => void
}

export interface FlashMessageProviderState extends MessageOptions {
	open: boolean
}
