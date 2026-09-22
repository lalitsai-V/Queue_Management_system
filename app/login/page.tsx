'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MobileNav } from '@/components/layout/MobileNav';
import { Hospital, LogIn, Mail, Lock, ShieldCheck, UserCheck, User, Sparkles, CheckCircle2, Heart } from 'lucide-react';
import { UserRole } from '@/types/queue';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect');

  const [role, setRole] = useState<UserRole>('PATIENT');
  const [email, setEmail] = useState('rohan.mehta@gmail.com');
  const [password, setPassword] = useState('patient123');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const setDemoCookie = (targetRole: UserRole) => {
    document.cookie = `demo_role=${targetRole}; path=/; max-age=86400`;
  };

  const handleLoginForRole = (targetRole: UserRole) => {
    setLoading(true);
    setDemoCookie(targetRole);

    setTimeout(() => {
      setLoading(false);
      if (redirectUrl) {
        router.push(redirectUrl);
      } else if (targetRole === 'ADMIN') {
        router.push('/admin/dashboard');
      } else if (targetRole === 'DOCTOR') {
        router.push('/doctor/dashboard');
      } else {
        router.push('/patient/dashboard');
      }
    }, 400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLoginForRole(role);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans pb-16 md:pb-0">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8 py-10">
        <div className="w-full max-w-5xl bg-white rounded-3xl border border-slate-200/80 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
          {/* Left Split Screen - Healthcare Graphic & Branding */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 text-white p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-blue-600/20 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-cyan-600/20 blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center font-black text-2xl shadow-lg">
                  <Hospital className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-2xl font-black tracking-tight text-white block">SmartCare</span>
                  <span className="text-[10px] font-bold text-cyan-400 block tracking-widest uppercase -mt-1">
                    Queue System
                  </span>
                </div>
              </Link>

              <div className="pt-8 space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-extrabold border border-cyan-500/30">
                  <Sparkles className="w-3.5 h-3.5" /> Healthcare Made Simple
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight">
                  Seamless Hospital Queue Access
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
                  Login to view live queues, book digital OPD tokens, manage consultations, or access administrative hospital reports.
                </p>
              </div>
            </div>

            {/* Left Bottom Features */}
            <div className="relative z-10 pt-10 border-t border-slate-800/80 space-y-3 text-xs font-semibold text-slate-300">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Instant Digital Token Generation</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Real-Time Position & Waiting Updates</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Hospital Audio Bell Integration</span>
              </div>
            </div>
          </div>

          {/* Right Split Screen - Login Form */}
          <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-center space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Portal Login</h1>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
                Select your role or click a demo account below to proceed.
              </p>
            </div>

            {searchParams.get('error') && (
              <div className="bg-rose-50 text-rose-800 p-4 rounded-2xl border border-rose-200 text-xs font-bold">
                ⚠️ Access Denied: You do not have permission for that role's portal. Please log in with the correct role below.
              </div>
            )}

            {/* Role selector tabs */}
            <div className="grid grid-cols-3 gap-2 p-1.5 bg-slate-100 rounded-2xl">
              {(['PATIENT', 'DOCTOR', 'ADMIN'] as UserRole[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    setRole(r);
                    if (r === 'PATIENT') {
                      setEmail('rohan.mehta@gmail.com');
                      setPassword('patient123');
                    } else if (r === 'DOCTOR') {
                      setEmail('dr.sharma@hospital.org');
                      setPassword('doctor123');
                    } else {
                      setEmail('admin@hospital.org');
                      setPassword('admin123');
                    }
                  }}
                  className={`py-2.5 text-xs font-extrabold rounded-xl transition-all cursor-pointer ${
                    role === r
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {r === 'PATIENT' ? 'Patient' : r === 'DOCTOR' ? 'Doctor' : 'Admin'}
                </button>
              ))}
            </div>

            {/* 1-Click Demo Launcher */}
            <div className="bg-blue-50/80 p-4 rounded-2xl border border-blue-100 space-y-2">
              <span className="text-[11px] font-extrabold text-blue-800 uppercase tracking-wider block text-center">
                ⚡ Instant 1-Click Demo Login
              </span>
              <div className="grid grid-cols-3 gap-2 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => handleLoginForRole('PATIENT')}
                  className="py-2.5 px-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xs flex items-center justify-center gap-1 transition-all cursor-pointer"
                >
                  <User className="w-3.5 h-3.5" /> Patient
                </button>
                <button
                  type="button"
                  onClick={() => handleLoginForRole('DOCTOR')}
                  className="py-2.5 px-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white shadow-xs flex items-center justify-center gap-1 transition-all cursor-pointer"
                >
                  <UserCheck className="w-3.5 h-3.5" /> Doctor
                </button>
                <button
                  type="button"
                  onClick={() => handleLoginForRole('ADMIN')}
                  className="py-2.5 px-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-xs flex items-center justify-center gap-1 transition-all cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5" /> Admin
                </button>
              </div>
            </div>

            {/* Standard Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@hospital.org"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                    Password
                  </label>
                  <Link href="/forgot-password" className="text-xs font-extrabold text-blue-600 hover:underline">
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-bold text-slate-600 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Remember me on this browser</span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-sm tracking-wide shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {loading ? (
                  <span>Authenticating...</span>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" /> Login as {role}
                  </>
                )}
              </button>
            </form>

            <div className="text-center pt-2">
              <p className="text-xs text-slate-500 font-medium">
                Don't have a patient account yet?{' '}
                <Link href="/register" className="font-extrabold text-blue-600 hover:underline">
                  Register Account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500 font-bold text-sm">Loading Login Portal...</div>}>
      <LoginForm />
    </Suspense>
  );
}
