'use client';

import React from 'react';
import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { CheckCircle2 } from 'lucide-react';

export default function DoctorHistoryPage() {
  const history = [
    { token: 'GM-023', patient: 'Karan Sharma', priority: 'NORMAL', completedAt: '09:45 AM', status: 'COMPLETED' },
    { token: 'GM-022', patient: 'Sunita Rao', priority: 'PRIORITY', completedAt: '09:32 AM', status: 'COMPLETED' },
    { token: 'GM-021', patient: 'Anand Roy', priority: 'EMERGENCY', completedAt: '09:15 AM', status: 'COMPLETED' },
    { token: 'GM-020', patient: 'Meera Das', priority: 'NORMAL', completedAt: '09:00 AM', status: 'COMPLETED' },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      <PortalSidebar role="DOCTOR" userName="Dr. Rajesh Sharma" userEmail="dr.sharma@hospital.org" />

      <main className="flex-1 p-6 lg:p-10 overflow-y-auto space-y-8 max-w-5xl">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Completed Consultations Log</h1>
          <p className="text-xs text-slate-500 font-medium">Historical record of completed patient consultations for today</p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-extrabold">
              <tr>
                <th className="p-4">Token</th>
                <th className="p-4">Patient Name</th>
                <th className="p-4">Priority</th>
                <th className="p-4">Completed Time</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {history.map((h, i) => (
                <tr key={i} className="hover:bg-slate-50/50">
                  <td className="p-4 font-mono font-black text-sky-700">{h.token}</td>
                  <td className="p-4 font-bold">{h.patient}</td>
                  <td className="p-4">{h.priority}</td>
                  <td className="p-4 text-slate-500">{h.completedAt}</td>
                  <td className="p-4">
                    <StatusBadge status="COMPLETED" size="sm" />
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
