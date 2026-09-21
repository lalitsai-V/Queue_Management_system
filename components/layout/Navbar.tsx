'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Hospital, Menu, X, Ticket, Tv, LogIn, User, LayoutDashboard, Bell } from 'lucide-react';

interface NavbarProps {
  userRole?: string | null;
  userName?: string | null;
}

export const Navbar: React.FC<NavbarProps> = ({ userRole, userName }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-sky-100/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 text-white flex items-center justify-center font-black text-2xl shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <Hospital className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">
                SmartCare
              </span>
              <span className="text-xs font-bold text-sky-700 block tracking-widest uppercase">
                Queue System
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 font-semibold text-sm text-slate-600">
            <Link href="/" className="hover:text-sky-600 transition-colors">
              Home
            </Link>
            <Link href="/#how-it-works" className="hover:text-sky-600 transition-colors">
              How It Works
            </Link>
            <Link href="/#departments" className="hover:text-sky-600 transition-colors">
              Departments
            </Link>
            <Link href="/queue-display" className="hover:text-sky-600 transition-colors flex items-center gap-1.5 text-sky-700 font-bold bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-200/60">
              <Tv className="w-4 h-4" /> TV Display
            </Link>
          </nav>

          {/* Right CTA */}
          <div className="hidden md:flex items-center gap-4">
            {userRole ? (
              <div className="flex items-center gap-3">
                <Link
                  href={
                    userRole === 'ADMIN'
                      ? '/admin/dashboard'
                      : userRole === 'DOCTOR'
                      ? '/doctor/dashboard'
                      : '/patient/dashboard'
                  }
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold flex items-center gap-2 shadow-sm transition-all"
                >
                  <LayoutDashboard className="w-4 h-4" /> Dashboard
                </Link>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2.5 rounded-xl text-slate-700 hover:text-sky-600 font-bold text-xs flex items-center gap-1.5 hover:bg-sky-50 transition-all"
                >
                  <LogIn className="w-4 h-4" /> Login
                </Link>
                <Link
                  href="/patient/queue/get-token"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-sky-600 to-blue-600 hover:from-sky-700 hover:to-blue-700 text-white font-extrabold text-xs tracking-wide shadow-md shadow-sky-600/20 flex items-center gap-2 transition-all hover:scale-[1.02]"
                >
                  <Ticket className="w-4 h-4" /> Get Token
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 shadow-lg animate-in slide-in-from-top duration-200">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className="block text-slate-700 font-bold py-2"
          >
            Home
          </Link>
          <Link
            href="/#how-it-works"
            onClick={() => setMobileOpen(false)}
            className="block text-slate-700 font-bold py-2"
          >
            How It Works
          </Link>
          <Link
            href="/#departments"
            onClick={() => setMobileOpen(false)}
            className="block text-slate-700 font-bold py-2"
          >
            Departments
          </Link>
          <Link
            href="/queue-display"
            onClick={() => setMobileOpen(false)}
            className="block text-sky-700 font-bold py-2 flex items-center gap-2"
          >
            <Tv className="w-4 h-4" /> Waiting Room TV Display
          </Link>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
            {userRole ? (
              <Link
                href={
                  userRole === 'ADMIN'
                    ? '/admin/dashboard'
                    : userRole === 'DOCTOR'
                    ? '/doctor/dashboard'
                    : '/patient/dashboard'
                }
                className="w-full py-3 rounded-xl bg-slate-900 text-white font-extrabold text-center text-sm"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="w-full py-3 rounded-xl border border-slate-300 text-slate-800 font-bold text-center text-sm"
                >
                  Login
                </Link>
                <Link
                  href="/patient/queue/get-token"
                  className="w-full py-3 rounded-xl bg-sky-600 text-white font-extrabold text-center text-sm shadow-md"
                >
                  Get Token Now
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
