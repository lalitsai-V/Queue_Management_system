import React from 'react';
import Link from 'next/link';
import { Hospital, Heart, ShieldCheck, Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
                <Hospital className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-white">SmartCare Hospital</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Smarter Queues. Shorter Waits. Better Care. Managing hospital patient queues digitally with real-time token tracking and accurate wait estimations.
            </p>
            <div className="flex items-center gap-2 text-xs text-teal-400 font-semibold bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700/50 w-fit">
              <ShieldCheck className="w-4 h-4" /> College OOSE Project Demo
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="text-white font-extrabold text-sm mb-4 uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home Page</Link>
              </li>
              <li>
                <Link href="/patient/queue/get-token" className="hover:text-white transition-colors">Get Digital Token</Link>
              </li>
              <li>
                <Link href="/patient/queue" className="hover:text-white transition-colors">Track Live Queue</Link>
              </li>
              <li>
                <Link href="/queue-display" className="hover:text-white transition-colors">Waiting Room TV Display</Link>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="text-white font-extrabold text-sm mb-4 uppercase tracking-wider">Hospital Departments</h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li>General Medicine (GM)</li>
              <li>Cardiology (CAR)</li>
              <li>Orthopedics (ORT)</li>
              <li>Pediatrics (PED)</li>
              <li>Dental Care (DEN)</li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-3">
            <h4 className="text-white font-extrabold text-sm mb-4 uppercase tracking-wider">Contact & Support</h4>
            <div className="flex items-center gap-2.5 text-xs text-slate-400">
              <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
              <span>100 Health Care Boulevard, Metro City</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-400">
              <Phone className="w-4 h-4 text-sky-400 shrink-0" />
              <span>Emergency Hotline: +1 (800) 555-QUEUE</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-slate-400">
              <Mail className="w-4 h-4 text-sky-400 shrink-0" />
              <span>support@smartcare-hospital.org</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© 2026 SmartCare Hospital Queue Management System. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Engineered for OOSE Project with Next.js, Supabase & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};
