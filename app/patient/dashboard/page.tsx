'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { QueueTimeline } from '@/components/queue/QueueTimeline';
import { WaitingTimeCard } from '@/components/queue/WaitingTimeCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { PriorityBadge } from '@/components/ui/PriorityBadge';
import { globalQueueStore } from '@/lib/queue/engine';
import { playHospitalChime } from '@/lib/audio/chime';
import { Ticket, Clock, Calendar, Bell, ArrowRight, Volume2, Sparkles } from 'lucide-react';

export default function PatientDashboard() {
  const [tokens, setTokens] = useState([...globalQueueStore.tokens]);
  const patientToken = tokens.find((t) => t.display_token === 'GM-029') || tokens[5];
  const currentToken = tokens.find((t) => t.status === 'IN_CONSULTATION') || tokens[0];

  const { patientsAhead, position } = globalQueueStore.getPatientsAhead(patientToken?.display_token || 'GM-029', 'doc-sharma');
  const estimatedWait = globalQueueStore.calculateWaitTimeMinutes(patientsAhead, 8);

  const isCalled = patientToken?.status === 'CALLED';

  const handleSimulateCall = () => {
    if (patientToken) {
      patientToken.status = 'CALLED';
      setTokens([...tokens]);
      playHospitalChime();
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      <PortalSidebar role="PATIENT" userName="Rohan Mehta" userEmail="rohan.mehta@gmail.com" />

      <main className="flex-1 p-6 lg:p-10 overflow-y-auto space-y-8 max-w-7xl">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-700 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 space-y-2">
            <span className="px-3 py-1 rounded-full bg-white/20 text-white font-bold text-xs backdrop-blur-md inline-flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" /> Hospital Patient Portal
            </span>
            <h1 className="text-3xl font-black tracking-tight">Good Morning, Rohan Mehta!</h1>
            <p className="text-sky-100 text-sm font-medium">
              Track your token live and manage your hospital visits conveniently.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-3 shrink-0">
            <button
              onClick={handleSimulateCall}
              className="px-4 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-lg flex items-center gap-1.5 transition-all hover:scale-105"
            >
              <Volume2 className="w-4 h-4 text-slate-950" /> Test Call Chime 🔔
            </button>

            <Link
              href="/patient/queue/get-token"
              className="px-6 py-3 rounded-2xl bg-white hover:bg-sky-50 text-slate-900 font-extrabold text-xs shadow-lg flex items-center gap-2 transition-all hover:scale-105"
            >
              <Ticket className="w-4 h-4 text-sky-600" /> Get New Token
            </Link>
          </div>
        </div>

        {/* Called Alert Modal Banner if Patient Token Called */}
        {isCalled && (
          <div className="bg-sky-500 text-white rounded-3xl p-6 shadow-2xl animate-pulse flex flex-col sm:flex-row items-center justify-between gap-4 border-4 border-sky-300">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-14 h-14 rounded-2xl bg-white text-sky-600 flex items-center justify-center font-black text-2xl shadow-md shrink-0">
                <Volume2 className="w-8 h-8 animate-bounce" />
              </div>
              <div>
                <h2 className="text-2xl font-black">YOUR TURN IS HERE!</h2>
                <p className="text-sm font-bold text-sky-100">
                  Please proceed immediately to Consultation Room 102 (Dr. Rajesh Sharma).
                </p>
              </div>
            </div>
            <Link
              href="/patient/queue"
              className="px-6 py-3 rounded-2xl bg-white text-sky-700 font-black text-xs hover:bg-sky-50 transition-all shadow-md shrink-0"
            >
              View Room Guide →
            </Link>
          </div>
        )}

        {/* MAIN ACTIVE QUEUE CARD */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold text-xl border border-sky-200">
                <Ticket className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Ticket</span>
                <h2 className="text-xl font-extrabold text-slate-900">General Medicine Queue</h2>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <PriorityBadge priority={patientToken?.priority || 'NORMAL'} />
              <StatusBadge status={patientToken?.status || 'WAITING'} size="md" />
            </div>
          </div>

          {/* Token Numbers Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
            <div className="bg-gradient-to-br from-sky-50 to-blue-50/50 rounded-2xl p-6 border border-sky-200/80">
              <span className="text-xs font-bold text-sky-800 uppercase tracking-widest">YOUR TOKEN</span>
              <div className="text-5xl font-black text-slate-900 font-mono mt-2 tracking-tight">
                {patientToken?.display_token || 'GM-029'}
              </div>
              <p className="text-xs text-slate-500 font-medium mt-1">Dr. Rajesh Sharma (Room 102)</p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">CURRENT TOKEN SERVING</span>
              <div className="text-5xl font-black text-slate-900 font-mono mt-2 tracking-tight">
                {currentToken?.display_token || 'GM-024'}
              </div>
              <p className="text-xs text-emerald-600 font-bold mt-1">● In Consultation Now</p>
            </div>
          </div>

          {/* Waiting Metrics Cards */}
          <WaitingTimeCard
            patientsAhead={patientsAhead}
            estimatedWaitMinutes={estimatedWait}
            position={position}
          />

          {/* Queue Timeline */}
          <div className="pt-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                Live Queue Progress Timeline
              </span>
              <Link href="/patient/queue" className="text-xs font-bold text-sky-600 hover:underline">
                Full Queue View →
              </Link>
            </div>
            <QueueTimeline tokens={tokens} currentTokenId={currentToken?.id} patientTokenId={patientToken?.display_token} />
          </div>
        </div>

        {/* QUICK NAVIGATION GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            href="/patient/queue/get-token"
            className="bg-white p-6 rounded-3xl border border-slate-200/80 hover:border-sky-300 transition-all shadow-xs hover:shadow-lg group"
          >
            <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
              <Ticket className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">Get New Token</h3>
            <p className="text-xs text-slate-500 mt-1">Generate a new queue token for any department</p>
          </Link>

          <Link
            href="/patient/queue"
            className="bg-white p-6 rounded-3xl border border-slate-200/80 hover:border-sky-300 transition-all shadow-xs hover:shadow-lg group"
          >
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">My Live Queue</h3>
            <p className="text-xs text-slate-500 mt-1">Track your turn in real time with auto updates</p>
          </Link>

          <Link
            href="/patient/appointments"
            className="bg-white p-6 rounded-3xl border border-slate-200/80 hover:border-sky-300 transition-all shadow-xs hover:shadow-lg group"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">Appointments</h3>
            <p className="text-xs text-slate-500 mt-1">View supporting scheduled hospital visits</p>
          </Link>

          <Link
            href="/patient/notifications"
            className="bg-white p-6 rounded-3xl border border-slate-200/80 hover:border-sky-300 transition-all shadow-xs hover:shadow-lg group"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
              <Bell className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">Notifications</h3>
            <p className="text-xs text-slate-500 mt-1">View queue alerts and turn notifications</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
