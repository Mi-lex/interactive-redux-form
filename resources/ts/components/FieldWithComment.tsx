import React from 'react';
import { Field, FieldArray, WrappedFieldArrayProps, FormSection } from 'redux-form';
import PassportBtn from './PassportBtn';

type ExtraInfoFieldProps = WrappedFieldArrayProps<string> & {
    expandable: boolean;
};

const ExtraInfoField = ({ fields, expandable = true }: ExtraInfoFieldProps): JSX.Element => (
    <>
        {fields.map((extraActionName, index) => (
            <Field
                component="textarea"
                className="passInputBorder passInputmb"
                key={index}
                name={`${extraActionName}`}
            />
        ))}
        {expandable && (
            <div className="d-flex justify-content-end">
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
        )}
    </>
);

type FieldWithCommentProps = {
    name: string;
    className: string;
    children: React.ReactNode;
    expandable: boolean;
};

const FieldWithComment = (props: FieldWithCommentProps): JSX.Element => {
    const { name, children, expandable, className = '', ...restProps } = props;

    return (
        <FormSection name={name} className={className} {...restProps}>
            <div>{children}</div>
            <FieldArray name="info" component={ExtraInfoField} expandable={expandable} />
        </FormSection>
    );
};

export default FieldWithComment;
