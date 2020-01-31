import React from 'react';
import { generateUniqueId } from '../utils';

type AutocompleteInputProps = {
    name: string;
    className: string;
    placeholder: string;
    children: string[];
};

const AutocompleteInput: React.FC = ({ name, className, placeholder, children }: AutocompleteInputProps) => {
    const listId = generateUniqueId();

    return (
        <>
            <input name={name} className={className} list={listId} type="text" placeholder={placeholder} />

            <datalist id={listId}>
                {children.map(optionName => (
                    <option key={generateUniqueId()} value={optionName}>
                        {optionName}
                    </option>
                ))}
            </datalist>
        </>
    );
};

export default AutocompleteInput;
