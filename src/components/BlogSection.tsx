import React, { useState, useEffect } from "react";
import { BookOpen, Calendar, Clock, ChevronRight, X, Heart, MessageSquare, CornerDownRight } from "lucide-react";
import { BLOG_POSTS } from "../data";
import { BlogPost } from "../types";

interface BlogSectionProps {
  activeSearchBlogId: string | null;
  clearSearchHighlight: () => void;
}

export default function BlogSection({ activeSearchBlogId, clearSearchHighlight }: BlogSectionProps) {
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [likes, setLikes] = useState<Record<string, number>>({
    "blog-1": 18,
    "blog-2": 31,
    "blog-3": 24,
  });
  const [hasLiked, setHasLiked] = useState<Record<string, boolean>>({});

  // Get all unique tags from across blog posts
  const allTags = Array.from(new Set(BLOG_POSTS.flatMap(post => post.tags)));

  const handleLike = (blogId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (hasLiked[blogId]) {
      setLikes(prev => ({ ...prev, [blogId]: prev[blogId] - 1 }));
      setHasLiked(prev => ({ ...prev, [blogId]: false }));
    } else {
      setLikes(prev => ({ ...prev, [blogId]: prev[blogId] + 1 }));
      setHasLiked(prev => ({ ...prev, [blogId]: true }));
    }
  };

  // Filter posts based on active tags selection
  const filteredPosts = BLOG_POSTS.filter(post => {
    if (!selectedTag) return true;
    return post.tags.includes(selectedTag);
  });

  // Handle outside search queries
  useEffect(() => {
    if (activeSearchBlogId) {
      const match = BLOG_POSTS.find(b => b.id === activeSearchBlogId);
      if (match) {
        setSelectedBlog(match);
        // Scroll to container
        const el = document.getElementById("blog");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
        clearSearchHighlight();
      }
    }
  }, [activeSearchBlogId]);

  return (
    <section id="blog" className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-900 transition-colors">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-teal-500 bg-teal-500/10 px-2.5 py-1 rounded">
              Technical Insights
            </span>
            <h2 className="mt-3 font-sans text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
              Publications & Writing
            </h2>
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              Deep-dives covering compiler patterns, state sync engines, and predictive analytics diagnostics.
            </p>
          </div>

          {/* Filtering Tags */}
          <div className="flex flex-wrap items-center gap-1.5 mt-6 md:mt-0 max-w-lg">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1 text-[11px] font-medium rounded-md transition-colors ${
                !selectedTag
                  ? "bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold border border-teal-500/10"
                  : "bg-zinc-50 dark:bg-zinc-900 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 border border-zinc-200/40 dark:border-zinc-800"
              }`}
            >
              All Articles
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1 text-[11px] font-medium rounded-md transition-colors ${
                  selectedTag === tag
                    ? "bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold border border-teal-500/10"
                    : "bg-zinc-50 dark:bg-zinc-900 text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 border border-zinc-200/40 dark:border-zinc-800"
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Content Listing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              id={`blog-card-${post.id}`}
              onClick={() => setSelectedBlog(post)}
              className="flex flex-col h-full bg-zinc-50/50 dark:bg-zinc-900/30 hover:bg-zinc-50 dark:hover:bg-zinc-900/70 border border-zinc-200/50 dark:border-zinc-900 rounded-2xl p-6 transition-all cursor-pointer group"
            >
              <div className="flex items-center space-x-3 text-[10px] font-mono text-zinc-400 mb-4">
                <div className="flex items-center space-x-1">
                  <Calendar className="w-3 h-3" />
                  <span>{post.date}</span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              <h3 className="font-sans text-sm font-bold text-zinc-900 dark:text-white leading-snug group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                {post.title}
              </h3>

              <p className="mt-2.5 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed flex-grow">
                {post.summary}
              </p>

              {/* Action trigger footer */}
              <div className="mt-6 pt-4 border-t border-zinc-200/40 dark:border-zinc-900 flex items-center justify-between">
                <div className="flex items-center space-x-1.5">
                  {post.tags.slice(0, 2).map((tg, idx) => (
                    <span key={idx} className="text-[9px] font-mono font-medium text-zinc-400">
                      #{tg}
                    </span>
                  ))}
                </div>

                <div className="flex items-center space-x-4 text-[10px] text-zinc-400 font-mono">
                  <button
                    onClick={(e) => handleLike(post.id, e)}
                    className={`flex items-center space-x-1 px-1.5 py-0.5 rounded transition-all hover:bg-zinc-150 dark:hover:bg-zinc-800 ${
                      hasLiked[post.id] ? "text-rose-500 font-bold" : "text-zinc-400"
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${hasLiked[post.id] ? "fill-current" : ""}`} />
                    <span>{likes[post.id]}</span>
                  </button>
                  <span className="flex items-center space-x-1">
                    <ChevronRight className="w-4 h-4 text-zinc-400 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Dynamic Reader Box Modal */}
        {selectedBlog && (
          <div
            id="blog-reader-modal"
            className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <div
              id="blog-reader-container"
              className="bg-white dark:bg-zinc-950 max-w-3xl w-full max-h-[90vh] overflow-y-auto rounded-2xl border border-zinc-200 dark:border-zinc-900 shadow-2xl font-sans"
            >
              {/* Reader Header */}
              <div className="sticky top-0 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md px-6 py-4 border-b border-zinc-100 dark:border-zinc-900 flex items-center justify-between z-10">
                <div className="flex items-center space-x-2">
                  <BookOpen className="w-4.5 h-4.5 text-teal-500" />
                  <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-teal-500">
                    Publisher View
                  </span>
                </div>
                <button
                  id="close-blog-reader"
                  onClick={() => setSelectedBlog(null)}
                  className="p-1.5 hover:bg-zinc-150 dark:hover:bg-zinc-900 rounded-lg text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Reader Article Document Body */}
              <article className="p-6 sm:p-10 space-y-6">
                <div>
                  <h1 className="font-sans text-xl sm:text-2xl md:text-3xl font-bold text-zinc-900 dark:text-white leading-snug">
                    {selectedBlog.title}
                  </h1>

                  <div className="mt-4 flex flex-wrap items-center gap-y-2 text-xs font-medium text-zinc-400 border-b border-zinc-100 dark:border-zinc-900 pb-5">
                    <div className="flex items-center space-x-1.5">
                      <div className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-[10px] font-mono leading-none">
                        PM
                      </div>
                      <span className="text-zinc-700 dark:text-zinc-300 font-semibold">{selectedBlog.author}</span>
                    </div>
                    <span className="mx-3 text-zinc-200 dark:text-zinc-800">|</span>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{selectedBlog.date}</span>
                    </div>
                    <span className="mx-3 text-zinc-200 dark:text-zinc-800">|</span>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{selectedBlog.readTime}</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Markdown Render */}
                <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed font-sans space-y-6">
                  {/* Parsing simple blocks */}
                  {selectedBlog.content.split("\n\n").map((para, pIdx) => {
                    // Check if headers
                    if (para.startsWith("### ")) {
                      return (
                        <h3 key={pIdx} className="font-sans text-sm sm:text-base font-bold text-zinc-900 dark:text-white pt-2 flex items-center">
                          <CornerDownRight className="w-4 h-4 text-teal-500 mr-2 shrink-0" />
                          <span>{para.replace("### ", "")}</span>
                        </h3>
                      );
                    }
                    if (para.startsWith("## ")) {
                      return (
                        <h2 key={pIdx} className="font-sans text-base sm:text-lg font-bold text-zinc-900 dark:text-white pt-4 border-b border-zinc-100 dark:border-zinc-900 pb-2">
                          {para.replace("## ", "")}
                        </h2>
                      );
                    }
                    // Check if bullet points
                    if (para.startsWith("- ") || para.startsWith("* ")) {
                      return (
                        <ul key={pIdx} className="space-y-2.5 pl-4">
                          {para.split("\n").map((bullet, bIdx) => (
                            <li key={bIdx} className="flex items-start">
                              <span className="h-1.5 w-1.5 bg-teal-500 rounded-full mt-2 mr-3 shrink-0" />
                              <span>{bullet.replace(/^[-*]\s+/, "")}</span>
                            </li>
                          ))}
                        </ul>
                      );
                    }
                    // Check if numbered list
                    if (/^\d+\.\s+/.test(para)) {
                      return (
                        <ol key={pIdx} className="space-y-2.5 pl-4 list-decimal">
                          {para.split("\n").map((num, nIdx) => (
                            <li key={nIdx} className="pl-1">
                              {num.replace(/^\d+\.\s+/, "")}
                            </li>
                          ))}
                        </ol>
                      );
                    }
                    // Check if code block
                    if (para.startsWith("```")) {
                      const lines = para.split("\n");
                      const lang = lines[0].replace("```", "") || "javascript";
                      const codeContent = lines.slice(1, -1).join("\n");
                      return (
                        <div key={pIdx} className="rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950 text-zinc-100 font-mono text-[11px] leading-relaxed my-4">
                          <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800">
                            <span className="text-[9px] uppercase tracking-wider font-semibold text-zinc-400">
                              {lang}
                            </span>
                            <span className="text-[9px] text-zinc-500 transition-colors hover:text-white cursor-pointer" onClick={() => navigator.clipboard.writeText(codeContent)}>
                              Copy
                            </span>
                          </div>
                          <pre className="p-4 overflow-x-auto">
                            <code>{codeContent}</code>
                          </pre>
                        </div>
                      );
                    }

                    // Bold highlights inline parser helper
                    const formattedPara = para.split("**").map((piece, pieceIdx) => {
                      if (pieceIdx % 2 === 1) {
                        return <strong key={pieceIdx} className="font-bold text-zinc-900 dark:text-white">{piece}</strong>;
                      }
                      // Parse inline code like `code`
                      return piece.split('`').map((subPiece, subIdx) => {
                        if (subIdx % 2 === 1) {
                          return <code key={subIdx} className="font-mono text-xs text-rose-500 px-1 py-0.2 bg-zinc-100 dark:bg-zinc-900 rounded">{subPiece}</code>;
                        }
                        return subPiece;
                      });
                    });

                    return (
                      <p key={pIdx} className="text-zinc-650 dark:text-zinc-300 leading-relaxed">
                        {formattedPara}
                      </p>
                    );
                  })}
                </div>

                {/* Article Footer comments or feedback */}
                <div className="pt-8 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
                  <div className="flex items-center space-x-1 bg-zinc-50 dark:bg-zinc-900 px-4 py-2 rounded-xl text-zinc-400">
                    <Heart className={`w-4 h-4 cursor-pointer text-rose-500 animate-pulse`} />
                    <span className="text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300">{likes[selectedBlog.id]} Readers like this</span>
                  </div>

                  <button
                    id="blog-reader-close-action"
                    onClick={() => setSelectedBlog(null)}
                    className="px-4 py-2 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 rounded-xl font-semibold hover:opacity-95 transition-all text-xs"
                  >
                    Finish Reading
                  </button>
                </div>
              </article>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
