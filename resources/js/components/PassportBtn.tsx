import React, { MouseEventHandler } from 'react';
import icons from '../assets/icons';
import { IconName, ElementSize } from '../store/types';

type PassportBtnProps = {
    iconName: IconName;
    size: ElementSize;
    onClick?: MouseEventHandler;
};

const PassportBtn = ({ iconName, size = 'md', onClick }: PassportBtnProps): JSX.Element => {
    return (
        <button type="button" className={`btn btn--${size}`} onClick={onClick}>
            <svg className="icon">
                <use xlinkHref={icons[iconName]}></use>
            </svg>
        </button>
    );
};

export default PassportBtn;
