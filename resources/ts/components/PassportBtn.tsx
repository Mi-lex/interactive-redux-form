import React, { MouseEventHandler } from 'react';
import icons from '../assets/icons';
import { IconName, ElementSize } from '../store/types';
import { classesExtractor } from '../utils';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => {
    const mdSize = 40;
    const smSize = 24;

    return {
        btn: {
            backgroundColor: 'transparent',
            border: 'none',
            padding: 0,
        },
        md: {
            width: mdSize,
            height: mdSize,
        },
        sm: {
            width: smSize,
            height: smSize,
        },
        icon: {
            maxWidth: '100%',
            maxHeight: '100%',
            fill: theme.palette.primary.main,
            '&:hover': {
                fill: theme.palette.primary.dark,
            },
        },
    };
});

type Props = {
    className?: string;
    iconName: IconName;
    size: ElementSize;
    onClick?: MouseEventHandler;
    style?: object;
};

const PassportBtn: React.FC<Props> = (props: Props): JSX.Element => {
    const { className = '', iconName, size = 'md', onClick, ...restProps } = props;
    const classes = useStyles();
    const btnClassNames = ['btn', size];

    return (
        <button
            type="button"
            className={`${classesExtractor(classes, btnClassNames)} ${className}`}
            onClick={onClick}
            {...restProps}
        >
            <svg className={classes.icon}>
                <use xlinkHref={icons[iconName]}></use>
            </svg>
        </button>
    );
};

export default PassportBtn;
