'use client';

import React from 'react';
import Link from 'next/link';
import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { MobileNav } from '@/components/layout/MobileNav';
import { Calendar, Clock, Ticket } from 'lucide-react';

export default function PatientAppointmentsPage() {
  const appointments = [
    {
      id: 'apt-1',
      dept: 'General Medicine',
      doctor: 'Dr. Rajesh Sharma',
      date: '2026-09-22',
      time: '10:30 AM',
      status: 'SCHEDULED',
      room: 'Room 102',
    },
    {
      id: 'apt-2',
      dept: 'Cardiology',
      doctor: 'Dr. Anita Kumar',
      date: '2026-09-28',
      time: '02:00 PM',
      status: 'SCHEDULED',
      room: 'Room 205',
    },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans pb-16 md:pb-0">
      <PortalSidebar role="PATIENT" userName="Lalit" userEmail="lalit@example.com" />

      <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto space-y-8 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Hospital Departments & Visits</h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">Scheduled appointments linked with your OPD tokens</p>
          </div>
          <Link
            href="/patient/queue/get-token"
            className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-600/20 flex items-center gap-2"
          >
            <Ticket className="w-4 h-4" /> Book Digital Token
          </Link>
        </div>

        <div className="space-y-4">
          {appointments.map((apt) => (
            <div key={apt.id} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold border border-purple-100">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900">{apt.dept}</h3>
                  <p className="text-xs font-bold text-slate-500">{apt.doctor} • {apt.room}</p>
                  <p className="text-xs font-extrabold text-blue-600 mt-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {apt.date} at {apt.time}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-extrabold">
                  {apt.status}
                </span>
                <Link
                  href={`/patient/queue/get-token?dept=${apt.dept.includes('Cardio') ? 'CAR' : 'GM'}`}
                  className="px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs shadow-xs"
                >
                  Issue Token
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
