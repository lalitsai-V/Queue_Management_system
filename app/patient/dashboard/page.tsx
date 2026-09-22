'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { MobileNav } from '@/components/layout/MobileNav';
import { QueueTimeline } from '@/components/queue/QueueTimeline';
import { WaitingTimeCard } from '@/components/queue/WaitingTimeCard';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { PriorityBadge } from '@/components/ui/PriorityBadge';
import { globalQueueStore } from '@/lib/queue/engine';
import { playHospitalChime } from '@/lib/audio/chime';
import { Ticket, Clock, Calendar, Bell, ArrowRight, Volume2, Sparkles, User, Building2, Activity, CheckCircle2, ChevronRight } from 'lucide-react';

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

  const recentActivity = [
    { token: 'Token A023', dept: 'General Medicine', time: '10:15 AM', date: 'Today', status: 'WAITING' as const },
    { token: 'Token B104', dept: 'Cardiology', time: '02:30 PM', date: '18 Sep 2026', status: 'COMPLETED' as const },
    { token: 'Token C078', dept: 'Dermatology', time: '11:00 AM', date: '15 Sep 2026', status: 'COMPLETED' as const },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans pb-16 md:pb-0">
      <PortalSidebar role="PATIENT" userName="Lalit" userEmail="lalit@example.com" />

      <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto space-y-8 max-w-7xl">
        {/* Top Header / Greeting */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Welcome back, Lalit 👋
              </h1>
            </div>
            <p className="text-slate-500 font-medium text-xs sm:text-sm mt-0.5">
              Take control of your healthcare journey.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSimulateCall}
              className="px-4 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Volume2 className="w-4 h-4 text-slate-950" /> Test Chime 🔔
            </button>

            <Link
              href="/patient/queue/get-token"
              className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-600/20 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Ticket className="w-4 h-4" /> Book Token
            </Link>
          </div>
        </div>

        {/* Turn Approaching Alert Banner */}
        {isCalled && (
          <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-3xl p-6 shadow-2xl animate-pulse flex flex-col sm:flex-row items-center justify-between gap-4 border-4 border-blue-300">
            <div className="flex items-center gap-4 text-center sm:text-left">
              <div className="w-14 h-14 rounded-2xl bg-white text-blue-600 flex items-center justify-center font-black text-2xl shadow-md shrink-0">
                <Volume2 className="w-8 h-8 animate-bounce" />
              </div>
              <div>
                <h2 className="text-2xl font-black">YOUR TURN HAS ARRIVED!</h2>
                <p className="text-xs font-bold text-blue-100 mt-1">
                  Please proceed immediately to Room 102 (General Medicine - Dr. Rajesh Sharma).
                </p>
              </div>
            </div>
            <Link
              href="/patient/queue"
              className="px-6 py-3 rounded-2xl bg-white text-blue-700 font-black text-xs hover:bg-blue-50 transition-all shadow-md shrink-0 cursor-pointer"
            >
              Live Queue View →
            </Link>
          </div>
        )}

        {/* TOP STATISTICS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Current Token */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl p-6 shadow-xl space-y-2 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold text-blue-200 uppercase tracking-wider">Current Token</span>
              <Ticket className="w-5 h-5 text-blue-200" />
            </div>
            <div className="text-4xl font-black font-mono tracking-tight">A023</div>
            <p className="text-xs text-blue-100 font-bold">General Medicine</p>
          </div>

          {/* Card 2: Waiting Time */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Waiting Time</span>
              <Clock className="w-5 h-5 text-cyan-600" />
            </div>
            <div className="text-4xl font-black text-slate-900 font-mono tracking-tight">~15 mins</div>
            <p className="text-xs text-slate-500 font-semibold">(2 patients ahead)</p>
          </div>

          {/* Card 3: Date */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Date</span>
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <div className="text-2xl font-black text-slate-900 tracking-tight">21 Sep 2026</div>
            <p className="text-xs text-slate-500 font-semibold">Today, 10:30 AM</p>
          </div>

          {/* Card 4: Status */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">Status</span>
              <Activity className="w-5 h-5 text-amber-600 animate-pulse" />
            </div>
            <div className="text-2xl font-black text-amber-600 tracking-tight">Waiting</div>
            <p className="text-xs text-emerald-600 font-bold">● Live Updates</p>
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="space-y-4">
          <h2 className="text-lg font-black text-slate-900 tracking-tight">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/patient/queue/get-token"
              className="bg-white p-6 rounded-3xl border border-slate-200/80 hover:border-blue-300 transition-all duration-300 shadow-xs hover:shadow-lg group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
                <Ticket className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">Book New Token</h3>
              <p className="text-xs text-slate-500 mt-1 font-medium">Get a token for your preferred department</p>
            </Link>

            <Link
              href="/patient/queue"
              className="bg-white p-6 rounded-3xl border border-slate-200/80 hover:border-blue-300 transition-all duration-300 shadow-xs hover:shadow-lg group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">View My Tokens</h3>
              <p className="text-xs text-slate-500 mt-1 font-medium">Check your upcoming and past tokens</p>
            </Link>

            <Link
              href="/patient/queue"
              className="bg-white p-6 rounded-3xl border border-slate-200/80 hover:border-blue-300 transition-all duration-300 shadow-xs hover:shadow-lg group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">Track Live Queue</h3>
              <p className="text-xs text-slate-500 mt-1 font-medium">See real-time queue status live</p>
            </Link>

            <Link
              href="/#departments"
              className="bg-white p-6 rounded-3xl border border-slate-200/80 hover:border-blue-300 transition-all duration-300 shadow-xs hover:shadow-lg group cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold mb-4 group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">Explore Departments</h3>
              <p className="text-xs text-slate-500 mt-1 font-medium">View all available departments</p>
            </Link>
          </div>
        </div>

        {/* CURRENT QUEUE LARGE CARD */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl border border-blue-200">
                <Ticket className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Queue</span>
                <h2 className="text-xl font-extrabold text-slate-900">General Medicine</h2>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <PriorityBadge priority="NORMAL" />
              <StatusBadge status="WAITING" size="md" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            <div className="bg-blue-50/80 p-4 rounded-2xl border border-blue-100">
              <span className="text-xs font-extrabold text-blue-700 uppercase">Your Token</span>
              <div className="text-3xl font-black text-blue-900 font-mono mt-1">A023</div>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <span className="text-xs font-extrabold text-slate-500 uppercase">Currently Serving</span>
              <div className="text-3xl font-black text-slate-900 font-mono mt-1">A021</div>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
              <span className="text-xs font-extrabold text-slate-500 uppercase">Your Position</span>
              <div className="text-3xl font-black text-slate-900 font-mono mt-1">2</div>
            </div>
            <div className="bg-cyan-50/80 p-4 rounded-2xl border border-cyan-100">
              <span className="text-xs font-extrabold text-cyan-700 uppercase">Estimated Wait</span>
              <div className="text-3xl font-black text-cyan-900 font-mono mt-1">15 min</div>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-xs font-extrabold text-slate-600">
              <span>Queue Progress</span>
              <span>75% Completed</span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full w-3/4 transition-all duration-500" />
            </div>
          </div>

          {/* Queue Timeline Component */}
          <div className="pt-2">
            <QueueTimeline tokens={tokens} currentTokenId={currentToken?.id} patientTokenId="GM-029" />
          </div>
        </div>

        {/* RECENT ACTIVITY TABLE */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-slate-900">Recent Activity</h2>
            <Link href="/patient/history" className="text-xs font-extrabold text-blue-600 hover:underline">
              View All →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 uppercase font-extrabold">
                  <th className="py-3 px-4">Token</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Time / Date</th>
                  <th className="py-3 px-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                {recentActivity.map((act, i) => (
                  <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-4 font-mono font-black text-slate-900">{act.token}</td>
                    <td className="py-4 px-4">{act.dept}</td>
                    <td className="py-4 px-4 text-slate-500">{act.time} ({act.date})</td>
                    <td className="py-4 px-4 text-right">
                      <StatusBadge status={act.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
