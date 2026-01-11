
import React from 'react';
import { User, Team, AppState } from '../types';
import Header from '../components/Header';
import { MOCK_TEAMS } from '../constants';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Download, RotateCcw, Award, Zap, Crosshair } from 'lucide-react';

interface ScoreboardProps {
  user: User;
  team: Team;
  onNavigate: (page: AppState) => void;
}

const Scoreboard: React.FC<ScoreboardProps> = ({ user, team, onNavigate }) => {
  // Mock data for the chart - combining team histories
  const chartData = [
    { name: 'T-24H', team1: 1200, team2: 800, team3: 1500, current: team.points * 0.4 },
    { name: 'T-16H', team1: 3400, team2: 2800, team3: 3100, current: team.points * 0.6 },
    { name: 'T-08H', team1: 6100, team2: 5200, team3: 4900, current: team.points * 0.8 },
    { name: 'NOW', team1: 8450, team2: 7820, team3: 7580, current: team.points },
  ];

  return (
    <div className="min-h-screen pt-20 bg-[#020617] pb-32">
      <Header user={user} onNavigate={onNavigate} activePage="SCOREBOARD" />

      <div className="max-w-7xl mx-auto px-8 py-10">
        <div className="flex flex-col lg:flex-row items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-cyan-500 font-orbitron text-[10px] font-bold tracking-[0.3em] mb-2 uppercase">
               <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span> LIVE DATA STREAM
            </div>
            <h2 className="text-5xl font-orbitron font-black text-white uppercase tracking-tighter">Fleet Command: <span className="text-cyan-400">Live Rankings</span></h2>
            <div className="flex gap-6 mt-3 text-[10px] font-mono tracking-widest uppercase">
              <span className="text-slate-500">GLOBAL MISSION TIMER: <span className="text-cyan-400">04:12:35</span></span>
              <span className="text-slate-500">ACTIVE FLEETS: <span className="text-cyan-400">1,248</span></span>
            </div>
          </div>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-slate-300 font-orbitron text-[10px] font-bold tracking-widest flex items-center gap-2 hover:border-slate-700 transition-all uppercase">
              <Download size={14} /> Export Data
            </button>
            <button className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white border border-cyan-400/30 rounded-xl font-orbitron text-[10px] font-bold tracking-widest flex items-center gap-2 transition-all glow-cyan uppercase">
              <RotateCcw size={14} /> Force Resync
            </button>
          </div>
        </div>

        {/* Graph Section */}
        <div className="bg-slate-900/30 border border-slate-800/50 rounded-3xl p-8 mb-12 backdrop-blur-md relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 flex items-center gap-6 z-10">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                <span className="text-[10px] font-orbitron text-slate-400 uppercase">Your Fleet</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500/50"></div>
                <span className="text-[10px] font-orbitron text-slate-400 uppercase tracking-tighter">+12% AVG</span>
             </div>
          </div>
          <h3 className="text-xl font-orbitron font-bold text-white mb-2 uppercase">Fleet Trajectory</h3>
          <p className="text-xs text-slate-500 mb-10 font-light">Points progression over last 24 standard cycles</p>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#475569" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  fontFamily="JetBrains Mono"
                />
                <YAxis 
                  stroke="#475569" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  fontFamily="JetBrains Mono"
                  tickFormatter={(val) => `${val/1000}K`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '10px' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Area type="monotone" dataKey="current" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorCurrent)" />
                <Line type="monotone" dataKey="team1" stroke="#334155" strokeWidth={1} dot={false} />
                <Line type="monotone" dataKey="team2" stroke="#334155" strokeWidth={1} dot={false} />
                <Line type="monotone" dataKey="team3" stroke="#334155" strokeWidth={1} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-orbitron font-black text-white flex items-center gap-4 uppercase"><Award size={24} className="text-cyan-400" /> Galactic Leaderboard</h3>
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search for a specific fleet..." 
                className="bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-2.5 text-xs w-72 focus:outline-none focus:border-cyan-500/50 transition-all font-mono placeholder:text-slate-800"
              />
            </div>
          </div>

          <div className="bg-slate-900/30 border border-slate-800/50 rounded-3xl overflow-hidden backdrop-blur-md">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800/50 text-[10px] font-orbitron tracking-[0.2em] text-slate-500 uppercase">
                  <th className="px-8 py-6 font-bold">Rank</th>
                  <th className="px-8 py-6 font-bold">Fleet Name</th>
                  <th className="px-8 py-6 font-bold">Anomalies Resolved</th>
                  <th className="px-8 py-6 font-bold text-right">Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/30">
                {/* User's Team Row (Highlighted) */}
                <tr className="bg-cyan-500/5 group border-l-2 border-l-cyan-400">
                  <td className="px-8 py-6">
                     <div className="flex items-center gap-3">
                        <span className="text-lg font-orbitron font-black text-cyan-400">#42</span>
                        <Zap size={14} className="text-cyan-400" />
                     </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center text-cyan-400">
                          <Crosshair size={20} />
                       </div>
                       <div>
                          <p className="font-orbitron font-bold text-white text-sm uppercase">{team.name}</p>
                          <p className="text-[10px] font-mono text-slate-500 uppercase">Commander: {team.commander}</p>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4 max-w-xs">
                       <span className="text-[10px] font-mono text-slate-400 w-12">{team.anomaliesResolved}/50</span>
                       <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-cyan-500 glow-cyan" style={{ width: `${(team.anomaliesResolved/50)*100}%` }}></div>
                       </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <span className="px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-400 font-orbitron font-black text-xs tracking-wider">
                      {team.points.toLocaleString()} PTS
                    </span>
                  </td>
                </tr>

                {/* Top Teams */}
                {MOCK_TEAMS.map((t, i) => (
                  <tr key={t.id} className="hover:bg-slate-800/20 group transition-all">
                    <td className="px-8 py-6">
                       <div className="flex items-center gap-3">
                          <span className={`text-lg font-orbitron font-black ${i === 0 ? 'text-yellow-500' : i === 1 ? 'text-slate-300' : 'text-orange-500'}`}>
                            {i === 0 ? '1st' : i === 1 ? '2nd' : '3rd'}
                          </span>
                       </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                         <div className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center overflow-hidden">
                            <img src={`https://api.dicebear.com/7.x/identicon/svg?seed=${t.name}`} className="w-full h-full p-2 grayscale opacity-60" alt="" />
                         </div>
                         <div>
                            <p className="font-orbitron font-bold text-white text-sm uppercase group-hover:text-cyan-400 transition-colors">{t.name}</p>
                            <p className="text-[10px] font-mono text-slate-600 uppercase">Commander: {t.commander}</p>
                         </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4 max-w-xs">
                         <span className="text-[10px] font-mono text-slate-500 w-12">{t.anomaliesResolved}/50</span>
                         <div className="flex-1 h-1.5 bg-slate-800/50 rounded-full overflow-hidden">
                            <div className="h-full bg-slate-500/50" style={{ width: `${(t.anomaliesResolved/50)*100}%` }}></div>
                         </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <span className="text-slate-400 font-orbitron font-black text-xs tracking-wider">
                        {t.points.toLocaleString()} PTS
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {/* Pagination Mockup */}
            <div className="p-6 border-t border-slate-800/30 flex items-center justify-between">
               <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">Showing 1 to 6 of 1,248 fleets</p>
               <div className="flex items-center gap-2">
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-white transition-colors border border-transparent hover:border-slate-800">&lt;</button>
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center bg-cyan-500 text-slate-950 font-orbitron font-black text-[10px]">1</button>
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-white transition-colors font-mono text-[10px]">2</button>
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-white transition-colors font-mono text-[10px]">3</button>
                  <span className="text-slate-700">...</span>
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-white transition-colors border border-transparent hover:border-slate-800">&gt;</button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scoreboard;
