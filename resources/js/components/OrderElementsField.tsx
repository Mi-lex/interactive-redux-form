import React, { ReactNode } from 'react';
import { Field } from 'redux-form';
import AutocompleteInput from './AutocompleteInput';

type OrderElementsFieldPropType = {
    name: string;
    children?: ReactNode;
};

const OrderElementsField: React.FC = ({ name = 'orderElement' }: OrderElementsFieldPropType) => (
    <div className="row orderElement">
        <Field name={`${name}.name`} component="input" type="text" />
        <Field name={`${name}.paperCount`} component="input" type="number" />
        <Field name={`${name}.wrapMaterial`} component={AutocompleteInput}>
            {['матовый', 'глянцевый']}
        </Field>
        <Field name={`${name}.printType`} component="input" type="text" />
        <Field name={`${name}.colorFormula`} component="input" type="text" />
        <Field name={`${name}.colorInterpretation`} component="input" type="text" />
        <Field name={`${name}.additionalInfo`} component="input" type="text" />
    </div>
);

export default OrderElementsField;
