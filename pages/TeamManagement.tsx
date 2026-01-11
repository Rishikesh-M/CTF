
import React, { useState } from 'react';
import { User, Team } from '../types';
import { Box, Share2, Plus, LogIn, ChevronLeft, Terminal, Quote } from 'lucide-react';

interface TeamManagementProps {
  user: User;
  onComplete: (team: Team) => void;
  onBack: () => void;
}

const TeamManagement: React.FC<TeamManagementProps> = ({ user, onComplete, onBack }) => {
  const [createData, setCreateData] = useState({ name: '', statement: '' });
  const [warpCode, setWarpCode] = useState('');

  const generateWarpCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const segment = () => Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    return `${segment()}-${segment()}-${segment()}`;
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const code = generateWarpCode();
    onComplete({
      id: Math.random().toString(36).substr(2, 9),
      name: createData.name || 'NEW_FLEET_UNIT',
      warpCode: code,
      commander: user.name,
      points: 0,
      members: [user.name],
      anomaliesResolved: 0,
      history: [{ time: 'NOW', points: 0 }]
    });
  };

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (warpCode.length < 5) return;
    onComplete({
      id: 'joined_team',
      name: 'ALLIED_FLEET_UNIT',
      warpCode: warpCode,
      commander: 'Senior Commander',
      points: 2450,
      members: ['User1', 'User2', user.name],
      anomaliesResolved: 12,
      history: [{ time: 'NOW', points: 2450 }]
    });
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 flex flex-col items-center justify-center relative bg-[url('https://picsum.photos/seed/nebula/1920/1080')] bg-cover bg-center">
      <div className="absolute inset-0 bg-[#020617]/90 backdrop-blur-sm"></div>
      
      <button 
        onClick={onBack}
        className="absolute top-10 left-10 flex items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors font-orbitron text-xs tracking-widest z-10"
      >
        <ChevronLeft size={16} /> RE-AUTHENTICATE
      </button>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 w-full max-w-6xl z-10">
        {/* Command New Fleet */}
        <div className="w-full lg:w-1/2 p-10 bg-slate-900/40 backdrop-blur-xl border-2 border-slate-800 rounded-[2rem] relative group hover:border-cyan-500/50 transition-all">
          <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-cyan-400 rounded-tl-[2rem]"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-cyan-400 rounded-br-[2rem]"></div>
          
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-cyan-400/20 rounded-2xl flex items-center justify-center text-cyan-400 glow-cyan">
                <Box size={28} />
              </div>
              <div>
                <h2 className="text-3xl font-orbitron font-black text-white leading-none">Command New Fleet</h2>
                <p className="text-slate-500 text-[10px] font-mono tracking-widest mt-2 uppercase">INITIALIZE A NEW OPERATIONS UNIT</p>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full border border-slate-700 flex items-center justify-center text-slate-500 group-hover:text-cyan-400 transition-colors">
              <Plus size={24} />
            </div>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed mb-10">
            Initialize a new operations unit. As Fleet Commander, you will issue directives and manage access codes.
          </p>

          <form onSubmit={handleCreate} className="space-y-6">
            <div>
              <label className="block text-[10px] font-orbitron tracking-[0.2em] text-cyan-500 mb-2 uppercase">Fleet Designation</label>
              <div className="relative">
                <Terminal className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                <input 
                  type="text" 
                  value={createData.name}
                  onChange={e => setCreateData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="ENTER FLEET NAME" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-4 text-xs font-mono focus:outline-none focus:border-cyan-500/50 transition-all uppercase placeholder:text-slate-800"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-orbitron tracking-[0.2em] text-cyan-500 mb-2 uppercase">Mission Statement (Optional)</label>
              <div className="relative">
                <Quote className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                <input 
                  type="text" 
                  value={createData.statement}
                  onChange={e => setCreateData(prev => ({ ...prev, statement: e.target.value }))}
                  placeholder="E.G. AD ASTRA PER ASPERA" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-4 text-xs font-mono focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-slate-800"
                />
              </div>
            </div>
            <button className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-orbitron font-black text-sm tracking-widest rounded-xl transition-all glow-cyan uppercase flex items-center justify-center gap-3">
              <Share2 size={18} /> GENERATE WARP CODE
            </button>
          </form>
        </div>

        {/* OR Divider */}
        <div className="relative flex items-center justify-center">
           <div className="w-12 h-12 rounded-full bg-slate-950 border-2 border-slate-800 flex items-center justify-center font-orbitron font-black text-xs z-20 text-white shadow-[0_0_20px_rgba(6,182,212,0.5)]">OR</div>
           <div className="absolute top-1/2 w-[2px] h-[300px] -translate-y-1/2 bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent"></div>
        </div>

        {/* Dock with Fleet */}
        <div className="w-full lg:w-1/2 p-10 bg-slate-900/40 backdrop-blur-xl border-2 border-slate-800 rounded-[2rem] relative group hover:border-purple-500/50 transition-all">
          <div className="absolute top-0 right-0 w-20 h-20 border-t-2 border-r-2 border-purple-500 rounded-tr-[2rem]"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 border-b-2 border-l-2 border-purple-500 rounded-bl-[2rem]"></div>

          <div className="flex items-start justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-purple-400/20 rounded-2xl flex items-center justify-center text-purple-400 glow-purple">
                <Share2 size={28} className="rotate-45" />
              </div>
              <div>
                <h2 className="text-3xl font-orbitron font-black text-white leading-none">Dock with Fleet</h2>
                <p className="text-slate-500 text-[10px] font-mono tracking-widest mt-2 uppercase">JOIN AN EXISTING ARMADA</p>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full border border-slate-700 flex items-center justify-center text-slate-500 group-hover:text-purple-400 transition-colors">
              <LogIn size={24} />
            </div>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed mb-10">
            Enter the encrypted warp code provided by your Fleet Commander to synchronize credentials.
          </p>

          <form onSubmit={handleJoin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-orbitron tracking-[0.2em] text-purple-500 mb-2 uppercase">Access Coordinates (Warp Code)</label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 font-mono text-lg">***</div>
                <input 
                  type="text" 
                  value={warpCode}
                  onChange={e => setWarpCode(e.target.value.toUpperCase())}
                  placeholder="XXXX - XXXX - XXXX" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-4 text-center font-mono tracking-[0.5em] text-lg focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-slate-800"
                />
              </div>
            </div>

            <div className="text-center">
              <p className="text-[9px] font-mono text-slate-600 mb-4 tracking-widest uppercase">OR SEARCH PUBLIC FLEETS</p>
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={16} />
                <input 
                  type="text" 
                  placeholder="SEARCH ACTIVE SQUADRONS..." 
                  className="w-full bg-slate-950/50 border border-slate-800 rounded-xl pl-12 pr-4 py-3 text-[10px] font-mono focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-slate-800 uppercase"
                />
              </div>
            </div>

            <button className="w-full py-5 bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white font-orbitron font-black text-sm tracking-widest rounded-xl transition-all glow-purple uppercase flex items-center justify-center gap-3">
              <LogIn size={18} /> INITIATE DOCKING
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const Search = ({ size, className }: { size: number, className: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

export default TeamManagement;
