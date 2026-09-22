'use client';

import React from 'react';

interface LoadingSkeletonProps {
  type?: 'card' | 'table' | 'text' | 'dashboard';
  count?: number;
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ type = 'card', count = 1 }) => {
  const items = Array.from({ length: count });

  if (type === 'dashboard') {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-32 bg-slate-200/80 rounded-3xl w-full" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-28 bg-slate-200/70 rounded-3xl" />
          ))}
        </div>
        <div className="h-64 bg-slate-200/70 rounded-3xl" />
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className="space-y-3 animate-pulse">
        {items.map((_, i) => (
          <div key={i} className="h-14 bg-slate-200/70 rounded-2xl w-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-pulse">
      {items.map((_, i) => (
        <div key={i} className="h-40 bg-slate-200/80 rounded-3xl w-full" />
      ))}
    </div>
  );
};
