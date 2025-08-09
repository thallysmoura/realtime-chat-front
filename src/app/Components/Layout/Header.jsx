import React from 'react';

const Header = ({children, className, ...props}) => {
    return (
        <section className={` ${className} w-full z-20 top-0 start-0`} {...props}>
         <div className="flex items-center justify-center w-full">
              {children}
          </div>
        </section>
    );
};

export default Header;