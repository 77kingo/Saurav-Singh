import React, { useEffect, useState } from 'react';
import { Cpu, Zap, GitCommit, Clock, Coffee, Terminal, CheckCircle, Flame, Globe, RefreshCw } from 'lucide-react';

interface DashboardProps {
  coffeeCount: number;
}

export const Dashboard: React.FC<DashboardProps> = ({ coffeeCount }) => {
  const [uptime, setUptime] = useState({ hours: 8, mins: 14, secs: 9 });
  const [cpuUsage, setCpuUsage] = useState(31);
  const [memoryUsage, setMemoryUsage] = useState(44);
  const [activeWorkspace, setActiveWorkspace] = useState('src/projects/hamro-khet.tsx');
  const [recentLogs, setRecentLogs] = useState<string[]>([
    '[08:20:12] ui: refining hero copy for local business visitors...',
    '[09:04:28] client: updated project cards for restaurant-style layout...',
    '[10:11:45] deploy: preview build completed successfully...',
    '[11:27:16] review: checking responsive spacing for mobile users...'
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setUptime((prev) => {
        let s = prev.secs + 1;
        let m = prev.mins;
        let h = prev.hours;

        if (s >= 60) {
          s = 0;
          m += 1;
        }
        if (m >= 60) {
          m = 0;
          h += 1;
        }
        return { hours: h, mins: m, secs: s };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCpuUsage(Math.floor(22 + Math.random() * 24));
      setMemoryUsage(Math.floor(38 + Math.random() * 14));
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const tasks = [
      'crafting CTA sections for inquiry-driven pages...',
      'testing layout breakpoints on mobile viewport...',
      'updating cards for tourism and food businesses...',
      'polishing frontend interactions for smooth scrolling...',
      'reviewing copy to match Nepali client needs...',
      'organizing project showcase content and tags...',
      'preparing forms for practical local service websites...',
      'improving readability for first-time visitors...'
    ];

    const files = [
      'src/projects/travel-landing.tsx',
      'src/projects/foodie-app.tsx',
      'src/projects/quiz-app.tsx',
      'src/projects/hamro-khet.tsx',
      'src/projects/janseva-dashboard.tsx',
      'src/components/contact-form.tsx'
    ];

    const timer = setInterval(() => {
      const timeStr = new Date().toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
      const randomTask = tasks[Math.floor(Math.random() * tasks.length)];
      setRecentLogs((prev) => [...prev.slice(1), `[${timeStr}] builder: ${randomTask}`]);
      setActiveWorkspace(files[Math.floor(Math.random() * files.length)]);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const generateContributionGrid = () => {
    const weeks = 53;
    const days = 7;
    const grid: number[][] = [];

    for (let i = 0; i < weeks; i++) {
      const week: number[] = [];
      for (let j = 0; j < days; j++) {
        const base = Math.random();
        let commits = 0;
        if (base > 0.88) commits = 3;
        else if (base > 0.6) commits = 2;
        else if (base > 0.25) commits = 1;
        week.push(commits);
      }
      grid.push(week);
    }

    return grid;
  };

  const contributionGrid = generateContributionGrid();

  const getCommitColor = (level: number) => {
    switch (level) {
      case 3:
        return 'bg-emerald-400';
      case 2:
        return 'bg-emerald-500/70';
      case 1:
        return 'bg-emerald-600/30';
      default:
        return 'bg-zinc-900 border border-zinc-800/20';
    }
  };

  return (
    <div className="w-full space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-zinc-950 border border-zinc-800/60 rounded-xl p-4 flex items-center justify-between shadow-lg shadow-black/20">
          <div>
            <div className="text-2xs font-mono text-zinc-500 font-bold uppercase tracking-wider">Daily Focus</div>
            <div className="text-sm md:text-base font-mono font-bold text-zinc-100 mt-1">
              {uptime.hours}h {uptime.mins}m {uptime.secs}s
            </div>
            <div className="text-3xs text-emerald-500 font-mono flex items-center gap-1 mt-1">
              <CheckCircle size={10} /> Active build session
            </div>
          </div>
          <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-emerald-400">
            <Clock size={20} className="animate-spin-slow" />
          </div>
        </div>

        <div className="bg-zinc-950 border border-zinc-800/60 rounded-xl p-4 flex items-center justify-between shadow-lg shadow-black/20">
          <div>
            <div className="text-2xs font-mono text-zinc-500 font-bold uppercase tracking-wider">Builder Energy</div>
            <div className="text-sm md:text-base font-mono font-bold text-zinc-100 mt-1">
              {coffeeCount} Cups
            </div>
            <div className="text-3xs text-amber-500 font-mono flex items-center gap-1 mt-1">
              <Flame size={10} /> Shipping mode
            </div>
          </div>
          <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-amber-400">
            <Coffee size={20} />
          </div>
        </div>

        <div className="bg-zinc-950 border border-zinc-800/60 rounded-xl p-4 flex items-center justify-between shadow-lg shadow-black/20">
          <div>
            <div className="text-2xs font-mono text-zinc-500 font-bold uppercase tracking-wider">UI Workload</div>
            <div className="text-sm md:text-base font-mono font-bold text-zinc-100 mt-1">
              {cpuUsage}% Load
            </div>
            <div className="w-24 bg-zinc-900 h-1.5 rounded-full mt-1.5 overflow-hidden border border-zinc-800">
              <div className="bg-emerald-500 h-full transition-all duration-1000" style={{ width: `${cpuUsage}%` }} />
            </div>
          </div>
          <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-cyan-400">
            <Cpu size={20} />
          </div>
        </div>

        <div className="bg-zinc-950 border border-zinc-800/60 rounded-xl p-4 flex items-center justify-between shadow-lg shadow-black/20">
          <div>
            <div className="text-2xs font-mono text-zinc-500 font-bold uppercase tracking-wider">Project Buffer</div>
            <div className="text-sm md:text-base font-mono font-bold text-zinc-100 mt-1">
              {memoryUsage}% Filled
            </div>
            <div className="w-24 bg-zinc-900 h-1.5 rounded-full mt-1.5 overflow-hidden border border-zinc-800">
              <div className="bg-sky-500 h-full transition-all duration-1000" style={{ width: `${memoryUsage}%` }} />
            </div>
          </div>
          <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sky-400">
            <Zap size={20} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-zinc-950 border border-zinc-800/60 rounded-xl p-4 lg:col-span-2 shadow-lg shadow-black/20 flex flex-col">
          <div className="flex items-center justify-between mb-4 border-b border-zinc-900 pb-3">
            <div className="flex items-center gap-2">
              <GitCommit size={16} className="text-emerald-400" />
              <h3 className="text-sm font-mono font-bold text-zinc-200">Consistency Grid</h3>
            </div>
            <div className="flex items-center gap-1 text-4xs text-zinc-500 font-mono">
              <span>Less</span>
              <div className="w-2 h-2 rounded-sm bg-zinc-900 border border-zinc-800" />
              <div className="w-2 h-2 rounded-sm bg-emerald-600/30" />
              <div className="w-2 h-2 rounded-sm bg-emerald-500/70" />
              <div className="w-2 h-2 rounded-sm bg-emerald-400" />
              <span>More</span>
            </div>
          </div>

          <div className="flex-1 overflow-x-auto no-scrollbar py-1 select-none">
            <div className="flex gap-1 h-[72px]">
              {contributionGrid.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-1 w-2 shrink-0">
                  {week.map((commits, di) => (
                    <div
                      key={di}
                      className={`w-2 h-2 rounded-sm transition-colors duration-500 ${getCommitColor(commits)}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 flex items-center justify-between text-4xs text-zinc-500 font-mono border-t border-zinc-900 pt-3">
            <div className="flex gap-8">
              <span>Jan</span>
              <span>Mar</span>
              <span>May</span>
              <span>Jul</span>
              <span>Sep</span>
              <span>Nov</span>
            </div>
            <span className="text-emerald-500 font-bold">Steady portfolio building and iteration</span>
          </div>
        </div>

        <div className="bg-zinc-950 border border-zinc-800/60 rounded-xl p-4 shadow-lg shadow-black/20 flex flex-col h-[180px] lg:h-auto">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-2 mb-3">
            <div className="flex items-center gap-2">
              <Terminal size={14} className="text-emerald-400 animate-pulse" />
              <span className="text-xs font-mono font-bold text-zinc-200">Live Work Log</span>
            </div>
            <RefreshCw size={12} className="text-zinc-600 animate-spin" style={{ animationDuration: '3s' }} />
          </div>

          <div className="flex-1 font-mono text-2xs text-zinc-400 space-y-1.5 overflow-y-auto custom-scrollbar pr-2">
            {recentLogs.map((log, i) => (
              <div key={i} className={i === recentLogs.length - 1 ? 'truncate text-emerald-400 font-bold' : 'truncate'}>
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-zinc-950 border border-zinc-800/40 rounded-xl px-4 py-3 shadow-lg shadow-black/20 flex flex-col md:flex-row items-center gap-4 text-xs font-mono select-none">
        <div className="flex items-center gap-2 text-zinc-400 border-r border-zinc-800/60 pr-4 shrink-0 w-full md:w-auto">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-zinc-200 font-bold uppercase text-2xs tracking-wider">Active Mode:</span>
          <span className="text-zinc-400 text-2xs bg-zinc-900 border border-zinc-800 px-1.5 py-0.5 rounded">
            client-ready frontend
          </span>
        </div>

        <div className="flex items-center gap-2 text-zinc-300 w-full md:w-auto truncate flex-1">
          <span className="text-zinc-500">Workspace:</span>
          <span className="text-amber-400 font-bold truncate">{activeWorkspace}</span>
        </div>

        <div className="flex items-center gap-4 text-zinc-500 w-full md:w-auto border-t md:border-t-0 md:border-l border-zinc-800/60 pt-2 md:pt-0 pl-0 md:pl-4">
          <span className="flex items-center gap-1.5 shrink-0 text-2xs">
            <Globe size={12} className="text-sky-400" />
            <span className="text-zinc-400 font-bold">Market Focus:</span>
            <span className="text-zinc-300">Nepal-first business websites</span>
          </span>
        </div>
      </div>
    </div>
  );
};
