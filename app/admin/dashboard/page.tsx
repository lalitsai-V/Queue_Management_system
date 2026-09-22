'use client';

import React from 'react';
import Link from 'next/link';
import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { MobileNav } from '@/components/layout/MobileNav';
import { StatCard } from '@/components/ui/StatCard';
import { globalQueueStore } from '@/lib/queue/engine';
import { Users, Building2, UserCheck, Clock, Activity, BarChart3, Tv, ArrowRight } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell
} from 'recharts';

export default function AdminDashboardPage() {
  const analytics = globalQueueStore.getAnalytics();

  const patientFlowData = [
    { day: 'Mon', count: 180 },
    { day: 'Tue', count: 210 },
    { day: 'Wed', count: 240 },
    { day: 'Thu', count: 195 },
    { day: 'Fri', count: 220 },
    { day: 'Sat', count: 160 },
    { day: 'Sun', count: 100 },
  ];

  const deptWiseTokens = [
    { name: 'General Medicine', count: 342, pct: 85 },
    { name: 'Cardiology', count: 210, pct: 65 },
    { name: 'Dermatology', count: 180, pct: 55 },
    { name: 'Pediatrics', count: 150, pct: 45 },
    { name: 'Orthopedics', count: 100, pct: 35 },
  ];

  const recentActivityLog = [
    { time: '10:32 AM', action: 'Token Served', details: 'A023 - General Medicine', user: 'Dr. Aditya Kumar' },
    { time: '10:28 AM', action: 'New Token', details: 'B104 - Cardiology', user: 'Patient Portal' },
    { time: '10:25 AM', action: 'Department Update', details: 'Dermatology - Doctor Assigned', user: 'Admin' },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans pb-16 md:pb-0">
      <PortalSidebar role="ADMIN" userName="Hospital Admin" userEmail="admin@smartcare.org" />

      <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto space-y-8 max-w-7xl">
        {/* Title & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Admin Dashboard</h1>
            <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">Manage hospital operations efficiently.</p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/queue-display"
              target="_blank"
              className="px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shadow-md flex items-center gap-2"
            >
              <Tv className="w-4 h-4 text-cyan-400" /> Launch TV Display
            </Link>
          </div>
        </div>

        {/* TOP KPI CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Patients"
            value="1,248"
            subtitle="Total Registered Patients"
            icon={<Users className="w-5 h-5" />}
            color="blue"
            trend={{ value: '+12%', isPositive: true }}
          />

          <StatCard
            title="Departments"
            value="12"
            subtitle="Active OPD Specialties"
            icon={<Building2 className="w-5 h-5" />}
            color="cyan"
          />

          <StatCard
            title="Doctors"
            value="48"
            subtitle="Consulting Physicians"
            icon={<UserCheck className="w-5 h-5" />}
            color="purple"
          />

          <StatCard
            title="Avg. Waiting Time"
            value="4.8 mins"
            subtitle="Hospital OPD Benchmark"
            icon={<Clock className="w-5 h-5" />}
            color="amber"
            trend={{ value: '-8%', isPositive: true }}
          />
        </div>

        {/* MAIN ANALYTICS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Patient Flow Chart */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-black text-slate-900">Patient Flow</h2>
                <p className="text-xs text-slate-500 font-medium">Daily OPD patient visits distribution</p>
              </div>
              <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-3 py-1 rounded-xl border border-blue-200">
                This Week ▾
              </span>
            </div>

            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={patientFlowData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} stroke="#64748b" fontSize={12} fontWeight={700} />
                  <YAxis tickLine={false} axisLine={false} stroke="#94a3b8" fontSize={11} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '16px', color: '#fff', border: 'none' }} />
                  <Bar dataKey="count" fill="#2563eb" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Department Wise Tokens Breakdown */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-slate-900">Department Wise Tokens</h2>
            </div>

            <div className="space-y-4">
              {deptWiseTokens.map((dept) => (
                <div key={dept.name} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-extrabold">
                    <span className="text-slate-800">{dept.name}</span>
                    <span className="text-blue-600 font-mono">{dept.count}</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"
                      style={{ width: `${dept.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RECENT ACTIVITY LOG TABLE */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-4">
          <h2 className="text-lg font-black text-slate-900">Recent Activity</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-bold">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 uppercase tracking-wider font-extrabold">
                  <th className="py-3 px-4">Time</th>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">Details</th>
                  <th className="py-3 px-4 text-right">User / Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {recentActivityLog.map((log, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3.5 px-4 text-slate-400 font-mono">{log.time}</td>
                    <td className="py-3.5 px-4 font-black text-slate-900">{log.action}</td>
                    <td className="py-3.5 px-4 text-blue-600">{log.details}</td>
                    <td className="py-3.5 px-4 text-right text-slate-500">{log.user}</td>
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
