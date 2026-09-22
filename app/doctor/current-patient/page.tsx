'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { MobileNav } from '@/components/layout/MobileNav';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { PriorityBadge } from '@/components/ui/PriorityBadge';
import { playHospitalChime } from '@/lib/audio/chime';
import {
  Stethoscope,
  Volume2,
  CheckCircle2,
  Clock,
  User,
  Activity,
  Heart,
  Thermometer,
  FileText,
  Save,
  SkipForward,
  UserX,
  Play,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Pill,
  History,
  RefreshCw,
  Users
} from 'lucide-react';

interface PatientSpec {
  token: string;
  name: string;
  age: number;
  gender: string;
  mrn: string;
  bloodGroup: string;
  phone: string;
  status: 'CALLED' | 'IN_CONSULTATION' | 'COMPLETED' | 'WAITING';
  priority: 'NORMAL' | 'PRIORITY' | 'EMERGENCY';
  bp: string;
  pulse: string;
  temp: string;
  spo2: string;
  weight: string;
  symptoms: string;
  diagnosis: string;
  prescription: string;
  followUp: string;
}

export default function DoctorCurrentPatientPage() {
  // Initial Pool of Patients (Default 5 members + active A024)
  const initialPatients: PatientSpec[] = [
    {
      token: 'A024',
      name: 'Priya Sharma',
      age: 29,
      gender: 'Female',
      mrn: 'MRN-2026-9012',
      bloodGroup: 'B+',
      phone: '+91 98765 43210',
      status: 'CALLED',
      priority: 'NORMAL',
      bp: '118/76 mmHg',
      pulse: '72 bpm',
      temp: '98.6 °F',
      spo2: '99%',
      weight: '58 kg',
      symptoms: 'Routine OPD health screening and persistent headache.',
      diagnosis: 'Tension Headache & Mild Stress',
      prescription: '1. Multivitamin 1 tab daily (30 days)\n2. Rest and hydration',
      followUp: '2026-09-28',
    },
    {
      token: 'A025',
      name: 'Karthik R',
      age: 34,
      gender: 'Male',
      mrn: 'MRN-2026-9045',
      bloodGroup: 'A+',
      phone: '+91 98111 22334',
      status: 'WAITING',
      priority: 'NORMAL',
      bp: '124/82 mmHg',
      pulse: '75 bpm',
      temp: '98.4 °F',
      spo2: '98%',
      weight: '76 kg',
      symptoms: 'Gastric discomfort, hyperacidity after meals.',
      diagnosis: 'GERD & Acute Gastritis',
      prescription: '1. Pantoprazole 40mg - 1 tab od ac (14 days)\n2. Antacid syrup 10ml tid',
      followUp: '2026-10-02',
    },
    {
      token: 'A026',
      name: 'Sneha M',
      age: 45,
      gender: 'Female',
      mrn: 'MRN-2026-9102',
      bloodGroup: 'AB+',
      phone: '+91 98222 33445',
      status: 'WAITING',
      priority: 'PRIORITY',
      bp: '135/88 mmHg',
      pulse: '82 bpm',
      temp: '98.8 °F',
      spo2: '97%',
      weight: '64 kg',
      symptoms: 'Joint pain in knees, stiffness in early morning.',
      diagnosis: 'Early Stage Osteoarthritis',
      prescription: '1. Glucosamine 500mg - 1 tab od (30 days)\n2. Calcium & Vitamin D3',
      followUp: '2026-10-05',
    },
    {
      token: 'A027',
      name: 'Arjun S',
      age: 52,
      gender: 'Male',
      mrn: 'MRN-2026-9150',
      bloodGroup: 'O-',
      phone: '+91 98333 44556',
      status: 'WAITING',
      priority: 'NORMAL',
      bp: '130/84 mmHg',
      pulse: '74 bpm',
      temp: '98.6 °F',
      spo2: '98%',
      weight: '80 kg',
      symptoms: 'Blood pressure check and medication renewal.',
      diagnosis: 'Essential Hypertension (Controlled)',
      prescription: '1. Amlodipine 5mg - 1 tab od (30 days)',
      followUp: '2026-10-20',
    },
    {
      token: 'A028',
      name: 'Deepa Patel',
      age: 38,
      gender: 'Female',
      mrn: 'MRN-2026-9200',
      bloodGroup: 'B-',
      phone: '+91 98444 55667',
      status: 'WAITING',
      priority: 'EMERGENCY',
      bp: '142/92 mmHg',
      pulse: '90 bpm',
      temp: '102.1 °F',
      spo2: '96%',
      weight: '62 kg',
      symptoms: 'Acute high grade fever with severe chills and rigors.',
      diagnosis: 'Acute Febrile Illness - Triage Assessment Required',
      prescription: '1. IV Paracetamol 1g stat\n2. CBC, Dengue NS1 & Malaria Antigen Panel',
      followUp: 'Immediate',
    },
    {
      token: 'A029',
      name: 'Vikram Singh',
      age: 50,
      gender: 'Male',
      mrn: 'MRN-2026-9240',
      bloodGroup: 'O+',
      phone: '+91 98555 66778',
      status: 'WAITING',
      priority: 'NORMAL',
      bp: '122/80 mmHg',
      pulse: '76 bpm',
      temp: '98.6 °F',
      spo2: '98%',
      weight: '75 kg',
      symptoms: 'Follow up consultation and routine lab check.',
      diagnosis: 'General OPD Checkup',
      prescription: '1. Vitamin B12 Supplement (30 days)',
      followUp: '2026-10-30',
    },
  ];

  const [patients, setPatients] = useState<PatientSpec[]>(initialPatients);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [savedNotes, setSavedNotes] = useState(false);

  const currentPatient = patients[activeIndex];

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleCallNext = () => {
    playHospitalChime();
    const updated = [...patients];
    updated[activeIndex].status = 'COMPLETED';
    const nextIdx = (activeIndex + 1) % patients.length;
    updated[nextIdx].status = 'CALLED';
    setPatients(updated);
    setActiveIndex(nextIdx);
    showToast(`Active Token Changed to ${updated[nextIdx].token} (${updated[nextIdx].name})! Hospital Chime Sounded 🔔`);
  };

  const handleStartConsultation = () => {
    const updated = [...patients];
    if (updated[activeIndex].status === 'COMPLETED') {
      // If current is completed, advance to next and start consultation
      const nextIdx = (activeIndex + 1) % patients.length;
      updated[nextIdx].status = 'IN_CONSULTATION';
      setPatients(updated);
      setActiveIndex(nextIdx);
      showToast(`Active Token Changed to ${updated[nextIdx].token} (${updated[nextIdx].name}) — Consultation Started 🩺`);
    } else {
      updated[activeIndex].status = 'IN_CONSULTATION';
      setPatients(updated);
      showToast(`Started consultation for Active Token ${currentPatient.token} (${currentPatient.name}) 🩺`);
    }
  };

  const handleCompleteConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = [...patients];
    const prevToken = currentPatient.token;
    updated[activeIndex].status = 'COMPLETED';
    
    // Automatically advance active token to the next waiting patient
    const nextIdx = (activeIndex + 1) % patients.length;
    if (updated[nextIdx].status !== 'COMPLETED') {
      updated[nextIdx].status = 'IN_CONSULTATION';
    }
    
    setPatients(updated);
    setActiveIndex(nextIdx);
    setSavedNotes(true);
    showToast(`Completed Rx for Token ${prevToken}! Active Token changed to ${updated[nextIdx].token} (${updated[nextIdx].name}) ✓`);
    setTimeout(() => setSavedNotes(false), 3000);
  };

  const handleReannounce = () => {
    playHospitalChime();
    showToast(`Re-broadcasting chime for Token ${currentPatient.token} 🔔`);
  };

  const handleSelectPatientIndex = (idx: number) => {
    playHospitalChime();
    setActiveIndex(idx);
    showToast(`Switched Active Patient to Token ${patients[idx].token} (${patients[idx].name})`);
  };

  // Remaining waiting members
  const waitingMembers = patients.filter((_, idx) => idx !== activeIndex);

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans pb-16 md:pb-0">
      <PortalSidebar role="DOCTOR" userName="Dr. Aditya Kumar" userEmail="dr.aditya@smartcare.org" />

      <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto space-y-8 max-w-7xl mx-auto">
        {/* DOCTOR & ROOM HEADER */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center font-black text-2xl shadow-md shrink-0">
              <Stethoscope className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Dr. Aditya Kumar</h1>
                <span className="px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-black border border-emerald-200">
                  ● Room 102 (General Medicine)
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-bold mt-0.5">
                Current Patient Clinical Workspace & Live Queue
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCallNext}
              className="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-lg shadow-blue-600/25 flex items-center gap-2 transition-all cursor-pointer"
            >
              <Volume2 className="w-4 h-4" /> Call Next Patient 🔔
            </button>
          </div>
        </div>

        {/* TOAST MESSAGE */}
        {toastMessage && (
          <div className="bg-slate-900 text-white px-6 py-3.5 rounded-2xl font-bold text-xs shadow-xl animate-in fade-in slide-in-from-top duration-200 flex items-center justify-between border border-slate-700">
            <span className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" /> {toastMessage}
            </span>
          </div>
        )}

        {/* MAIN CURRENT PATIENT SPECS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT SPECS PANEL: DEMOGRAPHICS, VITALS & CONTROLS */}
          <div className="lg:col-span-7 space-y-6">
            {/* ACTIVE PATIENT SPECS CARD */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <span className="text-xs font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
                  ACTIVE PATIENT SPECS
                </span>
                <div className="flex items-center gap-2">
                  <PriorityBadge priority={currentPatient.priority} />
                  <StatusBadge status={currentPatient.status} size="md" />
                </div>
              </div>

              {/* ACTIVE TOKEN & PATIENT HEADER */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl p-8 shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-extrabold text-blue-200 uppercase tracking-widest block">
                      Active Token Number
                    </span>
                    <div className="text-6xl font-black font-mono tracking-tight mt-1">
                      {currentPatient.token}
                    </div>
                  </div>
                  <div className="w-16 h-16 rounded-2xl bg-white/10 text-white flex items-center justify-center font-black text-2xl border border-white/20">
                    <User className="w-8 h-8" />
                  </div>
                </div>

                <div className="pt-4 border-t border-blue-500/50 space-y-1">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black">{currentPatient.name}</h2>
                    <span className="text-xs font-mono font-bold bg-white/20 px-2.5 py-1 rounded-lg">
                      {currentPatient.mrn}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-blue-100">
                    {currentPatient.age} Yrs • {currentPatient.gender} • Blood Group: <strong className="text-white font-black">{currentPatient.bloodGroup}</strong> • Phone: {currentPatient.phone}
                  </p>
                </div>
              </div>

              {/* CLINICAL VITALS GRID */}
              <div className="space-y-3">
                <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Patient Vitals Telemetry</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-bold">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase block">Blood Pressure</span>
                    <span className="text-sm font-black text-slate-900 block">{currentPatient.bp}</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase block">Heart Rate</span>
                    <span className="text-sm font-black text-rose-600 block">{currentPatient.pulse}</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase block">Body Temp</span>
                    <span className="text-sm font-black text-amber-600 block">{currentPatient.temp}</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase block">SpO2 / Weight</span>
                    <span className="text-sm font-black text-cyan-600 block">{currentPatient.spo2} • {currentPatient.weight}</span>
                  </div>
                </div>
              </div>

              {/* SYMPTOMS & CHIEF COMPLAINT */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 space-y-2 text-xs">
                <span className="font-extrabold text-slate-900 uppercase tracking-wider block">Chief Symptoms / Reason for Visit</span>
                <p className="text-slate-700 font-bold leading-relaxed">{currentPatient.symptoms}</p>
              </div>

              {/* CONTROL BUTTONS */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCallNext}
                  className="py-3.5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-md shadow-blue-600/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Volume2 className="w-4 h-4" /> Call Next 🔔
                </button>

                <button
                  type="button"
                  onClick={handleStartConsultation}
                  className="py-3.5 px-4 rounded-2xl bg-cyan-600 hover:bg-cyan-700 text-white font-black text-xs shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Play className="w-4 h-4" /> Start Consult
                </button>

                <button
                  type="button"
                  onClick={handleReannounce}
                  className="py-3.5 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer col-span-2 sm:col-span-1"
                >
                  <RefreshCw className="w-4 h-4 text-cyan-400" /> Re-announce
                </button>
              </div>
            </div>

            {/* DEFAULT 5 MEMBERS QUEUE LIST */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" /> Default Queue Members ({patients.length - 1} Waiting)
                </h3>
                <span className="text-xs font-bold text-slate-400">Click to switch active token</span>
              </div>

              <div className="space-y-3">
                {patients.map((pat, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <div
                      key={pat.token}
                      onClick={() => handleSelectPatientIndex(idx)}
                      className={`p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex items-center justify-between text-xs font-bold ${
                        isActive
                          ? 'bg-blue-50/90 border-blue-600 shadow-md ring-2 ring-blue-500/20'
                          : 'bg-slate-50/70 border-slate-200/80 hover:bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-xl font-mono font-black flex items-center justify-center ${
                          isActive ? 'bg-blue-600 text-white' : 'bg-slate-900 text-white'
                        }`}>
                          {pat.token}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-900 font-extrabold text-sm">{pat.name}</span>
                            {isActive && (
                              <span className="px-2 py-0.5 rounded bg-blue-600 text-white text-[10px] font-black uppercase">
                                ACTIVE
                              </span>
                            )}
                          </div>
                          <span className="text-slate-500 font-medium">{pat.age} Yrs • {pat.gender} • {pat.mrn}</span>
                        </div>
                      </div>

                      <PriorityBadge priority={pat.priority} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: PRESCRIPTION FORM FOR ACTIVE TOKEN */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
                <Pill className="w-5 h-5 text-blue-600" /> Diagnosis & Prescription
              </h2>
              <span className="text-xs font-extrabold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg">
                Token {currentPatient.token}
              </span>
            </div>

            {savedNotes && (
              <div className="bg-emerald-50 text-emerald-800 p-4 rounded-2xl border border-emerald-200 text-xs font-extrabold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Prescription saved for {currentPatient.name} ({currentPatient.token})!
              </div>
            )}

            <form onSubmit={handleCompleteConsultation} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                  Clinical Diagnosis *
                </label>
                <input
                  type="text"
                  required
                  value={currentPatient.diagnosis}
                  onChange={(e) => {
                    const updated = [...patients];
                    updated[activeIndex].diagnosis = e.target.value;
                    setPatients(updated);
                  }}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                  Rx Prescription & Dosage *
                </label>
                <textarea
                  required
                  rows={6}
                  value={currentPatient.prescription}
                  onChange={(e) => {
                    const updated = [...patients];
                    updated[activeIndex].prescription = e.target.value;
                    setPatients(updated);
                  }}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-extrabold text-slate-700 uppercase tracking-wider block">
                  Follow-up Visit Date
                </label>
                <input
                  type="date"
                  value={currentPatient.followUp}
                  onChange={(e) => {
                    const updated = [...patients];
                    updated[activeIndex].followUp = e.target.value;
                    setPatients(updated);
                  }}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-lg shadow-emerald-600/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <CheckCircle2 className="w-5 h-5" /> Complete Consultation & Save Rx
              </button>
            </form>
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  );
}
