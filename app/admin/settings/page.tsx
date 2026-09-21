'use client';

import React, { useState } from 'react';
import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { Settings, Save } from 'lucide-react';

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      <PortalSidebar role="ADMIN" userName="Hospital Admin" userEmail="admin@hospital.org" />

      <main className="flex-1 p-6 lg:p-10 overflow-y-auto space-y-8 max-w-4xl">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">System & Queue Policies</h1>
          <p className="text-xs text-slate-500 font-medium">Configure global hospital queue management rules and priority policies</p>
        </div>

        {saved && (
          <div className="bg-emerald-50 text-emerald-800 p-4 rounded-2xl border border-emerald-200 text-xs font-bold">
            ✓ Hospital queue policies saved.
          </div>
        )}

        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md space-y-6">
          <form onSubmit={(e) => { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 3000); }} className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Priority Queueing Rules</h3>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500" />
                  <span className="text-xs font-extrabold text-slate-800">Enable Emergency Override (Immediate FIFO insertion for EMERGENCY tokens)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500" />
                  <span className="text-xs font-extrabold text-slate-800">Enable Senior Citizen / Priority Badge precedence</span>
                </label>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">Waiting Room TV Settings</h3>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500" />
                  <span className="text-xs font-extrabold text-slate-800">Play Audio Bell Chime when doctor calls next token</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500" />
                  <span className="text-xs font-extrabold text-slate-800">Mask patient names on public display screens (Privacy compliance)</span>
                </label>
              </div>
            </div>

            <button type="submit" className="py-3.5 px-8 bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center gap-2">
              <Save className="w-4 h-4" /> Save Global Settings
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
