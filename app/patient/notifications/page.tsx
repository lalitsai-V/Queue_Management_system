'use client';

import React from 'react';
import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { Bell, Volume2, CheckCircle2, Ticket } from 'lucide-react';

export default function PatientNotificationsPage() {
  const notifications = [
    {
      id: 'notif-1',
      title: 'YOUR TURN: Token GM-029 Called',
      message: 'Doctor Dr. Rajesh Sharma has called your token. Please proceed immediately to Consultation Room 102.',
      time: 'Just now',
      unread: true,
      type: 'PATIENT_CALLED',
    },
    {
      id: 'notif-2',
      title: 'Your Turn Is Near',
      message: 'Only 2 patients ahead of you in General Medicine queue. Please prepare to move near Room 102.',
      time: '10 mins ago',
      unread: true,
      type: 'NEAR_TURN',
    },
    {
      id: 'notif-3',
      title: 'Token Generated: GM-029',
      message: 'Your token GM-029 for General Medicine has been generated successfully.',
      time: '32 mins ago',
      unread: false,
      type: 'TOKEN_CREATED',
    },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      <PortalSidebar role="PATIENT" userName="Rohan Mehta" userEmail="rohan.mehta@gmail.com" />

      <main className="flex-1 p-6 lg:p-10 overflow-y-auto space-y-8 max-w-4xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Real-Time Notifications</h1>
            <p className="text-xs text-slate-500 font-medium">Alerts for token updates, queue position changes, and doctor callouts</p>
          </div>
          <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-full border border-amber-200">
            2 Unread Alerts
          </span>
        </div>

        <div className="space-y-4">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-6 rounded-3xl border transition-all flex items-start gap-4 ${
                n.unread
                  ? 'bg-sky-50/60 border-sky-200/80 shadow-xs'
                  : 'bg-white border-slate-200/80'
              }`}
            >
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-white shrink-0 ${
                n.type === 'PATIENT_CALLED' ? 'bg-sky-600 animate-pulse' : 'bg-slate-800'
              }`}>
                {n.type === 'PATIENT_CALLED' ? <Volume2 className="w-5 h-5" /> : <Bell className="w-5 h-5" />}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-extrabold text-slate-900">{n.title}</h3>
                  <span className="text-[11px] font-bold text-slate-400">{n.time}</span>
                </div>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">{n.message}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
