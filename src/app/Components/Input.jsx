'use client'

import React from "react";

const Input = ({className, type, placeHolder, onChange, ...props}) => {
    return (
        <input 
            className={`block rounded-md border-0 outline-none px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${className}`} 
            type={type}
            onChange={onChange}
            placeholder={placeHolder}
            {...props}   
        />
    );
};

export default Input;