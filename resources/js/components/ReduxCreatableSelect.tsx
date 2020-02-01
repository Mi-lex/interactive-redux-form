import React from 'react';
import CreatableSelect from 'react-select/creatable';

const ReduxCreatableSelect: React.FC = ({ input, options, ...props }) => {
    return (
        <CreatableSelect
            {...input}
            {...props}
            onChange={value => input.onChange(value)}
            onBlur={() => input.onBlur(input.value)}
            options={options}
            formatCreateLabel={inputText => `${inputText}`}
        />
    );
};

export default ReduxCreatableSelect;
