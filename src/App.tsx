import { useState, useEffect } from 'react';
import { Terminal } from './components/Terminal';
import { Dashboard } from './components/Dashboard';
import { MockIDE } from './components/MockIDE';
import { Services } from './components/Services';
import { Blog } from './components/Blog';
import { Contact } from './components/Contact';
import { Trust } from './components/Trust';
import { Process } from './components/Process';
import { PROJECTS, SKILLS, Project } from './data/mockData';
import { 
  Code2, 
  User, 
  Terminal as TerminalIcon, 
  Database, 
  Cpu, 
  Heart, 
  Briefcase, 
  Rss,
  Mail,
  Activity,
  Award
} from 'lucide-react';

export default function App() {
  const [coffeeCount, setCoffeeCount] = useState(42);
  const [selectedProject, setSelectedProject] = useState<Project>(PROJECTS[0]);
  const [activeTheme, setActiveTheme] = useState('dark');
  const [activeSection, setActiveSection] = useState('home');

  // Listen to scrolling to update active nav link
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'skills', 'services', 'blog', 'contact'];
      const scrollPos = window.scrollY + 120;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTriggerSection = (id: string) => {
    if (id.startsWith('project-')) {
      const projId = id.replace('project-', '');
      const found = PROJECTS.find(p => p.id === projId);
      if (found) {
        setSelectedProject(found);
      }
      const el = document.getElementById('projects');
      if (el) {
        window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
      }
    } else {
      const el = document.getElementById(id);
      if (el) {
        window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
      }
    }
  };

  const handleThemeChange = (newTheme: string) => {
    setActiveTheme(newTheme);
    // You could inject global variables or classes here if you want
    // for a fully themed site experience!
  };

  // Matrix Rain Effect for Matrix Theme
  useEffect(() => {
    if (activeTheme !== 'matrix') return;

    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-bg';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.zIndex = '-1';
    canvas.style.opacity = '0.08';
    canvas.style.pointerEvents = 'none';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const columns = Math.floor(width / 20);
    const yPositions = Array(columns).fill(0);

    const matrixEffect = () => {
      if (!ctx) return;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#10b981'; // emerald-500
      ctx.font = '15px monospace';

      for (let i = 0; i < yPositions.length; i++) {
        const text = String.fromCharCode(3e4 + Math.random() * 33);
        const x = i * 20;
        const y = yPositions[i];

        ctx.fillText(text, x, y);

        if (y > 100 + Math.random() * 10000) {
          yPositions[i] = 0;
        } else {
          yPositions[i] += 20;
        }
      }
    };

    const interval = setInterval(matrixEffect, 50);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
      const el = document.getElementById('matrix-bg');
      if (el) el.remove();
    };
  }, [activeTheme]);

  // Dynamic Theme Styling
  const bgStyle = {
    dark: 'bg-black text-zinc-300 select-none selection:bg-emerald-500 selection:text-black',
    matrix: 'bg-black text-emerald-400 select-none selection:bg-emerald-500 selection:text-black font-mono',
    cyberpunk: 'bg-slate-950 text-cyan-300 select-none selection:bg-pink-500 selection:text-white'
  }[activeTheme as 'dark' | 'matrix' | 'cyberpunk'] || 'bg-black text-zinc-300';

  const accentColor = {
    dark: 'text-emerald-400',
    matrix: 'text-emerald-400 font-bold',
    cyberpunk: 'text-pink-500'
  }[activeTheme as 'dark' | 'matrix' | 'cyberpunk'] || 'text-emerald-400';

  const accentBorder = {
    dark: 'border-emerald-500/30 bg-emerald-500/5',
    matrix: 'border-emerald-500 bg-black shadow-[0_0_10px_rgba(16,185,129,0.15)]',
    cyberpunk: 'border-pink-500/40 bg-pink-500/5 shadow-[0_0_15px_rgba(236,72,153,0.1)]'
  }[activeTheme as 'dark' | 'matrix' | 'cyberpunk'] || 'border-emerald-500/30';

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans leading-relaxed flex flex-col ${bgStyle}`}>
      {/* Cyberpunk grid overlay */}
      {activeTheme === 'cyberpunk' && (
        <div 
          className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" 
          style={{
            backgroundImage: 'linear-gradient(rgba(236, 72, 153, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(236, 72, 153, 0.3) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        />
      )}

      {/* Floating Navbar */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-4xl bg-zinc-950/80 border border-zinc-800 backdrop-blur-md rounded-2xl px-4 py-2 flex items-center justify-between shadow-xl shadow-black/40">
        <div 
          onClick={() => handleTriggerSection('home')} 
          className="flex items-center gap-1.5 font-mono cursor-pointer group"
        >
          <Code2 size={18} className={accentColor} />
          <span className="text-white font-bold text-xs tracking-tight">SAURAV<span className={accentColor}>SINGH</span></span>
          <span className="text-2xs text-zinc-600 bg-zinc-900 border border-zinc-800 px-1 py-0.5 rounded ml-1 font-normal select-none">
            {activeTheme === 'dark' && 'v2.6'}
            {activeTheme === 'matrix' && 'MTX'}
            {activeTheme === 'cyberpunk' && 'NEON'}
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-1 font-mono text-xs">
          {[
            { id: 'about', label: 'Profile', icon: <Activity size={12} /> },
            { id: 'projects', label: 'Projects', icon: <Database size={12} /> },
            { id: 'skills', label: 'Stack', icon: <Cpu size={12} /> },
            { id: 'services', label: 'Services', icon: <Briefcase size={12} /> },
            { id: 'blog', label: 'Notes', icon: <Rss size={12} /> },
            { id: 'contact', label: 'Contact', icon: <Mail size={12} /> }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => handleTriggerSection(item.id)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg cursor-pointer transition-all border ${
                activeSection === item.id 
                  ? `bg-zinc-900 text-white ${accentBorder} font-bold` 
                  : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900/50 border-transparent'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <button 
          onClick={() => handleTriggerSection('contact')}
          className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold font-mono text-2xs rounded-xl shadow-lg shadow-emerald-500/10 cursor-pointer transition-all flex items-center gap-1 md:hidden"
        >
          <Mail size={12} /> <span>Contact</span>
        </button>
      </header>

      {/* Hero Section */}
      <section id="home" className="pt-28 pb-12 px-4 md:px-6 max-w-5xl mx-auto flex flex-col items-center flex-1 w-full gap-8">
        <div className="w-full flex flex-col lg:flex-row items-center gap-10 mt-6 lg:mt-12">
          {/* Left Text Intro */}
          <div className="flex-1 space-y-4 text-center lg:text-left">
            <div className={`inline-flex items-center gap-1.5 border px-3 py-1 rounded-full text-3xs font-mono font-bold tracking-wide uppercase ${accentBorder}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className={accentColor}>Frontend Developer for the Nepali Market</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black font-sans tracking-tight text-white leading-tight">
              I build modern websites and web apps that feel clear, fast, and useful for Nepali businesses.
            </h1>

            <p className="text-xs md:text-sm text-zinc-400 max-w-xl font-mono leading-relaxed mx-auto lg:mx-0">
              I am <span className="text-zinc-200">Saurav Singh</span>, a developer focused on responsive landing pages, portfolio sites, restaurant-style interfaces, and practical web apps. I design with local users in mind, especially for the Nepali market.
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2 font-mono text-xs">
              <button 
                onClick={() => handleTriggerSection('services')}
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl shadow-xl shadow-emerald-500/10 cursor-pointer transition flex items-center gap-2"
              >
                <Briefcase size={14} /> View Services
              </button>
              <a
                href="tel:9840742866"
                className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 rounded-xl cursor-pointer transition flex items-center gap-2"
              >
                <Mail size={14} className={accentColor} /> Call 9840742866
              </a>
              <button 
                onClick={() => handleTriggerSection('about')}
                className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 text-zinc-300 rounded-xl cursor-pointer transition flex items-center gap-2"
              >
                <TerminalIcon size={14} className={accentColor} /> View Profile
              </button>
            </div>
          </div>

          {/* Right Interactive Terminal */}
          <div className="w-full lg:w-[480px] shrink-0">
            <Terminal 
              onTriggerSection={handleTriggerSection}
              onThemeChange={handleThemeChange}
              coffeeCount={coffeeCount}
              setCoffeeCount={setCoffeeCount}
            />
          </div>
        </div>
      </section>

      {/* Main Sections Wrapper */}
      <main className="w-full max-w-5xl mx-auto px-4 md:px-6 space-y-24 pb-20">
        
        {/* Section: Dashboard (About) */}
        <section id="about" className="pt-8 scroll-mt-20 space-y-6">
          <div className="flex flex-col md:flex-row md:items-baseline gap-2 mb-2">
            <div className="flex items-center gap-2">
              <Activity size={18} className={accentColor} />
              <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">Developer Snapshot</h2>
            </div>
            <p className="text-2xs md:text-xs text-zinc-500 font-mono">
              [PROFILE_PANEL] Skills, working style, activity indicators, and portfolio context.
            </p>
          </div>
          <Dashboard coffeeCount={coffeeCount} />
        </section>

        {/* Section: Projects (IDE) */}
        <section id="projects" className="pt-8 scroll-mt-20 space-y-6">
          <div className="flex items-baseline justify-between mb-2">
            <div>
              <div className="flex items-center gap-2">
                <Database size={18} className={accentColor} />
                <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">Featured Projects</h2>
              </div>
              <p className="text-2xs md:text-xs text-zinc-500 font-mono mt-0.5">
                [PROJECT_BUFFER] Browse real portfolio work and open each project inside the virtual preview workspace.
              </p>
            </div>

            {/* Visual selectors for projects */}
            <div className="hidden sm:flex items-center gap-2 font-mono text-3xs select-none">
              {PROJECTS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedProject(p)}
                  className={`px-2 py-1 border rounded cursor-pointer transition ${
                    selectedProject.id === p.id 
                      ? 'bg-zinc-900 text-white font-bold border-emerald-500/40' 
                      : 'bg-transparent border-zinc-800 text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {p.title}
                </button>
              ))}
            </div>
          </div>

          <div className="sm:hidden mb-4">
            <select 
              value={selectedProject.id}
              onChange={(e) => {
                const found = PROJECTS.find(p => p.id === e.target.value);
                if (found) setSelectedProject(found);
              }}
              className="w-full bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-lg text-xs py-2 px-3 focus:outline-none font-mono"
            >
              {PROJECTS.map(p => (
                <option key={p.id} value={p.id}>{p.title}</option>
              ))}
            </select>
          </div>

          <MockIDE project={selectedProject} />
        </section>

        {/* Section: Skills (Stack) */}
        <section id="skills" className="pt-8 scroll-mt-20 space-y-6">
          <div className="flex flex-col md:flex-row md:items-baseline gap-2 mb-4">
            <div className="flex items-center gap-2">
              <Cpu size={18} className={accentColor} />
              <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">Tools I Use</h2>
            </div>
            <p className="text-2xs md:text-xs text-zinc-500 font-mono">
              [CAPABILITIES_REGISTRY] Frontend, backend, deployment, and content-focused strengths.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {['Frontend', 'Backend', 'DevOps', 'AI & Data'].map((cat) => {
              const catSkills = SKILLS.filter(s => s.category === cat);
              return (
                <div key={cat} className="bg-zinc-950/60 border border-zinc-800/60 rounded-xl p-4 shadow-lg shadow-black/10">
                  <h3 className={`text-xs font-mono font-bold uppercase border-b border-zinc-900 pb-2 mb-3 tracking-wider flex items-center justify-between ${accentColor}`}>
                    <span>[{cat}]</span>
                    <span className="text-5xs bg-zinc-900 border border-zinc-800 px-1 py-0.5 rounded text-zinc-500 font-normal">
                      {catSkills.length} PACKAGES
                    </span>
                  </h3>
                  <div className="space-y-3 font-mono text-2xs">
                    {catSkills.map((s, i) => (
                      <div key={i} className="space-y-1">
                        <div className="flex justify-between text-zinc-300">
                          <span className="font-bold">{s.name}</span>
                          <span className="text-zinc-500 text-3xs">{s.experience}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-zinc-900 h-1.5 border border-zinc-800/60 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-1000 ${
                                activeTheme === 'cyberpunk' ? 'bg-pink-500' : 'bg-emerald-500'
                              }`}
                              style={{ width: `${s.level}%` }}
                            />
                          </div>
                          <span className="w-5 text-right text-3xs text-zinc-400 font-bold">{s.level}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-zinc-950/60 border border-zinc-800/60 rounded-xl px-4 py-3 flex items-center justify-between font-mono text-3xs text-zinc-500 select-none">
            <span className="flex items-center gap-1"><Award size={12} className="text-amber-400" /> Built for practical client work, clean UI, and responsive experiences.</span>
            <span className="hidden sm:inline">Focus: Local-friendly design // Mobile-first thinking</span>
          </div>
        </section>

        {/* Section: Services (Pricing) */}
        <section id="services" className="pt-8 scroll-mt-20">
          <Services onContactClick={() => handleTriggerSection('contact')} />
        </section>

        <section id="process" className="pt-8 scroll-mt-20">
          <Process />
        </section>

        <section id="trust" className="pt-8 scroll-mt-20">
          <Trust />
        </section>

        {/* Section: Blog (Notes) */}
        <section id="blog" className="pt-8 scroll-mt-20 space-y-6">
          <div className="flex flex-col md:flex-row md:items-baseline gap-2 mb-2">
            <div className="flex items-center gap-2">
              <Rss size={18} className={accentColor} />
              <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">Notes & Case Studies</h2>
            </div>
            <p className="text-2xs md:text-xs text-zinc-500 font-mono">
              [INSIGHTS_FS] Short writeups about local-friendly websites, project thinking, and product design choices.
            </p>
          </div>
          <Blog />
        </section>

        {/* Section: Contact (Hire) */}
        <section id="contact" className="pt-8 scroll-mt-20 space-y-6">
          <div className="flex flex-col md:flex-row md:items-baseline gap-2 mb-2">
            <div className="flex items-center gap-2">
              <User size={18} className={accentColor} />
              <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">Let&apos;s Build Something Useful</h2>
            </div>
            <p className="text-2xs md:text-xs text-zinc-500 font-mono">
              [CONTACT_GATE] Share your business idea, landing page need, or app requirement and we can shape it from there.
            </p>
          </div>
          <Contact />
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-zinc-950 border-t border-zinc-900 font-mono text-3xs text-zinc-600 py-12 px-4 select-none">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            <Code2 size={12} className={accentColor} />
            <span className="text-zinc-400 font-bold">Saurav Singh</span>
            <span>// frontend developer building for Nepal-first audiences</span>
          </div>
          
          <div className="flex items-center gap-4 text-2xs">
            <a href="https://77kingo.github.io/travel_landing/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition cursor-pointer" title="Travel Landing">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a href="https://kingo-hamrokhet.lovestoblog.com/?i=1" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition cursor-pointer" title="Hamro Khet">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </a>
            <a href="https://janseva-tzex.onrender.com/" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 transition cursor-pointer" title="Janseva">
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
            </a>
          </div>

          <div className="flex flex-col md:items-end text-3xs">
            <div>Built with <Heart size={10} className="inline text-rose-500 mx-0.5" /> in React, Vite, and Tailwind CSS</div>
            <div className="text-zinc-500 mt-0.5">
              <a href="tel:9840742866" className="hover:text-emerald-400 transition">Phone: 9840742866</a>
              <span> // </span>
              <a href="mailto:singhsaurav8899@gmail.com" className="hover:text-emerald-400 transition">Email: singhsaurav8899@gmail.com</a>
            </div>
            <div className="text-zinc-700 mt-0.5">© 2026 Saurav Singh. Portfolio tailored for modern Nepali web clients.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
