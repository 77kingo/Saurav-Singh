import React from 'react';
import { Rocket, Brain, ShieldAlert, Check, Server, Network, HelpCircle, Code2 } from 'lucide-react';
import { SERVICES, Service } from '../data/mockData';

interface ServicesProps {
  onContactClick: () => void;
}

export const Services: React.FC<ServicesProps> = ({ onContactClick }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Rocket': return <Rocket size={24} className="text-emerald-400" />;
      case 'Brain': return <Brain size={24} className="text-cyan-400" />;
      case 'ShieldAlert': return <ShieldAlert size={24} className="text-amber-400" />;
      default: return <Server size={24} className="text-zinc-400" />;
    }
  };

  const getBorderColor = (tier: Service['tier'], popular: boolean) => {
    if (popular) return 'border-emerald-500 shadow-emerald-500/10 shadow-xl';
    if (tier === 'Enterprise') return 'border-purple-500/60 shadow-purple-500/5 shadow-lg';
    return 'border-zinc-800 hover:border-zinc-700 shadow-black/20';
  };

  return (
    <div className="w-full space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Services for Modern Nepali Brands</h2>
        <p className="text-xs md:text-sm text-zinc-400 font-mono">
          [RATE_CARD_V2] Practical websites and web apps for businesses, creators, and service-based teams.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {SERVICES.map((s) => (
          <div 
            key={s.id} 
            className={`bg-zinc-950/60 border rounded-xl p-6 flex flex-col relative transition-all duration-300 ${getBorderColor(s.tier, s.popular)}`}
          >
            {s.popular && (
              <span className="absolute -top-3 left-6 px-3 py-1 bg-emerald-500 text-black font-bold font-mono text-4xs rounded-full uppercase tracking-wider">
                Most Requested
              </span>
            )}

            {/* Title & Icon */}
            <div className="flex items-start justify-between">
              <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl">
                {getIcon(s.icon)}
              </div>
              <span className={`text-4xs font-mono font-bold px-2 py-0.5 rounded border ${
                s.tier === 'Pro' 
                  ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                  : 'bg-zinc-800 border-zinc-700 text-zinc-400'
              }`}>
                {s.tier}
              </span>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-bold text-white leading-tight">{s.title}</h3>
              <p className="text-xs text-emerald-400 font-mono mt-1">{s.subtitle}</p>
            </div>

            <p className="text-xs text-zinc-400 mt-4 leading-relaxed flex-1">
              {s.description}
            </p>

            {/* Pricing */}
            <div className="mt-6 pt-4 border-t border-zinc-900 flex items-baseline gap-1">
              <span className="text-2xl md:text-3xl font-bold text-zinc-100 font-sans">{s.price}</span>
              <span className="text-xs font-mono text-zinc-500">{s.period}</span>
            </div>

            {/* Features */}
            <ul className="mt-6 space-y-2 text-xs text-zinc-300 font-sans">
              {s.features.map((f, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check size={14} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <button 
              onClick={onContactClick}
              className={`mt-8 w-full py-2.5 rounded-lg font-bold font-mono text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                s.popular 
                  ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/20' 
                  : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 hover:border-zinc-700'
              }`}
            >
              <Code2 size={14} />
              <span>Start a Project</span>
            </button>
          </div>
        ))}
      </div>

      {/* Custom Consulting Banner */}
      <div className="bg-zinc-950 border border-zinc-800/60 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg shadow-black/20">
        <div className="flex gap-4 items-start">
          <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-purple-400 shrink-0">
            <Network size={24} />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">Custom Builds and Long-term Collaboration</h3>
            <p className="text-xs text-zinc-400 max-w-xl leading-relaxed">
              If your project does not fit a simple landing page or showcase site, I can also help with custom flows, forms, dashboards, and frontend-heavy product work. This is a good fit for local startups, service offices, and growing businesses.
            </p>
          </div>
        </div>
        <button 
          onClick={onContactClick}
          className="px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-zinc-200 hover:text-white font-mono font-bold text-xs shrink-0 cursor-pointer transition-all flex items-center gap-2"
        >
          <HelpCircle size={14} />
          <span>Request Custom Plan</span>
        </button>
      </div>
    </div>
  );
};
