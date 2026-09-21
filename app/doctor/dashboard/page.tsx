'use client';

import React, { useState } from 'react';
import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { DoctorQueuePanel } from '@/components/queue/DoctorQueuePanel';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { PriorityBadge } from '@/components/ui/PriorityBadge';
import { globalQueueStore } from '@/lib/queue/engine';
import { playHospitalChime } from '@/lib/audio/chime';
import { Token } from '@/types/queue';
import { Stethoscope, Users, CheckCircle2, Clock, Play, Pause, RefreshCw, Search, Volume2 } from 'lucide-react';

export default function DoctorDashboardPage() {
  const [tokens, setTokens] = useState<Token[]>([...globalQueueStore.getTokensForDoctor('doc-sharma')]);
  const [isPaused, setIsPaused] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const activeToken = tokens.find((t) => t.status === 'CALLED' || t.status === 'IN_CONSULTATION');
  const waitingTokens = tokens.filter((t) => t.status === 'WAITING');
  const completedTokens = tokens.filter((t) => t.status === 'COMPLETED');
  const skippedTokens = tokens.filter((t) => t.status === 'SKIPPED' || t.status === 'ABSENT');

  const triggerMessage = (msg: string) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(null), 3500);
  };

  const handleCallNext = () => {
    const res = globalQueueStore.callNextPatient('doc-sharma');
    if (res.success && res.token) {
      setTokens([...globalQueueStore.getTokensForDoctor('doc-sharma')]);
      playHospitalChime();
      triggerMessage(`Called next patient: ${res.token.display_token} (Audio Bell Chime Sounded 🔔)`);
    } else {
      triggerMessage(res.message || 'No waiting patients in queue');
    }
  };

  const handleStartConsultation = () => {
    if (activeToken) {
      globalQueueStore.startConsultation(activeToken.id);
      setTokens([...globalQueueStore.getTokensForDoctor('doc-sharma')]);
      triggerMessage(`Started consultation for ${activeToken.display_token}`);
    }
  };

  const handleCompleteConsultation = () => {
    if (activeToken) {
      globalQueueStore.completeConsultation(activeToken.id);
      setTokens([...globalQueueStore.getTokensForDoctor('doc-sharma')]);
      triggerMessage(`Consultation completed for ${activeToken.display_token}`);
    }
  };

  const handleSkipPatient = () => {
    if (activeToken) {
      globalQueueStore.updateTokenStatus(activeToken.id, 'SKIPPED');
      setTokens([...globalQueueStore.getTokensForDoctor('doc-sharma')]);
      triggerMessage(`Token ${activeToken.display_token} skipped`);
    }
  };

  const handleMarkAbsent = () => {
    if (activeToken) {
      globalQueueStore.updateTokenStatus(activeToken.id, 'ABSENT');
      setTokens([...globalQueueStore.getTokensForDoctor('doc-sharma')]);
      triggerMessage(`Token ${activeToken.display_token} marked absent`);
    }
  };

  const handleRecallPatient = () => {
    if (activeToken) {
      playHospitalChime();
      triggerMessage(`Re-broadcasting audio chime for ${activeToken.display_token} 🔔`);
    }
  };

  const handleTogglePause = () => {
    const paused = globalQueueStore.toggleQueuePause('doc-sharma');
    setIsPaused(paused);
    triggerMessage(paused ? 'Queue temporarily paused' : 'Queue resumed');
  };

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      <PortalSidebar role="DOCTOR" userName="Dr. Rajesh Sharma" userEmail="dr.sharma@hospital.org" />

      <main className="flex-1 p-6 lg:p-10 overflow-y-auto space-y-8 max-w-7xl">
        {/* Doctor Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-white flex items-center justify-center font-bold text-2xl shadow-md">
              <Stethoscope className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">General Medicine</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">
                  ● ACTIVE ROOM 102
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Dr. Rajesh Sharma</h1>
              <p className="text-xs text-slate-500 font-medium">Attending Physician • General Medicine</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-bold text-slate-400 block uppercase">Queue Date</span>
            <span suppressHydrationWarning className="text-sm font-extrabold text-slate-800">{new Date().toDateString()}</span>
          </div>
        </div>

        {/* Action Message Toast */}
        {actionMessage && (
          <div className="bg-slate-900 text-white px-6 py-3.5 rounded-2xl font-bold text-xs shadow-xl animate-in fade-in slide-in-from-top duration-200 flex items-center justify-between border border-slate-700">
            <span className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-sky-400" /> {actionMessage}
            </span>
            <span className="text-sky-400 text-[11px]">Realtime broadcast sent</span>
          </div>
        )}

        {/* Key Metrics Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Current Token</span>
            <div className="text-3xl font-black text-sky-700 font-mono mt-1">
              {activeToken?.display_token || '--'}
            </div>
            <span className="text-[11px] font-bold text-slate-500 block mt-1">Active in Room</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Waiting Patients</span>
            <div className="text-3xl font-black text-slate-900 mt-1">{waitingTokens.length}</div>
            <span className="text-[11px] font-bold text-amber-600 block mt-1">In Queue</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Completed Today</span>
            <div className="text-3xl font-black text-emerald-600 mt-1">{completedTokens.length + 18}</div>
            <span className="text-[11px] font-bold text-emerald-600 block mt-1">Consultations</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Skipped / Absent</span>
            <div className="text-3xl font-black text-slate-700 mt-1">{skippedTokens.length + 2}</div>
            <span className="text-[11px] font-bold text-slate-500 block mt-1">Recorded</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs col-span-2 lg:col-span-1">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Avg Pace</span>
            <div className="text-3xl font-black text-slate-900 mt-1">8 min</div>
            <span className="text-[11px] font-bold text-slate-500 block mt-1">Per Patient</span>
          </div>
        </div>

        {/* DOCTOR CONTROL PANEL */}
        <DoctorQueuePanel
          currentPatientToken={activeToken}
          isQueuePaused={isPaused}
          onCallNext={handleCallNext}
          onStartConsultation={handleStartConsultation}
          onCompleteConsultation={handleCompleteConsultation}
          onSkipPatient={handleSkipPatient}
          onMarkAbsent={handleMarkAbsent}
          onRecallPatient={handleRecallPatient}
          onTogglePauseQueue={handleTogglePause}
          waitingCount={waitingTokens.length}
        />

        {/* TODAY'S QUEUE TABLE */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-extrabold text-slate-900">Today's Assigned Patient Queue</h3>
            <span className="text-xs font-bold text-slate-500">Sorted by Priority & Time</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-extrabold">
                <tr>
                  <th className="p-3.5">Token</th>
                  <th className="p-3.5">Patient Name</th>
                  <th className="p-3.5">Priority</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Created At</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
                {tokens.map((token) => (
                  <tr key={token.id} className={token.id === activeToken?.id ? 'bg-sky-50/60 font-bold' : 'hover:bg-slate-50/50'}>
                    <td className="p-3.5 font-mono font-black text-slate-900 text-sm">{token.display_token}</td>
                    <td className="p-3.5 font-bold">{token.patient?.profile?.full_name || 'Patient Name'}</td>
                    <td className="p-3.5">
                      <PriorityBadge priority={token.priority} />
                    </td>
                    <td className="p-3.5">
                      <StatusBadge status={token.status} size="sm" />
                    </td>
                    <td className="p-3.5 text-slate-500">{new Date(token.created_at).toLocaleTimeString()}</td>
                    <td className="p-3.5 text-right">
                      {token.status === 'WAITING' && (
                        <button
                          onClick={() => {
                            globalQueueStore.updateTokenStatus(token.id, 'CALLED');
                            token.status = 'CALLED';
                            setTokens([...globalQueueStore.getTokensForDoctor('doc-sharma')]);
                            playHospitalChime();
                            triggerMessage(`Called ${token.display_token} 🔔`);
                          }}
                          className="px-3 py-1.5 bg-sky-600 text-white rounded-xl text-xs font-black hover:bg-sky-700 shadow-xs"
                        >
                          Call Token 🔔
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
