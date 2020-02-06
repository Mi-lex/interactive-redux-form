import React, { ReactNode } from 'react';
import { Field, FieldArray, WrappedFieldArrayProps, FormSection } from 'redux-form';
import PassportBtn from './PassportBtn';
import ReduxCreatableSelect from './ReduxCreatableSelect';
import { inputOptions } from '../store/data';
import classes from '../../css/modules/OrderElementsTable.module.css';
import { Box } from '@material-ui/core';

type OrderElementsFieldPropType = {
    name: string;
    children?: ReactNode;
};

const OrderElementsRow = ({ name = 'orderElement' }: OrderElementsFieldPropType): JSX.Element => (
    <FormSection name={name} className={classes.container}>
        <Field
            className={`passInputBorder passInputSize passInputmb ${classes.name}`}
            name="name"
            component="input"
            type="text"
        />
        <Field
            className={`passInputBorder passInputSize passInputmb  ${classes.pages}`}
            name="paperCount"
            component="input"
            type="number"
        />
        <Field
            className={`passInputmb  ${classes.wrapMaterial}`}
            name="wrapMaterial"
            component={ReduxCreatableSelect}
            options={inputOptions.orderWrapMaterials}
        />
        <Field
            className={`passInputSize passInputmb  ${classes.printType}`}
            name="printType"
            placeholder="уф-принтер"
            component={ReduxCreatableSelect}
            options={inputOptions.printTypes}
        />
        <Field
            className={`passInputBorder passInputSize passInputmb  ${classes.colorFormula}`}
            name="colorFormula"
            component="input"
            type="text"
        />
        <Field
            className={`passInputBorder passInputSize passInputmb  ${classes.colorInterpretation}`}
            name="colorInterpretation"
            component="input"
            type="text"
        />
        <Field
            className={`passInputBorder passInputSize passInputmb  ${classes.addInfo}`}
            name="additionalInfo"
            component="input"
            type="text"
        />
    </FormSection>
);

const OrderElementsTable = ({ fields }: WrappedFieldArrayProps<string>): JSX.Element => (
    <>
        {fields.map((order, index) => (
            <OrderElementsRow key={index} name={`${order}Element`} />
        ))}

        <Box display="flex" justifyContent="flex-end">
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
        </Box>
    </>
);

const OrderElementsForm: React.FC = () => (
    <section className="orderElemmentsInfo">
        <FieldArray name="orders" component={OrderElementsTable} />
    </section>
);

export default OrderElementsForm;
