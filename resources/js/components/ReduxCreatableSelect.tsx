import React from 'react';
import { WrappedFieldProps } from 'redux-form';
import CreatableSelect from 'react-select/creatable';
import { InputOptions } from '../store/types';

type Props = InputOptions &
    WrappedFieldProps & {
        className?: string;
    };

const customStyles = {
    option: provided => ({
        ...provided,
        borderColor: '#FFE082',
    }),
    control: provided => ({
        ...provided,
        borderRadius: '8px',
        height: '100%',
        minHeight: '30px',
        borderColor: '#FFE082',
    }),
    indicatorSeparator: () => ({
        display: 'none',
    }),
    dropdownIndicator: provided => ({
        ...provided,
        color: '#FFE082',
    }),
};

const ReduxCreatableSelect = (props: Props): JSX.Element => {
    const { input, className = '', options, ...restProps } = props;
    return (
        <CreatableSelect
            {...input}
            {...restProps}
            className={className}
            onChange={(value): void => {
                input.onChange(value);
            }}
            styles={customStyles}
            onBlur={(): void => {
                input.onBlur(input.value);
            }}
            options={options}
            formatCreateLabel={(inputText): string => `${inputText}`}
        />
    );
};

export default ReduxCreatableSelect;
