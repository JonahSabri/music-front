import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'strong' | 'hover-glow';
  animated?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '',
  variant = 'default',
  animated = false
}) => {
  const baseStyles = 'rounded-2xl backdrop-blur-xl border transition-all duration-300';
  
  const variants = {
    default: 'glass hover:border-nebula/50',
    strong: 'glass-strong hover:border-nebula',
    'hover-glow': 'glass hover:border-nebula hover:glow-purple hover:scale-105'
  };
  
  const animationClass = animated ? 'animate-slide-up' : '';
  
  return (
    <div className={`${baseStyles} ${variants[variant]} ${animationClass} ${className}`}>
      {children}
    </div>
  );
};
