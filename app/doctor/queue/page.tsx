'use client';

import React, { useState } from 'react';
import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { MobileNav } from '@/components/layout/MobileNav';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { PriorityBadge } from '@/components/ui/PriorityBadge';
import { globalQueueStore } from '@/lib/queue/engine';
import { Token } from '@/types/queue';
import { Search, Filter } from 'lucide-react';

export default function DoctorQueuePage() {
  const [tokens, setTokens] = useState<Token[]>([...globalQueueStore.getTokensForDoctor('doc-sharma')]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredTokens = tokens.filter((t) => {
    const matchesSearch =
      t.display_token.toLowerCase().includes(search.toLowerCase()) ||
      (t.patient?.profile?.full_name || '').toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans pb-16 md:pb-0">
      <PortalSidebar role="DOCTOR" userName="Dr. Aditya Kumar" userEmail="dr.aditya@smartcare.org" />

      <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto space-y-8 max-w-7xl mx-auto">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Today's Doctor Queue</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">Manage and review all assigned patient tokens for General Medicine</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search token number or patient name..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="WAITING">WAITING</option>
              <option value="CALLED">CALLED</option>
              <option value="IN_CONSULTATION">IN CONSULTATION</option>
              <option value="COMPLETED">COMPLETED</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-bold">
              <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 uppercase tracking-wider font-extrabold">
                <tr>
                  <th className="p-4">Token Number</th>
                  <th className="p-4">Patient Name</th>
                  <th className="p-4">Priority</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Registered At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-800">
                {filteredTokens.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-mono font-black text-blue-600 text-sm">{t.display_token}</td>
                    <td className="p-4 font-black text-slate-900">{t.patient?.profile?.full_name || 'Ramesh Kumar'}</td>
                    <td className="p-4">
                      <PriorityBadge priority={t.priority} />
                    </td>
                    <td className="p-4">
                      <StatusBadge status={t.status} size="sm" />
                    </td>
                    <td className="p-4 text-right text-slate-500">{new Date(t.created_at).toLocaleTimeString()}</td>
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
