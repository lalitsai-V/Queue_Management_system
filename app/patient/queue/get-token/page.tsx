'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { TokenCard } from '@/components/queue/TokenCard';
import { globalQueueStore } from '@/lib/queue/engine';
import { Token, TokenPriority } from '@/types/queue';
import { Ticket, ArrowRight, ArrowLeft, CheckCircle2, ShieldAlert, Sparkles, Stethoscope, UserCheck } from 'lucide-react';

function GetTokenContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialDeptCode = searchParams.get('dept') || 'GM';

  const [step, setStep] = useState<number>(1);
  const [selectedDeptId, setSelectedDeptId] = useState<string>(
    globalQueueStore.departments.find((d) => d.code === initialDeptCode)?.id || globalQueueStore.departments[0].id
  );
  const [selectedDocId, setSelectedDocId] = useState<string>(globalQueueStore.doctors[0].id);
  const [priority, setPriority] = useState<TokenPriority>('NORMAL');
  const [generatedToken, setGeneratedToken] = useState<Token | null>(null);
  const [loading, setLoading] = useState(false);

  const selectedDept = globalQueueStore.departments.find((d) => d.id === selectedDeptId);
  const availableDoctors = globalQueueStore.doctors.filter((d) => d.department_id === selectedDeptId);
  const selectedDoc = globalQueueStore.doctors.find((d) => d.id === selectedDocId) || availableDoctors[0];

  const handleGenerateToken = () => {
    setLoading(true);
    setTimeout(() => {
      const newToken = globalQueueStore.generateToken(selectedDeptId, selectedDocId, 'pat-1', priority);
      setGeneratedToken(newToken);
      setLoading(false);
      setStep(5);
    }, 600);
  };

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      <PortalSidebar role="PATIENT" userName="Rohan Mehta" userEmail="rohan.mehta@gmail.com" />

      <main className="flex-1 p-6 lg:p-10 overflow-y-auto space-y-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-white flex items-center justify-center font-black text-2xl mx-auto shadow-md">
            <Ticket className="w-7 h-7" />
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Generate Queue Token</h1>
          <p className="text-xs text-slate-500 font-medium">Select department and doctor to issue your official digital token</p>
        </div>

        {/* Step Indicator */}
        {step < 5 && (
          <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200/80 shadow-2xs">
            {[
              { num: 1, label: 'Department' },
              { num: 2, label: 'Doctor' },
              { num: 3, label: 'Priority' },
              { num: 4, label: 'Confirm' },
            ].map((s) => (
              <div key={s.num} className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black transition-all ${
                    step === s.num
                      ? 'bg-sky-600 text-white shadow-sm'
                      : step > s.num
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {step > s.num ? <CheckCircle2 className="w-4 h-4" /> : s.num}
                </div>
                <span
                  className={`text-xs font-bold hidden sm:inline ${
                    step === s.num ? 'text-slate-900' : 'text-slate-400'
                  }`}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* STEP 1: SELECT DEPARTMENT */}
        {step === 1 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
            <h2 className="text-xl font-black text-slate-900">Step 1: Select Clinical Department</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {globalQueueStore.departments.map((dept) => (
                <div
                  key={dept.id}
                  onClick={() => {
                    setSelectedDeptId(dept.id);
                    const docs = globalQueueStore.doctors.filter((d) => d.department_id === dept.id);
                    if (docs.length > 0) setSelectedDocId(docs[0].id);
                  }}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                    selectedDeptId === dept.id
                      ? 'bg-sky-50/70 border-sky-500 shadow-md'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <span className="px-2.5 py-0.5 rounded-md bg-slate-100 font-mono text-xs font-black text-slate-700">
                      {dept.code}
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900 mt-2">{dept.name}</h3>
                    <p className="text-xs text-slate-500 mt-1">Avg consultation: {dept.average_consultation_minutes} min</p>
                  </div>
                  {selectedDeptId === dept.id && <CheckCircle2 className="w-6 h-6 text-sky-600" />}
                </div>
              ))}
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full py-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-2"
            >
              Continue to Select Doctor <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* STEP 2: SELECT DOCTOR */}
        {step === 2 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
            <h2 className="text-xl font-black text-slate-900">
              Step 2: Select Doctor for {selectedDept?.name}
            </h2>

            <div className="space-y-3">
              {availableDoctors.length > 0 ? (
                availableDoctors.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDocId(doc.id)}
                    className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                      selectedDocId === doc.id
                        ? 'bg-sky-50/70 border-sky-500 shadow-md'
                        : 'bg-white border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-700 flex items-center justify-center font-extrabold text-lg">
                        <UserCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-base font-extrabold text-slate-900">
                          {doc.profile?.full_name || 'Dr. Rajesh Sharma'}
                        </h3>
                        <p className="text-xs text-slate-500">{doc.specialization}</p>
                        <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200 mt-1 inline-block">
                          {doc.room_number}
                        </span>
                      </div>
                    </div>
                    {selectedDocId === doc.id && <CheckCircle2 className="w-6 h-6 text-sky-600" />}
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-slate-500 font-bold bg-slate-50 rounded-2xl">
                  No specific doctors listed for this department. Default queue attending will be assigned.
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setStep(1)}
                className="py-3.5 px-6 rounded-xl border border-slate-300 text-slate-700 font-bold text-sm"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-2"
              >
                Continue to Priority <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: PRIORITY SELECTION */}
        {step === 3 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
            <h2 className="text-xl font-black text-slate-900">Step 3: Select Queue Priority Level</h2>

            <div className="space-y-4">
              {[
                {
                  id: 'NORMAL',
                  title: 'Standard Normal Queue',
                  desc: 'Standard first-in, first-out patient consultation queue.',
                  color: 'border-slate-200',
                },
                {
                  id: 'PRIORITY',
                  title: 'Priority Patient (Senior Citizen / Disabled)',
                  desc: 'Expedited processing for senior citizens, expectant mothers, or patients with physical disabilities.',
                  color: 'border-amber-300 bg-amber-50/50',
                },
                {
                  id: 'EMERGENCY',
                  title: 'Emergency Medical Triage',
                  desc: 'Immediate clinical priority for severe acute pain, trauma, or emergency medical condition.',
                  color: 'border-rose-400 bg-rose-50/50',
                },
              ].map((p) => (
                <div
                  key={p.id}
                  onClick={() => setPriority(p.id as TokenPriority)}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                    priority === p.id
                      ? 'bg-sky-50/80 border-sky-600 shadow-md ring-2 ring-sky-200'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">{p.title}</h3>
                    <p className="text-xs text-slate-600 mt-1">{p.desc}</p>
                  </div>
                  {priority === p.id && <CheckCircle2 className="w-6 h-6 text-sky-600 shrink-0" />}
                </div>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setStep(2)}
                className="py-3.5 px-6 rounded-xl border border-slate-300 text-slate-700 font-bold text-sm"
              >
                Back
              </button>
              <button
                onClick={() => setStep(4)}
                className="flex-1 py-3.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-2"
              >
                Confirm Token Details <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: CONFIRMATION */}
        {step === 4 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
            <h2 className="text-xl font-black text-slate-900">Step 4: Confirm Token Request</h2>

            <div className="bg-slate-50 p-6 rounded-2xl space-y-3 text-sm border border-slate-200">
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500 font-medium">Patient Name:</span>
                <span className="font-extrabold text-slate-900">Rohan Mehta</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500 font-medium">Department:</span>
                <span className="font-extrabold text-sky-700">{selectedDept?.name} ({selectedDept?.code})</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500 font-medium">Assigned Doctor:</span>
                <span className="font-extrabold text-slate-900">{selectedDoc?.profile?.full_name || 'Dr. Rajesh Sharma'}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500 font-medium">Room Location:</span>
                <span className="font-bold text-slate-800">{selectedDoc?.room_number || 'Room 102'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Priority Level:</span>
                <span className="font-bold text-amber-700">{priority}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setStep(3)}
                className="py-3.5 px-6 rounded-xl border border-slate-300 text-slate-700 font-bold text-sm"
              >
                Back
              </button>
              <button
                onClick={handleGenerateToken}
                disabled={loading}
                className="flex-1 py-4 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-black text-base shadow-lg shadow-sky-600/25 flex items-center justify-center gap-2"
              >
                {loading ? 'Generating Token...' : 'Generate Official Digital Token Now'}
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: DIGITAL TOKEN RECEIPT */}
        {step === 5 && generatedToken && (
          <div className="space-y-6 animate-in fade-in zoom-in duration-300">
            <div className="text-center space-y-1">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 font-extrabold text-xs uppercase tracking-wider inline-block">
                ✓ TOKEN SUCCESSFULLY GENERATED
              </span>
              <h2 className="text-2xl font-black text-slate-900">Your Official Token Slip</h2>
            </div>

            <TokenCard
              token={generatedToken}
              onViewLiveQueue={() => router.push('/patient/queue')}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default function GetTokenPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500 font-bold text-sm">Loading Token Generator...</div>}>
      <GetTokenContent />
    </Suspense>
  );
}
