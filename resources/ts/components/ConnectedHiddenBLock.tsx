import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { useSelector } from 'react-redux'
import { FormSection, formValueSelector, resetSection } from 'redux-form'
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
    const { children, blockName, className = '', checkboxGroupName, NamesMap } = props
    const classes = useStyles()
    const chosenCheckbox = useSelector(state => selector(state,`${checkboxGroupName}.${blockName}`))
    const shown = chosenCheckbox || false

    return (
        <FormSection name={blockName} className={`${classes.root} ${className}`} hidden={!shown}>
            <Typography style={{ paddingTop: 5 }} variant="h6">
                {NamesMap[blockName]}
            </Typography>
            {children}
        </FormSection>
    )
}

export default ConnectedHiddenBlock
