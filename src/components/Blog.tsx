import React, { useState } from 'react';
import { BLOGS, Blog as BlogType } from '../data/mockData';
import { Calendar, Clock, ThumbsUp, Tag, ArrowLeft, BookOpen, Search, Share2 } from 'lucide-react';

export const Blog: React.FC = () => {
  const [selectedBlog, setSelectedBlog] = useState<BlogType | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = Array.from(new Set(BLOGS.flatMap(b => b.tags)));

  const filteredBlogs = BLOGS.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         b.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         b.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !activeTag || b.tags.includes(activeTag);
    return matchesSearch && matchesTag;
  });

  const handleBlogClick = (blog: BlogType) => {
    setSelectedBlog(blog);
    window.scrollTo({ top: document.getElementById('blog')?.offsetTop ? document.getElementById('blog')!.offsetTop - 80 : 0, behavior: 'smooth' });
  };

  const renderCodeSnippet = (code: string, language = 'rust') => {
    return (
      <div className="my-4 border border-zinc-800 rounded-lg overflow-hidden bg-zinc-950 font-mono text-2xs md:text-xs">
        <div className="bg-zinc-900 px-4 py-1.5 border-b border-zinc-800 flex items-center justify-between text-zinc-500">
          <span className="uppercase font-bold text-3xs">{language}</span>
          <span className="text-3xs select-none">read_only</span>
        </div>
        <pre className="p-4 overflow-x-auto text-zinc-300 custom-scrollbar whitespace-pre">
          {code}
        </pre>
      </div>
    );
  };

  if (selectedBlog) {
    // Parse blog content for code snippets
    const parts = selectedBlog.content.split('```');
    
    return (
      <div className="w-full max-w-3xl mx-auto bg-zinc-950/60 border border-zinc-800/60 rounded-xl p-6 md:p-8 shadow-xl">
        <button 
          onClick={() => setSelectedBlog(null)}
          className="flex items-center gap-1 text-xs text-zinc-500 hover:text-emerald-400 font-mono mb-6 cursor-pointer group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" /> Back to Articles
        </button>

        <article className="space-y-6">
          {/* Article Header */}
          <div className="space-y-3">
            <div className="flex flex-wrap gap-2">
              {selectedBlog.tags.map((t, i) => (
                <span key={i} className="text-4xs font-mono font-bold px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded">
                  #{t.toLowerCase().replace(' ', '')}
                </span>
              ))}
            </div>
            
            <h1 className="text-xl md:text-3xl font-bold text-white tracking-tight leading-tight">
              {selectedBlog.title}
            </h1>

            <div className="flex items-center gap-4 text-2xs font-mono text-zinc-500 border-b border-zinc-900 pb-4">
              <span className="flex items-center gap-1"><Calendar size={12} /> {selectedBlog.date}</span>
              <span className="flex items-center gap-1"><Clock size={12} /> {selectedBlog.readTime}</span>
              <span className="flex items-center gap-1"><ThumbsUp size={12} className="text-emerald-500" /> {selectedBlog.likes} Likes</span>
            </div>
          </div>

          {/* Article Body */}
          <div className="prose prose-invert max-w-none text-zinc-300 text-xs md:text-sm leading-relaxed space-y-4">
            {parts.map((part, index) => {
              // If index is odd, it's inside a code block
              if (index % 2 === 1) {
                const firstLineBreak = part.indexOf('\n');
                const lang = part.substring(0, firstLineBreak).trim() || 'text';
                const code = part.substring(firstLineBreak + 1);
                return <div key={index}>{renderCodeSnippet(code, lang)}</div>;
              }
              
              // Standard text rendering with basic markdown support (headers, bold)
              return (
                <div key={index} className="space-y-4">
                  {part.split('\n\n').map((paragraph, pIdx) => {
                    if (paragraph.startsWith('### ')) {
                      return <h3 key={pIdx} className="text-base md:text-lg font-bold text-zinc-100 mt-6 mb-2 font-mono">{paragraph.replace('### ', '')}</h3>;
                    }
                    if (paragraph.startsWith('1. ') || paragraph.startsWith('2. ') || paragraph.startsWith('3. ')) {
                      return (
                        <div key={pIdx} className="pl-4 border-l-2 border-zinc-800 space-y-1 font-sans">
                          {paragraph.split('\n').map((li, liIdx) => (
                            <p key={liIdx} className="text-xs md:text-sm my-1">{li}</p>
                          ))}
                        </div>
                      );
                    }
                    return <p key={pIdx} className="font-sans text-zinc-400 leading-relaxed">{paragraph}</p>;
                  })}
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="border-t border-zinc-900 pt-6 mt-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button className="flex items-center gap-1 text-2xs text-zinc-400 hover:text-emerald-400 font-mono border border-zinc-800 px-3 py-1 rounded-lg bg-zinc-900 cursor-pointer transition">
                <ThumbsUp size={12} /> Like Note
              </button>
              <button className="flex items-center gap-1 text-2xs text-zinc-400 hover:text-emerald-400 font-mono border border-zinc-800 px-3 py-1 rounded-lg bg-zinc-900 cursor-pointer transition">
                <Share2 size={12} /> Share
              </button>
            </div>
            <span className="text-3xs text-zinc-600 font-mono">EOF // End of file buffer.</span>
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8">
      {/* Search and Tags Toolbar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-zinc-950 border border-zinc-800/60 rounded-xl p-4 shadow-lg">
        <div className="relative w-full md:w-64">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search notes..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-300 placeholder-zinc-500 font-mono focus:outline-none focus:border-emerald-500/50 focus:ring-0"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto no-scrollbar py-0.5 select-none">
          <button 
            onClick={() => setActiveTag(null)}
            className={`text-2xs font-mono px-2 py-1 rounded cursor-pointer shrink-0 border transition-all ${
              activeTag === null 
                ? 'bg-emerald-500 border-emerald-500 text-black font-bold' 
                : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
            }`}
          >
            All Notes
          </button>
          {allTags.map((t, i) => (
            <button 
              key={i}
              onClick={() => setActiveTag(t)}
              className={`text-2xs font-mono px-2 py-1 rounded cursor-pointer shrink-0 border transition-all flex items-center gap-1 ${
                activeTag === t 
                  ? 'bg-emerald-500 border-emerald-500 text-black font-bold shadow-lg shadow-emerald-500/10' 
                  : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700'
              }`}
            >
              <Tag size={10} /> #{t.toLowerCase().replace(' ', '')}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredBlogs.map((b) => (
          <div 
            key={b.id} 
            className="bg-zinc-950/60 border border-zinc-800/60 rounded-xl p-5 flex flex-col hover:border-zinc-700 hover:bg-zinc-950 transition-all duration-300 group shadow-lg shadow-black/20"
          >
            <div className="flex flex-wrap gap-1.5 mb-3">
              {b.tags.map((t, i) => (
                <span key={i} className="text-4xs font-mono text-zinc-500">
                  #{t.toLowerCase().replace(' ', '')}
                </span>
              ))}
            </div>

            <h3 
              onClick={() => handleBlogClick(b)}
              className="text-sm font-bold text-zinc-100 hover:text-emerald-400 cursor-pointer font-mono group-hover:underline leading-snug mb-2 line-clamp-2 shrink-0 h-10"
            >
              {b.title}
            </h3>

            <p className="text-xs text-zinc-400 line-clamp-3 mb-4 flex-1">
              {b.excerpt}
            </p>

            <div className="pt-3 border-t border-zinc-900 mt-auto flex items-center justify-between text-4xs font-mono text-zinc-500">
              <span className="flex items-center gap-1"><Calendar size={10} /> {b.date}</span>
              <span className="flex items-center gap-1"><Clock size={10} /> {b.readTime}</span>
            </div>

            <button 
              onClick={() => handleBlogClick(b)}
              className="w-full mt-4 flex items-center justify-center gap-1 text-2xs font-mono text-zinc-400 group-hover:text-emerald-400 bg-zinc-900/60 hover:bg-zinc-800 py-1.5 rounded-lg border border-zinc-800 transition cursor-pointer"
            >
              <BookOpen size={12} /> Read Note
            </button>
          </div>
        ))}

        {filteredBlogs.length === 0 && (
          <div className="col-span-full py-12 text-center text-zinc-500 font-mono text-xs">
            No entries found in index matching query.
          </div>
        )}
      </div>
    </div>
  );
};