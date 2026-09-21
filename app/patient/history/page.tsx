'use client';

import React from 'react';
import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Activity, Clock } from 'lucide-react';

export default function PatientHistoryPage() {
  const historyTokens = [
    { token: 'GM-018', dept: 'General Medicine', doctor: 'Dr. Rajesh Sharma', date: '2026-09-18', status: 'COMPLETED' },
    { token: 'CAR-004', dept: 'Cardiology', doctor: 'Dr. Anita Kumar', date: '2026-09-10', status: 'COMPLETED' },
    { token: 'DEN-002', dept: 'Dental', doctor: 'Dr. Ramesh Patel', date: '2026-08-28', status: 'COMPLETED' },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      <PortalSidebar role="PATIENT" userName="Rohan Mehta" userEmail="rohan.mehta@gmail.com" />

      <main className="flex-1 p-6 lg:p-10 overflow-y-auto space-y-8 max-w-5xl">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Queue History</h1>
          <p className="text-xs text-slate-500 font-medium">Log of all digital queue tokens issued for previous hospital visits</p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-extrabold">
              <tr>
                <th className="p-4">Token</th>
                <th className="p-4">Department</th>
                <th className="p-4">Doctor</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {historyTokens.map((h, i) => (
                <tr key={i} className="hover:bg-slate-50/50">
                  <td className="p-4 font-mono font-black text-sky-700">{h.token}</td>
                  <td className="p-4 font-bold">{h.dept}</td>
                  <td className="p-4">{h.doctor}</td>
                  <td className="p-4 text-slate-500">{h.date}</td>
                  <td className="p-4">
                    <StatusBadge status={h.status as any} size="sm" />
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
