import React from 'react';
import Box from '@material-ui/core/Box';

type Props = {
    labelText: string;
    labelClassName?: string;
    textClassName?: string;
    children: React.ReactNode;
};

const FieldLabel = (props: Props): JSX.Element => {
    const { labelText, labelClassName = '', textClassName = '', children, ...restProps } = props;
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
    );
};

export default FieldLabel;
