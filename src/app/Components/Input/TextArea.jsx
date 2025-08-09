import React from 'react';

const TextArea = ({id, name, value, onChange, placeholder, rows = 4, className, ...props }) => {
    return (
        <textarea
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            className={`block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${className}`}
            {...props}
        />
    );
};

export default TextArea;