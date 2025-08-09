import React from 'react';

const BottomNav = ({ children, color = 'bg-white', className }) => {
  return (
    <>
      <div
        className={`flex justify-center p-4 fixed z-40 ${className} cursor-pointer shadow-2xl  border-b-[13px] border-primary`}
      >
        <div className={`${color} flex items-center justify-center gap-1 sm:gap-16 text-[12px]`}>
          {children}
        </div>
      </div>
    </>
  );
}; 

export default BottomNav;
