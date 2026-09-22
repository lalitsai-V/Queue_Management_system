'use client';

import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  glass?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  hoverEffect = false,
  glass = false,
  padding = 'md',
  className = '',
  ...props
}) => {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-4 sm:p-5',
    md: 'p-6 sm:p-8',
    lg: 'p-8 sm:p-10',
  };

  return (
    <div
      className={`rounded-3xl border border-slate-200/80 shadow-sm transition-all duration-300 ${
        glass ? 'glass-card' : 'bg-white'
      } ${hoverEffect ? 'hover:shadow-xl hover:-translate-y-1 hover:border-blue-200' : ''} ${
        paddingStyles[padding]
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
