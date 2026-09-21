'use client';

import React, { useState } from 'react';
import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { globalQueueStore } from '@/lib/queue/engine';
import { Building2, Plus, Edit2 } from 'lucide-react';

export default function AdminDepartmentsPage() {
  const [departments, setDepartments] = useState([...globalQueueStore.departments]);

  const toggleDeptActive = (id: string) => {
    setDepartments((prev) =>
      prev.map((d) => (d.id === id ? { ...d, is_active: !d.is_active } : d))
    );
  };

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      <PortalSidebar role="ADMIN" userName="Hospital Admin" userEmail="admin@hospital.org" />

      <main className="flex-1 p-6 lg:p-10 overflow-y-auto space-y-8 max-w-7xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Clinical Departments</h1>
            <p className="text-xs text-slate-500 font-medium">Configure active hospital clinical units, code prefixes, and consultation benchmarks</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((d) => (
            <div key={d.id} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-xl bg-slate-900 text-white font-mono font-black text-sm">
                  {d.code}
                </span>
                <button
                  onClick={() => toggleDeptActive(d.id)}
                  className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    d.is_active ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {d.is_active ? 'Active' : 'Disabled'}
                </button>
              </div>

              <div>
                <h3 className="text-lg font-extrabold text-slate-900">{d.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{d.description}</p>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-700">
                <span>Avg Wait: {d.average_consultation_minutes} mins</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
