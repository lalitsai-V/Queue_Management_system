'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { globalQueueStore } from '@/lib/queue/engine';
import { Building2, Users, Clock, Play, Pause, RefreshCw, Tv, Filter } from 'lucide-react';

export default function AdminLiveQueuesPage() {
  const [queues, setQueues] = useState([
    {
      dept: 'General Medicine',
      code: 'GM',
      doctor: 'Dr. Rajesh Sharma',
      room: 'Room 102',
      currentToken: 'GM-024',
      waitingCount: 12,
      isPaused: false,
      avgWait: '28 min',
    },
    {
      dept: 'Cardiology',
      code: 'CAR',
      doctor: 'Dr. Anita Kumar',
      room: 'Room 205',
      currentToken: 'CAR-011',
      waitingCount: 7,
      isPaused: false,
      avgWait: '15 min',
    },
    {
      dept: 'Orthopedics',
      code: 'ORT',
      doctor: 'Dr. Vikram Verma',
      room: 'Room 304',
      currentToken: 'ORT-008',
      waitingCount: 5,
      isPaused: false,
      avgWait: '12 min',
    },
    {
      dept: 'Pediatrics',
      code: 'PED',
      doctor: 'Dr. Sunita Gupta',
      room: 'Room 108',
      currentToken: 'PED-014',
      waitingCount: 9,
      isPaused: false,
      avgWait: '10 min',
    },
    {
      dept: 'Dental Care',
      code: 'DEN',
      doctor: 'Dr. Ramesh Patel',
      room: 'Room 401',
      currentToken: 'DEN-003',
      waitingCount: 3,
      isPaused: false,
      avgWait: '15 min',
    },
  ]);

  const togglePauseQueue = (code: string) => {
    setQueues((prev) =>
      prev.map((q) => (q.code === code ? { ...q, isPaused: !q.isPaused } : q))
    );
  };

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      <PortalSidebar role="ADMIN" userName="Hospital Admin" userEmail="admin@hospital.org" />

      <main className="flex-1 p-6 lg:p-10 overflow-y-auto space-y-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200/80 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              Real-Time Hospital Queue Monitor
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-2">
              All Active Department Queues
            </h1>
          </div>

          <Link
            href="/queue-display"
            target="_blank"
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs flex items-center gap-2 shadow-sm"
          >
            <Tv className="w-4 h-4" /> Open TV Display
          </Link>
        </div>

        {/* Queues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {queues.map((q) => (
            <div
              key={q.code}
              className={`bg-white rounded-3xl p-6 border-2 transition-all shadow-md space-y-6 ${
                q.isPaused ? 'border-amber-300 bg-amber-50/20' : 'border-slate-200/80 hover:border-sky-300'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-900 text-white font-mono text-xs font-black">
                    {q.code}
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-2">{q.dept}</h3>
                  <p className="text-xs text-slate-600 font-medium">{q.doctor} ({q.room})</p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
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
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Current Token</span>
                  <div className="text-3xl font-black text-slate-900 font-mono mt-1">{q.currentToken}</div>
                </div>

                <div className="bg-sky-50 p-4 rounded-2xl border border-sky-100">
                  <span className="text-xs font-bold text-sky-800 uppercase tracking-widest block">Waiting</span>
                  <div className="text-3xl font-black text-sky-700 font-mono mt-1">{q.waitingCount}</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-medium text-slate-600 pt-2 border-t border-slate-100">
                <span className="flex items-center gap-1 font-bold text-slate-700">
                  <Clock className="w-3.5 h-3.5 text-sky-600" /> Avg Wait: {q.avgWait}
                </span>

                <button
                  onClick={() => togglePauseQueue(q.code)}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all border ${
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
    </div>
  );
}
