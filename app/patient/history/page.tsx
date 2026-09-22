'use client';

import React from 'react';
import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { MobileNav } from '@/components/layout/MobileNav';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Activity } from 'lucide-react';

export default function PatientHistoryPage() {
  const historyTokens = [
    { token: 'A023', dept: 'General Medicine', doctor: 'Dr. Rajesh Sharma', date: '21 Sep 2026', status: 'WAITING' as const },
    { token: 'B104', dept: 'Cardiology', doctor: 'Dr. Anita Kumar', date: '18 Sep 2026', status: 'COMPLETED' as const },
    { token: 'C078', dept: 'Dermatology', doctor: 'Dr. Meera Iyer', date: '15 Sep 2026', status: 'COMPLETED' as const },
    { token: 'DEN-002', dept: 'Dental Care', doctor: 'Dr. Ramesh Patel', date: '28 Aug 2026', status: 'COMPLETED' as const },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans pb-16 md:pb-0">
      <PortalSidebar role="PATIENT" userName="Lalit" userEmail="lalit@example.com" />

      <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto space-y-8 max-w-5xl mx-auto">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Queue History</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">Log of all digital queue tokens issued for previous hospital visits</p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-bold">
              <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 uppercase tracking-wider font-extrabold">
                <tr>
                  <th className="p-4">Token</th>
                  <th className="p-4">Department</th>
                  <th className="p-4">Doctor</th>
                  <th className="p-4">Date</th>
                  <th className="p-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {historyTokens.map((h, i) => (
                  <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-mono font-black text-blue-600 text-sm">{h.token}</td>
                    <td className="p-4 font-black text-slate-900">{h.dept}</td>
                    <td className="p-4">{h.doctor}</td>
                    <td className="p-4 text-slate-500">{h.date}</td>
                    <td className="p-4 text-right">
                      <StatusBadge status={h.status} size="sm" />
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
