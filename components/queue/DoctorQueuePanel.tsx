'use client';

import React from 'react';
import { Token } from '@/types/queue';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { PriorityBadge } from '@/components/ui/PriorityBadge';
import { Volume2, Play, CheckCircle, SkipForward, UserX, Pause, RefreshCw, Zap } from 'lucide-react';

interface DoctorQueuePanelProps {
  currentPatientToken?: Token | null;
  isQueuePaused: boolean;
  onCallNext: () => void;
  onStartConsultation: () => void;
  onCompleteConsultation: () => void;
  onSkipPatient: () => void;
  onMarkAbsent: () => void;
  onRecallPatient: () => void;
  onTogglePauseQueue: () => void;
  waitingCount: number;
}

export const DoctorQueuePanel: React.FC<DoctorQueuePanelProps> = ({
  currentPatientToken,
  isQueuePaused,
  onCallNext,
  onStartConsultation,
  onCompleteConsultation,
  onSkipPatient,
  onMarkAbsent,
  onRecallPatient,
  onTogglePauseQueue,
  waitingCount,
}) => {
  const isCalled = currentPatientToken?.status === 'CALLED';
  const isInConsultation = currentPatientToken?.status === 'IN_CONSULTATION';

  return (
    <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-lg space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <span className="text-xs font-black text-sky-600 uppercase tracking-widest bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200">
            Clinical Telemetry
          </span>
          <h2 className="text-2xl font-black text-slate-900 mt-2">Doctor Control Deck</h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onTogglePauseQueue}
            className={`px-4 py-2.5 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all shadow-xs border ${
              isQueuePaused
                ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                : 'bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100'
            }`}
          >
            {isQueuePaused ? <Play className="w-4 h-4 fill-emerald-600" /> : <Pause className="w-4 h-4" />}
            {isQueuePaused ? 'Resume Queue' : 'Pause Queue'}
          </button>

          <span className="px-3.5 py-2.5 rounded-xl bg-slate-900 text-white font-extrabold text-xs shadow-xs">
            {waitingCount} Waiting
          </span>
        </div>
      </div>

      {/* Current Patient Highlight Card */}
      <div>
        {currentPatientToken ? (
          <div className={`p-6 sm:p-8 rounded-3xl border-2 transition-all shadow-md ${
            isCalled 
              ? 'bg-gradient-to-r from-sky-50 via-blue-50 to-indigo-50 border-sky-400 ring-4 ring-sky-100' 
              : isInConsultation 
              ? 'bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-100 border-emerald-400 ring-4 ring-emerald-100' 
              : 'bg-slate-50 border-slate-200'
          }`}>
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest block">
                  Active Consultation Patient
                </span>
                <div className="text-5xl font-black text-slate-900 font-mono mt-1 tracking-tight">
                  {currentPatientToken.display_token}
                </div>
                <div className="text-xl font-extrabold text-slate-800 mt-2">
                  {currentPatientToken.patient?.profile?.full_name || 'Rohan Mehta'}
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  <PriorityBadge priority={currentPatientToken.priority} />
                  <span className="text-xs text-slate-600 font-semibold bg-white/80 px-2.5 py-1 rounded-lg border border-slate-200">
                    Phone: {currentPatientToken.patient?.profile?.phone || '+91 98200 11223'}
                  </span>
                  <span className="text-xs text-slate-600 font-semibold bg-white/80 px-2.5 py-1 rounded-lg border border-slate-200">
                    DOB: {currentPatientToken.patient?.date_of_birth || '1990-05-15'}
                  </span>
                </div>
              </div>

              <StatusBadge status={currentPatientToken.status} size="lg" />
            </div>
          </div>
        ) : (
          <div className="p-8 text-center bg-slate-50 rounded-3xl border border-dashed border-slate-300 space-y-2">
            <p className="text-slate-700 font-black text-lg">No patient currently inside consultation room</p>
            <p className="text-xs text-slate-500 font-medium">Click "CALL NEXT" below to announce the highest priority waiting patient.</p>
          </div>
        )}
      </div>

      {/* Control Action Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <button
          onClick={onCallNext}
          disabled={isQueuePaused || isInConsultation}
          className="py-4 px-4 rounded-2xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 disabled:opacity-40 text-white font-black text-xs tracking-wider transition-all shadow-md shadow-sky-600/20 flex items-center justify-center gap-2 active:scale-95"
        >
          <Volume2 className="w-4 h-4" />
          CALL NEXT 🔔
        </button>

        <button
          onClick={onStartConsultation}
          disabled={!isCalled}
          className="py-4 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 disabled:opacity-40 text-white font-black text-xs tracking-wider transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 active:scale-95"
        >
          <Play className="w-4 h-4" />
          START CONSULTATION
        </button>

        <button
          onClick={onCompleteConsultation}
          disabled={!isInConsultation && !isCalled}
          className="py-4 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-white font-black text-xs tracking-wider transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
        >
          <CheckCircle className="w-4 h-4" />
          COMPLETE
        </button>

        <button
          onClick={onRecallPatient}
          disabled={!isCalled}
          className="py-4 px-4 rounded-2xl bg-amber-50 hover:bg-amber-100 border-2 border-amber-300 text-amber-800 disabled:opacity-40 font-black text-xs tracking-wider transition-all flex items-center justify-center gap-2 active:scale-95"
        >
          <RefreshCw className="w-4 h-4" />
          RECALL 🔔
        </button>
      </div>

      <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-slate-100">
        <button
          onClick={onSkipPatient}
          disabled={!currentPatientToken}
          className="text-xs font-extrabold text-orange-700 hover:text-orange-800 disabled:opacity-40 flex items-center gap-1.5 px-3.5 py-2 rounded-xl hover:bg-orange-50 border border-transparent hover:border-orange-200 transition-all"
        >
          <SkipForward className="w-4 h-4" /> Skip Patient
        </button>

        <button
          onClick={onMarkAbsent}
          disabled={!currentPatientToken}
          className="text-xs font-extrabold text-rose-700 hover:text-rose-800 disabled:opacity-40 flex items-center gap-1.5 px-3.5 py-2 rounded-xl hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-all"
        >
          <UserX className="w-4 h-4" /> Mark Absent
        </button>
      </div>
    </div>
  );
};
