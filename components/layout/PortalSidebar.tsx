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
  Shield,
  Activity
} from 'lucide-react';
import { UserRole } from '@/types/queue';

interface PortalSidebarProps {
  role: UserRole;
  userName?: string;
  userEmail?: string;
}

export const PortalSidebar: React.FC<PortalSidebarProps> = ({ role, userName = 'User', userEmail = '' }) => {
  const pathname = usePathname();

  const patientLinks = [
    { href: '/patient/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/patient/queue/get-token', label: 'Get New Token', icon: Ticket },
    { href: '/patient/queue', label: 'My Live Queue', icon: Clock },
    { href: '/patient/appointments', label: 'Appointments', icon: Calendar },
    { href: '/patient/history', label: 'Queue History', icon: Activity },
    { href: '/patient/notifications', label: 'Notifications', icon: Bell },
    { href: '/patient/profile', label: 'My Profile', icon: User },
  ];

  const doctorLinks = [
    { href: '/doctor/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/doctor/queue', label: "Today's Queue", icon: Clock },
    { href: '/doctor/history', label: 'Patient History', icon: Activity },
    { href: '/doctor/profile', label: 'Doctor Profile', icon: User },
  ];

  const adminLinks = [
    { href: '/admin/dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
    { href: '/admin/queues', label: 'Live Queues Monitor', icon: Clock },
    { href: '/admin/patients', label: 'Patients Directory', icon: Users },
    { href: '/admin/doctors', label: 'Doctors Roster', icon: UserCheck },
    { href: '/admin/departments', label: 'Departments', icon: Building2 },
    { href: '/admin/appointments', label: 'Appointments', icon: Calendar },
    { href: '/admin/reports', label: 'Queue Reports', icon: BarChart3 },
    { href: '/admin/settings', label: 'System Settings', icon: Settings },
  ];

  const links = role === 'ADMIN' ? adminLinks : role === 'DOCTOR' ? doctorLinks : patientLinks;

  const roleLabel = role === 'ADMIN' ? 'Hospital Administrator' : role === 'DOCTOR' ? 'Attending Physician' : 'Registered Patient';

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 min-h-screen flex flex-col border-r border-slate-800 shrink-0">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
          <Hospital className="w-5 h-5" />
        </div>
        <div>
          <span className="font-extrabold text-white text-base block tracking-tight">SmartCare</span>
          <span className="text-[10px] font-bold text-sky-400 uppercase tracking-widest">{roleLabel}</span>
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
              className={`flex items-center gap-3 px-3.5 py-3 rounded-xl font-bold text-xs transition-all ${
                isActive
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
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
            className="flex items-center gap-3 px-3.5 py-3 rounded-xl font-bold text-xs text-teal-400 hover:bg-slate-800/80 transition-all border border-teal-500/30"
          >
            <Tv className="w-4 h-4 text-teal-400" />
            <span>Launch TV Display</span>
          </Link>
        </div>
      </nav>

      {/* User Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-sm shrink-0">
              <User className="w-4 h-4" />
            </div>
            <div className="truncate">
              <span className="text-xs font-bold text-white block truncate">{userName}</span>
              <span className="text-[10px] text-slate-500 block truncate">{userEmail || role}</span>
            </div>
          </div>

          <Link href="/login" className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition-colors" title="Logout">
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </aside>
  );
};
