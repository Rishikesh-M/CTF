
import React from 'react';
import { Rocket, ShieldCheck, Database, Globe } from 'lucide-react';

interface LandingProps {
  onStart: () => void;
}

const Landing: React.FC<LandingProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen pt-20 flex flex-col items-center justify-center px-6 overflow-hidden relative">
      {/* Background elements */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Hero Content */}
      <div className="text-center max-w-4xl mx-auto z-10 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-[10px] font-orbitron tracking-[0.3em] mb-8 animate-pulse-soft">
           <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span> LIVE MISSION DATA STREAM
        </div>
        
        <h1 className="text-5xl md:text-8xl font-orbitron font-black text-white tracking-tighter mb-6 leading-tight">
          REACH THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">EVENT HORIZON</span>
        </h1>
        
        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light leading-relaxed">
          The universe's most formidable security challenges await. Decode the void and exfiltrate the truth from the darkness.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button 
            onClick={onStart}
            className="px-10 py-5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-orbitron font-black text-sm tracking-widest rounded-lg flex items-center justify-center gap-3 transition-all transform hover:scale-105 glow-cyan"
          >
            <Rocket size={18} /> INITIATE MISSION
          </button>
          <button className="px-10 py-5 border border-slate-700 hover:border-slate-500 bg-slate-900/50 backdrop-blur-sm text-white font-orbitron font-black text-sm tracking-widest rounded-lg flex items-center justify-center gap-3 transition-all">
            <Globe size={18} /> VIEW INTEL
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mt-24 mb-16 px-4 z-10">
        {[
          { icon: <ShieldCheck className="text-cyan-400" />, label: 'ACTIVE PILOTS', value: '12,408' },
          { icon: <Database className="text-purple-400" />, label: 'SYSTEMS COMPROMISED', value: '842,105' },
          { icon: <Globe className="text-blue-400" />, label: 'DATA RECOVERED', value: '4.2 PB' },
        ].map((stat, i) => (
          <div key={i} className="p-8 bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-2xl text-center group hover:border-cyan-500/30 transition-all">
             <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
               {stat.icon}
             </div>
             <p className="text-[10px] font-orbitron tracking-widest text-slate-500 mb-2 uppercase">{stat.label}</p>
             <p className="text-3xl font-orbitron font-black text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Feature Section */}
      <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center mb-32 z-10">
        <div className="space-y-8">
           <h2 className="text-4xl font-orbitron font-bold text-white uppercase tracking-tight">Command the <span className="text-cyan-400">Void</span>.</h2>
           <p className="text-slate-400 leading-relaxed text-lg">
             Our platform provides high-fidelity simulations for pilots to navigate the complex web of interstellar security. From orbital network maneuvering to quantum-grade decryption, your skills will be tested against the infinite.
           </p>
           <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                 <div className="mt-1 text-cyan-400"><ShieldCheck size={18}/></div>
                 <div>
                    <h4 className="font-orbitron text-xs font-bold text-white uppercase mb-1">Orbital Mechanics</h4>
                    <p className="text-[11px] text-slate-500">Master network topologies and bypass protocols.</p>
                 </div>
              </div>
              <div className="flex items-start gap-3">
                 <div className="mt-1 text-purple-400"><Database size={18}/></div>
                 <div>
                    <h4 className="font-orbitron text-xs font-bold text-white uppercase mb-1">Quantum Encryption</h4>
                    <p className="text-[11px] text-slate-500">Break advanced cryptographic primitives.</p>
                 </div>
              </div>
           </div>
        </div>
        <div className="relative group">
           <div className="absolute inset-0 bg-cyan-500/20 rounded-2xl blur-2xl group-hover:bg-cyan-500/30 transition-all"></div>
           <div className="relative aspect-video rounded-2xl overflow-hidden border border-cyan-500/30 glow-cyan">
              <img src="https://picsum.photos/seed/space-ctf/800/450" alt="Tech Visual" className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 bg-gradient-to-t from-slate-950/90 to-transparent">
                 <div className="font-mono text-[10px] text-cyan-400 mb-2">LIVE MISSION FEED</div>
                 <div className="space-y-1 opacity-60">
                    <div className="text-[9px] font-mono">✓ INITIALIZING CORE_SYSTEMS_7...</div>
                    <div className="text-[9px] font-mono">✓ SCANNING QUASAR_ALPHA_NETWORK...</div>
                    <div className="text-[9px] font-mono">✓ DATA FRAGMENTS_SYNC_READY...</div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
