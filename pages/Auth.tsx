
import React, { useState } from 'react';
import { User } from '../types';
import { ChevronLeft, User as UserIcon, Phone, Mail, School, ArrowRight } from 'lucide-react';

interface AuthProps {
  onComplete: (user: User) => void;
  onBack: () => void;
}

const Auth: React.FC<AuthProps> = ({ onComplete, onBack }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    college: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete({
      ...formData,
      rank: 'Commander',
      level: 4,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 relative">
      <button 
        onClick={onBack}
        className="absolute top-10 left-10 flex items-center gap-2 text-slate-500 hover:text-cyan-400 transition-colors font-orbitron text-xs tracking-widest"
      >
        <ChevronLeft size={16} /> ABORT SEQUENCE
      </button>

      <div className="w-full max-w-xl">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-orbitron font-black text-white uppercase tracking-widest mb-2">Initialize <span className="text-cyan-400">Profile</span></h2>
          <p className="text-slate-500 text-sm font-mono tracking-tight">CREATING PILOT CREDENTIALS FOR SECTOR ALPHA 9</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-8 bg-slate-900/50 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500/50 group-focus-within:bg-cyan-400 transition-colors"></div>
            
            <div className="space-y-6">
              <div className="relative">
                <label className="block text-[10px] font-orbitron tracking-[0.2em] text-cyan-500 mb-2 uppercase">Pilot Name</label>
                <div className="relative">
                  <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="ENTER PILOT DESIGNATION" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-4 text-sm font-mono focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all placeholder:text-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="block text-[10px] font-orbitron tracking-[0.2em] text-cyan-500 mb-2 uppercase">Comm Device (Phone)</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                    <input 
                      required
                      type="tel" 
                      value={formData.phone}
                      onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+1 (555) 000-0000" 
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-4 text-sm font-mono focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all placeholder:text-slate-700"
                    />
                  </div>
                </div>
                <div className="relative">
                  <label className="block text-[10px] font-orbitron tracking-[0.2em] text-cyan-500 mb-2 uppercase">Interstellar Mail</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="CMDR.SHEPARD@CITADEL.COM" 
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-4 text-sm font-mono focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all placeholder:text-slate-700"
                    />
                  </div>
                </div>
              </div>

              <div className="relative">
                <label className="block text-[10px] font-orbitron tracking-[0.2em] text-cyan-500 mb-2 uppercase">Academy/College Name</label>
                <div className="relative">
                  <School className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                  <input 
                    required
                    type="text" 
                    value={formData.college}
                    onChange={e => setFormData(prev => ({ ...prev, college: e.target.value }))}
                    placeholder="E.G. N-7 INTERSTELLAR ACADEMY" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-4 text-sm font-mono focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/20 transition-all placeholder:text-slate-700"
                  />
                </div>
              </div>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full py-5 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-orbitron font-black text-sm tracking-[0.3em] rounded-xl flex items-center justify-center gap-3 transition-all transform active:scale-95 glow-cyan uppercase"
          >
            CONFIRM PILOT REGISTRATION <ArrowRight size={18} />
          </button>
        </form>

        <p className="mt-8 text-center text-slate-500 text-[10px] font-mono tracking-widest uppercase">
          BY REGISTERING, YOU AGREE TO THE RULES OF ENGAGEMENT AND SECURE SECTOR PROTOCOLS.
        </p>
      </div>
    </div>
  );
};

export default Auth;
