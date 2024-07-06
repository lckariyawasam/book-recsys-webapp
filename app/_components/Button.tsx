'use client'

import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
}

const CustomButton: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  onClick=()=>{console.log("Button Clicked")},
  children,
  ...props
}) => {
    const baseClasses = 'rounded-3xl focus:outline-none focus:ring-2 transition ease-in-out duration-150';
  
    const variantClasses = {
      primary: 'bg-primary text-primary-500 hover:bg-primary-200 focus:ring-primary-300',
      secondary: 'bg-primary-100 text-primary-400 hover:bg-primary-200 focus:ring-primary-500'
    };
    
    const sizeClasses = {
      small: 'py-1 px-5 text-sm',
      medium: 'py-3 px-10 text-base',
      large: 'py-3 px-12 text-lg',
    };
    
    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`;
  
    return (
      <button className={classes} onClick={onClick} {...props}>
        {children}
      </button>
    );
};

export default CustomButton;
