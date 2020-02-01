import React from 'react';
import { reduxForm, formValueSelector } from 'redux-form';
import { connect, ConnectedProps } from 'react-redux';
import { FixingPapersTypeString } from '../store/types';
import { RootState } from '../store/rootReducer';

const selector: Function = formValueSelector('passport');

const mapStateToProps = (state: RootState, ownProps) => {
    const fixingpapeTypeState: FixingPapersTypeString = selector(state, 'fixingPaperType');
    const hidden = ownProps.blockName !== fixingpapeTypeState;
    return {
        hidden,
    };
};

const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

type FixingpapeTypeBlockProp = PropsFromRedux & {
    blockName: FixingPapersTypeString;
    children: React.ReactNode;
    className?: string;
};

let FixingpapeTypeBlock = ({ children, hidden, className = '' }: FixingpapeTypeBlockProp): JSX.Element => {
    return (
        <div className={className} hidden={hidden}>
            {children}
        </div>
    );
};

const ConnectedFixingpapeTypeBlock = connector(FixingpapeTypeBlock);

FixingpapeTypeBlock = reduxForm({
    form: 'passport',
})(ConnectedFixingpapeTypeBlock);

export default FixingpapeTypeBlock;
