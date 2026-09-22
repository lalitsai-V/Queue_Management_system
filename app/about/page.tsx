'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import {
  Hospital,
  Heart,
  Users,
  Stethoscope,
  Building2,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans pb-16 md:pb-0">
      <Navbar />

      <main className="flex-1">
        {/* About Hero */}
        <section className="bg-gradient-to-b from-blue-50/80 via-cyan-50/30 to-slate-50 py-16 md:py-24 border-b border-slate-200/60 medical-grid-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/90 border border-blue-300 text-blue-800 text-xs font-black uppercase tracking-wide">
              <Sparkles className="w-4 h-4 text-blue-600" /> About SmartCare
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight">
              Less Waiting.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                More Caring. 💙
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
              SmartCare is an advanced smart queue management platform designed for modern hospitals and healthcare centers to eliminate overcrowding and digitize patient flow.
            </p>
          </div>
        </section>

        {/* Problem & Solution */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="text-xs font-extrabold text-blue-600 uppercase tracking-widest bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
                The Problem We Solve
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Transforming Long Waiting Rooms into Seamless Digital Queues
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                Traditional hospital OPD waiting areas are often overcrowded, stressful, and unpredictable. Patients waste hours waiting physically, while doctors and staff face inefficient queue bottlenecks.
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                SmartCare fixes this by issuing real-time digital tokens, tracking queue positions on smartphones, and predicting accurate wait times so patients only arrive when it is their turn.
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-10 shadow-2xl space-y-6 border border-slate-800">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-2xl shadow-lg">
                <Hospital className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-black">Built for Complete Hospital Ecosystems</h3>

              <div className="space-y-4 text-xs sm:text-sm font-medium text-slate-300">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">For Patients:</strong> Book tokens remotely, view live wait times, and receive audio chime alerts.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">For Doctors:</strong> Effortlessly call next patient, manage consultation duration, and view patient history.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-white">For Hospitals:</strong> Monitor OPD bottlenecks, analyze department performance, and power TV waiting screens.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3 Pillars Grid */}
        <section className="py-20 bg-slate-50/80 border-t border-slate-200/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                Empowering Everyone in the Healthcare Chain
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Users className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">For Patients</h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  No more sitting in germ-prone waiting rooms for hours. Track your token live on your smartphone and arrive relaxed right on time.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold">
                  <Stethoscope className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">For Doctors</h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Streamlined consultation flow with 1-click patient calling, priority handling for emergency cases, and organized queue rosters.
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xs space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                  <Building2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900">For Hospitals</h3>
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  Real-time OPD analytics, TV screen display board integration, reduced overcrowding, and improved patient satisfaction scores.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
