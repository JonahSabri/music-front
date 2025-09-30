import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  glow?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md',
  glow = false,
  children, 
  className = '',
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95';
  
  const variants = {
    primary: 'gradient-nebula text-white hover:opacity-90 animate-glow-pulse',
    secondary: 'bg-galaxy text-white hover:bg-opacity-80 glass',
    outline: 'border-2 border-nebula text-nebula hover:bg-nebula hover:text-white glass',
    ghost: 'text-starlight hover:bg-white/10 glass'
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  const glowClass = glow ? (variant === 'primary' ? 'glow-purple' : 'glow-gold') : '';
  
  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${glowClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
