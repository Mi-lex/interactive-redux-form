import React from 'react';
import AfterPrintSubform from './AfterPrintSubform';
import PaperJoinerForm from './PaperJoinerForm';

const FinalForm: React.FC = () => {
    return (
        <div className="row">
            <div className="col">
                <PaperJoinerForm />
            </div>
            <div className="col-8">
                <AfterPrintSubform />
            </div>
        </div>
    );
};

export default FinalForm;
