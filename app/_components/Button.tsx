'use client'

import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  minwidth?: string;
  onClick?: () => void;
}

const CustomButton: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "small",
  onClick=()=>{console.log("Button Clicked")},
  minwidth="w-24",
  children,
  ...props
}) => {
    const baseClasses = 'rounded-3xl focus:outline-none transition ease-in-out duration-150';
  
    const variantClasses = {
      primary: 'bg-secondary text-primary-500 hover:bg-primary-200',
      secondary: 'bg-primary-100 text-primary-400 hover:bg-primary-200',
      outline: 'bg-white border border-primary-400 text-primary-400 hover:bg-primary-100',
    };
    
    const sizeClasses = {
      small: 'py-1 px-5 text-sm',
      medium: 'py-3 px-10 text-base',
      large: 'py-3 px-12 text-lg',
    };
    
    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${minwidth}`;
  
    return (
      <button className={classes} onClick={onClick} {...props}>
        {children}
      </button>
    );
};

export default CustomButton;
