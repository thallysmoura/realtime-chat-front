import React from 'react';

const Card = ({ children, className, borderRadius = 2, shadow = 'md', ...props }) => {

 const shadowClasses = {
  null: '',
  none: '',
  sm: 'shadow-sm',
  md: 'shadow-md',
  lg: 'shadow-lg',
};

const borderRadiusClasses = {
  0: '',
  1: 'rounded-sm',
  2: 'rounded-lg',
  3: 'rounded-3xl',
};

const shadowClass = shadowClasses[shadow] || '';
const borderRadiusClass = borderRadiusClasses[borderRadius] || '';

return (
    <div className={`w-full ${borderRadiusClass} mb-3 overflow-hidden ${shadowClass} p-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;
