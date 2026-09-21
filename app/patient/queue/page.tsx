'use client';

import React, { useState, useEffect } from 'react';
import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { QueueTimeline } from '@/components/queue/QueueTimeline';
import { WaitingTimeCard } from '@/components/queue/WaitingTimeCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { PriorityBadge } from '@/components/ui/PriorityBadge';
import { globalQueueStore } from '@/lib/queue/engine';
import { playHospitalChime } from '@/lib/audio/chime';
import { Token } from '@/types/queue';
import { Volume2, MapPin, Stethoscope, RefreshCw, CheckCircle, Bell, Play, Zap } from 'lucide-react';

export default function PatientLiveQueuePage() {
  const [tokens, setTokens] = useState<Token[]>([...globalQueueStore.tokens]);
  const [lastUpdate, setLastUpdate] = useState('');
  const [audioEnabled, setAudioEnabled] = useState(true);

  useEffect(() => {
    setLastUpdate(new Date().toLocaleTimeString());
  }, []);

  // Patient token (GM-029)
  const patientToken = tokens.find((t) => t.display_token === 'GM-029') || tokens[tokens.length - 1];
  const currentToken = tokens.find((t) => t.status === 'IN_CONSULTATION') || tokens[0];

  const { patientsAhead, position } = globalQueueStore.getPatientsAhead(patientToken?.display_token || 'GM-029', 'doc-sharma');
  const estimatedWait = globalQueueStore.calculateWaitTimeMinutes(patientsAhead, 8);

  const isCalled = patientToken?.status === 'CALLED';
  const isInConsultation = patientToken?.status === 'IN_CONSULTATION';
  const isCompleted = patientToken?.status === 'COMPLETED';

  const refreshState = () => {
    setTokens([...globalQueueStore.tokens]);
    setLastUpdate(new Date().toLocaleTimeString());
  };

  // Poll state to emulate realtime updates if fallback active
  useEffect(() => {
    const interval = setInterval(() => {
      refreshState();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      <PortalSidebar role="PATIENT" userName="Rohan Mehta" userEmail="rohan.mehta@gmail.com" />

      <main className="flex-1 p-6 lg:p-10 overflow-y-auto space-y-8 max-w-7xl">
        {/* Page Title Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200/80 w-fit">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              Live Queue Tracker
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-2">
              Patient Real-Time Queue
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setAudioEnabled(!audioEnabled)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
                audioEnabled ? 'bg-sky-50 text-sky-700 border-sky-200' : 'bg-slate-100 text-slate-500 border-slate-200'
              }`}
            >
              <Volume2 className={`w-4 h-4 ${audioEnabled ? 'text-sky-600 animate-pulse' : 'text-slate-400'}`} />
              {audioEnabled ? 'Audio Alert ON' : 'Audio OFF'}
            </button>

            <button
              onClick={refreshState}
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs flex items-center gap-2 shadow-xs transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5 text-sky-600" /> Refreshed: <span suppressHydrationWarning>{lastUpdate || 'Just now'}</span>
            </button>
          </div>
        </div>

        {/* CALLED FULL SCREEN BANNER */}
        {isCalled && (
          <div className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white rounded-3xl p-8 shadow-2xl border-4 border-sky-300 animate-pulse text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-white text-sky-600 flex items-center justify-center font-black text-3xl mx-auto shadow-xl">
              <Volume2 className="w-10 h-10 animate-bounce" />
            </div>
            <span className="px-4 py-1.5 rounded-full bg-white/20 text-white font-extrabold text-xs uppercase tracking-widest inline-block">
              NOW SERVING YOUR TOKEN
            </span>
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
              PLEASE PROCEED TO CONSULTATION ROOM 102
            </h2>
            <p className="text-base text-sky-100 font-bold max-w-xl mx-auto">
              Dr. Rajesh Sharma is ready for your consultation. Please bring your token slip or digital screen.
            </p>
          </div>
        )}

        {/* IN CONSULTATION BANNER */}
        {isInConsultation && (
          <div className="bg-emerald-600 text-white rounded-3xl p-6 shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/20 text-white flex items-center justify-center font-bold text-xl shrink-0">
              <Stethoscope className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold">Consultation in Progress</h3>
              <p className="text-xs text-emerald-100 font-medium">
                You are currently inside Room 102 with Dr. Rajesh Sharma.
              </p>
            </div>
          </div>
        )}

        {/* COMPLETED BANNER */}
        {isCompleted && (
          <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-bold text-xl shrink-0">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold">Consultation Completed</h3>
              <p className="text-xs text-slate-300 font-medium">
                Thank you for visiting SmartCare Hospital. Take care of your health!
              </p>
            </div>
          </div>
        )}

        {/* MAIN VISUAL QUEUE CARD */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-8">
          {/* Header Department Doctor Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-2xl border border-sky-200 shrink-0">
                <Stethoscope className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                  DEPARTMENT
                </span>
                <h3 className="text-2xl font-black text-slate-900">General Medicine</h3>
                <p className="text-xs text-slate-500 font-medium mt-0.5">
                  Attending Physician: <strong className="text-slate-800">Dr. Rajesh Sharma</strong>
                </p>
              </div>
            </div>

            <div className="flex items-center justify-start md:justify-end gap-3">
              <div className="text-right hidden md:block">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                  Room Location
                </span>
                <span className="text-sm font-extrabold text-sky-700 bg-sky-50 px-3 py-1 rounded-lg border border-sky-200">
                  Room 102 (First Floor)
                </span>
              </div>
            </div>
          </div>

          {/* Tokens Big Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
            <div className="bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
              <span className="text-xs font-extrabold uppercase tracking-widest text-sky-100 block mb-1">
                YOUR TOKEN NUMBER
              </span>
              <div className="text-6xl font-black font-mono tracking-tight my-2">
                {patientToken?.display_token || 'GM-029'}
              </div>
              <div className="inline-block mt-2">
                <StatusBadge status={patientToken?.status || 'WAITING'} size="lg" />
              </div>
            </div>

            <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden flex flex-col justify-center">
              <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400 block mb-1">
                CURRENT TOKEN IN ROOM
              </span>
              <div className="text-6xl font-black font-mono tracking-tight my-2 text-emerald-400">
                {currentToken?.display_token || 'GM-024'}
              </div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                ● Now Consulting
              </span>
            </div>
          </div>

          {/* Metrics */}
          <WaitingTimeCard
            patientsAhead={patientsAhead}
            estimatedWaitMinutes={estimatedWait}
            position={position}
          />

          {/* Visual Queue Timeline */}
          <div className="pt-4 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                Full Queue Sequence Timeline
              </h4>
              <span className="text-xs text-slate-500 font-medium">Click any node to inspect details</span>
            </div>

            <QueueTimeline
              tokens={tokens}
              currentTokenId={currentToken?.id}
              patientTokenId={patientToken?.display_token}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
