'use client';

import React, { useState } from 'react';
import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { Stethoscope, Save } from 'lucide-react';

export default function DoctorProfilePage() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      <PortalSidebar role="DOCTOR" userName="Dr. Rajesh Sharma" userEmail="dr.sharma@hospital.org" />

      <main className="flex-1 p-6 lg:p-10 overflow-y-auto space-y-8 max-w-4xl">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Doctor Profile & Room Settings</h1>
          <p className="text-xs text-slate-500 font-medium">Manage consultation pace, room assignment, and duty availability</p>
        </div>

        {saved && (
          <div className="bg-emerald-50 text-emerald-800 p-4 rounded-2xl border border-emerald-200 text-xs font-bold">
            ✓ Doctor availability settings updated.
          </div>
        )}

        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md space-y-6">
          <form onSubmit={(e) => { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 3000); }} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Doctor Name</label>
                <input type="text" defaultValue="Dr. Rajesh Sharma" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Department</label>
                <input type="text" disabled defaultValue="General Medicine" className="w-full px-4 py-3 rounded-xl bg-slate-100 border border-slate-200 text-sm font-medium text-slate-500" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Assigned Room</label>
                <input type="text" defaultValue="Room 102" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Avg Consultation Time (Minutes)</label>
                <input type="number" defaultValue={8} min={1} max={60} className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium" />
              </div>
            </div>

            <button type="submit" className="py-3.5 px-8 bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center gap-2">
              <Save className="w-4 h-4" /> Save Doctor Configuration
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
