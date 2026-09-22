'use client';

import React from 'react';
import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { MobileNav } from '@/components/layout/MobileNav';
import { StatusBadge } from '@/components/ui/StatusBadge';

export default function DoctorHistoryPage() {
  const history = [
    { token: 'A022', patient: 'Karan Sharma', priority: 'NORMAL', completedAt: '10:15 AM', status: 'COMPLETED' as const },
    { token: 'A021', patient: 'Sunita Rao', priority: 'PRIORITY', completedAt: '09:50 AM', status: 'COMPLETED' as const },
    { token: 'A020', patient: 'Anand Roy', priority: 'EMERGENCY', completedAt: '09:30 AM', status: 'COMPLETED' as const },
    { token: 'A019', patient: 'Meera Das', priority: 'NORMAL', completedAt: '09:10 AM', status: 'COMPLETED' as const },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans pb-16 md:pb-0">
      <PortalSidebar role="DOCTOR" userName="Dr. Aditya Kumar" userEmail="dr.aditya@smartcare.org" />

      <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto space-y-8 max-w-5xl mx-auto">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Completed Consultations Log</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">Historical record of completed patient consultations for today</p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-bold">
              <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 uppercase tracking-wider font-extrabold">
                <tr>
                  <th className="p-4">Token</th>
                  <th className="p-4">Patient Name</th>
                  <th className="p-4">Priority</th>
                  <th className="p-4">Completed Time</th>
                  <th className="p-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {history.map((h, i) => (
                  <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-mono font-black text-blue-600 text-sm">{h.token}</td>
                    <td className="p-4 font-black text-slate-900">{h.patient}</td>
                    <td className="p-4">{h.priority}</td>
                    <td className="p-4 text-slate-500">{h.completedAt}</td>
                    <td className="p-4 text-right">
                      <StatusBadge status="COMPLETED" size="sm" />
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
