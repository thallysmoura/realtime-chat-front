import React from 'react';
import { Paragraph } from './Typography';

const Drawer = ({isOpen, onClose, children, className='bg-white'}) => {

  return (
    <>
      {isOpen && (
        <div id="drawer-form" className={`fixed top-0 left-0 z-40 h-full p-4 overflow-y-auto transition-transform translate-x-0 ${className} w-80 `} tabIndex="-1" aria-labelledby="drawer-form-label">
          <main className='flex flex-col gap-2'>
            <section onClick={onClose} className='flex gap-1  text-primary font-bold'>
              <svg className="w-6 h-6 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m15 19-7-7 7-7" />
              </svg>
              <Paragraph>Menu</Paragraph>
            </section>
            {children}
          </main>
        </div>
      )}
    </>
  );
};

export default Drawer;
