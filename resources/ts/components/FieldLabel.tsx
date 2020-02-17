import React from 'react'
import Box, { BoxProps } from '@material-ui/core/Box'

type Props = BoxProps & {
    labelText: string
    labelClassName?: string
    textClassName?: string
}

const FieldLabel: React.FC<Props> = (props): JSX.Element => {
    const { labelText, labelClassName = '', textClassName = '', children, ...restProps } = props
    return (
        <Box
            component="label"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
            className={labelClassName}
            {...restProps}
        >
            <Box mr={1} className={`${textClassName}`}>
                {labelText}
            </Box>
            {children}
        </Box>
    )
}

export default FieldLabel
