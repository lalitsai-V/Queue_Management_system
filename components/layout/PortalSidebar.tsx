'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Building2,
  Calendar,
  BarChart3,
  Settings,
  Ticket,
  Clock,
  Bell,
  User,
  Tv,
  LogOut,
  Hospital,
  Activity,
  UserCheck2,
  Stethoscope
} from 'lucide-react';
import { UserRole } from '@/types/queue';

interface PortalSidebarProps {
  role: UserRole;
  userName?: string;
  userEmail?: string;
}

export const PortalSidebar: React.FC<PortalSidebarProps> = ({ role, userName = 'Lalit', userEmail = 'lalit@example.com' }) => {
  const pathname = usePathname();

  const patientLinks = [
    { href: '/patient/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/patient/queue/get-token', label: 'Book Token', icon: Ticket },
    { href: '/patient/queue', label: 'My Tokens', icon: Clock },
    { href: '/patient/appointments', label: 'Departments', icon: Building2 },
    { href: '/patient/notifications', label: 'Notifications', icon: Bell },
    { href: '/patient/profile', label: 'Profile', icon: User },
  ];

  const doctorLinks = [
    { href: '/doctor/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/doctor/current-patient', label: 'Current Patient', icon: Stethoscope },
    { href: '/doctor/queue', label: "Today's Queue", icon: Clock },
    { href: '/doctor/history', label: 'Patient History', icon: Activity },
    { href: '/doctor/profile', label: 'Doctor Profile', icon: User },
  ];

  const adminLinks = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/departments', label: 'Departments', icon: Building2 },
    { href: '/admin/doctors', label: 'Doctors', icon: UserCheck },
    { href: '/admin/patients', label: 'Patients', icon: Users },
    { href: '/admin/queues', label: 'Manage Tokens', icon: Ticket },
    { href: '/admin/appointments', label: 'Queue', icon: Clock },
    { href: '/admin/reports', label: 'Reports', icon: BarChart3 },
    { href: '/admin/settings', label: 'Settings', icon: Settings },
  ];

  const links = role === 'ADMIN' ? adminLinks : role === 'DOCTOR' ? doctorLinks : patientLinks;
  const roleLabel = role === 'ADMIN' ? 'Hospital Admin' : role === 'DOCTOR' ? 'Attending Doctor' : 'Patient Portal';

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-screen flex flex-col border-r border-slate-800 shrink-0 hidden md:flex">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800 flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center font-black text-xl shadow-md">
          <Hospital className="w-5 h-5" />
        </div>
        <div>
          <span className="font-black text-white text-lg tracking-tight block">SmartCare</span>
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest block -mt-0.5">{roleLabel}</span>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-extrabold text-xs transition-all ${
                isActive
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
              <span>{link.label}</span>
            </Link>
          );
        })}

        <div className="pt-4 mt-4 border-t border-slate-800">
          <Link
            href="/queue-display"
            target="_blank"
            className="flex items-center gap-3 px-4 py-3 rounded-2xl font-extrabold text-xs text-cyan-400 hover:bg-slate-800/80 transition-all border border-cyan-500/30"
          >
            <Tv className="w-4 h-4 text-cyan-400" />
            <span>TV Display Board</span>
          </Link>
        </div>
      </nav>

      {/* User Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-2xl bg-slate-800 text-cyan-400 flex items-center justify-center font-bold text-sm shrink-0 border border-slate-700">
              <User className="w-4 h-4" />
            </div>
            <div className="truncate">
              <span className="text-xs font-black text-white block truncate">{userName}</span>
              <span className="text-[10px] text-slate-500 block truncate">{userEmail || role}</span>
            </div>
          </div>

          <Link href="/login" className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-xl transition-colors" title="Logout">
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
};
