'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { MobileNav } from '@/components/layout/MobileNav';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { PriorityBadge } from '@/components/ui/PriorityBadge';
import { playHospitalChime } from '@/lib/audio/chime';
import { Stethoscope, Users, CheckCircle2, Clock, Volume2, ArrowRight, User, Activity, ChevronRight, Pill, Play } from 'lucide-react';

export default function DoctorDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'current'>('overview');

  const defaultQueueMembers = [
    { token: 'A024', name: 'Priya Sharma', age: 29, gender: 'Female', mrn: 'MRN-2026-9012', wait: 'In Room', priority: 'NORMAL' as const },
    { token: 'A025', name: 'Karthik R', age: 34, gender: 'Male', mrn: 'MRN-2026-9045', wait: '5 mins', priority: 'NORMAL' as const },
    { token: 'A026', name: 'Sneha M', age: 45, gender: 'Female', mrn: 'MRN-2026-9102', wait: '12 mins', priority: 'PRIORITY' as const },
    { token: 'A027', name: 'Arjun S', age: 52, gender: 'Male', mrn: 'MRN-2026-9150', wait: '20 mins', priority: 'NORMAL' as const },
    { token: 'A028', name: 'Deepa Patel', age: 38, gender: 'Female', mrn: 'MRN-2026-9200', wait: '28 mins', priority: 'EMERGENCY' as const },
    { token: 'A029', name: 'Vikram Singh', age: 50, gender: 'Male', mrn: 'MRN-2026-9240', wait: '35 mins', priority: 'NORMAL' as const },
  ];

  const [activePatientIdx, setActivePatientIdx] = useState(0);
  const [patientsToday, setPatientsToday] = useState(12);
  const [completed, setCompleted] = useState(8);
  const [waiting, setWaiting] = useState(5);
  const [simMessage, setSimMessage] = useState<string | null>(null);

  const currentPatient = defaultQueueMembers[activePatientIdx];
  const upcomingPatients = defaultQueueMembers.filter((_, idx) => idx !== activePatientIdx);

  const handleNextPatient = () => {
    playHospitalChime();
    const nextIdx = (activePatientIdx + 1) % defaultQueueMembers.length;
    setCompleted((prev) => prev + 1);
    setWaiting((prev) => Math.max(0, prev - 1));
    setActivePatientIdx(nextIdx);
    setSimMessage(`Called Next Patient: Token ${defaultQueueMembers[nextIdx].token} (${defaultQueueMembers[nextIdx].name})! Audio bell chime sounded 🔔`);
    setTimeout(() => setSimMessage(null), 3000);
  };

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans pb-16 md:pb-0">
      <PortalSidebar role="DOCTOR" userName="Dr. Aditya Kumar" userEmail="dr.aditya@smartcare.org" />

      <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto space-y-8 max-w-7xl mx-auto">
        {/* DOCTOR HEADER */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center font-black text-2xl shadow-md shrink-0">
              <Stethoscope className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Dr. Aditya Kumar</h1>
                <span className="px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black border border-emerald-200">
                  ● Room 102
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-bold mt-0.5">General Medicine • Senior Consultant</p>
            </div>
          </div>

          <div className="text-right text-xs font-bold text-slate-400">
            <span className="block uppercase tracking-wider">Current Time</span>
            <span className="text-sm font-extrabold text-slate-800">Mon, 21 Sep 2026 • 10:32 AM</span>
          </div>
        </div>

        {/* TOP TAB SWITCHER */}
        <div className="flex items-center gap-3 border-b border-slate-200/80 pb-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-3 rounded-2xl font-black text-xs transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            Dashboard Overview
          </button>

          <button
            onClick={() => setActiveTab('current')}
            className={`px-6 py-3 rounded-2xl font-black text-xs transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'current'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Stethoscope className="w-4 h-4" /> Current Patient Tab ({currentPatient.token})
          </button>
        </div>

        {simMessage && (
          <div className="bg-slate-900 text-white px-6 py-3.5 rounded-2xl font-bold text-xs shadow-xl animate-in fade-in slide-in-from-top duration-200 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" /> {simMessage}
            </span>
          </div>
        )}

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <>
            {/* DASHBOARD STATISTICS CARDS */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Patients Today</span>
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-4xl font-black text-slate-900 tracking-tight">{patientsToday}</div>
                <span className="text-xs text-slate-400 font-medium">Scheduled & OPD Tokens</span>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Completed</span>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="text-4xl font-black text-emerald-600 tracking-tight">{completed}</div>
                <span className="text-xs text-emerald-600 font-bold">Consultations finished</span>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Waiting</span>
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div className="text-4xl font-black text-amber-600 tracking-tight">{waiting}</div>
                <span className="text-xs text-amber-600 font-bold">In queue now</span>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Avg Consultation Time</span>
                  <Activity className="w-5 h-5 text-cyan-600" />
                </div>
                <div className="text-4xl font-black text-slate-900 font-mono tracking-tight">~8 min</div>
                <span className="text-xs text-slate-400 font-medium">Per patient pace</span>
              </div>
            </div>

            {/* MAIN SECTION GRID: CURRENT PATIENT & UPCOMING PATIENTS */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* CURRENT PATIENT CARD */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <span className="text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
                    CURRENT PATIENT
                  </span>
                  <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    ● In Room Now
                  </span>
                </div>

                <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl p-8 shadow-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-extrabold text-blue-200 uppercase tracking-widest block">Token Number</span>
                      <div className="text-6xl font-black text-blue-600 font-mono tracking-tight mt-1">{currentPatient.token}</div>
                    </div>

                    <div className="w-16 h-16 rounded-2xl bg-white text-blue-600 border border-blue-200 flex items-center justify-center font-black text-2xl shadow-sm">
                      <User className="w-8 h-8" />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-blue-100 grid grid-cols-3 gap-4 text-xs font-bold text-slate-700">
                    <div>
                      <span className="text-slate-400 font-extrabold uppercase block text-[10px]">Patient Name</span>
                      <span className="text-slate-900 font-black text-sm block mt-0.5">{currentPatient.name}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-extrabold uppercase block text-[10px]">Age</span>
                      <span className="text-slate-900 font-black text-sm block mt-0.5">{currentPatient.age}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 font-extrabold uppercase block text-[10px]">Gender</span>
                      <span className="text-slate-900 font-black text-sm block mt-0.5">{currentPatient.gender}</span>
                    </div>
                  </div>
                </div>

                {/* BUTTONS: View Details & Next Patient */}
                <div className="flex items-center gap-4 pt-2">
                  <Link
                    href="/doctor/current-patient"
                    className="flex-1 py-3.5 px-6 rounded-2xl border-2 border-slate-200 hover:bg-slate-50 text-slate-800 font-extrabold text-xs shadow-xs text-center transition-all cursor-pointer"
                  >
                    View Details Tab →
                  </Link>

                  <button
                    type="button"
                    onClick={handleNextPatient}
                    className="flex-1 py-3.5 px-6 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    Next Patient →
                  </button>
                </div>
              </div>

              {/* DEFAULT 5 UPCOMING PATIENTS LIST */}
              <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <h2 className="text-lg font-black text-slate-900">Upcoming Patients (5 Members)</h2>
                  <span className="text-xs font-extrabold text-slate-400">{upcomingPatients.length} Waiting</span>
                </div>

                <div className="space-y-3">
                  {upcomingPatients.map((pat) => (
                    <div
                      key={pat.token}
                      onClick={() => {
                        const idx = defaultQueueMembers.findIndex((p) => p.token === pat.token);
                        if (idx !== -1) {
                          playHospitalChime();
                          setActivePatientIdx(idx);
                          setSimMessage(`Switched Active Patient to Token ${pat.token} (${pat.name})`);
                          setTimeout(() => setSimMessage(null), 3000);
                        }
                      }}
                      className="p-4 rounded-2xl border border-slate-200/80 bg-slate-50/70 hover:bg-white hover:shadow-md transition-all flex items-center justify-between text-xs font-bold cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-mono font-black flex items-center justify-center">
                          {pat.token}
                        </div>
                        <div>
                          <span className="text-slate-900 font-extrabold block text-sm">{pat.name}</span>
                          <span className="text-slate-400 font-medium">Token: {pat.token} • {pat.age}Y</span>
                        </div>
                      </div>

                      <span className="text-slate-500 font-mono bg-white px-3 py-1 rounded-xl border border-slate-200">
                        {pat.wait}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* DEDICATED CURRENT PATIENT TAB IN DASHBOARD */}
        {activeTab === 'current' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <span className="text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
                CURRENT PATIENT FULL SPECS
              </span>
              <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                ● In Room 102 Now
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-bold">
              <div className="bg-blue-50/80 p-6 rounded-2xl border border-blue-100 space-y-2">
                <span className="text-slate-400 font-extrabold uppercase block text-[10px]">Active Token & Name</span>
                <div className="text-4xl font-black text-blue-600 font-mono">{currentPatient.token}</div>
                <div className="text-xl font-black text-slate-900 mt-1">{currentPatient.name}</div>
                <p className="text-slate-500 font-medium">{currentPatient.age} Yrs • {currentPatient.gender} • {currentPatient.mrn}</p>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-2">
                <span className="text-slate-400 font-extrabold uppercase block text-[10px]">Vitals Telemetry</span>
                <div className="grid grid-cols-2 gap-2 text-slate-800 pt-1">
                  <div>BP: <strong className="text-slate-900">120/80 mmHg</strong></div>
                  <div>Heart Rate: <strong className="text-rose-600">78 bpm</strong></div>
                  <div>Temp: <strong className="text-amber-600">99.4 °F</strong></div>
                  <div>SpO2: <strong className="text-cyan-600">98%</strong></div>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <Link
                href="/doctor/current-patient"
                className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-md flex items-center gap-2"
              >
                Open Full Clinical Workspace Page <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </main>

      <MobileNav />
    </div>
  );
}
