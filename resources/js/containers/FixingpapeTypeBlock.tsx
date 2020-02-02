import React from 'react';
import { formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { FixingPapersTypeString } from '../store/types';
import { RootState } from '../store/rootReducer';

const selector: Function = formValueSelector('passport');

type MapStateProps = {
    hidden: boolean;
};

const mapStateToProps = (state: RootState, ownProps: OwnProps): MapStateProps => {
    const fixingpapeTypeState: FixingPapersTypeString = selector(state, 'fixingPaperType');
    const hidden = ownProps.blockName !== fixingpapeTypeState;
    return {
        hidden,
    };
};

type PropsFromRedux = MapStateProps;

type OwnProps = {
    blockName: FixingPapersTypeString;
    className?: string;
    children: React.ReactNode;
};

type Props = PropsFromRedux & OwnProps;

const FixingpapeTypeBlock = (props: Props): JSX.Element => {
    const { children, hidden, className = '' } = props;
    return (
        <div className={className} hidden={hidden}>
            {children}
        </div>
    );
};

const ConnectedComponent = connect(mapStateToProps)(FixingpapeTypeBlock);

export default ConnectedComponent;
