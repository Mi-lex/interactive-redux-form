import React from 'react';
import { formValueSelector, FormSection } from 'redux-form';
import { useSelector } from 'react-redux';
import { PaperJoinerName } from '../store/types';

const selector: Function = formValueSelector('passport');

type Props = {
    blockName: PaperJoinerName;
    className?: string;
    children: React.ReactNode;
};

const PaperJoinerBlock = (props: Props): JSX.Element => {
    const chosenJoiner = useSelector(state => selector(state, 'paperJoiner'));
    const { children, blockName, className = '' } = props;

    const hidden = chosenJoiner !== blockName;

    return (
        <FormSection name={blockName} className={className} hidden={hidden}>
            {children}
        </FormSection>
    );
};

export default PaperJoinerBlock;
