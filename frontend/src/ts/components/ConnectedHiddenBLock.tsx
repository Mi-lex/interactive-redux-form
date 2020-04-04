import React from 'react'
import { useSelector } from 'react-redux'
import { FormSection, formValueSelector } from 'redux-form'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import { PaperJoinerName, PostPrintActionName } from '../store/types'

const selector: Function = formValueSelector('passport')

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			'& > *': {
				marginBottom: theme.spacing(1),
			},
		},
	}),
)

type Props = {
	checkboxGroupName: 'paper_joiner_checks' | 'post_actions_checks'
	blockName: PostPrintActionName | PaperJoinerName
	className?: string
	NamesMap: any
}

const ConnectedHiddenBlock: React.FC<Props> = (props): JSX.Element => {
	const {
		children,
		blockName,
		className = '',
		checkboxGroupName,
		NamesMap,
	} = props
	const classes = useStyles()
	const chosenCheckbox = useSelector((state) =>
		selector(state, `${checkboxGroupName}.${blockName}`),
	)
	const shown = chosenCheckbox || false

	return shown ? (
		<FormSection name={blockName} className={`${classes.root} ${className}`}>
			<Typography style={{ paddingTop: 5 }} variant="h6">
				{NamesMap[blockName]}
			</Typography>
			{children}
		</FormSection>
	) : (
		<span />
	)
}

export default ConnectedHiddenBlock
