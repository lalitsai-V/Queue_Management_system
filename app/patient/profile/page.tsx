'use client';

import React, { useState } from 'react';
import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { User, Mail, Phone, Calendar, MapPin, Save, ShieldCheck } from 'lucide-react';

export default function PatientProfilePage() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      <PortalSidebar role="PATIENT" userName="Rohan Mehta" userEmail="rohan.mehta@gmail.com" />

      <main className="flex-1 p-6 lg:p-10 overflow-y-auto space-y-8 max-w-4xl">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Patient Profile</h1>
          <p className="text-xs text-slate-500 font-medium">Manage your contact details and registered medical identity</p>
        </div>

        {saved && (
          <div className="bg-emerald-50 text-emerald-800 p-4 rounded-2xl border border-emerald-200 text-xs font-bold">
            ✓ Profile saved successfully.
          </div>
        )}

        <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md space-y-6">
          <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
            <div className="w-16 h-16 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-black text-2xl">
              RM
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900">Rohan Mehta</h2>
              <span className="text-xs text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full font-bold border border-sky-200">
                Patient ID: PAT-88201
              </span>
            </div>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 3000); }} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Full Name</label>
                <input type="text" defaultValue="Rohan Mehta" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Email</label>
                <input type="email" defaultValue="rohan.mehta@gmail.com" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Phone</label>
                <input type="tel" defaultValue="+91 98200 11223" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Date of Birth</label>
                <input type="date" defaultValue="1990-05-15" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">Residential Address</label>
              <input type="text" defaultValue="12 Hospital Road, Metro City" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium" />
            </div>

            <button type="submit" className="py-3.5 px-8 bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs rounded-xl shadow-md flex items-center gap-2">
              <Save className="w-4 h-4" /> Save Changes
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
