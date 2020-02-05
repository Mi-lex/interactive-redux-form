import React, { ReactNode } from 'react';
import { Field, WrappedFieldArrayProps } from 'redux-form';
import PassportBtn from './PassportBtn';
import ReduxCreatableSelect from './ReduxCreatableSelect';
import { inputOptions } from '../store/data';
import classes from '../../css/modules/OrderElementsTable.module.css';

type OrderElementsFieldPropType = {
    name: string;
    children?: ReactNode;
};

const OrderElementsRow = ({ name = 'orderElement' }: OrderElementsFieldPropType): JSX.Element => (
    <div className="d-flex justify-content-around">
        <Field
            className={`passInputBorder passInputSize passInputmb ${classes.name}`}
            name={`${name}.name`}
            component="input"
            type="text"
        />
        <Field
            className={`passInputBorder passInputSize passInputmb  ${classes.pages}`}
            name={`${name}.paperCount`}
            component="input"
            type="number"
        />
        <Field
            className={`passInputmb  ${classes.wrapMaterial}`}
            name={`${name}.wrapMaterial`}
            component={ReduxCreatableSelect}
            options={inputOptions.orderWrapMaterials}
        />
        <Field
            className={`passInputSize passInputmb  ${classes.printType}`}
            name={`${name}.printType`}
            placeholder="уф-принтер"
            component={ReduxCreatableSelect}
            options={inputOptions.printTypes}
        />
        <Field
            className={`passInputBorder passInputSize passInputmb  ${classes.colorFormula}`}
            name={`${name}.colorFormula`}
            component="input"
            type="text"
        />
        <Field
            className={`passInputBorder passInputSize passInputmb  ${classes.colorInterpretation}`}
            name={`${name}.colorInterpretation`}
            component="input"
            type="text"
        />
        <Field
            className={`passInputBorder passInputSize passInputmb  ${classes.addInfo}`}
            name={`${name}.additionalInfo`}
            component="input"
            type="text"
        />
    </div>
);

const OrderElementsTable = ({ fields }: WrappedFieldArrayProps<string>): JSX.Element => (
    <>
        {fields.map((order, index) => (
            <OrderElementsRow key={index} name={`${order}Element`} />
        ))}

        <div className="d-flex justify-content-end orderElementsController">
            <PassportBtn
                size="sm"
                iconName={'newRow'}
                onClick={(): void => {
                    fields.push('');
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
