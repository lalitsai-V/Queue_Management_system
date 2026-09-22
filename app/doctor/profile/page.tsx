'use client';

import React, { useState } from 'react';
import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { MobileNav } from '@/components/layout/MobileNav';
import { Save, CheckCircle2, Stethoscope } from 'lucide-react';

export default function DoctorProfilePage() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans pb-16 md:pb-0">
      <PortalSidebar role="DOCTOR" userName="Dr. Aditya Kumar" userEmail="dr.aditya@smartcare.org" />

      <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto space-y-8 max-w-4xl mx-auto">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Doctor Profile & Room Settings</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">Manage consultation pace, room assignment, and duty availability</p>
        </div>

        {saved && (
          <div className="bg-emerald-50 text-emerald-800 p-4 rounded-2xl border border-emerald-200 text-xs font-extrabold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Doctor availability settings updated.
          </div>
        )}

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
          <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
            <div className="w-16 h-16 rounded-3xl bg-blue-600 text-white flex items-center justify-center font-black text-2xl shadow-md">
              <Stethoscope className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900">Dr. Aditya Kumar</h2>
              <p className="text-xs text-slate-500 font-bold">General Medicine • Room 102</p>
            </div>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 3000); }} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">Doctor Name</label>
                <input type="text" defaultValue="Dr. Aditya Kumar" className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">Department</label>
                <input type="text" disabled defaultValue="General Medicine" className="w-full px-4 py-3 rounded-2xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-500 cursor-not-allowed" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">Assigned Room</label>
                <input type="text" defaultValue="Room 102" className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">Avg Consultation Time (Minutes)</label>
                <input type="number" defaultValue={8} min={1} max={60} className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>

            <button type="submit" className="py-3.5 px-8 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-2xl shadow-md shadow-blue-600/20 flex items-center gap-2 cursor-pointer">
              <Save className="w-4 h-4" /> Save Doctor Configuration
            </button>
          </form>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
