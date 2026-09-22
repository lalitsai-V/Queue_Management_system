'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { MobileNav } from '@/components/layout/MobileNav';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Building2, Users, Clock, Play, Pause, Tv } from 'lucide-react';

export default function AdminLiveQueuesPage() {
  const [queues, setQueues] = useState([
    {
      dept: 'General Medicine',
      code: 'GM',
      doctor: 'Dr. Rajesh Sharma',
      room: 'Room 102',
      currentToken: 'A023',
      waitingCount: 12,
      isPaused: false,
      avgWait: '15 min',
    },
    {
      dept: 'Cardiology',
      code: 'CAR',
      doctor: 'Dr. Anita Kumar',
      room: 'Room 205',
      currentToken: 'B104',
      waitingCount: 7,
      isPaused: false,
      avgWait: '20 min',
    },
    {
      dept: 'Orthopedics',
      code: 'ORT',
      doctor: 'Dr. Vikram Verma',
      room: 'Room 304',
      currentToken: 'C078',
      waitingCount: 5,
      isPaused: false,
      avgWait: '18 min',
    },
    {
      dept: 'Pediatrics',
      code: 'PED',
      doctor: 'Dr. Sunita Gupta',
      room: 'Room 108',
      currentToken: 'D014',
      waitingCount: 9,
      isPaused: false,
      avgWait: '12 min',
    },
  ]);

  const togglePauseQueue = (code: string) => {
    setQueues((prev) =>
      prev.map((q) => (q.code === code ? { ...q, isPaused: !q.isPaused } : q))
    );
  };

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans pb-16 md:pb-0">
      <PortalSidebar role="ADMIN" userName="Hospital Admin" userEmail="admin@smartcare.org" />

      <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto space-y-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-extrabold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 w-fit">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              Real-Time OPD Monitor
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-2">
              All Active Department Queues
            </h1>
          </div>

          <Link
            href="/queue-display"
            target="_blank"
            className="px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs flex items-center gap-2 shadow-md"
          >
            <Tv className="w-4 h-4 text-cyan-400" /> Open TV Display
          </Link>
        </div>

        {/* Queues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {queues.map((q) => (
            <div
              key={q.code}
              className={`bg-white rounded-3xl p-6 border-2 transition-all shadow-md space-y-6 ${
                q.isPaused ? 'border-amber-300 bg-amber-50/20' : 'border-slate-200/80 hover:border-blue-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-3 py-1 rounded-xl bg-slate-900 text-white font-mono text-xs font-black">
                    {q.code}
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-2">{q.dept}</h3>
                  <p className="text-xs text-slate-500 font-bold">{q.doctor} ({q.room})</p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                    q.isPaused
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  }`}
                >
                  {q.isPaused ? 'PAUSED' : 'ACTIVE'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest block">Current Token</span>
                  <div className="text-3xl font-black text-slate-900 font-mono mt-1">{q.currentToken}</div>
                </div>

                <div className="bg-blue-50 p-4 rounded-2xl border border-blue-100">
                  <span className="text-xs font-extrabold text-blue-700 uppercase tracking-widest block">Waiting</span>
                  <div className="text-3xl font-black text-blue-900 font-mono mt-1">{q.waitingCount}</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-extrabold text-slate-600 pt-2 border-t border-slate-100">
                <span className="flex items-center gap-1 font-extrabold text-slate-700">
                  <Clock className="w-3.5 h-3.5 text-blue-600" /> Avg Wait: {q.avgWait}
                </span>

                <button
                  onClick={() => togglePauseQueue(q.code)}
                  className={`px-3.5 py-1.5 rounded-xl font-black text-xs transition-all border cursor-pointer ${
                    q.isPaused
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                      : 'bg-amber-50 text-amber-700 border-amber-300'
                  }`}
                >
                  {q.isPaused ? 'Resume' : 'Pause'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
