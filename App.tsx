
import React, { useState, useEffect } from 'react';
import { AppState, User, Team, Category, Challenge } from './types';
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import TeamManagement from './pages/TeamManagement';
import Dashboard from './pages/Dashboard';
import Scoreboard from './pages/Scoreboard';
import { MOCK_CHALLENGES } from './constants';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<AppState>('LANDING');
  const [user, setUser] = useState<User | null>(null);
  const [team, setTeam] = useState<Team | null>(null);
  const [challenges, setChallenges] = useState<Challenge[]>(MOCK_CHALLENGES);
  const [notifications, setNotifications] = useState<{ id: string; type: 'success' | 'error'; message: string; submessage: string }[]>([]);

  const addNotification = (type: 'success' | 'error', message: string, submessage: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setNotifications(prev => [...prev, { id, type, message, submessage }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentPage('TEAM_MANAGEMENT');
  };

  const handleTeamAction = (teamData: Team) => {
    setTeam(teamData);
    setCurrentPage('DASHBOARD');
  };

  const handleSolve = (challengeId: string) => {
    setChallenges(prev => prev.map(c => 
      c.id === challengeId ? { ...c, solved: true } : c
    ));
    addNotification('success', 'TRANSMISSION SUCCESS', '+Points added to fleet');
  };

  const handleError = (message: string) => {
    addNotification('error', 'INVALID FRAGMENT', message);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-cyan-500/30">
      {/* Global Background Particles/Effect */}
      <div className="fixed inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1e293b_0%,transparent_100%)]"></div>
      </div>

      {/* Notifications Overlay */}
      <div className="fixed top-24 right-6 z-[100] flex flex-col gap-4">
        {notifications.map(n => (
          <div 
            key={n.id} 
            className={`flex items-center gap-4 p-4 rounded-lg border-2 backdrop-blur-md animate-slide-in
              ${n.type === 'success' ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-400 glow-emerald' : 'bg-rose-950/40 border-rose-500/50 text-rose-400 glow-rose'}
            `}
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2
              ${n.type === 'success' ? 'border-emerald-500' : 'border-rose-500'}
            `}>
              {n.type === 'success' ? '✓' : '✕'}
            </div>
            <div>
              <div className="font-orbitron font-bold text-sm tracking-widest">{n.message}</div>
              <div className="text-xs opacity-70">{n.submessage}</div>
            </div>
          </div>
        ))}
      </div>

      <main className="relative z-10">
        {currentPage === 'LANDING' && <Landing onStart={() => setCurrentPage('AUTH')} />}
        {currentPage === 'AUTH' && <Auth onComplete={handleLogin} onBack={() => setCurrentPage('LANDING')} />}
        {currentPage === 'TEAM_MANAGEMENT' && <TeamManagement user={user!} onComplete={handleTeamAction} onBack={() => setCurrentPage('AUTH')} />}
        {currentPage === 'DASHBOARD' && (
          <Dashboard 
            user={user!} 
            team={team!} 
            challenges={challenges} 
            onNavigate={setCurrentPage}
            onSolve={handleSolve}
            onError={handleError}
          />
        )}
        {currentPage === 'SCOREBOARD' && <Scoreboard user={user!} team={team!} onNavigate={setCurrentPage} />}
      </main>

      <footer className="fixed bottom-0 w-full border-t border-slate-800/50 bg-slate-950/80 backdrop-blur-md px-6 py-2 flex justify-between items-center text-[10px] uppercase tracking-[0.2em] text-slate-500 font-mono z-50">
        <div className="flex gap-6">
          <span>SERVER: <span className="text-emerald-500">OPTIMAL</span></span>
          <span>LATENCY: <span className="text-cyan-500">12MS</span></span>
        </div>
        <div className="text-slate-400">ENCRYPTION LEVEL: MILITARY GRADE</div>
        <div className="flex gap-6">
          <span>COORD: 14.22.09.81</span>
          <span>V2.4.8-ALPHA</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
