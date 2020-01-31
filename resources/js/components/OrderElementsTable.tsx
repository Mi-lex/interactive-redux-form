import React, { ReactNode } from 'react';
import { Field } from 'redux-form';
import AutocompleteInput from './AutocompleteInput';
import PassportBtn from './PassportBtn';

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

const OrderElementsTable = ({ fields }) => (
    <>
        {fields.map((order, index) => (
            <OrderElementsField key={index} name={`${order}Element`} />
        ))}

        <div className="row orderElementsController">
            <PassportBtn size="sm" iconName={'newRow'} onClick={() => fields.push()} />
            <PassportBtn size="sm" iconName={'deleteRow'} onClick={() => fields.pop()} />
        </div>
    </>
);
export default OrderElementsTable;
