
const MyButton = ({ type = 'button', onClick, className, children, disabled = false, rounded }) => {
    const baseStyles = 'inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2';
    const variantStyles = {
        primary:    'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-500 ',
        secondary:  'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-500 ',
        danger:     'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
        outline:    'bg-transparent border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`rounded-xl ${baseStyles} ${variantStyles[className] || variantStyles.primary} ${disabled ? 'opacity-50 cursor-not-allowed ' : ''}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default MyButton;
