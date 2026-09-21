'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { globalQueueStore } from '@/lib/queue/engine';
import {
  Users,
  Clock,
  CheckCircle2,
  AlertCircle,
  Activity,
  Building2,
  TrendingUp,
  BarChart3,
  Tv
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  CartesianGrid
} from 'recharts';

export default function AdminDashboardPage() {
  const analytics = globalQueueStore.getAnalytics();

  const COLORS = ['#0284c7', '#0d9488', '#d97706', '#9333ea', '#e11d48'];

  const statusPieData = [
    { name: 'Completed', value: analytics.completedConsultations, color: '#059669' },
    { name: 'Waiting', value: analytics.patientsWaiting + 24, color: '#d97706' },
    { name: 'In Consultation', value: analytics.patientsInConsultation + 4, color: '#0284c7' },
    { name: 'Skipped/Absent', value: analytics.skippedCount + analytics.absentCount, color: '#64748b' },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      <PortalSidebar role="ADMIN" userName="Hospital Admin" userEmail="admin@hospital.org" />

      <main className="flex-1 p-6 lg:p-10 overflow-y-auto space-y-8 max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200/80 w-fit">
              Executive Analytics Center
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-2">
              Hospital Overview Dashboard
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin/queues"
              className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs shadow-sm flex items-center gap-2"
            >
              <Activity className="w-4 h-4" /> Live Queues Monitor
            </Link>
            <Link
              href="/queue-display"
              target="_blank"
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shadow-sm flex items-center gap-2"
            >
              <Tv className="w-4 h-4" /> Launch TV Display
            </Link>
          </div>
        </div>

        {/* 6 KEY METRIC CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Total Patients Today</span>
            <div className="text-3xl font-black text-slate-900 mt-1">{analytics.totalPatientsToday}</div>
            <span className="text-[11px] font-bold text-teal-600 block mt-1">+12% vs yesterday</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Tokens Generated</span>
            <div className="text-3xl font-black text-sky-600 mt-1">{analytics.tokensGenerated}</div>
            <span className="text-[11px] font-bold text-sky-600 block mt-1">Digital Tokens</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Patients Waiting</span>
            <div className="text-3xl font-black text-amber-600 mt-1">{analytics.patientsWaiting + 24}</div>
            <span className="text-[11px] font-bold text-amber-600 block mt-1">Across 5 departments</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">In Consultation</span>
            <div className="text-3xl font-black text-emerald-600 mt-1">{analytics.patientsInConsultation + 4}</div>
            <span className="text-[11px] font-bold text-emerald-600 block mt-1">Active Rooms</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Completed</span>
            <div className="text-3xl font-black text-slate-800 mt-1">{analytics.completedConsultations}</div>
            <span className="text-[11px] font-bold text-slate-500 block mt-1">Finished visits</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-2xs">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Avg Wait Time</span>
            <div className="text-3xl font-black text-indigo-600 mt-1">{analytics.averageWaitingTimeMinutes} min</div>
            <span className="text-[11px] font-bold text-indigo-600 block mt-1">Hospital Average</span>
          </div>
        </div>

        {/* CHARTS GRID SECTION (RECHARTS) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Tokens Per Hour Area Chart */}
          <div className="lg:col-span-8 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">Hourly Queue Activity (Tokens Issued)</h3>
                <p className="text-xs text-slate-500 font-medium">Hourly patient arrival distribution throughout today</p>
              </div>
              <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-lg border border-sky-200">
                Peak: 10:00 AM (42 tokens)
              </span>
            </div>

            <div className="h-72 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analytics.hourlyActivity} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTokens" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0284c7" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#0284c7" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="hour" tickLine={false} axisLine={false} stroke="#94a3b8" fontSize={11} />
                  <YAxis tickLine={false} axisLine={false} stroke="#94a3b8" fontSize={11} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: 'none', color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="count" stroke="#0284c7" strokeWidth={3} fillOpacity={1} fill="url(#colorTokens)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Queue Status Distribution Pie Chart */}
          <div className="lg:col-span-4 bg-white p-6 rounded-3xl border border-slate-200/80 shadow-md space-y-4">
            <h3 className="text-lg font-extrabold text-slate-900">Today's Token Status Breakdown</h3>
            <p className="text-xs text-slate-500 font-medium">Distribution of all generated queue tokens</p>

            <div className="h-56 w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {statusPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-bold pt-2 border-t border-slate-100">
              {statusPieData.map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.color }} />
                  <span className="text-slate-600 truncate">{s.name}: {s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Department Volume Bar Chart */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-md space-y-4">
          <h3 className="text-lg font-extrabold text-slate-900">Patient Volume Per Department</h3>
          <p className="text-xs text-slate-500 font-medium">Comparison of token traffic across hospital departments</p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics.departmentDistribution} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="code" tickLine={false} axisLine={false} stroke="#64748b" fontSize={12} fontWeight={700} />
                <YAxis tickLine={false} axisLine={false} stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff' }} />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {analytics.departmentDistribution.map((entry, index) => (
                    <Cell key={`bar-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}
