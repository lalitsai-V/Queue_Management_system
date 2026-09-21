'use client';

import React, { useState, useEffect } from 'react';
import { Hospital, Volume2, Clock, Tv, RefreshCw, VolumeX, Sparkles } from 'lucide-react';
import { playHospitalChime } from '@/lib/audio/chime';

export default function QueueDisplayPage() {
  const [time, setTime] = useState('');
  const [soundOn, setSoundOn] = useState(true);
  const [lastAnnouncement, setLastAnnouncement] = useState<string>('TOKEN GM-024 PROCEED TO ROOM 102');

  useEffect(() => {
    const updateClock = () => setTime(new Date().toLocaleTimeString());
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const triggerAudioChime = () => {
    if (soundOn) playHospitalChime();
  };

  const departmentsQueue = [
    {
      dept: 'GENERAL MEDICINE',
      code: 'GM',
      room: 'ROOM 102',
      nowServing: 'GM-024',
      nextTokens: ['GM-025', 'GM-026', 'GM-027'],
      waitingCount: 12,
      doctor: 'Dr. Rajesh Sharma',
      highlight: true,
    },
    {
      dept: 'CARDIOLOGY',
      code: 'CAR',
      room: 'ROOM 205',
      nowServing: 'CAR-011',
      nextTokens: ['CAR-012', 'CAR-013'],
      waitingCount: 7,
      doctor: 'Dr. Anita Kumar',
      highlight: false,
    },
    {
      dept: 'ORTHOPEDICS',
      code: 'ORT',
      room: 'ROOM 304',
      nowServing: 'ORT-008',
      nextTokens: ['ORT-009', 'ORT-010'],
      waitingCount: 5,
      doctor: 'Dr. Vikram Verma',
      highlight: false,
    },
    {
      dept: 'PEDIATRICS',
      code: 'PED',
      room: 'ROOM 108',
      nowServing: 'PED-014',
      nextTokens: ['PED-015', 'PED-016'],
      waitingCount: 9,
      doctor: 'Dr. Sunita Gupta',
      highlight: false,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans p-6 lg:p-10 flex flex-col justify-between select-none">
      {/* Top Header */}
      <header className="flex items-center justify-between pb-6 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-sky-600 text-white flex items-center justify-center font-black text-3xl shadow-lg shadow-sky-600/40">
            <Hospital className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-white uppercase">SmartCare Hospital</h1>
            <p className="text-xs font-bold text-sky-400 uppercase tracking-widest flex items-center gap-1.5">
              <Tv className="w-4 h-4" /> Live Patient Waiting Room Display Board
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={() => {
              const nextState = !soundOn;
              setSoundOn(nextState);
              if (nextState) playHospitalChime();
            }}
            className={`px-4 py-2 rounded-2xl font-bold text-xs flex items-center gap-2 transition-all border ${
              soundOn ? 'bg-sky-500/20 text-sky-300 border-sky-500/40' : 'bg-slate-800 text-slate-400 border-slate-700'
            }`}
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-sky-400 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
            {soundOn ? 'Audio Bell ON' : 'Muted'}
          </button>

          <button
            onClick={triggerAudioChime}
            className="px-4 py-2 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-black text-xs shadow-md transition-all flex items-center gap-1.5"
          >
            Test Chime 🔔
          </button>

          <div className="text-right">
            <span className="text-xs font-bold text-slate-400 uppercase block tracking-wider">Current Time</span>
            <span suppressHydrationWarning className="text-3xl font-black font-mono text-sky-400">{time || '10:30:00 AM'}</span>
          </div>
        </div>
      </header>

      {/* Main Grid of Department Queue Display Cards */}
      <main className="my-8 grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
        {departmentsQueue.map((item) => (
          <div
            key={item.code}
            className={`rounded-3xl p-8 border-4 flex flex-col justify-between transition-all ${
              item.highlight
                ? 'bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-sky-500 shadow-2xl ring-4 ring-sky-500/20'
                : 'bg-slate-900/90 border-slate-800'
            }`}
          >
            {/* Dept Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1.5 rounded-xl bg-sky-500 text-white font-mono font-black text-lg shadow-md">
                  {item.code}
                </span>
                <div>
                  <h2 className="text-2xl font-black tracking-wide text-white">{item.dept}</h2>
                  <p className="text-xs font-bold text-slate-400">{item.doctor}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-slate-400 block uppercase">Proceed To</span>
                <span className="text-lg font-black text-amber-400 bg-amber-400/10 px-3.5 py-1.5 rounded-xl border border-amber-400/30">
                  {item.room}
                </span>
              </div>
            </div>

            {/* Huge Serving Token */}
            <div className="my-6 text-center py-6 bg-slate-950/80 rounded-3xl border border-slate-800/80 shadow-inner">
              <span className="text-xs font-extrabold uppercase tracking-widest text-slate-400 block mb-1">
                NOW SERVING TOKEN
              </span>
              <div className="text-7xl sm:text-8xl font-black font-mono text-sky-400 tracking-tight drop-shadow-md animate-pulse">
                {item.nowServing}
              </div>
            </div>

            {/* Next Tokens Row */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase">NEXT:</span>
                <div className="flex gap-2">
                  {item.nextTokens.map((tok) => (
                    <span key={tok} className="px-3 py-1 rounded-xl bg-slate-800 text-slate-200 font-mono font-bold text-sm border border-slate-700">
                      {tok}
                    </span>
                  ))}
                </div>
              </div>

              <span className="text-xs font-bold text-slate-300 bg-slate-800 px-3.5 py-2 rounded-xl border border-slate-700">
                {item.waitingCount} Waiting
              </span>
            </div>
          </div>
        ))}
      </main>

      {/* Footer Ticker */}
      <footer className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 font-semibold gap-2">
        <div className="flex items-center gap-2 text-emerald-400">
          <Volume2 className="w-4 h-4 animate-bounce" />
          <span>Audio Callouts Active • Pay attention when your token number is announced on speaker</span>
        </div>
        <span>SmartCare Hospital Real-Time Queue Display</span>
      </footer>
    </div>
  );
}
