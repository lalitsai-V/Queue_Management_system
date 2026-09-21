'use client';

import React, { useState } from 'react';
import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { globalQueueStore } from '@/lib/queue/engine';
import { Users, Search, UserPlus } from 'lucide-react';

export default function AdminPatientsPage() {
  const [search, setSearch] = useState('');
  const patients = globalQueueStore.patients;

  const filtered = patients.filter((p) =>
    (p.profile?.full_name || '').toLowerCase().includes(search.toLowerCase()) ||
    (p.profile?.email || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      <PortalSidebar role="ADMIN" userName="Hospital Admin" userEmail="admin@hospital.org" />

      <main className="flex-1 p-6 lg:p-10 overflow-y-auto space-y-8 max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Patients Directory</h1>
            <p className="text-xs text-slate-500 font-medium">Registered hospital patients and queue history records</p>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200/80">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or email..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium"
            />
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-extrabold">
              <tr>
                <th className="p-4">Patient Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">Date of Birth</th>
                <th className="p-4">Gender</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50">
                  <td className="p-4 font-bold">{p.profile?.full_name}</td>
                  <td className="p-4 text-slate-600">{p.profile?.email}</td>
                  <td className="p-4 text-slate-600">{p.profile?.phone}</td>
                  <td className="p-4 text-slate-500">{p.date_of_birth}</td>
                  <td className="p-4">{p.gender}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
