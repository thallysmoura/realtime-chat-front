import { capitalizeFirstLetter } from '@utils/Utils';
import React from 'react';

const Select = ({id, name, onChange, options, className}) => {
    return (
        <div className={`relative ${className}`}>
            <select
                id={id}
                name={name}
                onChange={(e) => onChange(e.target.value)}
                className={` ${className} block w-full px-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                defaultValue="" // Define o valor padrão como vazio
            >
                <option value="" disabled>
                    Selecionar
                </option>
                {
                    options.map((option) => (
                        <option key={option.CODIGO} value={option.CODIGO}>
                            {option.LOCALIDADE}
                        </option>
                    ))
                }
            </select>
        </div>
    );
};

export default Select;
