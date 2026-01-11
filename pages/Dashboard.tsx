
import React, { useState } from 'react';
import { User, Team, Category, Challenge, AppState, Difficulty } from '../types';
import Header from '../components/Header';
import { CATEGORY_ICONS } from '../constants';
import { Download, Send, X, Filter, BarChart3, Clock, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface DashboardProps {
  user: User;
  team: Team;
  challenges: Challenge[];
  onNavigate: (page: AppState) => void;
  onSolve: (id: string) => void;
  onError: (msg: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, team, challenges, onNavigate, onSolve, onError }) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [flagInput, setFlagInput] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState(2); // 0-4 scale

  const filteredChallenges = challenges.filter(c => {
    const catMatch = selectedCategory === 'All' || c.category === selectedCategory;
    const diffMatch = c.difficulty <= difficultyFilter + 1;
    return catMatch && diffMatch;
  });

  const handleSubmitFlag = () => {
    if (!selectedChallenge) return;
    if (flagInput === selectedChallenge.flag) {
      onSolve(selectedChallenge.id);
      setSelectedChallenge(null);
      setFlagInput('');
    } else {
      onError('Flag rejected by mainframe');
    }
  };

  return (
    <div className="min-h-screen pt-20 flex bg-[#020617]">
      <Header user={user} onNavigate={onNavigate} activePage="DASHBOARD" />

      {/* Sidebar */}
      <aside className="w-80 h-[calc(100vh-5rem)] fixed top-20 left-0 border-r border-slate-800/50 bg-[#020617]/50 backdrop-blur-xl p-8 flex flex-col gap-10 overflow-y-auto">
        {/* Current Session Stats */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-[10px] font-orbitron tracking-widest text-slate-500 uppercase">Current Session</p>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 text-[8px] font-bold border border-emerald-500/30 animate-pulse">ACTIVE</span>
          </div>
          <div className="text-4xl font-orbitron font-black text-white mb-2">{team.points.toLocaleString()} <span className="text-xs text-slate-500 font-mono">PTS</span></div>
          <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-cyan-500 glow-cyan" style={{ width: '65%' }}></div>
          </div>
          <p className="text-[9px] font-mono text-slate-600 mt-2 text-right uppercase tracking-wider">65% TO NEXT RANK</p>
        </div>

        {/* Categories */}
        <nav className="space-y-2">
          <div className="flex items-center justify-between mb-4">
             <div className="flex items-center gap-2 text-slate-400 font-orbitron text-[10px] font-bold tracking-widest uppercase">
                <Filter size={14}/> SYSTEMS
             </div>
             <button onClick={() => setSelectedCategory('All')} className="text-[9px] font-mono text-slate-600 hover:text-cyan-400">RESET ALL</button>
          </div>
          {Object.values(Category).map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all duration-300 group
                ${selectedCategory === cat ? 'bg-cyan-500/10 border-cyan-500/30 text-white' : 'border-transparent text-slate-500 hover:bg-slate-900 hover:text-slate-300'}
              `}
            >
              <div className="flex items-center gap-3">
                {CATEGORY_ICONS[cat]}
                <span className="text-xs font-semibold tracking-wide uppercase">{cat}</span>
              </div>
              <span className={`text-[10px] font-mono ${selectedCategory === cat ? 'text-cyan-400' : 'text-slate-700'}`}>
                {challenges.filter(c => c.category === cat).length.toString().padStart(2, '0')}
              </span>
            </button>
          ))}
        </nav>

        {/* Difficulty Orbit */}
        <div>
          <p className="text-[10px] font-orbitron tracking-widest text-slate-500 uppercase mb-6">Difficulty Orbit</p>
          <div className="px-2">
            <input 
              type="range" 
              min="0" 
              max="3" 
              value={difficultyFilter}
              onChange={e => setDifficultyFilter(parseInt(e.target.value))}
              className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
            />
            <div className="flex justify-between mt-3 font-mono text-[9px] text-slate-600 uppercase">
              <span>Low Orbit</span>
              <span>Deep Space</span>
            </div>
          </div>
        </div>

        {/* System Logs */}
        <div className="mt-auto">
          <div className="flex items-center gap-2 text-cyan-500/60 font-orbitron text-[10px] font-bold tracking-widest uppercase mb-4">
             <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"></div> SYSTEM LOGS
          </div>
          <div className="space-y-2 font-mono text-[9px] text-slate-500">
             <p>&gt; Connection established... <span className="text-emerald-500">OK</span></p>
             <p>&gt; Decrypting challenge parameters...</p>
             <p>&gt; <span className="text-cyan-400">User_Delta</span> solved Nebula_Ore</p>
             <p>&gt; Retrieving flag hashes...</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-80 flex-1 p-10 pb-20">
        <div className="flex flex-col lg:flex-row items-start justify-between mb-10 gap-6">
          <div>
            <h2 className="text-5xl font-orbitron font-black text-white uppercase tracking-tighter">Star Systems</h2>
            <p className="text-slate-500 mt-2 font-light">Select a celestial anomaly to begin analysis.</p>
          </div>
          <div className="flex gap-4">
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex items-center gap-4">
               <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                 <BarChart3 size={20}/>
               </div>
               <div>
                 <p className="text-[9px] font-orbitron text-slate-500 uppercase">Global Rank</p>
                 <p className="text-xl font-orbitron font-black text-white">#42</p>
               </div>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex items-center gap-4">
               <div className="w-10 h-10 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500">
                 <AlertTriangle size={20}/>
               </div>
               <div>
                 <p className="text-[9px] font-orbitron text-slate-500 uppercase">First Bloods</p>
                 <p className="text-xl font-orbitron font-black text-white">03</p>
               </div>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex items-center gap-4">
               <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-500">
                 <Clock size={20}/>
               </div>
               <div>
                 <p className="text-[9px] font-orbitron text-slate-500 uppercase">Uptime</p>
                 <p className="text-xl font-orbitron font-black text-white">14h 22m</p>
               </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredChallenges.map(challenge => (
            <div 
              key={challenge.id}
              onClick={() => setSelectedChallenge(challenge)}
              className={`p-8 bg-slate-900/30 backdrop-blur-md border border-slate-800 rounded-3xl cursor-pointer hover:border-cyan-500/50 transition-all group relative overflow-hidden
                ${challenge.solved ? 'opacity-80' : ''}
              `}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl group-hover:bg-cyan-500/10"></div>
              
              <div className="flex items-start justify-between mb-8">
                <div className="flex items-center gap-4">
                   <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                     {CATEGORY_ICONS[challenge.category]}
                   </div>
                   <div>
                     <div className="flex items-center gap-2">
                        <h3 className="font-orbitron font-bold text-lg text-white group-hover:text-cyan-400 transition-colors uppercase">{challenge.title}</h3>
                        {challenge.solved && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 text-[8px] font-bold tracking-widest">SOLVED</span>
                        )}
                     </div>
                     <p className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">{challenge.category}</p>
                   </div>
                </div>
              </div>

              <p className="text-slate-400 text-sm line-clamp-2 mb-8 leading-relaxed font-light">
                {challenge.description}
              </p>

              <div className="flex items-end justify-between border-t border-slate-800/50 pt-6">
                <div>
                   <p className="text-[10px] font-orbitron tracking-widest text-slate-500 uppercase mb-2">Difficulty</p>
                   <div className="flex gap-1">
                      {[1, 2, 3, 4].map(v => (
                        <div key={v} className={`w-3 h-1.5 rounded-sm ${v <= challenge.difficulty ? (challenge.difficulty >= 3 ? 'bg-rose-500' : 'bg-cyan-500') : 'bg-slate-800'}`}></div>
                      ))}
                   </div>
                </div>
                <div className="text-right">
                   <p className="text-2xl font-orbitron font-black text-white leading-none">{challenge.points}</p>
                   <p className="text-[9px] font-mono text-slate-500 uppercase tracking-tighter mt-1">PTS</p>
                </div>
              </div>

              {!challenge.solved && (
                <div className="absolute inset-x-0 bottom-0 py-3 bg-cyan-500 translate-y-full group-hover:translate-y-0 transition-transform flex items-center justify-center text-[10px] font-orbitron font-black text-slate-950 tracking-[0.3em]">
                   INITIATE MISSION
                </div>
              )}
            </div>
          ))}
          
          {/* Locked Challenge Example */}
          <div className="p-8 bg-slate-950/50 border border-slate-800 rounded-3xl flex flex-col items-center justify-center text-center opacity-60">
             <div className="w-16 h-16 rounded-full bg-slate-900 flex items-center justify-center mb-6">
                <AlertTriangle size={32} className="text-slate-700" />
             </div>
             <h3 className="font-orbitron font-bold text-lg text-slate-700 mb-2 uppercase">Black Hole</h3>
             <p className="text-[10px] font-mono text-slate-800 mb-6">[REDACTED] Data Stream... access denied.</p>
             <p className="text-[10px] font-orbitron font-bold text-slate-700 tracking-[0.2em] border border-slate-800 px-4 py-2 rounded-lg">CLEARANCE LEVEL 6 REQUIRED</p>
          </div>
        </div>
      </main>

      {/* Challenge Modal */}
      {selectedChallenge && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-3xl bg-[#020617] border border-slate-800 rounded-3xl shadow-2xl relative animate-scale-up">
            {/* Header */}
            <div className="flex items-center justify-between p-8 border-b border-slate-800">
               <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    {CATEGORY_ICONS[selectedChallenge.category]}
                  </div>
                  <h2 className="text-2xl font-orbitron font-black text-white uppercase tracking-tight">System: <span className="text-cyan-400">{selectedChallenge.title} Breach</span></h2>
               </div>
               <button onClick={() => setSelectedChallenge(null)} className="text-slate-500 hover:text-white transition-colors">
                 <X size={24}/>
               </button>
            </div>

            {/* Content */}
            <div className="p-8 space-y-8">
               <div>
                  <div className="flex items-center gap-2 text-[10px] font-orbitron text-cyan-500 tracking-[0.2em] mb-4 uppercase">
                     <span className="w-8 h-[1px] bg-cyan-500/30"></span> MISSION BRIEFING
                  </div>
                  <p className="text-slate-400 leading-relaxed text-sm">
                    {selectedChallenge.description}
                  </p>
               </div>

               <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 flex flex-col items-center text-center">
                  <button className="px-10 py-5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-orbitron font-black text-sm tracking-[0.2em] rounded-xl flex items-center gap-4 transition-all glow-cyan mb-4 group uppercase">
                     <Download size={20} className="group-hover:translate-y-1 transition-transform" /> DOWNLOAD PAYLOAD
                  </button>
                  <p className="text-[10px] font-mono text-slate-600 uppercase tracking-tighter">
                    File: {selectedChallenge.title.toLowerCase().replace(' ', '_')}_exploit_kit.zip ({selectedChallenge.fileSize}) • SHA256: {selectedChallenge.sha256}
                  </p>
               </div>

               <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[10px] font-orbitron text-cyan-500 tracking-[0.2em] uppercase">
                     <span className="w-8 h-[1px] bg-cyan-500/30"></span> FLAG SUBMISSION
                  </div>
                  <div className="flex gap-4">
                    <div className="relative flex-1 group">
                       <div className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500/50">
                          <CheckCircle2 size={18}/>
                       </div>
                       <input 
                         type="text" 
                         value={flagInput}
                         onChange={e => setFlagInput(e.target.value)}
                         placeholder="FLAG{INTERSTELLAR_ID_HERE}"
                         className="w-full bg-slate-950 border border-slate-800 group-focus-within:border-cyan-500/50 rounded-xl pl-12 pr-4 py-5 font-mono text-sm tracking-widest focus:outline-none transition-all placeholder:text-slate-800"
                       />
                    </div>
                    <button 
                      onClick={handleSubmitFlag}
                      className="px-8 py-5 bg-[#0ea5e9] hover:bg-cyan-400 text-white font-orbitron font-black text-sm tracking-widest rounded-xl flex items-center gap-3 transition-all glow-cyan uppercase"
                    >
                       <Send size={18}/> TRANSMIT
                    </button>
                  </div>
               </div>
            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-900/40 border-t border-slate-800 rounded-b-3xl flex justify-between px-8 text-[9px] font-mono text-slate-600 tracking-tighter uppercase">
               <span>ENCRYPTION: AES-256-GCM</span>
               <span>STATUS: CONNECTION STABLE</span>
               <span>COORD: 14.22.09.81</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
