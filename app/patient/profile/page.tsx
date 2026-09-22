'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { PortalSidebar } from '@/components/layout/PortalSidebar';
import { MobileNav } from '@/components/layout/MobileNav';
import { User, Mail, Phone, Calendar, MapPin, Save, ShieldCheck, Bell, Lock, LogOut, CheckCircle2 } from 'lucide-react';

export default function PatientProfilePage() {
  const [activeTab, setActiveTab] = useState<'info' | 'settings' | 'notifications' | 'security'>('info');
  const [saved, setSaved] = useState(false);
  const [smsNotif, setSmsNotif] = useState(true);
  const [whatsappNotif, setWhatsappNotif] = useState(true);
  const [emailNotif, setEmailNotif] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans pb-16 md:pb-0">
      <PortalSidebar role="PATIENT" userName="Lalit" userEmail="lalit@example.com" />

      <main className="flex-1 p-4 sm:p-6 lg:p-10 overflow-y-auto space-y-8 max-w-4xl mx-auto">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Patient Profile</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Manage your personal information, account preferences, and security settings.
          </p>
        </div>

        {saved && (
          <div className="bg-emerald-50 text-emerald-800 p-4 rounded-2xl border border-emerald-200 text-xs font-extrabold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Settings updated successfully!
          </div>
        )}

        {/* Profile Card Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md flex flex-col sm:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white flex items-center justify-center font-black text-2xl shadow-lg shrink-0">
            L
          </div>

          <div className="text-center sm:text-left space-y-1">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <h2 className="text-2xl font-black text-slate-900">Lalit Sai</h2>
              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-extrabold border border-blue-200">
                Patient ID: PAT-90412
              </span>
            </div>
            <p className="text-xs text-slate-500 font-semibold">lalit@example.com • +91 98765 43210</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200/80">
          {[
            { id: 'info', label: 'Personal Information' },
            { id: 'settings', label: 'Account Settings' },
            { id: 'notifications', label: 'Notification Preferences' },
            { id: 'security', label: 'Security' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-5 py-3 rounded-2xl font-extrabold text-xs transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* TAB 1: PERSONAL INFORMATION */}
        {activeTab === 'info' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
            <h3 className="text-lg font-black text-slate-900">Personal Information</h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">Full Name</label>
                  <input type="text" defaultValue="Lalit Sai" className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">Email Address</label>
                  <input type="email" defaultValue="lalit@example.com" className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">Phone Number</label>
                  <input type="tel" defaultValue="+91 98765 43210" className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">Date of Birth</label>
                  <input type="date" defaultValue="1994-08-20" className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>

              <button type="submit" className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-md flex items-center gap-2 cursor-pointer">
                <Save className="w-4 h-4" /> Save Information
              </button>
            </form>
          </div>
        )}

        {/* TAB 2: ACCOUNT SETTINGS */}
        {activeTab === 'settings' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
            <h3 className="text-lg font-black text-slate-900">Account Settings</h3>
            <div className="space-y-4 text-xs font-bold text-slate-700">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div>
                  <span className="block text-slate-900 font-extrabold">Default Department</span>
                  <span className="text-slate-500 font-medium">Select your primary OPD department for fast token booking</span>
                </div>
                <select className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-900">
                  <option>General Medicine</option>
                  <option>Cardiology</option>
                  <option>Orthopedics</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: NOTIFICATION PREFERENCES */}
        {activeTab === 'notifications' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
            <h3 className="text-lg font-black text-slate-900">Notification Preferences</h3>

            <div className="space-y-4">
              <label className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 cursor-pointer">
                <div>
                  <span className="block text-slate-900 font-extrabold">WhatsApp Queue Alerts</span>
                  <span className="text-slate-500 text-xs font-medium">Receive real-time WhatsApp alerts when your turn approaches</span>
                </div>
                <input
                  type="checkbox"
                  checked={whatsappNotif}
                  onChange={(e) => setWhatsappNotif(e.target.checked)}
                  className="w-5 h-5 rounded text-blue-600"
                />
              </label>

              <label className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 cursor-pointer">
                <div>
                  <span className="block text-slate-900 font-extrabold">SMS Notifications</span>
                  <span className="text-slate-500 text-xs font-medium">Receive SMS token numbers and doctor callout announcements</span>
                </div>
                <input
                  type="checkbox"
                  checked={smsNotif}
                  onChange={(e) => setSmsNotif(e.target.checked)}
                  className="w-5 h-5 rounded text-blue-600"
                />
              </label>
            </div>
          </div>
        )}

        {/* TAB 4: SECURITY */}
        {activeTab === 'security' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
            <h3 className="text-lg font-black text-slate-900">Security & Account Access</h3>

            <form onSubmit={handleSave} className="space-y-4 max-w-md">
              <div className="space-y-1">
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">Current Password</label>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900" />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider">New Password</label>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900" />
              </div>
              <button type="submit" className="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs shadow-md flex items-center gap-2 cursor-pointer">
                Update Password
              </button>
            </form>

            <div className="pt-6 border-t border-slate-100">
              <Link href="/login" className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-rose-50 text-rose-600 border border-rose-200 font-extrabold text-xs hover:bg-rose-100 transition-all cursor-pointer">
                <LogOut className="w-4 h-4" /> Logout of Account
              </Link>
            </div>
          </div>
        )}
      </main>

      <MobileNav />
    </div>
  );
}
