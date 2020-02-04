import React from 'react';
import classes from '../../css/modules/FieldLabel.module.css';

type Props = {
    labelText: string;
    labelClassName?: string;
    textClassName?: string;
    children: React.ReactNode;
};

const FieldLabel = (props: Props): JSX.Element => {
    const { labelText, labelClassName = '', textClassName = '', children, ...restProps } = props;
    return (
        <label className={`${labelClassName} d-flex justify-content-between align-items-center`} {...restProps}>
            <span className={`${textClassName} mr-2`}>{labelText}</span>
            {children}
        </label>
    );
};

export default FieldLabel;
