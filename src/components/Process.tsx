import React from 'react';
import { FileText, LayoutTemplate, Rocket, MessagesSquare } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Discuss the Goal',
    text: 'You tell me what kind of website or app you need, who it is for, and what result you want from it.',
    icon: <MessagesSquare size={18} className="text-emerald-400" />
  },
  {
    number: '02',
    title: 'Plan the Structure',
    text: 'I organize the layout, sections, user flow, and content direction so the project solves a clear business need.',
    icon: <FileText size={18} className="text-emerald-400" />
  },
  {
    number: '03',
    title: 'Design and Build',
    text: 'I create the responsive frontend, improve the visual structure, and make sure the experience works well across devices.',
    icon: <LayoutTemplate size={18} className="text-emerald-400" />
  },
  {
    number: '04',
    title: 'Review and Launch',
    text: 'We review the final result, adjust details if needed, and deploy the project so it is ready to share with real users.',
    icon: <Rocket size={18} className="text-emerald-400" />
  }
];

export const Process: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">How I Work</h2>
        <p className="text-xs md:text-sm text-zinc-400 font-mono">
          [PROJECT_FLOW] A simple process from idea to launch, designed to keep communication clear and the result practical.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {steps.map((step) => (
          <div
            key={step.number}
            className="rounded-xl border border-zinc-800/60 bg-zinc-950/60 p-5 shadow-lg shadow-black/20"
          >
            <div className="flex items-center justify-between">
              <span className="text-lg font-black text-zinc-700">{step.number}</span>
              <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-2">{step.icon}</div>
            </div>
            <h3 className="mt-4 text-sm font-bold text-white">{step.title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-zinc-400">{step.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
