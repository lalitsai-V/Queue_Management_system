'use client';

import React from 'react';
import Link from 'next/link';
import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { Calendar, Clock, Stethoscope, Ticket, CheckCircle2 } from 'lucide-react';

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
    <div className="min-h-screen flex bg-slate-50 font-sans">
      <PortalSidebar role="PATIENT" userName="Rohan Mehta" userEmail="rohan.mehta@gmail.com" />

      <main className="flex-1 p-6 lg:p-10 overflow-y-auto space-y-8 max-w-5xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Scheduled Appointments</h1>
            <p className="text-xs text-slate-500 font-medium">Supporting appointment schedules linked with hospital queue system</p>
          </div>
          <Link
            href="/patient/queue/get-token"
            className="px-4 py-2.5 rounded-xl bg-sky-600 text-white font-extrabold text-xs shadow-md flex items-center gap-2"
          >
            <Ticket className="w-4 h-4" /> Get Token For Visit
          </Link>
        </div>

        <div className="space-y-4">
          {appointments.map((apt) => (
            <div key={apt.id} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                  <Calendar className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900">{apt.dept}</h3>
                  <p className="text-xs text-slate-600">{apt.doctor} • {apt.room}</p>
                  <p className="text-xs font-semibold text-slate-500 mt-1 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-sky-600" /> {apt.date} at {apt.time}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-sky-50 text-sky-700 border border-sky-200 text-xs font-bold">
                  {apt.status}
                </span>
                <Link
                  href={`/patient/queue/get-token?dept=${apt.dept.includes('Cardio') ? 'CAR' : 'GM'}`}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
                >
                  Check In & Issue Token
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
