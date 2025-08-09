import React from 'react';

const Button2 = ({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    size = 'medium',
    rounded = false,
    outline = false,
    className = '',
    ...props
}) => {
    const baseStyles = 'px-4 py-2 font-semibold text-center transition-colors duration-300';

    const variantStyles = {
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-500 text-white hover:bg-gray-600',
        success: 'bg-green-700 text-white hover:bg-green-900',
        danger: 'bg-red-500 text-white hover:bg-red-600',
    };

    const sizeStyles = {
        small: 'text-[11px] py-1 px-2',
        medium: 'text-base py-2 px-4',
        large: 'text-lg py-3 px-6',
    };

    const outlineStyles = outline ? 'border-2 border-current' : '';
    const roundedStyles = rounded ? 'rounded-full' : 'rounded-md';

    const buttonClassName = `
        flex
        gap-1
        items-center
        justify-center
        ${baseStyles} 
        ${variantStyles[variant] || variantStyles.primary} 
        ${sizeStyles[size] || sizeStyles.medium} 
        ${outlineStyles} 
        ${roundedStyles} 
        ${className}
    `;

    return (
        <button
            type={type}
            onClick={onClick}
            className={buttonClassName}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button2;
