import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = 'px-4 py-2 rounded-md font-medium';
  const variants = {
    primary: 'bg-red-600 hover:bg-red-700 text-white',
    outline: 'border border-gray-300 text-white hover:bg-white hover:bg-opacity-10',
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;