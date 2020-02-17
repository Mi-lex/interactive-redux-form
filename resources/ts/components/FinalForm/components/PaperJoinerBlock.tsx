import React from 'react'
import { formValueSelector, FormSection } from 'redux-form'
import { useSelector } from 'react-redux'
import { PaperJoiners, PaperJoinerName } from '../../../store/types'
import Typography from '@material-ui/core/Typography';
const selector: Function = formValueSelector('passport')

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

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
    blockName: PaperJoinerName
    className?: string
    children: React.ReactNode
}

const PaperJoinerBlock = (props: Props): JSX.Element => {
    const classes = useStyles()
    const chosenJoiners = useSelector(state => selector(state, 'paperJoiners'))
    const { children, blockName, className = '' } = props

    const shown = chosenJoiners && chosenJoiners[blockName]

    return (
        <FormSection name={blockName} className={`${classes.root} ${className}`} hidden={!shown}>
            <Typography style={{ paddingTop: 5 }} variant="h6">
                {PaperJoiners[blockName]}
            </Typography>
            {children}
        </FormSection>
    )
}

export default PaperJoinerBlock
