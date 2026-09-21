'use client';

import React, { useState } from 'react';
import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { globalQueueStore } from '@/lib/queue/engine';
import { UserCheck, Plus, CheckCircle2 } from 'lucide-react';

export default function AdminDoctorsPage() {
  const [doctors, setDoctors] = useState([...globalQueueStore.doctors]);
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      <PortalSidebar role="ADMIN" userName="Hospital Admin" userEmail="admin@hospital.org" />

      <main className="flex-1 p-6 lg:p-10 overflow-y-auto space-y-8 max-w-7xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Doctors Roster</h1>
            <p className="text-xs text-slate-500 font-medium">Manage clinical staff, assigned rooms, and consultation pace</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-xs shadow-sm flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Add New Doctor
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doc) => (
            <div key={doc.id} className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-extrabold text-lg">
                  <UserCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">{doc.profile?.full_name}</h3>
                  <p className="text-xs text-slate-500">{doc.specialization}</p>
                </div>
              </div>

              <div className="space-y-2 text-xs font-medium text-slate-600 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="flex justify-between">
                  <span>Department:</span>
                  <strong className="text-slate-900">{doc.department?.name}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Assigned Room:</span>
                  <strong className="text-sky-700">{doc.room_number}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Avg Consultation Pace:</span>
                  <strong className="text-slate-900">{doc.average_consultation_minutes} mins</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
