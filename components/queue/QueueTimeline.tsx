'use client';

import React, { useState } from 'react';
import { Token } from '@/types/queue';
import { User, CheckCircle2, Volume2, Info, Zap } from 'lucide-react';
import { PriorityBadge } from '@/components/ui/PriorityBadge';

interface QueueTimelineProps {
  tokens: Token[];
  currentTokenId?: string | null;
  patientTokenId?: string | null;
  onNodeClick?: (token: Token) => void;
}

export const QueueTimeline: React.FC<QueueTimelineProps> = ({
  tokens,
  currentTokenId,
  patientTokenId,
  onNodeClick,
}) => {
  const [selectedToken, setSelectedToken] = useState<Token | null>(null);

  if (!tokens || tokens.length === 0) {
    return (
      <div className="p-8 text-center text-slate-500 bg-slate-50/80 rounded-2xl border border-dashed border-slate-200">
        No active tokens in timeline.
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <div className="w-full overflow-x-auto py-6 px-4 bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 rounded-3xl border border-slate-800 shadow-xl">
        <div className="flex items-center min-w-[700px] justify-between relative py-4 px-6">
          {/* Animated Glow Connecting Bar */}
          <div className="absolute top-1/2 left-10 right-10 h-1.5 -translate-y-1/2 bg-slate-800 rounded-full z-0 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-sky-500 via-teal-400 to-emerald-500 w-full animate-pulse opacity-80" />
          </div>

          {tokens.map((token, index) => {
            const isCurrent = token.id === currentTokenId || token.status === 'IN_CONSULTATION';
            const isCalled = token.status === 'CALLED';
            const isCompleted = token.status === 'COMPLETED';
            const isPatientToken = token.id === patientTokenId || token.display_token === patientTokenId;

            let nodeClass = 'bg-slate-800 border-2 border-slate-700 text-slate-300 hover:border-sky-400 hover:scale-110';
            let badgeBg = 'bg-slate-800 text-slate-400';
            let statusLabel = 'Waiting';

            if (isCompleted) {
              nodeClass = 'bg-slate-900 border-2 border-slate-700 text-slate-500';
              badgeBg = 'bg-slate-800 text-slate-500';
              statusLabel = 'Completed';
            } else if (isCurrent) {
              nodeClass = 'bg-gradient-to-br from-emerald-500 to-teal-600 border-4 border-emerald-300 text-white shadow-lg shadow-emerald-500/30 scale-110 ring-4 ring-emerald-500/20';
              badgeBg = 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30';
              statusLabel = 'In Room';
            } else if (isCalled) {
              nodeClass = 'bg-gradient-to-br from-sky-500 to-blue-600 border-4 border-sky-300 text-white shadow-xl shadow-sky-500/40 scale-125 animate-bounce ring-4 ring-sky-500/30';
              badgeBg = 'bg-sky-500/30 text-sky-200 border border-sky-400';
              statusLabel = 'CALLED!';
            } else if (isPatientToken) {
              nodeClass = 'bg-gradient-to-br from-sky-600 to-indigo-600 border-4 border-sky-300 text-white shadow-lg shadow-sky-600/30 scale-110 ring-4 ring-sky-500/20';
              badgeBg = 'bg-sky-500/20 text-sky-300 border border-sky-400/40 font-black';
              statusLabel = 'YOU';
            }

            return (
              <div
                key={token.id}
                onClick={() => {
                  setSelectedToken(token);
                  if (onNodeClick) onNodeClick(token);
                }}
                className="relative z-10 flex flex-col items-center cursor-pointer group transition-all"
              >
                {/* Node circle */}
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xs transition-all ${nodeClass}`}>
                  {isCompleted ? (
                    <CheckCircle2 className="w-6 h-6 text-slate-500" />
                  ) : isCalled ? (
                    <Volume2 className="w-6 h-6 animate-pulse text-white" />
                  ) : isCurrent ? (
                    <User className="w-6 h-6 text-white" />
                  ) : (
                    <span className="font-mono text-sm tracking-tight">{token.display_token}</span>
                  )}
                </div>

                {/* Tag below */}
                <div className="mt-3 text-center space-y-1">
                  <span className={`text-xs font-black block font-mono ${isPatientToken ? 'text-sky-400' : isCurrent ? 'text-emerald-400' : 'text-slate-200'}`}>
                    {token.display_token}
                  </span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${badgeBg}`}>
                    {isPatientToken && <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />}
                    {statusLabel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Token Details Popover Card */}
      {selectedToken && (
        <div className="bg-white p-4 rounded-2xl border border-sky-200 shadow-md flex items-center justify-between animate-in fade-in slide-in-from-bottom duration-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center font-black font-mono text-sm">
              {selectedToken.display_token}
            </div>
            <div>
              <h4 className="text-sm font-extrabold text-slate-900">
                {selectedToken.patient?.profile?.full_name || 'Patient'}
              </h4>
              <p className="text-xs text-slate-500 font-medium">
                Registered at {new Date(selectedToken.created_at).toLocaleTimeString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <PriorityBadge priority={selectedToken.priority} />
            <button
              onClick={() => setSelectedToken(null)}
              className="text-xs font-bold text-slate-400 hover:text-slate-700 px-2 py-1 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
