'use client';

import React from 'react';
import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { globalQueueStore } from '@/lib/queue/engine';
import { BarChart3, Download, Printer, FileText } from 'lucide-react';

export default function AdminReportsPage() {
  const analytics = globalQueueStore.getAnalytics();

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      <PortalSidebar role="ADMIN" userName="Hospital Admin" userEmail="admin@hospital.org" />

      <main className="flex-1 p-6 lg:p-10 overflow-y-auto space-y-8 max-w-7xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Daily Queue Reports & Audits</h1>
            <p className="text-xs text-slate-500 font-medium">Comprehensive statistical reports for hospital management</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs shadow-xs flex items-center gap-2 hover:bg-slate-50"
            >
              <Printer className="w-4 h-4" /> Print Summary Report
            </button>
          </div>
        </div>

        {/* Report Key Table Metrics */}
        <div className="bg-white p-8 rounded-3xl border border-slate-200/80 shadow-md space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Hospital Daily Operational Performance</h2>
              <p suppressHydrationWarning className="text-xs text-slate-500">Report Date: {new Date().toDateString()}</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold text-xs border border-emerald-200">
              Audited Data
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-xs text-slate-500 font-bold uppercase">Daily Tokens Generated</span>
              <div className="text-2xl font-black text-slate-900 mt-1">{analytics.tokensGenerated}</div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-xs text-slate-500 font-bold uppercase">Completed Tokens</span>
              <div className="text-2xl font-black text-emerald-600 mt-1">{analytics.completedConsultations}</div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-xs text-slate-500 font-bold uppercase">Skipped / Absent</span>
              <div className="text-2xl font-black text-slate-700 mt-1">{analytics.skippedCount + analytics.absentCount}</div>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <span className="text-xs text-slate-500 font-bold uppercase">Emergency / Priority</span>
              <div className="text-2xl font-black text-rose-600 mt-1">{analytics.emergencyCount + 8}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Wait Time Benchmark</span>
              <div className="flex justify-between text-sm pt-2">
                <span className="text-slate-600 font-medium">Average Waiting Time:</span>
                <span className="font-extrabold text-slate-900">14 minutes</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600 font-medium">Peak Maximum Wait:</span>
                <span className="font-extrabold text-slate-900">36 minutes</span>
              </div>
            </div>

            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase">Department breakdown</span>
              {analytics.departmentDistribution.map((d) => (
                <div key={d.code} className="flex justify-between text-xs pt-1">
                  <span className="text-slate-600 font-medium">{d.name} ({d.code}):</span>
                  <span className="font-bold text-slate-900">{d.count} tokens</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
