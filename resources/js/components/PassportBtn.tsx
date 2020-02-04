import React, { MouseEventHandler } from 'react';
import icons from '../assets/icons';
import { IconName, ElementSize } from '../store/types';
import classes from '../../css/modules/PassportBtn.module.css';
import { classesExtractor } from '../utils';

type Props = {
    iconName: IconName;
    size: ElementSize;
    onClick?: MouseEventHandler;
    className?: string;
};

const PassportBtn = (props: Props): JSX.Element => {
    const { className = '', iconName, size = 'md', onClick } = props;

    const btnClassNames = ['btn', `btn--${size}`];

    return (
        <button type="button" className={`${classesExtractor(classes, btnClassNames)} ${className}`} onClick={onClick}>
            <svg className={classes.icon}>
                <use xlinkHref={icons[iconName]}></use>
            </svg>
        </button>
    );
};

export default PassportBtn;
