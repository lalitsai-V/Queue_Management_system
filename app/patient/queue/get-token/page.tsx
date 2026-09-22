'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { MobileNav } from '@/components/layout/MobileNav';
import { globalQueueStore } from '@/lib/queue/engine';
import { Token, TokenPriority } from '@/types/queue';
import { Ticket, ArrowRight, CheckCircle2, Calendar, Clock, Stethoscope, UserCheck, Heart, Sparkles, Building2, Eye, Baby, Smile, PhoneCall, Activity, ChevronRight } from 'lucide-react';

function GetTokenContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialDeptCode = searchParams.get('dept') || 'GM';

  const [step, setStep] = useState<number>(1);
  const [selectedDeptId, setSelectedDeptId] = useState<string>(
    globalQueueStore.departments.find((d) => d.code === initialDeptCode)?.id || globalQueueStore.departments[0].id
  );
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('10:30 AM (Now Serving)');
  const [selectedDocId, setSelectedDocId] = useState<string>(globalQueueStore.doctors[0].id);
  const [priority, setPriority] = useState<TokenPriority>('NORMAL');
  const [generatedToken, setGeneratedToken] = useState<Token | null>(null);
  const [loading, setLoading] = useState(false);
  const [calendarAdded, setCalendarAdded] = useState(false);

  const departmentsData = [
    { id: 'dept-gm', code: 'GM', name: 'General Medicine', doctor: 'Dr. Rajesh Sharma', availability: 'Available Now', avgWait: '~15 mins', icon: Stethoscope },
    { id: 'dept-car', code: 'CAR', name: 'Cardiology', doctor: 'Dr. Anita Kumar', availability: 'Available Now', avgWait: '~20 mins', icon: Heart },
    { id: 'dept-der', code: 'DER', name: 'Dermatology', doctor: 'Dr. Meera Iyer', availability: 'Available Today', avgWait: '~10 mins', icon: Activity },
    { id: 'dept-ped', code: 'PED', name: 'Pediatrics', doctor: 'Dr. Sunita Gupta', availability: 'Available Now', avgWait: '~12 mins', icon: Baby },
    { id: 'dept-ort', code: 'ORT', name: 'Orthopedics', doctor: 'Dr. Vikram Verma', availability: 'Available Now', avgWait: '~18 mins', icon: Building2 },
    { id: 'dept-ent', code: 'ENT', name: 'ENT', doctor: 'Dr. Sanjay Nambiar', availability: 'Available Today', avgWait: '~8 mins', icon: PhoneCall },
    { id: 'dept-oph', code: 'OPH', name: 'Ophthalmology', doctor: 'Dr. Kavita Reddy', availability: 'Available Now', avgWait: '~14 mins', icon: Eye },
    { id: 'dept-gyn', code: 'GYN', name: 'Gynecology', doctor: 'Dr. Shalini Saxena', availability: 'Available Now', avgWait: '~15 mins', icon: Smile },
  ];

  const selectedDeptObj = departmentsData.find((d) => d.id === selectedDeptId) || departmentsData[0];
  const selectedDocObj = globalQueueStore.doctors.find((d) => d.id === selectedDocId) || globalQueueStore.doctors[0];

  const handleBookToken = () => {
    setLoading(true);
    setTimeout(() => {
      const newToken = globalQueueStore.generateToken(selectedDeptId, selectedDocId, 'pat-1', priority);
      newToken.display_token = 'A023';
      setGeneratedToken(newToken);
      setLoading(false);
      setStep(4); // Final Confirmation Step
    }, 500);
  };

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans pb-16 md:pb-0">
      <PortalSidebar role="PATIENT" userName="Lalit" userEmail="lalit@example.com" />

      <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto space-y-8 max-w-4xl mx-auto">
        {/* Title */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Book a New Token</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">Select a department and preferred time to get your token.</p>
        </div>

        {/* Multi-Step Indicator */}
        {step <= 3 && (
          <div className="flex items-center justify-between bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs">
            {[
              { num: 1, label: 'Select Department' },
              { num: 2, label: 'Choose Time' },
              { num: 3, label: 'Confirm' },
            ].map((s) => (
              <div key={s.num} className="flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-2xl flex items-center justify-center text-xs font-black transition-all ${
                    step === s.num
                      ? 'bg-blue-600 text-white shadow-md'
                      : step > s.num
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {step > s.num ? <CheckCircle2 className="w-5 h-5" /> : s.num}
                </div>
                <span
                  className={`text-xs font-extrabold hidden sm:inline ${
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
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {departmentsData.map((dept) => {
                const IconComp = dept.icon;
                const isSelected = selectedDeptId === dept.id;

                return (
                  <div
                    key={dept.id}
                    onClick={() => setSelectedDeptId(dept.id)}
                    className={`bg-white rounded-3xl p-6 border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between space-y-4 shadow-xs ${
                      isSelected
                        ? 'border-blue-600 ring-4 ring-blue-500/10 shadow-md'
                        : 'border-slate-200/80 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'
                      }`}>
                        <IconComp className="w-6 h-6" />
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-extrabold border border-emerald-200">
                        {dept.availability}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-black text-slate-900">{dept.name}</h3>
                      <p className="text-xs text-slate-500 font-bold mt-0.5">{dept.doctor}</p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 font-extrabold pt-2 border-t border-slate-100">
                      <span>Wait Time:</span>
                      <span className="text-blue-600 font-mono">{dept.avgWait}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="px-8 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm shadow-lg shadow-blue-600/25 flex items-center gap-2 cursor-pointer"
              >
                Choose Time <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: CHOOSE TIME & DOCTOR */}
        {step === 2 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
            <h2 className="text-xl font-black text-slate-900">Step 2: Choose Consultation Time</h2>

            <div className="space-y-4">
              <span className="text-xs font-extrabold text-slate-500 uppercase tracking-wider block">Available Slots Today</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  '10:30 AM (Now Serving)',
                  '11:00 AM Slot',
                  '11:30 AM Slot',
                  '12:00 PM Slot',
                  '02:30 PM Slot',
                  '03:00 PM Slot',
                ].map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTimeSlot(slot)}
                    className={`py-3.5 px-4 rounded-2xl text-xs font-extrabold transition-all border cursor-pointer ${
                      selectedTimeSlot === slot
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3.5 rounded-2xl border-2 border-slate-200 text-slate-700 font-extrabold text-xs hover:bg-slate-50 cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex-1 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                Continue to Confirm <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CONFIRM DETAILS */}
        {step === 3 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
            <h2 className="text-xl font-black text-slate-900">Step 3: Confirm Token Details</h2>

            <div className="bg-slate-50 rounded-2xl p-6 space-y-4 border border-slate-200 text-xs font-bold text-slate-700">
              <div className="flex justify-between border-b border-slate-200/80 pb-3">
                <span className="text-slate-500">Department</span>
                <span className="text-slate-900 font-extrabold">{selectedDeptObj.name} ({selectedDeptObj.code})</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/80 pb-3">
                <span className="text-slate-500">Attending Doctor</span>
                <span className="text-slate-900 font-extrabold">{selectedDeptObj.doctor}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/80 pb-3">
                <span className="text-slate-500">Selected Time</span>
                <span className="text-blue-600 font-extrabold">{selectedTimeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Estimated Waiting Time</span>
                <span className="text-cyan-600 font-extrabold">{selectedDeptObj.avgWait}</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3.5 rounded-2xl border-2 border-slate-200 text-slate-700 font-extrabold text-xs hover:bg-slate-50 cursor-pointer"
              >
                Back
              </button>
              <button
                onClick={handleBookToken}
                disabled={loading}
                className="flex-1 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-black text-sm shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? 'Generating Token...' : 'Confirm & Issue Token Now'}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: FINAL TOKEN CONFIRMATION PAGE */}
        {step === 4 && (
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-2xl text-center space-y-8 animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center font-black mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Token Booked Successfully!</h2>
              <p className="text-xs text-slate-500 font-medium">Your token details are below.</p>
            </div>

            {/* Token Card Details */}
            <div className="bg-gradient-to-br from-slate-50 to-blue-50/50 rounded-3xl p-8 border border-blue-100 max-w-md mx-auto space-y-6 shadow-sm">
              <div className="space-y-1">
                <span className="text-xs font-extrabold text-slate-500 uppercase tracking-widest block">Token Number</span>
                <div className="text-6xl font-black text-blue-600 font-mono tracking-tight">A023</div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-left text-xs font-bold pt-4 border-t border-slate-200/80">
                <div>
                  <span className="text-slate-400 font-extrabold uppercase block text-[10px]">Department</span>
                  <span className="text-slate-900 block mt-0.5">{selectedDeptObj.name}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-extrabold uppercase block text-[10px]">Doctor</span>
                  <span className="text-slate-900 block mt-0.5">{selectedDeptObj.doctor}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-extrabold uppercase block text-[10px]">Date & Time</span>
                  <span className="text-slate-900 block mt-0.5">21 Sep 2026, 10:30 AM</span>
                </div>
                <div>
                  <span className="text-slate-400 font-extrabold uppercase block text-[10px]">Estimated Waiting Time</span>
                  <span className="text-cyan-600 block mt-0.5">~15 mins</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto pt-2">
              <Link
                href="/patient/queue"
                className="w-full sm:flex-1 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                View Live Queue
              </Link>
              <button
                type="button"
                onClick={() => setCalendarAdded(true)}
                className="w-full sm:flex-1 py-3.5 rounded-2xl bg-white border-2 border-slate-200 hover:bg-slate-50 text-slate-800 font-extrabold text-xs shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                {calendarAdded ? '✓ Added to Calendar' : 'Add to Calendar'}
              </button>
            </div>
          </div>
        )}
      </main>

      <MobileNav />
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
