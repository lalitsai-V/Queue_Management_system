'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { WaitingTimeCard } from '@/components/queue/WaitingTimeCard';
import { QueueTimeline } from '@/components/queue/QueueTimeline';
import { INITIAL_TOKENS } from '@/lib/queue/data';
import { playHospitalChime } from '@/lib/audio/chime';
import { Token } from '@/types/queue';
import {
  Ticket,
  Clock,
  Users,
  ShieldCheck,
  CheckCircle2,
  Tv,
  ArrowRight,
  Stethoscope,
  Activity,
  Sparkles,
  Volume2,
  Zap,
  Flame,
  Building2,
  Bell,
  Calendar,
  PhoneCall,
  Heart,
  Eye,
  Baby,
  Smile,
  ZapOff
} from 'lucide-react';

export default function LandingPage() {
  // Simulator State
  const [heroTokens, setHeroTokens] = useState<Token[]>([...INITIAL_TOKENS]);
  const [servingToken, setServingToken] = useState<string>('A023');
  const [patientsAhead, setPatientsAhead] = useState(2);
  const [estimatedWait, setEstimatedWait] = useState(15);
  const [chimeEnabled, setChimeEnabled] = useState(true);
  const [simMessage, setSimMessage] = useState<string | null>(null);

  // Department Grid State
  const [selectedDept, setSelectedDept] = useState<string | null>(null);

  const triggerSimMessage = (msg: string) => {
    setSimMessage(msg);
    setTimeout(() => setSimMessage(null), 3000);
  };

  const handleCallNext = () => {
    const nextNum = parseInt(servingToken.replace('A', '')) + 1;
    const nextTokenStr = `A${String(nextNum).padStart(3, '0')}`;
    setServingToken(nextTokenStr);
    setPatientsAhead((prev) => Math.max(0, prev - 1));
    setEstimatedWait((prev) => Math.max(0, prev - 7));
    if (chimeEnabled) playHospitalChime();
    triggerSimMessage(`Doctor Called ${nextTokenStr}! Hospital Audio Bell Sounded 🔔`);
  };

  const departmentsList = [
    {
      code: 'GM',
      name: 'General Medicine',
      icon: Stethoscope,
      doctor: 'Dr. Rajesh Sharma',
      available: 'Available Now',
      avgWait: '~15 mins',
      patientsWaiting: 4,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50 text-blue-600',
    },
    {
      code: 'CAR',
      name: 'Cardiology',
      icon: Heart,
      doctor: 'Dr. Anita Kumar',
      available: 'Available Now',
      avgWait: '~20 mins',
      patientsWaiting: 6,
      color: 'from-cyan-500 to-teal-600',
      bgColor: 'bg-cyan-50 text-cyan-600',
    },
    {
      code: 'DER',
      name: 'Dermatology',
      icon: Activity,
      doctor: 'Dr. Meera Iyer',
      available: 'Available Today',
      avgWait: '~10 mins',
      patientsWaiting: 3,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50 text-purple-600',
    },
    {
      code: 'PED',
      name: 'Pediatrics',
      icon: Baby,
      doctor: 'Dr. Sunita Gupta',
      available: 'Available Now',
      avgWait: '~12 mins',
      patientsWaiting: 5,
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-50 text-emerald-600',
    },
    {
      code: 'ORT',
      name: 'Orthopedics',
      icon: Building2,
      doctor: 'Dr. Vikram Verma',
      available: 'Available Now',
      avgWait: '~18 mins',
      patientsWaiting: 7,
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50 text-amber-600',
    },
    {
      code: 'ENT',
      name: 'ENT (Ear, Nose, Throat)',
      icon: PhoneCall,
      doctor: 'Dr. Sanjay Nambiar',
      available: 'Available Today',
      avgWait: '~8 mins',
      patientsWaiting: 2,
      color: 'from-rose-500 to-red-600',
      bgColor: 'bg-rose-50 text-rose-600',
    },
    {
      code: 'OPH',
      name: 'Ophthalmology',
      icon: Eye,
      doctor: 'Dr. Kavita Reddy',
      available: 'Available Now',
      avgWait: '~14 mins',
      patientsWaiting: 4,
      color: 'from-indigo-500 to-blue-600',
      bgColor: 'bg-indigo-50 text-indigo-600',
    },
    {
      code: 'GYN',
      name: 'Gynecology',
      icon: Smile,
      doctor: 'Dr. Shalini Saxena',
      available: 'Available Now',
      avgWait: '~15 mins',
      patientsWaiting: 5,
      color: 'from-pink-500 to-rose-600',
      bgColor: 'bg-pink-50 text-pink-600',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-blue-600 selection:text-white pb-16 md:pb-0">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative pt-10 pb-16 md:pt-20 md:pb-24 overflow-hidden bg-gradient-to-b from-blue-50/80 via-cyan-50/30 to-slate-50 medical-grid-bg border-b border-slate-200/60">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-[550px] h-[550px] rounded-full hero-glow-1 pointer-events-none" />
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-[550px] h-[550px] rounded-full hero-glow-2 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Hero Text Content */}
              <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/90 border border-blue-300 text-blue-800 text-xs font-black tracking-wide uppercase shadow-xs">
                  <Sparkles className="w-4 h-4 text-blue-600 animate-spin" /> Smart Hospital Queue Management
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]">
                  Skip the Lines.{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 block">
                    Get Better Care.
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                  SmartCare simplifies hospital queue management for patients, doctors and hospital staff. Track your live turn position from anywhere.
                </p>

                {/* Hero CTAs */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                  <Link
                    href="/patient/queue/get-token"
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-base shadow-xl shadow-blue-600/25 flex items-center justify-center gap-3 transition-all hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <Ticket className="w-5 h-5" /> Book Token
                  </Link>

                  <a
                    href="#how-it-works"
                    className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-extrabold text-base border-2 border-slate-200 shadow-md flex items-center justify-center gap-3 transition-all hover:border-slate-300 cursor-pointer"
                  >
                    <Clock className="w-5 h-5 text-blue-600" /> How It Works
                  </a>
                </div>

                {/* Trust Badges */}
                <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-4 text-slate-700">
                  <div className="flex items-center gap-2 justify-center lg:justify-start">
                    <ShieldCheck className="w-5 h-5 text-cyan-600 shrink-0" />
                    <span className="text-xs font-black">Zero Physical Waiting</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center lg:justify-start">
                    <Activity className="w-5 h-5 text-blue-600 shrink-0" />
                    <span className="text-xs font-black">Live Progress Tracking</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center lg:justify-start">
                    <Stethoscope className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span className="text-xs font-black">Multi-Specialty Care</span>
                  </div>
                </div>
              </div>

              {/* Hero Right Visual Card — Modern Hospital Queue Visual */}
              <div className="lg:col-span-6 relative">
                <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-blue-100 relative z-10 space-y-6">
                  {/* Floating Queue Card Banner */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center font-black shadow-md">
                        <Stethoscope className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest block">
                          LIVE QUEUE
                        </span>
                        <h3 className="text-lg font-black text-slate-900">General Medicine</h3>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setChimeEnabled(!chimeEnabled)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all border ${
                        chimeEnabled
                          ? 'bg-blue-50 text-blue-700 border-blue-200'
                          : 'bg-slate-100 text-slate-500 border-slate-200'
                      }`}
                    >
                      <Volume2 className={`w-4 h-4 ${chimeEnabled ? 'text-blue-600 animate-pulse' : 'text-slate-400'}`} />
                      {chimeEnabled ? 'Chime ON' : 'Muted'}
                    </button>
                  </div>

                  {simMessage && (
                    <div className="bg-slate-900 text-white px-4 py-2.5 rounded-2xl font-bold text-xs shadow-lg animate-in fade-in slide-in-from-top duration-200 flex items-center justify-between">
                      <span>{simMessage}</span>
                    </div>
                  )}

                  {/* Main Live Queue Card Visual */}
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50/60 rounded-3xl p-6 border border-blue-200 text-center space-y-3 relative overflow-hidden">
                    <div className="absolute top-3 right-4 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 text-[11px] font-black flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" /> LIVE UPDATING
                    </div>

                    <span className="text-xs font-extrabold text-slate-500 uppercase tracking-widest block">
                      Now Serving
                    </span>
                    <div className="text-6xl font-black text-slate-900 font-mono tracking-tight my-1">
                      {servingToken}
                    </div>

                    <div className="flex items-center justify-center gap-6 pt-2 text-xs font-bold text-slate-700">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-blue-600" />
                        <span>2 patients waiting</span>
                      </div>
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-cyan-600" />
                        <span>~15 mins</span>
                      </div>
                    </div>
                  </div>

                  {/* Simulated Actions for Demo */}
                  <div className="grid grid-cols-2 gap-3 text-xs font-bold">
                    <button
                      type="button"
                      onClick={handleCallNext}
                      className="py-3 px-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                    >
                      <Volume2 className="w-4 h-4" /> Call Next Patient
                    </button>
                    <Link
                      href="/patient/queue/get-token"
                      className="py-3 px-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white shadow-md flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer"
                    >
                      <Ticket className="w-4 h-4 text-cyan-400" /> Book My Token
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* BELOW HERO TRUST & STATISTICS BAR */}
            <div className="mt-16 bg-white rounded-3xl p-8 border border-slate-200/80 shadow-lg grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
              <div className="space-y-1">
                <div className="text-4xl sm:text-5xl font-black text-blue-600 tracking-tight font-mono">10K+</div>
                <div className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Patients Served</div>
              </div>
              <div className="pt-6 md:pt-0 space-y-1">
                <div className="text-4xl sm:text-5xl font-black text-cyan-600 tracking-tight font-mono">30%</div>
                <div className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Reduced Waiting Time</div>
              </div>
              <div className="pt-6 md:pt-0 space-y-1">
                <div className="text-4xl sm:text-5xl font-black text-indigo-600 tracking-tight font-mono">50+</div>
                <div className="text-xs font-extrabold text-slate-500 uppercase tracking-wider">Hospitals Onboard</div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION */}
        <section id="features" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
                Hospital Queue Features
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Everything You Need for a Better Hospital Experience
              </h2>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Online Token Booking',
                  desc: 'Book a hospital token from anywhere.',
                  icon: Ticket,
                  color: 'bg-blue-50 text-blue-600 border-blue-200',
                },
                {
                  title: 'Live Queue Tracking',
                  desc: 'Track your position in real time.',
                  icon: Clock,
                  color: 'bg-cyan-50 text-cyan-600 border-cyan-200',
                },
                {
                  title: 'Multi-Department Support',
                  desc: 'Manage different hospital departments.',
                  icon: Building2,
                  color: 'bg-purple-50 text-purple-600 border-purple-200',
                },
                {
                  title: 'Smart Notifications',
                  desc: 'Receive updates through SMS/WhatsApp/in-app notifications.',
                  icon: Bell,
                  color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
                },
              ].map((feat, i) => {
                const IconComp = feat.icon;
                return (
                  <div
                    key={i}
                    className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs card-hover-effect space-y-4"
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold border ${feat.color}`}>
                      <IconComp className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">{feat.title}</h3>
                    <p className="text-xs text-slate-600 font-medium leading-relaxed">{feat.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section id="how-it-works" className="py-20 bg-slate-50/70 border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="text-xs font-extrabold text-cyan-600 uppercase tracking-widest bg-cyan-50 px-3.5 py-1.5 rounded-full border border-cyan-200">
                Simple 4-Step Process
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                How It Works
              </h2>
            </div>

            {/* Connected Timeline / Stepper */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              {[
                { step: '01', title: 'Choose Department', desc: 'Select from General Medicine, Cardiology, Dermatology, Pediatrics, and more.' },
                { step: '02', title: 'Select Time', desc: 'Pick your preferred available consultation slot or instant OPD queue.' },
                { step: '03', title: 'Get Token', desc: 'Receive your digital token number (e.g. A023) with estimated waiting time.' },
                { step: '04', title: 'Track Queue', desc: 'Monitor live queue position from your phone or hospital TV screen.' },
              ].map((item, idx) => (
                <div
                  key={item.step}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs card-hover-effect space-y-4 relative z-10"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-4xl font-black text-blue-600 font-mono tracking-tight">{item.step}</span>
                    <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
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

        {/* DEPARTMENTS SECTION */}
        <section id="departments" className="py-20 bg-white border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
                Hospital Specialties
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Hospital Departments
              </h2>
              <p className="text-slate-600 font-medium text-xs sm:text-sm">
                Browse our active outpatient departments, view doctor availability, and book your token instantly.
              </p>
            </div>

            {/* Department Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {departmentsList.map((dept) => {
                const IconComp = dept.icon;
                return (
                  <div
                    key={dept.code}
                    className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-4 group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold border ${dept.bgColor}`}>
                          <IconComp className="w-6 h-6" />
                        </div>
                        <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold">
                          {dept.available}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                          {dept.name}
                        </h3>
                        <p className="text-xs font-bold text-slate-400">{dept.doctor}</p>
                      </div>

                      <div className="pt-2 flex items-center justify-between text-xs font-extrabold text-slate-600 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                        <span>Avg Wait:</span>
                        <span className="text-blue-600 font-mono">{dept.avgWait}</span>
                      </div>
                    </div>

                    <Link
                      href={`/patient/queue/get-token?dept=${dept.code}`}
                      className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-blue-600 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
                    >
                      Book Token <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* TV DISPLAY BANNER */}
        <section className="py-16 bg-slate-900 text-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
              <Tv className="w-4 h-4" /> Waiting Room TV Monitor Mode
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              Hospital Waiting Room TV Display
            </h2>
            <p className="text-slate-300 max-w-xl mx-auto text-sm font-medium">
              Launch the dedicated full-screen queue display for hospital TV screens with high-contrast typography, live token callouts, and audio bell alerts.
            </p>
            <div>
              <Link
                href="/queue-display"
                target="_blank"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-base shadow-xl transition-all hover:scale-105 cursor-pointer"
              >
                Launch TV Screen Display →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
