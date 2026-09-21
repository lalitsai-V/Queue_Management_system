'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { QueueTimeline } from '@/components/queue/QueueTimeline';
import { WaitingTimeCard } from '@/components/queue/WaitingTimeCard';
import { INITIAL_TOKENS } from '@/lib/queue/data';
import { playHospitalChime } from '@/lib/audio/chime';
import { Token, TokenPriority } from '@/types/queue';
import {
  Clock,
  Ticket,
  Users,
  ShieldCheck,
  CheckCircle2,
  Tv,
  ArrowRight,
  Stethoscope,
  Activity,
  Award,
  Sparkles,
  Volume2,
  Play,
  Zap,
  HeartPulse,
  Flame
} from 'lucide-react';

export default function LandingPage() {
  // Interactive Hero Simulator State
  const [heroTokens, setHeroTokens] = useState<Token[]>([...INITIAL_TOKENS]);
  const [servingToken, setServingToken] = useState<string>('GM-024');
  const [patientsAhead, setPatientsAhead] = useState(4);
  const [estimatedWait, setEstimatedWait] = useState(32);
  const [chimeEnabled, setChimeEnabled] = useState(true);
  const [simMessage, setSimMessage] = useState<string | null>(null);

  // Active Department Explorer Tab State
  const [activeDeptTab, setActiveDeptTab] = useState('GM');

  const triggerSimMessage = (msg: string) => {
    setSimMessage(msg);
    setTimeout(() => setSimMessage(null), 3000);
  };

  const handleSimulateCallNext = () => {
    const waitingIndex = heroTokens.findIndex((t) => t.status === 'WAITING');
    if (waitingIndex !== -1) {
      const updated = [...heroTokens];
      updated[waitingIndex].status = 'CALLED';

      // Set previous called to IN_CONSULTATION
      const prevCalled = updated.findIndex((t) => t.status === 'IN_CONSULTATION');
      if (prevCalled !== -1) updated[prevCalled].status = 'COMPLETED';

      setHeroTokens(updated);
      setServingToken(updated[waitingIndex].display_token);
      setPatientsAhead((prev) => Math.max(0, prev - 1));
      setEstimatedWait((prev) => Math.max(0, prev - 8));

      if (chimeEnabled) playHospitalChime();
      triggerSimMessage(`Doctor Called ${updated[waitingIndex].display_token}! Audio Chime Sounded 🔔`);
    } else {
      triggerSimMessage('All tokens in demo simulator processed!');
    }
  };

  const handleSimulateAddEmergency = () => {
    const nextNum = heroTokens.length + 20;
    const newTok: Token = {
      id: `tok-em-${Date.now()}`,
      token_number: nextNum,
      display_token: `GM-EM-${nextNum}`,
      patient_id: 'pat-em',
      doctor_id: 'doc-sharma',
      department_id: 'dept-gm',
      priority: 'EMERGENCY',
      status: 'WAITING',
      queue_date: new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString(),
    };

    setHeroTokens([newTok, ...heroTokens]);
    setPatientsAhead((prev) => prev + 1);
    setEstimatedWait((prev) => prev + 8);
    triggerSimMessage('Emergency Token Inserted at Highest Priority Queue Position! 🚨');
  };

  const departmentsData = [
    {
      code: 'GM',
      name: 'General Medicine',
      doctor: 'Dr. Rajesh Sharma',
      room: 'Room 102 (Floor 1)',
      avg: '8 min',
      waiting: 12,
      spec: 'Primary Care, Fever, Health Screening',
      color: 'from-sky-500 to-blue-600',
    },
    {
      code: 'CAR',
      name: 'Cardiology',
      doctor: 'Dr. Anita Kumar',
      room: 'Room 205 (Floor 2)',
      avg: '15 min',
      waiting: 7,
      spec: 'Cardiac Diagnostics, ECG, Heart Health',
      color: 'from-teal-500 to-emerald-600',
    },
    {
      code: 'ORT',
      name: 'Orthopedics',
      doctor: 'Dr. Vikram Verma',
      room: 'Room 304 (Floor 3)',
      avg: '12 min',
      waiting: 5,
      spec: 'Bone Fractures, Spine & Joint Surgery',
      color: 'from-amber-500 to-orange-600',
    },
    {
      code: 'PED',
      name: 'Pediatrics',
      doctor: 'Dr. Sunita Gupta',
      room: 'Room 108 (Floor 1)',
      avg: '10 min',
      waiting: 9,
      spec: 'Child Care, Immunization, Growth Checkups',
      color: 'from-purple-500 to-indigo-600',
    },
    {
      code: 'DEN',
      name: 'Dental Care',
      doctor: 'Dr. Ramesh Patel',
      room: 'Room 401 (Floor 4)',
      avg: '15 min',
      waiting: 3,
      spec: 'Scaling, Extractions, Root Canal',
      color: 'from-pink-500 to-rose-600',
    },
  ];

  const currentDept = departmentsData.find((d) => d.code === activeDeptTab) || departmentsData[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-sky-500 selection:text-white">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION WITH INTERACTIVE SIMULATOR */}
        <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden bg-gradient-to-b from-sky-50/80 via-blue-50/40 to-slate-50 medical-grid-bg">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[500px] h-[500px] rounded-full hero-glow-1 pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[500px] h-[500px] rounded-full hero-glow-2 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Hero Left Content */}
              <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-100/90 border border-sky-300/80 text-sky-800 text-xs font-black tracking-wide uppercase shadow-2xs">
                  <Sparkles className="w-4 h-4 text-sky-600 animate-spin" /> Next-Gen Smart Hospital Queue Platform
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                  Smarter Queues.{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 via-blue-600 to-teal-600">
                    Shorter Waits.
                  </span>{' '}
                  Better Care.
                </h1>

                <p className="text-lg sm:text-xl text-slate-600 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Digitally manage hospital queues, track your real-time position from your phone, and receive instant audio-visual alerts when your turn arrives.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                  <Link
                    href="/patient/queue/get-token"
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white font-black text-base shadow-xl shadow-sky-600/25 flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95"
                  >
                    <Ticket className="w-5 h-5" /> Get Digital Token Now
                  </Link>

                  <Link
                    href="/patient/queue"
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-base border-2 border-slate-200 shadow-md flex items-center justify-center gap-3 transition-all hover:border-slate-300"
                  >
                    <Clock className="w-5 h-5 text-sky-600" /> View Live Queue Tracker
                  </Link>
                </div>

                {/* Trust Badges */}
                <div className="pt-8 border-t border-slate-200/80 grid grid-cols-3 gap-4 text-slate-700">
                  <div className="flex items-center gap-2 justify-center lg:justify-start">
                    <ShieldCheck className="w-5 h-5 text-teal-600 shrink-0" />
                    <span className="text-xs font-extrabold">Zero Crowding</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center lg:justify-start">
                    <Activity className="w-5 h-5 text-sky-600 shrink-0" />
                    <span className="text-xs font-extrabold">Supabase Realtime</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center lg:justify-start">
                    <Award className="w-5 h-5 text-amber-600 shrink-0" />
                    <span className="text-xs font-extrabold">Priority & Triage</span>
                  </div>
                </div>
              </div>

              {/* Hero Right Visual Card — INTERACTIVE SIMULATOR */}
              <div className="lg:col-span-6 relative">
                <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-sky-100 relative z-10 space-y-6">
                  {/* Interactive Header Bar */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-white flex items-center justify-center font-bold shadow-md">
                        <Stethoscope className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">General Medicine</span>
                        <span className="text-sm font-extrabold text-slate-900">Dr. Rajesh Sharma (Room 102)</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setChimeEnabled(!chimeEnabled)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all border ${
                        chimeEnabled ? 'bg-sky-50 text-sky-700 border-sky-200' : 'bg-slate-100 text-slate-500 border-slate-200'
                      }`}
                      title="Toggle Hospital Audio Chime"
                    >
                      <Volume2 className={`w-3.5 h-3.5 ${chimeEnabled ? 'text-sky-600 animate-pulse' : 'text-slate-400'}`} />
                      {chimeEnabled ? 'Audio Chime ON' : 'Audio OFF'}
                    </button>
                  </div>

                  {/* Simulator Notification Toast */}
                  {simMessage && (
                    <div className="bg-slate-900 text-white px-4 py-2.5 rounded-2xl font-bold text-xs shadow-lg animate-in fade-in slide-in-from-top duration-200 flex items-center justify-between">
                      <span>{simMessage}</span>
                    </div>
                  )}

                  {/* Live Interactive Control Deck inside Hero */}
                  <div className="bg-gradient-to-r from-slate-900 to-slate-950 p-4 rounded-2xl text-white space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-sky-400 uppercase tracking-widest flex items-center gap-1">
                        <Flame className="w-4 h-4 text-amber-400" /> Interactive Hero Simulator
                      </span>
                      <span className="text-[11px] text-slate-400 font-bold">Try clicking buttons!</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                      <button
                        type="button"
                        onClick={handleSimulateCallNext}
                        className="py-2.5 px-3 rounded-xl bg-sky-600 hover:bg-sky-500 text-white shadow-md flex items-center justify-center gap-1.5 transition-all active:scale-95"
                      >
                        <Volume2 className="w-4 h-4" /> Call Next Token 🔔
                      </button>

                      <button
                        type="button"
                        onClick={handleSimulateAddEmergency}
                        className="py-2.5 px-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white shadow-md flex items-center justify-center gap-1.5 transition-all active:scale-95"
                      >
                        <Zap className="w-4 h-4" /> + Emergency Token 🚨
                      </button>
                    </div>
                  </div>

                  {/* Serving Token Banner */}
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Now Serving</span>
                      <div className="text-4xl font-black text-slate-900 font-mono mt-1 tracking-tight">{servingToken}</div>
                      <span className="text-[11px] font-bold text-emerald-600 block mt-1">● In Room 102</span>
                    </div>

                    <div className="bg-sky-50 rounded-2xl p-4 border border-sky-200/80">
                      <span className="text-xs font-bold text-sky-800 uppercase tracking-wider">Your Token</span>
                      <div className="text-4xl font-black text-sky-700 font-mono mt-1 tracking-tight">GM-029</div>
                      <span className="text-[11px] font-bold text-sky-600 block mt-1">Status: WAITING</span>
                    </div>
                  </div>

                  {/* Wait Metrics */}
                  <WaitingTimeCard
                    patientsAhead={patientsAhead}
                    estimatedWaitMinutes={estimatedWait}
                    position={patientsAhead + 1}
                  />

                  {/* Timeline */}
                  <div>
                    <span className="text-xs font-extrabold text-slate-600 uppercase tracking-wider block mb-2">
                      Live Queue Flow Timeline
                    </span>
                    <QueueTimeline tokens={heroTokens} currentTokenId="tok-24" patientTokenId="GM-029" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INTERACTIVE DEPARTMENT EXPLORER TABS */}
        <section id="departments" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
              <span className="text-xs font-extrabold text-sky-600 uppercase tracking-widest bg-sky-50 px-3.5 py-1.5 rounded-full border border-sky-200">
                Hospital Clinical Specialties
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Interactive Department Explorer
              </h2>
              <p className="text-slate-600 font-medium text-base">
                Click any department below to view live physician roster, room assignment, and estimated consultation benchmarks.
              </p>
            </div>

            {/* Tabs */}
            <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8">
              {departmentsData.map((d) => (
                <button
                  key={d.code}
                  onClick={() => setActiveDeptTab(d.code)}
                  className={`px-5 py-3 rounded-2xl font-black text-xs transition-all flex items-center gap-2 border ${
                    activeDeptTab === d.code
                      ? 'bg-slate-900 text-white border-slate-900 shadow-lg scale-105'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="font-mono text-xs">{d.code}</span>
                  <span>{d.name}</span>
                </button>
              ))}
            </div>

            {/* Active Tab Showcase Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-8 shadow-2xl border border-slate-800 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-8 space-y-4">
                <div className="flex items-center gap-3">
                  <span className={`px-4 py-1.5 rounded-xl bg-gradient-to-r ${currentDept.color} text-white font-mono font-black text-sm shadow-md`}>
                    {currentDept.code}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                    ● ACTIVE QUEUE
                  </span>
                </div>

                <h3 className="text-3xl font-black text-white">{currentDept.name}</h3>
                <p className="text-slate-300 text-sm font-medium leading-relaxed">{currentDept.spec}</p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                  <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/60">
                    <span className="text-[11px] text-slate-400 font-bold block uppercase">Attending Doctor</span>
                    <span className="text-sm font-extrabold text-white mt-1 block">{currentDept.doctor}</span>
                  </div>

                  <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/60">
                    <span className="text-[11px] text-slate-400 font-bold block uppercase">Room Location</span>
                    <span className="text-sm font-extrabold text-sky-400 mt-1 block">{currentDept.room}</span>
                  </div>

                  <div className="bg-slate-800/80 p-3.5 rounded-2xl border border-slate-700/60 col-span-2 sm:col-span-1">
                    <span className="text-[11px] text-slate-400 font-bold block uppercase">Avg Pace</span>
                    <span className="text-sm font-extrabold text-amber-400 mt-1 block">{currentDept.avg} per patient</span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-4 bg-slate-800/90 rounded-2xl p-6 border border-slate-700 text-center space-y-4">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">Patients Waiting Now</span>
                <div className="text-5xl font-black text-sky-400 font-mono">{currentDept.waiting}</div>
                <p className="text-xs text-slate-400 font-medium">Ready to issue instant digital token</p>

                <Link
                  href={`/patient/queue/get-token?dept=${currentDept.code}`}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-extrabold text-xs shadow-lg flex items-center justify-center gap-2 transition-all"
                >
                  Get {currentDept.code} Token Now <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section id="how-it-works" className="py-20 bg-slate-50/70 border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="text-xs font-extrabold text-teal-600 uppercase tracking-widest bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-200">
                Simple 4-Step Process
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                How The Queue System Works
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: '01', title: 'Register / Login', desc: 'Create your secure patient profile with full name, phone, and date of birth.' },
                { step: '02', title: 'Select Department', desc: 'Choose from General Medicine, Cardiology, Orthopedics, Pediatrics, or Dental.' },
                { step: '03', title: 'Get Token', desc: 'Instantly generate your unique digital queue token (e.g. GM-029) with estimated wait time.' },
                { step: '04', title: 'Track Your Turn', desc: 'Monitor real-time queue position on your mobile phone or hospital display.' },
              ].map((item) => (
                <div
                  key={item.step}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs card-hover-effect space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-black text-sky-600 font-mono">{item.step}</span>
                    <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TV DISPLAY PROMO BANNER */}
        <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/30">
              <Tv className="w-4 h-4" /> Hospital Waiting Room Screen
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Looking For The TV Display Mode?
            </h2>
            <p className="text-slate-300 max-w-xl mx-auto text-base font-medium">
              Launch the dedicated waiting room display with high-contrast typography, large token numbers, and real-time audio alerts.
            </p>
            <div className="pt-2">
              <Link
                href="/queue-display"
                target="_blank"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-base shadow-xl transition-all hover:scale-105"
              >
                Launch TV Waiting Room Display →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
