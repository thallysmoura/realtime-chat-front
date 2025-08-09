import React from 'react';

const Left = ({ children, className }) => {
    return (
        <div className={`fixed  z-50 h-full ${className}`}>
            <div className="flex items-start justify-center w-full h-full">
                {children}
            </div>
        </div>
    );
};

export default Left;
