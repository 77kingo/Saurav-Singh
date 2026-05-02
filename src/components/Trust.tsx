import React from 'react';
import { Clock3, Handshake, MapPin, Smartphone } from 'lucide-react';

const trustPoints = [
  {
    icon: <Handshake size={18} className="text-emerald-400" />,
    title: 'Simple Working Process',
    text: 'You share the goal, target audience, and style you want. I turn that into a clean website or web app with practical communication throughout.'
  },
  {
    icon: <Smartphone size={18} className="text-emerald-400" />,
    title: 'Mobile-First Mindset',
    text: 'Most local visitors open sites on phones first, so I focus on responsive layouts, readable sections, and clear call-to-action buttons.'
  },
  {
    icon: <Clock3 size={18} className="text-emerald-400" />,
    title: 'Fast Response and Useful Delivery',
    text: 'The goal is not just visual design. The page should load fast, explain the business clearly, and help visitors contact you easily.'
  },
  {
    icon: <MapPin size={18} className="text-emerald-400" />,
    title: 'Built for Nepali Clients',
    text: 'I design with local business use cases in mind, including service pages, portfolios, restaurant-style layouts, and practical business websites.'
  }
];

export const Trust: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Why Clients Can Work With Confidence</h2>
        <p className="text-xs md:text-sm text-zinc-400 font-mono">
          [TRUST_LAYER] Clear communication, practical design choices, and a local-first approach for real business websites.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {trustPoints.map((point) => (
          <div
            key={point.title}
            className="rounded-xl border border-zinc-800/60 bg-zinc-950/60 p-5 shadow-lg shadow-black/20"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-2">{point.icon}</div>
              <h3 className="text-sm font-bold text-white">{point.title}</h3>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-zinc-400">{point.text}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-zinc-800/60 bg-zinc-950/60 p-5 text-center shadow-lg shadow-black/20">
        <h3 className="text-base font-bold text-white">Best fit for small businesses, personal brands, restaurants, and startup ideas</h3>
        <p className="mt-2 text-xs leading-relaxed text-zinc-400">
          If you need a modern landing page, a better online presence, or a practical interface for your idea, this portfolio is built to show exactly that kind of work.
        </p>
      </div>
    </div>
  );
};
