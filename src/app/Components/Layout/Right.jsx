import React from 'react';

const Right = ({ children, className }) => {
    return (
        <div className={`fixed  right-0 z-50 h-full ${className}`}>
            <div className="flex items-start justify-center w-full h-full">
                {children}
            </div>
        </div>
    );
};

export default Right;
