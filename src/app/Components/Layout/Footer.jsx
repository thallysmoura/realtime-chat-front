import React from 'react';

const Footer = ({ children, className, ...props }) => {
    return (
        <footer className={`fixed flex items-center bottom-0 left-1/2 z-50 w-full h-19 start-0 ${className}`} {...props}>
            <div className="flex items-center justify-center w-full">
                {children}
            </div>
        </footer>
    );
};

export default Footer;
