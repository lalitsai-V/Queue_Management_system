import React from 'react';
import Link from 'next/link';
import { Hospital, Heart, ShieldCheck, Phone, Mail, MapPin, ArrowUpRight, Users, Stethoscope, Building2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-20 md:pb-12 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center font-black text-2xl shadow-md">
                <Hospital className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">SmartCare</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-medium">
              Smarter Queues. Shorter Waits. Better Care. Modern hospital queue management platform reducing patient wait times and improving hospital throughput.
            </p>
            <div className="flex items-center gap-2 text-xs font-extrabold text-cyan-400 bg-cyan-950/60 px-3.5 py-2 rounded-xl border border-cyan-500/30 w-fit">
              <Heart className="w-4 h-4 text-cyan-400 fill-cyan-400" /> Less Waiting. More Caring.
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-extrabold text-xs mb-4 uppercase tracking-widest text-slate-400">
              Quick Navigation
            </h4>
            <ul className="space-y-3 text-xs font-semibold">
              <li>
                <Link href="/" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                  Home Page
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                  About SmartCare
                </Link>
              </li>
              <li>
                <Link href="/patient/queue/get-token" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                  Book Digital Token
                </Link>
              </li>
              <li>
                <Link href="/patient/queue" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                  Track Live Queue
                </Link>
              </li>
              <li>
                <Link href="/queue-display" target="_blank" className="hover:text-cyan-400 transition-colors flex items-center gap-1 text-cyan-400">
                  Waiting Room TV Screen <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* User Portals */}
          <div>
            <h4 className="text-white font-extrabold text-xs mb-4 uppercase tracking-widest text-slate-400">
              User Roles & Portals
            </h4>
            <ul className="space-y-3 text-xs font-semibold">
              <li>
                <Link href="/login" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-400" /> Patient Portal
                </Link>
              </li>
              <li>
                <Link href="/login?role=DOCTOR" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <Stethoscope className="w-4 h-4 text-cyan-400" /> Doctor Console
                </Link>
              </li>
              <li>
                <Link href="/login?role=ADMIN" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-amber-400" /> Admin Operations
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4 text-purple-400" /> Support & Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-3">
            <h4 className="text-white font-extrabold text-xs mb-4 uppercase tracking-widest text-slate-400">
              Hospital Support
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-slate-400 font-medium">
              <MapPin className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>SmartCare Health Complex, 100 Health Boulevard, Metro City</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-400 font-medium">
              <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Helpline: +1 (800) 555-SMARTCARE</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-400 font-medium">
              <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>support@smartcare-health.org</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-semibold gap-4">
          <p>© 2026 SmartCare Hospital Queue Management System. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Patients</span>
            <span>Doctors</span>
            <span>Hospitals</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
