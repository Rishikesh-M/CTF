
import React from 'react';
import { AppState, User } from '../types';
import { Bell, Search, LayoutDashboard, Trophy, BookOpen, ChevronDown } from 'lucide-react';

interface HeaderProps {
  user: User;
  onNavigate: (page: AppState) => void;
  activePage: AppState;
}

const Header: React.FC<HeaderProps> = ({ user, onNavigate, activePage }) => {
  return (
    <header className="fixed top-0 w-full h-20 border-b border-slate-800/50 bg-[#020617]/80 backdrop-blur-xl z-50 px-8 flex items-center justify-between">
      <div className="flex items-center gap-10">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('LANDING')}>
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center glow-cyan">
             <div className="w-5 h-5 border-2 border-white/80 rounded-sm rotate-45 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
             </div>
          </div>
          <div>
            <h1 className="font-orbitron font-black text-xl tracking-tighter text-white">ORION<span className="text-cyan-400">CTF</span></h1>
            <p className="text-[10px] font-mono tracking-widest text-cyan-500/60 uppercase">Secure Sector Alpha 9</p>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-1 font-orbitron text-[11px] font-semibold tracking-wider">
          <button 
            onClick={() => onNavigate('DASHBOARD')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activePage === 'DASHBOARD' ? 'text-cyan-400 bg-cyan-400/10 border border-cyan-400/20' : 'text-slate-400 hover:text-white'}`}
          >
            <LayoutDashboard size={14} /> COMMAND CENTER
          </button>
          <button 
            onClick={() => onNavigate('SCOREBOARD')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${activePage === 'SCOREBOARD' ? 'text-cyan-400 bg-cyan-400/10 border border-cyan-400/20' : 'text-slate-400 hover:text-white'}`}
          >
            <Trophy size={14} /> LEADERBOARD
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-400 hover:text-white transition-all">
            <BookOpen size={14} /> ACADEMY
          </button>
        </nav>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="SEARCH COORDINATES..." 
            className="bg-slate-900/50 border border-slate-800 rounded-full pl-10 pr-4 py-2 text-xs focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all w-64 font-mono"
          />
        </div>

        <div className="flex items-center gap-4 border-l border-slate-800 pl-6">
          <button className="relative text-slate-400 hover:text-white">
            <Bell size={20} />
            <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full border border-[#020617]"></span>
          </button>
          
          <div className="flex items-center gap-3 bg-slate-900/40 p-1.5 rounded-full border border-slate-800/50">
            <div className="text-right hidden sm:block">
              <p className="text-[10px] font-mono font-bold text-slate-500 leading-none">RANK</p>
              <p className="text-xs font-orbitron font-bold text-cyan-400 leading-tight">{user.rank} <span className="text-slate-500">(Lvl {user.level})</span></p>
            </div>
            <div className="w-9 h-9 rounded-full border-2 border-cyan-500/30 overflow-hidden ring-2 ring-cyan-500/10">
              <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <ChevronDown size={14} className="text-slate-500 mr-2" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
