import React from 'react';
import { WrappedFieldProps } from 'redux-form';
import CreatableSelect from 'react-select/creatable';
import { InputOptions } from '../store/types';

type Props = InputOptions & WrappedFieldProps;

const ReduxCreatableSelect = (props: Props): JSX.Element => {
    const { input, options, ...restProps } = props;
    return (
        <CreatableSelect
            {...input}
            {...restProps}
            onChange={(value): void => {
                input.onChange(value);
            }}
            onBlur={(): void => {
                input.onBlur(input.value);
            }}
            options={options}
            formatCreateLabel={(inputText): string => `${inputText}`}
        />
    );
};

export default ReduxCreatableSelect;
