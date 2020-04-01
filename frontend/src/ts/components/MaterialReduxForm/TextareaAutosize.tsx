import React from 'react'
import TextareaAutosize, {
	TextareaAutosizeProps,
} from '@material-ui/core/TextareaAutosize'
import TextField, { Props as TextFieldProps } from './TextField'

type AutoSizeProps = TextareaAutosizeProps & {
	inputRef: any
}

const renderTextareaAutosize: React.FC<AutoSizeProps> = (props) => {
	const { inputRef, ...custom } = props

	return <TextareaAutosize {...custom} />
}

type Props = TextFieldProps & {
	rowsMin: number | string
}

const TextareaAutosizeField: React.FC<Props> = (props) => {
	const { rowsMin, ...custom } = props

	return (
		<TextField
			InputProps={{
				inputComponent: renderTextareaAutosize as any,
				inputProps: { rowsMin },
			}}
			{...custom}
		/>
	)
}

export default TextareaAutosizeField
