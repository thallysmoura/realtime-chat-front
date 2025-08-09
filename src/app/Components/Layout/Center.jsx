import React from 'react';

const Center = ({ children, direction = 'column', ...props }) => {

  const flexDirectionClass = direction === 'column' ? 'flex-col' : 'flex-row';

  return (
    <div className={`flex ${flexDirectionClass} items-center justify-center ${props.className || ''}`} {...props}>
      {children}
    </div>
  );
};

export default Center;
