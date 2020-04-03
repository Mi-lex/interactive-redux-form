import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

const textStyle = '#5d80b6'
const greyLabels = '#caccce'
const anotherGrey = '#98999b'

export default createMuiTheme({
	overrides: {
		MuiFormControlLabel: {
			root: {
				textTransform: 'lowercase',
				color: anotherGrey,
			},
		},
		MuiFormLabel: {
			root: {
				textTransform: 'lowercase',
				color: anotherGrey,
				'&.$Mui-disabled': {
					color: anotherGrey,
				},
				'& + .MuiInput-underline:before': {
					borderBottomStyle: 'dotted',
				},
			},
			filled: {
				color: greyLabels,
				'& + .MuiInput-underline:before': {
					display: 'none',
				},
			},
		},
		MuiInput: {
			root: {
				color: textStyle,
				'&.$Mui-disabled': {
					color: textStyle,
				},
				'& .MuiIconButton-root': {
					color: anotherGrey,
				},
			},
		},
		MuiInputBase: {
			root: {
				color: textStyle,
			},
		},
		MuiCheckbox: {
			root: {
				color: anotherGrey,
			},
		},
	},
})
