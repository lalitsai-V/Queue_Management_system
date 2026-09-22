'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Hospital, Menu, X, Ticket, Tv, LogIn, Search, LayoutDashboard, Sparkles, User } from 'lucide-react';

interface NavbarProps {
  userRole?: string | null;
  userName?: string | null;
}

export const Navbar: React.FC<NavbarProps> = ({ userRole, userName }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-sm py-1'
            : 'bg-white border-b border-slate-100 py-2'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center font-black text-2xl shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
                <Hospital className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                  SmartCare
                </span>
                <span className="text-[10px] font-bold text-cyan-600 block tracking-widest uppercase -mt-1">
                  Queue System
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8 font-extrabold text-sm text-slate-600">
              <Link
                href="/"
                className={`transition-colors hover:text-blue-600 ${
                  pathname === '/' ? 'text-blue-600' : ''
                }`}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`transition-colors hover:text-blue-600 ${
                  pathname === '/about' ? 'text-blue-600' : ''
                }`}
              >
                About
              </Link>
              <Link
                href="/#departments"
                className="transition-colors hover:text-blue-600"
              >
                Departments
              </Link>
              <Link
                href="/#how-it-works"
                className="transition-colors hover:text-blue-600"
              >
                How It Works
              </Link>
              <Link
                href="/contact"
                className={`transition-colors hover:text-blue-600 ${
                  pathname === '/contact' ? 'text-blue-600' : ''
                }`}
              >
                Contact
              </Link>
            </nav>

            {/* Right Side Tools & CTAs */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Search Trigger */}
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 rounded-2xl text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-all border border-slate-200/60"
                title="Search departments & doctors"
              >
                <Search className="w-4 h-4" />
              </button>

              <Link
                href="/queue-display"
                target="_blank"
                className="hidden lg:flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3.5 py-2.5 rounded-2xl border border-slate-200 transition-all"
              >
                <Tv className="w-4 h-4 text-cyan-600" /> TV Screen
              </Link>

              {userRole ? (
                <Link
                  href={
                    userRole === 'ADMIN'
                      ? '/admin/dashboard'
                      : userRole === 'DOCTOR'
                      ? '/doctor/dashboard'
                      : '/patient/dashboard'
                  }
                  className="px-5 py-2.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-extrabold flex items-center gap-2 shadow-md transition-all hover:scale-105"
                >
                  <LayoutDashboard className="w-4 h-4 text-cyan-400" /> Portal Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2.5 rounded-2xl text-slate-700 hover:text-blue-600 font-extrabold text-xs flex items-center gap-1.5 hover:bg-blue-50 transition-all border border-transparent hover:border-blue-100"
                  >
                    <LogIn className="w-4 h-4 text-blue-600" /> Login
                  </Link>
                  <Link
                    href="/patient/queue/get-token"
                    className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-extrabold text-xs tracking-wide shadow-md shadow-blue-600/20 flex items-center gap-2 transition-all hover:scale-105 active:scale-95"
                  >
                    <Ticket className="w-4 h-4" /> Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Trigger */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-xl text-slate-600 hover:bg-slate-100"
              >
                <Search className="w-5 h-5" />
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2.5 rounded-2xl text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
                aria-label="Toggle Menu"
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Quick Search Modal Overlay */}
          {searchOpen && (
            <div className="py-3 border-t border-slate-100 animate-in fade-in slide-in-from-top duration-200">
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search department, doctor, or token status..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-10 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
                  autoFocus
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-3 text-xs font-bold text-slate-400 hover:text-slate-600"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200 px-6 py-6 space-y-4 shadow-xl animate-in slide-in-from-top duration-200">
            <nav className="flex flex-col gap-3 font-bold text-sm text-slate-700">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="py-2.5 px-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileOpen(false)}
                className="py-2.5 px-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                About Us
              </Link>
              <Link
                href="/#departments"
                onClick={() => setMobileOpen(false)}
                className="py-2.5 px-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                Departments
              </Link>
              <Link
                href="/#how-it-works"
                onClick={() => setMobileOpen(false)}
                className="py-2.5 px-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                How It Works
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="py-2.5 px-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/queue-display"
                target="_blank"
                onClick={() => setMobileOpen(false)}
                className="py-2.5 px-3 rounded-xl text-cyan-600 bg-cyan-50 hover:bg-cyan-100 font-extrabold flex items-center gap-2"
              >
                <Tv className="w-4 h-4" /> Hospital TV Screen Display
              </Link>
            </nav>

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
                  className="w-full py-3.5 rounded-2xl bg-slate-900 text-white font-black text-center text-sm shadow-md"
                >
                  Open Portal Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="w-full py-3.5 rounded-2xl border-2 border-slate-200 text-slate-800 font-extrabold text-center text-sm hover:bg-slate-50"
                  >
                    Login to Account
                  </Link>
                  <Link
                    href="/patient/queue/get-token"
                    className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black text-center text-sm shadow-lg shadow-blue-500/25"
                  >
                    Book Digital Token
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
};
