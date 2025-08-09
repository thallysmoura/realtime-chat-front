import React from 'react';

{
    /** max-w-screen-lg */
}
const Body = ({ children, className }) => {
    return (
        <div className={`p-2 mx-auto w-full ${className}`}> 
            {children}
        </div>
    );
};

export default Body;
