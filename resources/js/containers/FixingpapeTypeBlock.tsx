import React from 'react';
import { reduxForm, formValueSelector } from 'redux-form';
import { connect } from 'react-redux';
import { FixingPapersTypeString } from '../store/types';

type FixingpapeTypeBlockProp = {
    name: FixingPapersTypeString;
    fixingpapeTypeState?: FixingPapersTypeString;
    children: React.ReactNode;
};

let FixingpapeTypeBlock = ({ name, children, fixingpapeTypeState }: FixingpapeTypeBlockProp): JSX.Element => {
    return <div hidden={fixingpapeTypeState !== name}>{children}</div>;
};
// { fixingpapeTypeState }: FixingpaperSubFormProp
const selector: Function = formValueSelector('passport');

const mapStateToProps = state => {
    const fixingpapeTypeState: FixingPapersTypeString = selector(state, 'fixingPaperType');

    return {
        fixingpapeTypeState,
    };
};

const ConnectedFixingpapeTypeBlock = connect(mapStateToProps, null)(FixingpapeTypeBlock);

FixingpapeTypeBlock = reduxForm({
    form: 'passport',
})(ConnectedFixingpapeTypeBlock);

export default FixingpapeTypeBlock;
