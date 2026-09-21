import React from 'react';
import { Token } from '@/types/queue';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { PriorityBadge } from '@/components/ui/PriorityBadge';
import { Hospital, UserCheck, Calendar, MapPin, Ticket } from 'lucide-react';

interface TokenCardProps {
  token: Token;
  onViewLiveQueue?: () => void;
}

export const TokenCard: React.FC<TokenCardProps> = ({ token, onViewLiveQueue }) => {
  return (
    <div className="bg-white border-2 border-sky-100 rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden max-w-lg mx-auto">
      {/* Top Banner Accent */}
      <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-sky-500 via-teal-500 to-blue-600" />

      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-dashed border-slate-200">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center font-bold text-xl shadow-xs">
            <Hospital className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg leading-tight">SmartCare Hospital</h3>
            <p className="text-xs font-semibold text-slate-500 flex items-center gap-1">
              <Ticket className="w-3.5 h-3.5 text-sky-500" /> Digital Queue Token
            </p>
          </div>
        </div>
        <StatusBadge status={token.status} size="md" />
      </div>

      {/* Large Token Display */}
      <div className="py-8 text-center bg-gradient-to-b from-sky-50/50 to-white rounded-2xl my-6 border border-sky-100/70">
        <span className="text-xs font-bold text-sky-800 uppercase tracking-widest block mb-1">
          Your Token Number
        </span>
        <div className="text-5xl sm:text-6xl font-black text-slate-900 tracking-tight font-mono drop-shadow-xs">
          {token.display_token}
        </div>
        <div className="mt-3 inline-block">
          <PriorityBadge priority={token.priority} />
        </div>
      </div>

      {/* Details list */}
      <div className="space-y-3 text-sm text-slate-600 mb-6 bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
        <div className="flex items-center justify-between">
          <span className="text-slate-500 flex items-center gap-1.5 font-medium">
            <Hospital className="w-4 h-4 text-sky-500" /> Department:
          </span>
          <span className="font-bold text-slate-900">{token.department?.name || 'General Medicine'}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-500 flex items-center gap-1.5 font-medium">
            <UserCheck className="w-4 h-4 text-sky-500" /> Doctor:
          </span>
          <span className="font-bold text-slate-900">{token.doctor?.profile?.full_name || 'Dr. Rajesh Sharma'}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-500 flex items-center gap-1.5 font-medium">
            <MapPin className="w-4 h-4 text-sky-500" /> Consultation Room:
          </span>
          <span className="font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200 text-xs">
            {token.doctor?.room_number || 'Room 102'}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-slate-500 flex items-center gap-1.5 font-medium">
            <Calendar className="w-4 h-4 text-sky-500" /> Queue Date:
          </span>
          <span className="font-medium text-slate-700">{token.queue_date}</span>
        </div>
      </div>

      {/* Action CTA */}
      {onViewLiveQueue && (
        <button
          onClick={onViewLiveQueue}
          className="w-full py-3.5 px-6 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-sm transition-all shadow-md shadow-sky-600/20 active:scale-[0.98] flex items-center justify-center gap-2"
        >
          Track Live Queue Turn →
        </button>
      )}
    </div>
  );
};
