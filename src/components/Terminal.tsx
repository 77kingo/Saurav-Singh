import React, { useEffect, useRef, useState } from 'react';
import { Terminal as TerminalIcon, Maximize2, Minimize2, Circle, ArrowRight } from 'lucide-react';
import { COMMANDS_HELP, SKILLS, PROJECTS, SERVICES, BLOGS } from '../data/mockData';

interface HistoryEntry {
  command: string;
  output: React.ReactNode;
  time: string;
}

interface TerminalProps {
  onTriggerSection?: (sectionId: string) => void;
  onThemeChange?: (theme: string) => void;
  coffeeCount: number;
  setCoffeeCount: React.Dispatch<React.SetStateAction<number>>;
}

export const Terminal: React.FC<TerminalProps> = ({
  onTriggerSection,
  onThemeChange,
  coffeeCount,
  setCoffeeCount
}) => {
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      command: '',
      output: (
        <div className="text-zinc-400">
          <pre className="text-emerald-500 font-mono text-xs md:text-sm leading-none mb-4">
{`   _____                            __
  / ___/___ ___  _________ __   __/ /
  \\__ \\/ __ \`/ / / / ___/ / / / / / 
 ___/ / /_/ / /_/ / /  / / /_/ / /  
/____/\\__,_/\\__,_/_/  /_/\\__,_/_/   
`}
          </pre>
          <p className="mb-2"><span className="text-emerald-500 font-bold">Welcome to Saurav Singh&apos;s portfolio terminal</span></p>
          <p className="mb-1">Type <span className="text-amber-400 font-bold">neofetch</span> to view the quick profile snapshot.</p>
          <p className="mb-4">Type <span className="text-amber-400 font-bold">help</span> to view all available commands.</p>
          <hr className="border-zinc-800 my-2" />
        </div>
      ),
      time: new Date().toLocaleTimeString()
    }
  ]);

  const [input, setInput] = useState('');
  const [isMaximized, setIsMaximized] = useState(false);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [terminalTheme, setTerminalTheme] = useState('dark');

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    const parts = trimmed.split(' ');
    const mainCmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    setCommandHistory((prev) => [trimmed, ...prev.filter((c) => c !== trimmed)].slice(0, 50));
    setHistoryIndex(-1);

    let output: React.ReactNode = null;

    switch (mainCmd) {
      case 'help':
        output = (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 my-2">
            {COMMANDS_HELP.map((c, i) => (
              <div key={i} className="flex">
                <span className="text-amber-400 font-mono w-40 shrink-0">{c.cmd}</span>
                <span className="text-zinc-400">{c.desc}</span>
              </div>
            ))}
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'about':
        output = (
          <div className="text-zinc-300 space-y-2 my-2">
            <p><span className="text-emerald-500 font-bold">Bio:</span> I am Saurav Singh, a frontend developer building modern landing pages, portfolio websites, restaurant-style interfaces, and practical web apps.</p>
            <p><span className="text-emerald-500 font-bold">Focus:</span> Clean UI, mobile responsiveness, and websites that fit Nepali businesses and local audiences.</p>
            <p><span className="text-emerald-500 font-bold">Status:</span> Available for freelance website and web app projects.</p>
            <button
              onClick={() => onTriggerSection?.('about')}
              className="mt-2 flex items-center gap-1 text-xs text-amber-400 border border-amber-400/30 px-2 py-1 rounded bg-amber-400/5 hover:bg-amber-400/10 cursor-pointer transition"
            >
              Open Profile Section <ArrowRight size={12} />
            </button>
          </div>
        );
        break;

      case 'neofetch':
        output = (
          <div className="flex flex-col md:flex-row gap-6 font-mono text-sm my-2">
            <pre className="text-emerald-400 font-bold leading-tight hidden md:block">
{`    .--.
   |o_o |
   |:_/ |
  //   \\ \\
 (|     | )
/\'\\_   _/\'\\\\
\\___)=(___/
`}
            </pre>
            <div className="text-zinc-300 space-y-0.5">
              <div className="text-emerald-400 font-bold">sauravsingh@portfolio</div>
              <div>-------------------------</div>
              <div><span className="text-amber-400 font-bold">Role</span>: Frontend Developer</div>
              <div><span className="text-amber-400 font-bold">Focus</span>: Websites and web apps for Nepali clients</div>
              <div><span className="text-amber-400 font-bold">Stack</span>: React, JavaScript, Tailwind CSS, Node.js</div>
              <div><span className="text-amber-400 font-bold">Projects</span>: Travel, food, music, quiz, agriculture, and service apps</div>
              <div><span className="text-amber-400 font-bold">Coffee</span>: {coffeeCount} cups consumed</div>
              <div><span className="text-amber-400 font-bold">Status</span>: Building useful, clean, local-friendly interfaces</div>
            </div>
          </div>
        );
        break;

      case 'skills':
        output = (
          <div className="space-y-3 my-2 font-mono">
            {['Frontend', 'Backend', 'DevOps', 'AI & Data'].map((cat) => {
              const catSkills = SKILLS.filter((s) => s.category === cat);
              return (
                <div key={cat} className="space-y-1">
                  <div className="text-emerald-400 font-bold text-sm">[{cat.toUpperCase()}]</div>
                  {catSkills.map((s, i) => {
                    const barsCount = Math.floor(s.level / 10);
                    const filledBars = '█'.repeat(barsCount);
                    const emptyBars = '░'.repeat(10 - barsCount);
                    return (
                      <div key={i} className="flex flex-col sm:flex-row sm:items-center text-xs text-zinc-300">
                        <span className="w-40 shrink-0 text-zinc-400">{s.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-600 font-bold">[{filledBars}{emptyBars}]</span>
                          <span className="text-zinc-500 w-8 text-right">{s.level}%</span>
                          <span className="text-zinc-500 hidden md:inline ml-2">// {s.experience}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
            <button
              onClick={() => onTriggerSection?.('skills')}
              className="mt-2 flex items-center gap-1 text-xs text-amber-400 border border-amber-400/30 px-2 py-1 rounded bg-amber-400/5 hover:bg-amber-400/10 cursor-pointer transition font-sans"
            >
              Explore Stack Section <ArrowRight size={12} />
            </button>
          </div>
        );
        break;

      case 'projects':
        if (args.length > 0 && args[0] === 'open') {
          const projId = args[1];
          const project = PROJECTS.find((p) => p.id === projId || p.title.toLowerCase() === projId?.toLowerCase());
          if (project) {
            output = (
              <div className="text-zinc-300 my-2 font-mono">
                <p className="text-emerald-400 font-bold">Opening {project.title} in the project viewer...</p>
                <p>Jumping to the featured projects section.</p>
              </div>
            );
            setTimeout(() => {
              onTriggerSection?.(`project-${project.id}`);
            }, 500);
          } else {
            output = <div className="text-rose-400 font-mono my-1">Error: project not found.</div>;
          }
        } else {
          output = (
            <div className="space-y-2 my-2 font-mono">
              <div className="text-emerald-400 font-bold">Portfolio Projects:</div>
              <table className="text-xs w-full max-w-2xl border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 text-left text-zinc-500">
                    <th className="pb-1 w-28">ID</th>
                    <th className="pb-1 w-32">Title</th>
                    <th className="pb-1">Stack</th>
                    <th className="pb-1 text-right w-20">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {PROJECTS.map((p, i) => (
                    <tr key={i} className="hover:bg-zinc-900/40">
                      <td className="py-1 text-amber-400 font-bold">{p.id}</td>
                      <td className="py-1 text-zinc-200">{p.title}</td>
                      <td className="py-1 text-zinc-400">{p.tags.slice(0, 3).join(', ')}</td>
                      <td className="py-1 text-zinc-300 text-right">{p.stars}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="text-zinc-500 text-xs mt-2">
                Type <span className="text-amber-400">projects open [id]</span> to inspect one project.
              </div>
              <button
                onClick={() => onTriggerSection?.('projects')}
                className="mt-2 flex items-center gap-1 text-xs text-amber-400 border border-amber-400/30 px-2 py-1 rounded bg-amber-400/5 hover:bg-amber-400/10 cursor-pointer transition font-sans"
              >
                Go to Projects Section <ArrowRight size={12} />
              </button>
            </div>
          );
        }
        break;

      case 'services':
        output = (
          <div className="space-y-4 my-2 font-mono">
            <div className="text-emerald-400 font-bold">Current Services:</div>
            {SERVICES.map((s, i) => (
              <div key={i} className="border-l-2 border-zinc-700 pl-3 py-0.5 space-y-1 text-xs">
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <span className="text-amber-400 font-bold text-sm">{s.title}</span>
                  <span className="text-emerald-400 font-bold font-sans text-sm">{s.price} <span className="text-zinc-500 text-xs font-mono">{s.period}</span></span>
                </div>
                <div className="text-zinc-400 text-xs">{s.description}</div>
              </div>
            ))}
            <button
              onClick={() => onTriggerSection?.('services')}
              className="mt-1 flex items-center gap-1 text-xs text-amber-400 border border-amber-400/30 px-2 py-1 rounded bg-amber-400/5 hover:bg-amber-400/10 cursor-pointer transition font-sans"
            >
              Open Services Section <ArrowRight size={12} />
            </button>
          </div>
        );
        break;

      case 'blog':
        output = (
          <div className="space-y-2 my-2 font-mono">
            <div className="text-emerald-400 font-bold">Notes and Case Studies:</div>
            {BLOGS.map((b, i) => (
              <div key={i} className="flex flex-col text-xs text-zinc-300 border-b border-zinc-800/50 pb-2">
                <div className="flex justify-between items-center">
                  <span className="text-amber-400 font-bold font-sans text-sm hover:underline cursor-pointer" onClick={() => onTriggerSection?.('blog')}>
                    {b.title}
                  </span>
                  <span className="text-zinc-500 text-2xs">{b.date}</span>
                </div>
                <div className="text-zinc-400 mt-1">{b.excerpt}</div>
              </div>
            ))}
            <button
              onClick={() => onTriggerSection?.('blog')}
              className="mt-2 flex items-center gap-1 text-xs text-amber-400 border border-amber-400/30 px-2 py-1 rounded bg-amber-400/5 hover:bg-amber-400/10 cursor-pointer transition font-sans"
            >
              Open Notes Section <ArrowRight size={12} />
            </button>
          </div>
        );
        break;

      case 'contact':
        output = (
          <div className="text-zinc-300 font-mono space-y-1 my-2 text-sm">
            <div><span className="text-amber-400 font-bold">NAME:</span> Saurav Singh</div>
            <div><span className="text-amber-400 font-bold">FOCUS:</span> Websites and web apps for Nepali clients</div>
            <div><span className="text-amber-400 font-bold">PHONE:</span> 9840742866</div>
            <div><span className="text-amber-400 font-bold">EMAIL:</span> singhsaurav8899@gmail.com</div>
            <p className="text-xs text-zinc-500 pt-2">You can contact directly by phone or email, or use the portfolio contact section below.</p>
            <button
              onClick={() => onTriggerSection?.('contact')}
              className="mt-2 flex items-center gap-1 text-xs text-amber-400 border border-amber-400/30 px-2 py-1 rounded bg-amber-400/5 hover:bg-amber-400/10 cursor-pointer transition font-sans"
            >
              Scroll to Contact Section <ArrowRight size={12} />
            </button>
          </div>
        );
        break;

      case 'coffee':
        setCoffeeCount((prev) => prev + 1);
        output = (
          <div className="text-zinc-300 font-mono my-2 animate-bounce">
            ☕ <span className="text-emerald-400 font-bold">Energy boosted.</span> Coffee count is now <span className="text-amber-400 font-bold">{coffeeCount + 1}</span>.
          </div>
        );
        break;

      case 'hack':
        output = (
          <div className="text-emerald-500 font-mono my-2 animate-pulse space-y-1 text-xs">
            <div>[INIT] scanning design inspiration buffer...</div>
            <div>[OK] responsive layout unlocked...</div>
            <div>[OK] CTA visibility increased...</div>
            <div>[SUCCESS] local-first portfolio mode enabled...</div>
          </div>
        );
        break;

      case 'theme':
        if (args.length > 0) {
          const newTheme = args[0].toLowerCase();
          if (['dark', 'matrix', 'cyberpunk', 'cyber'].includes(newTheme)) {
            const mappedTheme = newTheme === 'cyber' ? 'cyberpunk' : newTheme;
            setTerminalTheme(mappedTheme);
            onThemeChange?.(mappedTheme);
            output = (
              <div className="text-emerald-400 font-mono my-2 text-xs">
                [OK] Terminal style switched to <span className="text-amber-400 font-bold">{mappedTheme}</span>.
              </div>
            );
          } else {
            output = (
              <div className="text-rose-400 font-mono my-2 text-xs">
                [ERROR] Theme not found. Available: dark, matrix, cyberpunk
              </div>
            );
          }
        } else {
          output = (
            <div className="text-zinc-300 font-mono my-2 text-xs">
              Current theme: <span className="text-amber-400">{terminalTheme}</span>. Usage: <span className="text-emerald-400 font-bold">theme [dark|matrix|cyberpunk]</span>
            </div>
          );
        }
        break;

      default:
        output = (
          <div className="text-rose-400 font-mono my-1 text-xs">
            command not found: <span className="text-zinc-200 font-bold">{mainCmd}</span>. Type <span className="text-amber-400 font-bold">help</span>.
          </div>
        );
    }

    setHistory((prev) => [
      ...prev,
      {
        command: trimmed,
        output,
        time: new Date().toLocaleTimeString()
      }
    ]);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < commandHistory.length) {
          setHistoryIndex(nextIndex);
          setInput(commandHistory[nextIndex]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const trimmedInput = input.trim().toLowerCase();
      if (!trimmedInput) return;

      const match = COMMANDS_HELP.find((c) => c.cmd.startsWith(trimmedInput));
      if (match) {
        setInput(match.cmd === 'theme [dark|matrix|cyber]' ? 'theme ' : match.cmd);
      }
    }
  };

  const themeStyles = {
    dark: {
      bg: 'bg-zinc-950/95 border-zinc-800',
      text: 'text-zinc-300 font-mono',
      prompt: 'text-emerald-500',
      caret: 'bg-emerald-500'
    },
    matrix: {
      bg: 'bg-black border-emerald-900/40 shadow-[0_0_15px_rgba(16,185,129,0.1)]',
      text: 'text-emerald-400 font-mono',
      prompt: 'text-emerald-400 font-bold',
      caret: 'bg-emerald-400 shadow-[0_0_5px_rgba(16,185,129,0.8)]'
    },
    cyberpunk: {
      bg: 'bg-slate-950/95 border-pink-500/30 shadow-[0_0_20px_rgba(236,72,153,0.15)]',
      text: 'text-cyan-300 font-mono',
      prompt: 'text-pink-500 font-bold',
      caret: 'bg-pink-500 animate-pulse'
    }
  }[terminalTheme as 'dark' | 'matrix' | 'cyberpunk'];

  return (
    <div
      className={`w-full rounded-lg border flex flex-col transition-all duration-300 overflow-hidden ${themeStyles.bg} ${
        isMaximized ? 'fixed inset-4 z-50 h-[calc(100vh-2rem)]' : 'h-[500px] shadow-xl shadow-black/40'
      }`}
      onClick={handleTerminalClick}
    >
      <div
        className={`flex items-center justify-between px-4 py-2 bg-zinc-900/80 border-b border-zinc-800 select-none ${
          terminalTheme === 'matrix' ? 'bg-black border-emerald-900/40' : ''
        } ${terminalTheme === 'cyberpunk' ? 'bg-slate-900/80 border-pink-500/20' : ''}`}
      >
        <div className="flex items-center gap-2">
          <Circle size={12} className="fill-rose-500 text-rose-500 border-none" />
          <Circle size={12} className="fill-amber-500 text-amber-500 border-none" />
          <Circle size={12} className="fill-emerald-500 text-emerald-500 border-none" />
          <div className="flex items-center gap-2 ml-4 text-xs font-mono text-zinc-400">
            <TerminalIcon size={14} className={themeStyles.prompt} />
            <span>sauravsingh@portfolio:~</span>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsMaximized(!isMaximized);
          }}
          className="text-zinc-400 hover:text-zinc-200 p-1 rounded hover:bg-zinc-800/50 cursor-pointer"
        >
          {isMaximized ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
        </button>
      </div>

      <div className={`flex-1 p-4 overflow-y-auto custom-scrollbar ${themeStyles.text} text-xs md:text-sm`}>
        {history.map((h, i) => (
          <div key={i} className="mb-3">
            {h.command && (
              <div className="flex items-center gap-2 font-mono font-bold mb-1">
                <span className={themeStyles.prompt}>saurav@dev:~$</span>
                <span className={terminalTheme === 'cyberpunk' ? 'text-pink-400' : 'text-zinc-100'}>{h.command}</span>
                <span className="text-2xs font-normal text-zinc-600 font-sans ml-auto">{h.time}</span>
              </div>
            )}
            <div>{h.output}</div>
          </div>
        ))}

        <div className="flex items-center gap-2 font-mono font-bold mb-1">
          <span className={themeStyles.prompt}>saurav@dev:~$</span>
          <div className="flex-1 flex items-center relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full bg-transparent border-none outline-none text-zinc-100 p-0 shadow-none focus:ring-0 font-mono caret-transparent select-text"
              autoFocus
              autoCapitalize="none"
              autoComplete="off"
              spellCheck={false}
            />
            <div
              className={`absolute h-4 w-2 ${themeStyles.caret} ${!input && 'animate-pulse'}`}
              style={{
                left: `${input.length * 0.55}rem`,
                maxWidth: '100%',
                display: document.activeElement === inputRef.current ? 'block' : 'none'
              }}
            />
          </div>
        </div>
        <div ref={bottomRef} />
      </div>

      <div
        className={`px-4 py-1.5 bg-zinc-900/40 border-t border-zinc-800/40 text-2xs text-zinc-500 font-mono flex flex-wrap gap-x-4 gap-y-1 ${
          terminalTheme === 'matrix' ? 'border-emerald-900/30' : ''
        } ${terminalTheme === 'cyberpunk' ? 'border-pink-500/20' : ''}`}
      >
        <span>TAB: autocomplete</span>
        <span>↑↓: history</span>
        <span>"clear": empty screen</span>
        <span className="ml-auto text-zinc-600 hidden md:inline">Portfolio mode // local-first</span>
      </div>
    </div>
  );
};
