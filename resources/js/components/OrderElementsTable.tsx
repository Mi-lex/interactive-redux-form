import React, { ReactNode, FC } from 'react';
import { Field, InjectedArrayProps } from 'redux-form';
import PassportBtn from './PassportBtn';
import ReduxCreatableSelect from './ReduxCreatableSelect';
import { inputOptions } from '../store/data';

type OrderElementsFieldPropType = {
    name: string;
    children?: ReactNode;
};

const OrderElementsField: React.FC = ({ name = 'orderElement' }: OrderElementsFieldPropType) => (
    <div className="row orderElement">
        <Field name={`${name}.name`} component="input" type="text" />
        <Field name={`${name}.paperCount`} component="input" type="number" />
        <Field
            name={`${name}.wrapMaterial`}
            className="!later"
            placeholder=""
            component={ReduxCreatableSelect}
            isClearable={true}
            options={inputOptions.orderWrapMaterials}
        />
        <Field name={`${name}.printType`} component="input" type="text" />
        <Field name={`${name}.colorFormula`} component="input" type="text" />
        <Field name={`${name}.colorInterpretation`} component="input" type="text" />
        <Field name={`${name}.additionalInfo`} component="input" type="text" />
    </div>
);

type OrderElementsTableProps = {
    fields: InjectedArrayProps & Array<string>;
};

const OrderElementsTable = ({ fields }: OrderElementsTableProps) => (
    <>
        {fields.map((order, index) => (
            <OrderElementsField key={index} name={`${order}Element`} />
        ))}

        <div className="row orderElementsController">
            <PassportBtn
                size="sm"
                iconName={'newRow'}
                onClick={(): void => {
                    fields.push();
                }}
            />
            <PassportBtn
                size="sm"
                iconName={'deleteRow'}
                onClick={(): void => {
                    fields.pop();
                }}
            />
        </div>
    </>
);
export default OrderElementsTable;
