import React, { useState, useEffect } from 'react';
import { Folder, FolderOpen, FileText, ChevronRight, ChevronDown, Play, Copy, Check, Terminal, ExternalLink, Star, GitFork, AlertCircle, Code2 } from 'lucide-react';
import { Project } from '../data/mockData';

interface MockIDEProps {
  project: Project;
}

export const MockIDE: React.FC<MockIDEProps> = ({ project }) => {
  const fileNames = Object.keys(project.fileStructure);
  const [activeFile, setActiveFile] = useState<string>(fileNames[0] || 'README.md');
  const [openFiles, setOpenFiles] = useState<string[]>([fileNames[0] || 'README.md']);
  const [isCopied, setIsCopied] = useState(false);
  const [collapsedFolders, setCollapsedFolders] = useState<{ [key: string]: boolean }>({});
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');

  // Reset active file when project changes
  useEffect(() => {
    const files = Object.keys(project.fileStructure);
    if (files.length > 0) {
      setActiveFile(files[0]);
      setOpenFiles([files[0]]);
    }
  }, [project]);

  const fileData = project.fileStructure[activeFile];

  const handleFileClick = (filename: string) => {
    setActiveFile(filename);
    if (!openFiles.includes(filename)) {
      setOpenFiles([...openFiles, filename]);
    }
    setActiveTab('editor');
  };

  const handleCloseFile = (filename: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newOpenFiles = openFiles.filter(f => f !== filename);
    setOpenFiles(newOpenFiles);
    
    if (activeFile === filename && newOpenFiles.length > 0) {
      setActiveFile(newOpenFiles[newOpenFiles.length - 1]);
    } else if (newOpenFiles.length === 0) {
      // If no files open, open the first available file
      const first = Object.keys(project.fileStructure)[0];
      if (first) {
        setActiveFile(first);
        setOpenFiles([first]);
      }
    }
  };

  const copyToClipboard = () => {
    if (!fileData) return;
    navigator.clipboard.writeText(fileData.code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Helper to build virtual folder tree
  const buildTree = () => {
    const tree: { [dir: string]: string[] } = {};
    const rootFiles: string[] = [];

    fileNames.forEach(path => {
      if (path.includes('/')) {
        const parts = path.split('/');
        const dir = parts[0];
        if (!tree[dir]) tree[dir] = [];
        tree[dir].push(path);
      } else {
        rootFiles.push(path);
      }
    });

    return { tree, rootFiles };
  };

  const { tree, rootFiles } = buildTree();

  const toggleFolder = (dir: string) => {
    setCollapsedFolders(prev => ({ ...prev, [dir]: !prev[dir] }));
  };

  // Simple, fast custom highlighter for the IDE feel
  const highlightCode = (code: string, lang: string) => {
    if (!code) return '';
    if (lang === 'markdown' || lang === 'text') return <span className="text-zinc-300">{code}</span>;

    const lines = code.split('\n');

    return lines.map((line, lineIdx) => {
      const keywords = /\b(import|from|export|async|await|const|let|var|function|return|if|else|for|while|class|try|catch|pub|struct|impl|use|fn|type|enum|package|module|go)\b/g;
      const types = /\b(string|number|boolean|any|void|Record|Response|NextResponse|Request|LsmTree|Memtable|RaftNode|Option|Result|String|Vec|u8|u64|int|float|string|bool)\b/g;
      const strings = /(['"`].*?['"`])/g;
      const comments = /(\/\/.*|\/\*.*\*\/|#.*)/g;
      const numbers = /\b(\d+)\b/g;

      // This is a naive replace, might overlap. For a real mock IDE, it's sufficient and blazing fast.
      // We wrap matched components in spans
      return (
        <div key={lineIdx} className="table-row">
          <span className="table-cell select-none text-right pr-4 text-zinc-600 font-mono text-xs w-10">{lineIdx + 1}</span>
          <span className="table-cell whitespace-pre font-mono text-xs">
            {line.length === 0 ? '\u00A0' : (
              <span 
                dangerouslySetInnerHTML={{
                  __html: line
                    .replace(/[<>&]/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;'}[c] || c))
                    .replace(strings, '<span class="text-emerald-400">$1</span>')
                    .replace(keywords, '<span class="text-pink-500">$1</span>')
                    .replace(types, '<span class="text-cyan-400">$1</span>')
                    .replace(numbers, '<span class="text-amber-400">$1</span>')
                    .replace(comments, '<span class="text-zinc-500 italic">$1</span>')
                }}
              />
            )}
          </span>
        </div>
      );
    });
  };

  return (
    <div className="w-full flex flex-col bg-zinc-950 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl h-[550px]">
      {/* IDE Toolbar */}
      <div className="bg-zinc-900 border-b border-zinc-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-zinc-950 rounded-lg border border-zinc-800 text-amber-400">
            {project.icon === 'Activity' && <ExternalLink size={18} className="text-cyan-400" />}
            {project.icon === 'Terminal' && <Terminal size={18} className="text-emerald-400" />}
            {project.icon === 'Database' && <ChevronRight size={18} className="text-amber-400" />}
            {project.icon === 'Music' && <ExternalLink size={18} className="text-purple-400" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-white font-bold text-sm md:text-base">{project.title}</h3>
              <span className="text-2xs bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 rounded font-mono text-zinc-400">v1.0.0</span>
            </div>
            <p className="text-xs text-zinc-400 truncate max-w-xs md:max-w-md">{project.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-3 mr-4 text-xs font-mono border-r border-zinc-800 pr-4">
            <span className="flex items-center gap-1 text-zinc-400">
              <Star size={14} className="text-amber-400 fill-amber-400/20" /> {project.stars}
            </span>
            <span className="flex items-center gap-1 text-zinc-400">
              <GitFork size={14} className="text-cyan-400" /> {project.forks}
            </span>
          </div>
          {project.liveUrl !== '#' && (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-1.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded text-zinc-300 hover:text-white transition cursor-pointer flex items-center gap-1 text-xs font-mono font-bold px-3"
              title="Live Demo"
            >
              <ExternalLink size={14} />
              <span className="hidden sm:inline">Live</span>
            </a>
          )}
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-1.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded text-zinc-300 hover:text-white transition cursor-pointer flex items-center gap-1 text-xs font-mono font-bold px-3 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
            >
              <Code2 size={14} /> <span className="hidden sm:inline">Repo</span>
            </a>
          )}
        </div>
      </div>

      {/* IDE Main */}
      <div className="flex-1 flex overflow-hidden">
        {/* File Tree Explorer */}
        <div className="w-52 md:w-60 bg-zinc-900 border-r border-zinc-800 select-none hidden sm:flex flex-col">
          <div className="px-3 py-1.5 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between text-2xs font-bold text-zinc-500 tracking-wider font-mono">
            <span>EXPLORER</span>
            <span className="text-zinc-600">WORKSPACE</span>
          </div>
          <div className="flex-1 overflow-y-auto p-2 font-mono text-xs text-zinc-400 custom-scrollbar">
            {/* Top level project title */}
            <div className="flex items-center gap-1 font-bold text-zinc-300 mb-2 px-1 text-2xs uppercase tracking-wider">
              <FolderOpen size={14} className="text-amber-400" />
              <span>{project.id}</span>
            </div>

            {/* Folders */}
            {Object.entries(tree).map(([dir, files]) => {
              const isCollapsed = collapsedFolders[dir];
              return (
                <div key={dir} className="mb-0.5">
                  <div 
                    onClick={() => toggleFolder(dir)}
                    className="flex items-center gap-1 px-2 py-1 rounded hover:bg-zinc-800/60 cursor-pointer text-zinc-300 group"
                  >
                    {isCollapsed ? <ChevronRight size={14} className="text-zinc-500" /> : <ChevronDown size={14} className="text-zinc-500" />}
                    {isCollapsed ? <Folder size={14} className="text-amber-500" /> : <FolderOpen size={14} className="text-amber-500" />}
                    <span className="truncate">{dir}</span>
                    <span className="text-4xs text-zinc-600 bg-zinc-950 border border-zinc-800 rounded px-1 ml-auto font-sans">
                      {files.length}
                    </span>
                  </div>
                  
                  {!isCollapsed && (
                    <div className="pl-4 border-l border-zinc-800/60 ml-3.5 mt-0.5">
                      {files.map((file) => {
                        const baseName = file.split('/').slice(1).join('/');
                        const isActive = activeFile === file;
                        return (
                          <div
                            key={file}
                            onClick={() => handleFileClick(file)}
                            className={`flex items-center gap-1.5 px-2 py-1 rounded cursor-pointer transition-colors ${
                              isActive 
                                ? 'bg-emerald-500/10 text-emerald-400 border-l border-emerald-400' 
                                : 'hover:bg-zinc-800/40 hover:text-zinc-300'
                            }`}
                          >
                            <FileText size={14} className={isActive ? 'text-emerald-400' : 'text-zinc-500'} />
                            <span className="truncate">{baseName}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Root Files */}
            {rootFiles.map((file) => {
              const isActive = activeFile === file;
              return (
                <div
                  key={file}
                  onClick={() => handleFileClick(file)}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded cursor-pointer transition-colors mb-0.5 ${
                    isActive 
                      ? 'bg-emerald-500/10 text-emerald-400 border-l border-emerald-400' 
                      : 'hover:bg-zinc-800/40 hover:text-zinc-300'
                  }`}
                >
                  <FileText size={14} className={isActive ? 'text-emerald-400' : 'text-zinc-500'} />
                  <span className="truncate">{file}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Code Editor */}
        <div className="flex-1 flex flex-col bg-zinc-950 overflow-hidden relative">
          {/* Tabs */}
          <div className="bg-zinc-900 border-b border-zinc-800 flex overflow-x-auto select-none no-scrollbar">
            {openFiles.map((file) => {
              const baseName = file.includes('/') ? file.split('/').pop() : file;
              const isActive = activeFile === file;
              return (
                <div
                  key={file}
                  onClick={() => handleFileClick(file)}
                  className={`flex items-center gap-2 px-3 md:px-4 py-2 text-xs border-r border-zinc-800 font-mono cursor-pointer transition-colors shrink-0 ${
                    isActive 
                      ? 'bg-zinc-950 text-emerald-400 font-bold border-t-2 border-t-emerald-400' 
                      : 'bg-zinc-900/50 text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/80'
                  }`}
                >
                  <FileText size={12} className={isActive ? 'text-emerald-400' : 'text-zinc-500'} />
                  <span>{baseName}</span>
                  <button
                    onClick={(e) => handleCloseFile(file, e)}
                    className="p-0.5 rounded hover:bg-zinc-800 text-zinc-600 hover:text-zinc-400 cursor-pointer"
                  >
                    ×
                  </button>
                </div>
              );
            })}
            
            {/* Mobile file selector */}
            <div className="sm:hidden ml-auto px-2 py-1.5 self-center">
              <select 
                value={activeFile}
                onChange={(e) => handleFileClick(e.target.value)}
                className="bg-zinc-800 border border-zinc-700 text-zinc-300 text-xs rounded px-2 py-1 outline-none font-mono"
              >
                {fileNames.map(f => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Bar (Copy, language info) */}
          {fileData && (
            <div className="absolute top-12 right-4 z-10 flex gap-2">
              <button
                onClick={copyToClipboard}
                className="p-1.5 bg-zinc-900/80 hover:bg-zinc-800 border border-zinc-800 rounded text-zinc-400 hover:text-zinc-200 transition flex items-center gap-1 text-2xs font-mono cursor-pointer backdrop-blur"
                title="Copy code"
              >
                {isCopied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
                <span>{isCopied ? 'Copied!' : 'Copy'}</span>
              </button>
              {activeFile.toLowerCase() === 'readme.md' && (
                <div className="flex bg-zinc-900/80 border border-zinc-800 rounded overflow-hidden text-2xs font-mono">
                  <button 
                    onClick={() => setActiveTab('editor')}
                    className={`px-2 py-1 cursor-pointer transition ${activeTab === 'editor' ? 'bg-zinc-800 text-emerald-400 font-bold' : 'text-zinc-400 hover:text-zinc-300'}`}
                  >
                    Code
                  </button>
                  <button 
                    onClick={() => setActiveTab('preview')}
                    className={`px-2 py-1 cursor-pointer transition ${activeTab === 'preview' ? 'bg-zinc-800 text-emerald-400 font-bold' : 'text-zinc-400 hover:text-zinc-300'}`}
                  >
                    Preview
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Code Viewer */}
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            {fileData ? (
              activeFile.toLowerCase() === 'readme.md' && activeTab === 'preview' ? (
                <div className="prose prose-invert max-w-none font-sans p-2 text-zinc-300">
                  {fileData.code.split('\n').map((line, i) => {
                    if (line.startsWith('# ')) {
                      return <h1 key={i} className="text-xl md:text-2xl font-bold border-b border-zinc-800 pb-2 mb-4 text-white mt-2 flex items-center gap-2">
                        {project.icon === 'Activity' && <Play className="text-emerald-400" size={18} />}
                        {line.replace('# ', '')}
                      </h1>;
                    }
                    if (line.startsWith('## ')) {
                      return <h2 key={i} className="text-base md:text-lg font-bold mt-4 mb-2 text-zinc-100">{line.replace('## ', '')}</h2>;
                    }
                    if (line.startsWith('- ')) {
                      return <li key={i} className="ml-4 list-disc text-xs text-zinc-300 my-1">{line.replace('- ', '')}</li>;
                    }
                    if (line.startsWith('```')) {
                      return null; // Skip code blocks in simple preview
                    }
                    if (line.trim().length === 0) return <div key={i} className="h-2"></div>;
                    return <p key={i} className="text-xs md:text-sm text-zinc-400 leading-relaxed my-1">{line}</p>;
                  })}
                </div>
              ) : (
                <div className="table w-full border-collapse font-mono select-text">
                  {highlightCode(fileData.code, fileData.language)}
                </div>
              )
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-zinc-500 font-mono gap-2 text-xs">
                <AlertCircle size={24} className="text-zinc-700 animate-pulse" />
                <span>Error 404: File could not be loaded into buffer.</span>
              </div>
            )}
          </div>

          {/* Editor Status Bar */}
          <div className="bg-zinc-900 border-t border-zinc-800 px-4 py-1 flex items-center justify-between text-4xs font-mono text-zinc-500 select-none">
            <div className="flex items-center gap-3">
              <span className="bg-emerald-500/20 text-emerald-400 px-1.5 rounded-sm text-5xs font-bold">NORMAL</span>
              <span>{activeFile}</span>
            </div>
            <div className="flex items-center gap-3">
              <span>LF</span>
              <span>UTF-8</span>
              <span className="bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-400 uppercase">{fileData?.language || 'text'}</span>
              <span>Spaces: 2</span>
              <span>Line: {fileData?.code.split('\n').length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
