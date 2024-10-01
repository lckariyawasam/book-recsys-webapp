'use client'

import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  is_square?: string;
  minwidth?: string;
  onClick?: () => void;
}

const CustomButton: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "small",
  onClick=()=>{console.log("Button Clicked")},
  minwidth="w-24",
  type = "button",
  is_square,
  children,
  ...props
}) => {
    const baseClasses = `${!is_square ? 'rounded-3xl' : is_square} focus:outline-none transition ease-in-out duration-150`;
  
    const variantClasses = {
      primary: 'bg-secondary text-primary-500 hover:bg-primary-200',
      secondary: 'bg-primary-100 text-primary-400 hover:bg-primary-200',
      outline: 'bg-white border border-primary-400 text-primary-400 hover:bg-primary-100',
    };
    
    const sizeClasses = {
      small: 'py-2 px-5 text-sm',
      medium: 'py-3 px-10 text-base',
      large: 'py-3 px-12 text-lg',
    };
    
    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${minwidth}`;
  
    return (
      <button type={type} className={classes} onClick={onClick} {...props}>
        {children}
      </button>
    );
};

export default CustomButton;
