'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hospital, LogIn, Mail, Lock, ShieldCheck, UserCheck, User } from 'lucide-react';
import { UserRole } from '@/types/queue';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect');

  const [role, setRole] = useState<UserRole>('PATIENT');
  const [email, setEmail] = useState('rohan.mehta@gmail.com');
  const [password, setPassword] = useState('patient123');
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
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 py-12">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-slate-200/80 shadow-xl space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center font-bold mx-auto shadow-xs">
              <Hospital className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Portal Login</h1>
            <p className="text-xs text-slate-500 font-medium">Access your hospital queue dashboard</p>
          </div>

          {searchParams.get('error') && (
            <div className="bg-rose-50 text-rose-800 p-4 rounded-2xl border border-rose-200 text-xs font-bold text-center">
              ⚠️ Access Denied: You do not have permission to view that role's protected portal. Please log in with the correct role below.
            </div>
          )}

          {/* Role selector tabs */}
          <div className="grid grid-cols-3 gap-1.5 p-1.5 bg-slate-100 rounded-2xl">
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
                className={`py-2 text-xs font-extrabold rounded-xl transition-all ${
                  role === r
                    ? 'bg-white text-sky-700 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {r === 'PATIENT' ? 'Patient' : r === 'DOCTOR' ? 'Doctor' : 'Admin'}
              </button>
            ))}
          </div>

          {/* Direct 1-Click Demo Buttons */}
          <div className="bg-gradient-to-r from-sky-50 to-blue-50 p-4 rounded-2xl border border-sky-100 space-y-2">
            <span className="text-[11px] font-extrabold text-sky-800 uppercase tracking-wider block text-center">
              ⚡ Instant 1-Click Demo Login
            </span>
            <div className="grid grid-cols-3 gap-2 text-xs font-bold">
              <button
                type="button"
                onClick={() => handleLoginForRole('PATIENT')}
                className="py-2.5 px-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white shadow-xs flex items-center justify-center gap-1 transition-all"
              >
                <User className="w-3.5 h-3.5" /> Patient
              </button>
              <button
                type="button"
                onClick={() => handleLoginForRole('DOCTOR')}
                className="py-2.5 px-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white shadow-xs flex items-center justify-center gap-1 transition-all"
              >
                <UserCheck className="w-3.5 h-3.5" /> Doctor
              </button>
              <button
                type="button"
                onClick={() => handleLoginForRole('ADMIN')}
                className="py-2.5 px-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white shadow-xs flex items-center justify-center gap-1 transition-all"
              >
                <ShieldCheck className="w-3.5 h-3.5" /> Admin
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
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
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white font-medium"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs font-bold text-sky-600 hover:underline">
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
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-sm tracking-wide shadow-md transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                'Logging in...'
              ) : (
                <>
                  <LogIn className="w-4 h-4" /> Standard Login as {role}
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-2">
            <p className="text-xs text-slate-500 font-medium">
              Don't have a patient account?{' '}
              <Link href="/register" className="font-extrabold text-sky-600 hover:underline">
                Register Patient Account
              </Link>
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
