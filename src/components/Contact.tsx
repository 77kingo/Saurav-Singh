import React, { useEffect, useState } from 'react';
import { Send, Terminal, Shield, CheckCircle, ArrowRight, User, Mail, MessageSquare, Briefcase, Phone, ExternalLink } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formType, setFormType] = useState<'standard' | 'ssh'>('standard');
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'landing-page', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [sshLogs, setSshLogs] = useState<string[]>([]);
  const [sshInput, setSshInput] = useState('');

  const subjects = [
    { value: 'landing-page', label: 'Landing Page or Business Website' },
    { value: 'portfolio', label: 'Portfolio / Personal Brand Website' },
    { value: 'restaurant', label: 'Restaurant / Food Website' },
    { value: 'web-app', label: 'Custom Web App or Dashboard' },
    { value: 'other', label: 'Other Project Discussion' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStandardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setFormType('ssh');
    setSshLogs(['[00.00s] init: preparing local inquiry preview for Saurav Singh portfolio...']);

    const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

    await sleep(800);
    setSshLogs((prev) => [...prev, '[00.80s] check: visitor details captured in preview buffer.']);

    await sleep(700);
    setSshLogs((prev) => [...prev, `[01.52s] packet: packaging inquiry for "${formData.name.toLowerCase().replace(/\s+/g, '_')}"...`]);

    await sleep(700);
    setSshLogs((prev) => [...prev, `[02.20s] route: project type tagged as "${formData.subject}"...`]);

    await sleep(900);
    setSshLogs((prev) => [...prev, '[03.10s] done: demo submission completed in UI preview mode.']);

    await sleep(400);
    setSshLogs((prev) => [
      ...prev,
      '--------------------------------------------------------------',
      'SUCCESS: Inquiry preview completed.',
      'Note: Connect a real email or backend service to receive live messages.'
    ]);

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const executeSshCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setSshLogs((prev) => [...prev, `sauravsingh@visitor:~$ ${trimmed}`]);
    const parts = trimmed.split(' ');
    const mainCmd = parts[0].toLowerCase();

    let reply = '';

    switch (mainCmd) {
      case 'help':
        reply = 'Available commands:\n  help              - show this help menu\n  set name [val]    - set your name\n  set email [val]   - set your email\n  set msg [val]     - set your message\n  status            - check message buffers\n  send              - run preview submission\n  clear             - clear screen';
        break;
      case 'clear':
        setSshLogs([]);
        setSshInput('');
        return;
      case 'set': {
        const field = parts[1]?.toLowerCase();
        const value = parts.slice(2).join(' ');
        if (!field || !value) {
          reply = 'Usage: set [name|email|msg] [value]';
        } else if (field === 'name') {
          setFormData((prev) => ({ ...prev, name: value }));
          reply = `[BUFFER] Name set to: "${value}"`;
        } else if (field === 'email') {
          setFormData((prev) => ({ ...prev, email: value }));
          reply = `[BUFFER] Email set to: "${value}"`;
        } else if (field === 'msg' || field === 'message') {
          setFormData((prev) => ({ ...prev, message: value }));
          reply = `[BUFFER] Message recorded (${value.length} chars).`;
        } else {
          reply = `Unknown field: "${field}". Supported: name, email, msg`;
        }
        break;
      }
      case 'status':
        reply = `MESSAGE BUFFER STATUS:\n  Name:    ${formData.name || '(empty)'}\n  Email:   ${formData.email || '(empty)'}\n  Subject: ${formData.subject}\n  Message: ${formData.message ? `"${formData.message.substring(0, 30)}..." (${formData.message.length} chars)` : '(empty)'}\n\nReady to preview? Type "send"`;
        break;
      case 'send':
        if (!formData.name || !formData.email || !formData.message) {
          reply = 'ERROR: Message buffers are incomplete. Ensure name, email, and msg are set first.';
        } else {
          setSshInput('');
          const mockEvent = { preventDefault: () => {} } as React.FormEvent;
          handleStandardSubmit(mockEvent);
          return;
        }
        break;
      default:
        reply = `bash: command not found: ${mainCmd}. Type "help" for a list of valid commands.`;
    }

    setSshLogs((prev) => [...prev, ...reply.split('\n')]);
    setSshInput('');
  };

  const handleSshSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeSshCommand(sshInput);
    }
  };

  useEffect(() => {
    if (formType === 'ssh' && sshLogs.length === 0 && !isSubmitted) {
      setSshLogs([
        'Welcome to the portfolio contact terminal.',
        'This mode is a frontend preview. Connect a real backend to receive live inquiries.',
        'Type "help" to list commands.',
        'sauravsingh@visitor:~$'
      ]);
    }
  }, [formType, sshLogs.length, isSubmitted]);

  return (
    <div className="w-full max-w-4xl mx-auto bg-zinc-950/60 border border-zinc-800/60 rounded-xl overflow-hidden shadow-xl flex flex-col md:flex-row h-[480px]">
      <div className="w-full md:w-80 bg-zinc-900 border-r border-zinc-800 p-6 flex flex-col font-mono text-xs text-zinc-400 select-none">
        <div className="flex items-center gap-2 text-emerald-400 font-bold mb-6">
          <Shield size={16} />
          <span>PROJECT_INQUIRY_PORT: 2222</span>
        </div>

        <div className="space-y-4 flex-1">
          <div>
            <div className="text-zinc-500 font-bold uppercase text-4xs">Direct Contact</div>
            <a href="tel:9840742866" className="text-zinc-300 font-bold hover:text-emerald-400 transition">
              9840742866
            </a>
            <a href="mailto:singhsaurav8899@gmail.com" className="text-zinc-300 break-all hover:text-emerald-400 transition">
              singhsaurav8899@gmail.com
            </a>
            <p className="text-3xs text-zinc-500 mt-0.5">Call or email directly if you want to discuss your project faster.</p>
          </div>

          <div>
            <div className="text-zinc-500 font-bold uppercase text-4xs">Best For</div>
            <div className="text-zinc-300 font-bold">Local Business Websites</div>
            <p className="text-3xs text-zinc-500 mt-0.5">Useful for shops, restaurants, agencies, portfolios, and custom web app ideas.</p>
          </div>

          <div>
            <div className="text-zinc-500 font-bold uppercase text-4xs">Response Style</div>
            <div className="text-zinc-300 font-bold">Fast, practical, and collaborative</div>
            <p className="text-3xs text-zinc-500 mt-0.5">Share your idea, your audience, and what you want the page or app to do.</p>
          </div>

          <div>
            <div className="text-zinc-500 font-bold uppercase text-4xs">Important Note</div>
            <div className="text-2xs bg-zinc-950 p-2 rounded border border-zinc-800/60 break-words font-mono text-zinc-500">
              Direct contact is already available here. You can also add EmailJS, Formspree, or your backend API later for live form delivery.
            </div>
          </div>
        </div>

        {!isSubmitted && (
          <div className="mt-auto border-t border-zinc-800 pt-4">
            <div className="text-zinc-500 font-bold uppercase text-4xs mb-2">INTERFACE_MODE</div>
            <div className="flex bg-zinc-950 border border-zinc-800 rounded p-1">
              <button
                onClick={() => setFormType('standard')}
                className={`flex-1 py-1 rounded text-3xs font-bold cursor-pointer transition ${formType === 'standard' ? 'bg-zinc-800 text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                STANDARD_GUI
              </button>
              <button
                onClick={() => setFormType('ssh')}
                className={`flex-1 py-1 rounded text-3xs font-bold cursor-pointer transition ${formType === 'ssh' ? 'bg-zinc-800 text-emerald-400' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                CLI_SSH
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 p-6 relative flex flex-col">
        {isSubmitted ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center font-mono space-y-4">
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 animate-bounce">
              <CheckCircle size={32} />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">PREVIEW COMPLETE</h3>
              <p className="text-xs text-zinc-400 max-w-sm">
                Your inquiry was processed inside the demo UI. Connect a real email service or backend if you want this form to receive live messages.
              </p>
            </div>

            <div className="w-full max-w-sm bg-zinc-950 border border-zinc-900 rounded-lg p-3 text-left text-3xs text-zinc-500 font-mono overflow-y-auto max-h-40 custom-scrollbar">
              {sshLogs.map((log, i) => (
                <div key={i} className={log.startsWith('SUCCESS') ? 'text-emerald-400 font-bold' : ''}>
                  {log}
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({ name: '', email: '', subject: 'landing-page', message: '' });
                setSshLogs([]);
                setFormType('standard');
              }}
              className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded text-xs text-zinc-400 hover:text-emerald-400 cursor-pointer transition font-mono flex items-center gap-2"
            >
              Compose New Inquiry <ArrowRight size={12} />
            </button>
          </div>
        ) : formType === 'standard' ? (
          <form onSubmit={handleStandardSubmit} className="flex-1 flex flex-col space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href="tel:9840742866"
                className="flex items-center justify-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-mono font-bold text-emerald-400 transition hover:bg-emerald-500/20"
              >
                <Phone size={14} />
                <span>Call Now</span>
              </a>
              <a
                href="mailto:singhsaurav8899@gmail.com?subject=Project%20Inquiry%20from%20Portfolio"
                className="flex items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-mono font-bold text-zinc-200 transition hover:bg-zinc-800"
              >
                <Mail size={14} />
                <span>Email Directly</span>
              </a>
            </div>

            <div className="rounded-lg border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-xs text-zinc-400">
              Zero-cost setup option: use direct call/email now, then connect this form later with Formspree or EmailJS.
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1 relative">
                <label className="text-3xs font-mono font-bold text-zinc-500 uppercase">visitor_name</label>
                <div className="relative">
                  <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Business owner or founder"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-3 py-2 bg-zinc-950 border border-zinc-800/80 rounded-lg text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50"
                  />
                </div>
              </div>

              <div className="space-y-1 relative">
                <label className="text-3xs font-mono font-bold text-zinc-500 uppercase">visitor_email</label>
                <div className="relative">
                  <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="e.g. hello@yourbusiness.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-9 pr-3 py-2 bg-zinc-950 border border-zinc-800/80 rounded-lg text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1 relative">
              <label className="text-3xs font-mono font-bold text-zinc-500 uppercase">project_type</label>
              <div className="relative">
                <Briefcase size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full pl-9 pr-3 py-2 bg-zinc-950 border border-zinc-800/80 rounded-lg text-xs text-zinc-200 focus:outline-none focus:border-emerald-500/50 appearance-none"
                >
                  {subjects.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex-1 flex flex-col space-y-1">
              <label className="text-3xs font-mono font-bold text-zinc-500 uppercase">project_brief</label>
              <div className="relative flex-1 flex">
                <MessageSquare size={14} className="absolute left-3 top-3 text-zinc-500" />
                <textarea
                  name="message"
                  required
                  placeholder="Tell me what kind of website or app you need, who it is for, and what you want users to do on it..."
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full pl-9 pr-3 py-2 bg-zinc-950 border border-zinc-800/80 rounded-lg text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-emerald-500/50 resize-none flex-1"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !formData.name || !formData.email || !formData.message}
              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-800 text-black disabled:text-zinc-600 font-bold font-mono text-xs rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/10 cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Terminal size={14} className="animate-pulse" />
                  <span>Running Preview...</span>
                </>
              ) : (
                <>
                  <Send size={14} />
                  <span>Preview Inquiry Flow</span>
                </>
              )}
            </button>

            <a
              href="https://wa.me/9779840742866"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2 text-xs font-mono font-bold text-zinc-200 transition hover:bg-zinc-800"
            >
              <ExternalLink size={14} />
              <span>Open WhatsApp Chat</span>
            </a>
          </form>
        ) : (
          <div className="flex-1 bg-zinc-950 rounded-lg border border-zinc-800 p-4 font-mono text-2xs text-emerald-400 overflow-hidden flex flex-col select-text">
            <div className="flex-1 overflow-y-auto space-y-1 custom-scrollbar pb-4">
              {sshLogs.map((log, i) => (
                <pre key={i} className="whitespace-pre-wrap leading-tight text-zinc-300">
                  {log}
                </pre>
              ))}
              {isSubmitting && <pre className="text-emerald-500 animate-pulse mt-2">Running frontend-only submission preview...</pre>}
            </div>

            {!isSubmitting && (
              <div className="flex items-center gap-2 border-t border-zinc-900 pt-2 shrink-0">
                <span className="text-emerald-500 font-bold select-none">sauravsingh@visitor:~$</span>
                <input
                  type="text"
                  value={sshInput}
                  onChange={(e) => setSshInput(e.target.value)}
                  onKeyDown={handleSshSubmit}
                  placeholder="type 'help' or 'status'..."
                  className="flex-1 bg-transparent border-none outline-none text-zinc-100 p-0 shadow-none focus:ring-0 font-mono caret-emerald-500 select-text"
                  autoFocus
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
