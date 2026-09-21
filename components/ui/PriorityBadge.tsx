import React from 'react';
import { TokenPriority } from '@/types/queue';
import { AlertCircle, Zap, ShieldCheck } from 'lucide-react';

interface PriorityBadgeProps {
  priority: TokenPriority;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority }) => {
  if (priority === 'EMERGENCY') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold bg-rose-600 text-white animate-pulse shadow-sm gap-1">
        <AlertCircle className="w-3 h-3" />
        EMERGENCY
      </span>
    );
  }

  if (priority === 'PRIORITY') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-amber-500 text-white shadow-xs gap-1">
        <Zap className="w-3 h-3" />
        PRIORITY
      </span>
    );
  }

  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-sky-50 text-sky-700 border border-sky-200/60 gap-1">
      <ShieldCheck className="w-3 h-3" />
      NORMAL
    </span>
  );
};
