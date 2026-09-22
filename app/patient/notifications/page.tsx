'use client';

import React, { useState } from 'react';
import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { MobileNav } from '@/components/layout/MobileNav';
import { Bell, Volume2, CheckCircle2, Clock, Calendar, Sparkles } from 'lucide-react';

export default function PatientNotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: 'notif-1',
      title: 'Your token A023 is approaching.',
      message: 'There are only 2 patients ahead in General Medicine. Please be ready near Room 102.',
      time: 'Just now',
      unread: true,
      icon: Bell,
      color: 'bg-blue-50 text-blue-600 border-blue-200',
    },
    {
      id: 'notif-2',
      title: 'Token A021 completed.',
      message: 'Doctor Dr. Rajesh Sharma completed consultation for token A021.',
      time: '5 mins ago',
      unread: true,
      icon: CheckCircle2,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    },
    {
      id: 'notif-3',
      title: 'Estimated waiting time updated to 10 minutes.',
      message: 'OPD consultation pace updated automatically based on doctor speed.',
      time: '12 mins ago',
      unread: false,
      icon: Clock,
      color: 'bg-cyan-50 text-cyan-600 border-cyan-200',
    },
    {
      id: 'notif-4',
      title: 'Appointment reminder.',
      message: 'Follow-up consultation with Dr. Anita Kumar scheduled for tomorrow at 11:00 AM.',
      time: '1 hour ago',
      unread: false,
      icon: Calendar,
      color: 'bg-purple-50 text-purple-600 border-purple-200',
    },
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, unread: false })));
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans pb-16 md:pb-0">
      <PortalSidebar role="PATIENT" userName="Lalit" userEmail="lalit@example.com" />

      <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto space-y-8 max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Notification Center</h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
              Live alerts for queue updates, turn callouts, and appointment reminders.
            </p>
          </div>

          {unreadCount > 0 && (
            <button
              onClick={markAllRead}
              className="px-4 py-2 rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 text-xs font-extrabold hover:bg-blue-100 transition-all cursor-pointer"
            >
              Mark all as read
            </button>
          )}
        </div>

        <div className="space-y-4">
          {notifications.map((n) => {
            const IconComp = n.icon;
            return (
              <div
                key={n.id}
                className={`p-6 rounded-3xl border transition-all duration-200 flex items-start gap-4 ${
                  n.unread
                    ? 'bg-white border-blue-300 shadow-md ring-2 ring-blue-500/10'
                    : 'bg-white border-slate-200/80 shadow-xs opacity-80'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold border shrink-0 ${n.color}`}>
                  <IconComp className="w-6 h-6" />
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-black text-slate-900">{n.title}</h3>
                      {n.unread && (
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" title="Unread" />
                      )}
                    </div>
                    <span className="text-xs font-bold text-slate-400">{n.time}</span>
                  </div>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">{n.message}</p>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
