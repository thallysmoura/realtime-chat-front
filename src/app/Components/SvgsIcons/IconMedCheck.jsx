import React from 'react';

const IconMedCheck = ({ width = 6, height = 6, ...props }) => {
    return (
        <svg className={`w-{${width}} h-${height} text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg`} fill="none" viewBox="0 0 24 24" {...props}>
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11.917 9.724 16.5 19 7.5" />
        </svg>



    );
};

export default IconMedCheck;