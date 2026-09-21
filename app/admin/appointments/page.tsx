'use client';

import React from 'react';
import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { Calendar } from 'lucide-react';

export default function AdminAppointmentsPage() {
  const appointments = [
    { id: '1', patient: 'Rohan Mehta', doctor: 'Dr. Rajesh Sharma', dept: 'General Medicine', date: '2026-09-22', time: '10:30 AM', status: 'SCHEDULED' },
    { id: '2', patient: 'Priya Patel', doctor: 'Dr. Anita Kumar', dept: 'Cardiology', date: '2026-09-22', time: '11:00 AM', status: 'SCHEDULED' },
    { id: '3', patient: 'Amitabh Sen', doctor: 'Dr. Vikram Verma', dept: 'Orthopedics', date: '2026-09-22', time: '02:00 PM', status: 'SCHEDULED' },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      <PortalSidebar role="ADMIN" userName="Hospital Admin" userEmail="admin@hospital.org" />

      <main className="flex-1 p-6 lg:p-10 overflow-y-auto space-y-8 max-w-7xl">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Appointments Directory</h1>
          <p className="text-xs text-slate-500 font-medium">Supporting scheduled patient visits linked to daily token queues</p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-extrabold">
              <tr>
                <th className="p-4">Patient Name</th>
                <th className="p-4">Department</th>
                <th className="p-4">Doctor</th>
                <th className="p-4">Date & Time</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {appointments.map((a) => (
                <tr key={a.id} className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold">{a.patient}</td>
                  <td className="p-4">{a.dept}</td>
                  <td className="p-4">{a.doctor}</td>
                  <td className="p-4 text-slate-500">{a.date} at {a.time}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 text-xs font-bold border border-sky-200">
                      {a.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
