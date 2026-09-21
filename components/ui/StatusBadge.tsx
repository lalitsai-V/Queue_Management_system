import React from 'react';
import { TokenStatus } from '@/types/queue';

interface StatusBadgeProps {
  status: TokenStatus;
  size?: 'sm' | 'md' | 'lg';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs font-semibold',
    md: 'px-2.5 py-1 text-xs font-bold uppercase tracking-wider',
    lg: 'px-3.5 py-1.5 text-sm font-extrabold uppercase tracking-wide',
  };

  const styleMap: Record<TokenStatus, string> = {
    WAITING: 'bg-amber-50 text-amber-700 border border-amber-200/80 shadow-xs',
    CALLED: 'bg-sky-500 text-white border border-sky-400 animate-pulse shadow-md',
    IN_CONSULTATION: 'bg-emerald-600 text-white border border-emerald-500 shadow-sm',
    COMPLETED: 'bg-slate-100 text-slate-700 border border-slate-200',
    SKIPPED: 'bg-orange-50 text-orange-700 border border-orange-200',
    ABSENT: 'bg-rose-50 text-rose-700 border border-rose-200',
    CANCELLED: 'bg-gray-100 text-gray-500 border border-gray-200 line-through',
  };

  const labelMap: Record<TokenStatus, string> = {
    WAITING: 'Waiting',
    CALLED: 'NOW CALLED',
    IN_CONSULTATION: 'In Consultation',
    COMPLETED: 'Completed',
    SKIPPED: 'Skipped',
    ABSENT: 'Absent',
    CANCELLED: 'Cancelled',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full justify-center transition-all ${sizeClasses[size]} ${styleMap[status]}`}
    >
      {status === 'CALLED' && <span className="w-2 h-2 mr-1.5 rounded-full bg-white animate-ping" />}
      {labelMap[status]}
    </span>
  );
};
