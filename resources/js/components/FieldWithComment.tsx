import React, { ReactNode } from 'react';
import { Field, FieldArray, WrappedFieldArrayProps } from 'redux-form';
import PassportBtn from './PassportBtn';

type ExtraInfoFieldProps = WrappedFieldArrayProps<string> & {
    expandable: boolean;
};

const ExtraInfoField = ({ fields, expandable = true }: ExtraInfoFieldProps): JSX.Element => (
    <>
        {fields.map((extraActionName, index) => (
            <Field component="textarea" key={index} name={`${extraActionName}Info`} />
        ))}
        {expandable && (
            <div className="orderElementsController">
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
    children: ReactNode;
    expandable: boolean;
};

const FieldWithComment = (props: FieldWithCommentProps): JSX.Element => {
    const { name, children, expandable, className = '', ...restProps } = props;

    return (
        <div className={className} {...restProps}>
            <div>{children}</div>
            <FieldArray name={name} component={ExtraInfoField} expandable={expandable} />
        </div>
    );
};

export default FieldWithComment;
