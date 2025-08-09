import React from 'react';

// @components
import Input from '@component/Input';

const Input = ({ className, id, name, type, onChange, value, ...props}) => {
    return (
        <Input
            type={type}
            id={id}
            name={name}
            value={value}
            onChange={onChange}
            className={`${className}`}
            placeholder={placeholder}
            {...props}
      />
    );
};

export default Input;