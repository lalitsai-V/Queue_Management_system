import React from 'react';
import { Clock, Users, Hash, AlertCircle } from 'lucide-react';

interface WaitingTimeCardProps {
  patientsAhead: number;
  estimatedWaitMinutes: number;
  position: number;
  isPaused?: boolean;
}

export const WaitingTimeCard: React.FC<WaitingTimeCardProps> = ({
  patientsAhead,
  estimatedWaitMinutes,
  position,
  isPaused = false,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {/* Estimated Wait Card */}
      <div className="bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-200/80 rounded-2xl p-5 shadow-xs relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-sky-800 uppercase tracking-wider">Estimated Wait</span>
          <div className="w-9 h-9 rounded-xl bg-sky-600 text-white flex items-center justify-center shadow-xs">
            <Clock className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3 flex items-baseline gap-1.5">
          <span className="text-3xl font-extrabold text-slate-900">{isPaused ? '--' : estimatedWaitMinutes}</span>
          <span className="text-sm font-semibold text-slate-600">min</span>
        </div>
        <p className="text-xs text-sky-700/80 mt-1 flex items-center gap-1 font-medium">
          {isPaused ? (
            <span className="text-amber-700 font-bold flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> Queue Temporarily Paused
            </span>
          ) : (
            'Calculated live from queue pace'
          )}
        </p>
      </div>

      {/* Patients Ahead Card */}
      <div className="bg-gradient-to-br from-teal-50 to-emerald-50 border border-teal-200/80 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">Patients Ahead</span>
          <div className="w-9 h-9 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-xs">
            <Users className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3">
          <span className="text-3xl font-extrabold text-slate-900">{patientsAhead}</span>
        </div>
        <p className="text-xs text-teal-700/80 mt-1 font-medium">
          {patientsAhead === 0 ? 'You are next in line!' : `${patientsAhead} patients before your turn`}
        </p>
      </div>

      {/* Queue Position Card */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 border border-slate-200 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Queue Position</span>
          <div className="w-9 h-9 rounded-xl bg-slate-800 text-white flex items-center justify-center shadow-xs">
            <Hash className="w-5 h-5" />
          </div>
        </div>
        <div className="mt-3">
          <span className="text-3xl font-extrabold text-slate-900">#{position}</span>
        </div>
        <p className="text-xs text-slate-500 mt-1 font-medium">Your index in active queue</p>
      </div>
    </div>
  );
};
