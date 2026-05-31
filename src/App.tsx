import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutAndSkills from "./components/AboutAndSkills";
import ProjectGallery from "./components/ProjectGallery";
import BlogSection from "./components/BlogSection";
import AiAssistant from "./components/AiAssistant";
import ContactAndNewsletter from "./components/ContactAndNewsletter";
import { ArrowUp, Github, Linkedin, Mail, MessageSquare } from "lucide-react";
import { PERSONAL_INFO } from "./data";

export default function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Default to dark mode for portfolio style, but let user override
    const saved = localStorage.getItem("portfolio-theme");
    return saved ? saved === "dark" : true;
  });

  // Search-linked scroll targets
  const [activeSearchProjectId, setActiveSearchProjectId] = useState<string | null>(null);
  const [activeSearchBlogId, setActiveSearchBlogId] = useState<string | null>(null);
  const [highlightedSkillCategory, setHighlightedSkillCategory] = useState<string | null>(null);

  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sync dark mode class on document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("portfolio-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("portfolio-theme", "light");
    }
  }, [darkMode]);

  // Monitor scroll for Scroll-to-Top trigger
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Search actions router
  const handleSearchSelect = (type: 'project' | 'blog' | 'skill', idOrName: string) => {
    if (type === 'project') {
      setActiveSearchProjectId(idOrName);
    } else if (type === 'blog') {
      setActiveSearchBlogId(idOrName);
    } else if (type === 'skill') {
      setHighlightedSkillCategory(idOrName);
      // Scroll to skill category immediately
      const el = document.getElementById("skills");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      // Flash highlight category effect timeout
      setTimeout(() => {
        setHighlightedSkillCategory(null);
      }, 5000);
    }
  };

  const forceScrollToChat = () => {
    const chatEl = document.getElementById("ai-assistant");
    if (chatEl) {
      chatEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="font-sans min-h-screen bg-white text-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 transition-colors duration-300">
      
      {/* Dynamic Header */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onSearchSelect={handleSearchSelect}
      />

      {/* Main Sections */}
      <main className="relative">
        <Hero onStartChat={forceScrollToChat} />

        <AboutAndSkills highlightedSkillCategory={highlightedSkillCategory} />

        <ProjectGallery
          activeSearchProjectId={activeSearchProjectId}
          clearSearchHighlight={() => setActiveSearchProjectId(null)}
        />

        <BlogSection
          activeSearchBlogId={activeSearchBlogId}
          clearSearchHighlight={() => setActiveSearchBlogId(null)}
        />

        <AiAssistant />

        <ContactAndNewsletter />
      </main>

      {/* Sticky Action Footer */}
      <footer className="bg-zinc-50 dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900 py-12 px-4 sm:px-6 lg:px-8 text-center transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="text-left font-sans text-xs">
            <span className="font-bold text-zinc-900 dark:text-white text-sm">Prince Mourya</span>
            <p className="text-zinc-500 mt-1 dark:text-zinc-400">
              Full Stack Developer specializing in scale, automation, and analytics.
            </p>
          </div>

          {/* Social connections in footer */}
          <div className="flex items-center space-x-4">
            <a
              id="footer-github"
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              aria-label="GitHub Account"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              id="footer-linkedin"
              href={PERSONAL_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              aria-label="LinkedIn Account"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              id="footer-mail"
              href={`mailto:${PERSONAL_INFO.email}`}
              className="p-2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
              aria-label="Email Address"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          <div className="text-zinc-400 dark:text-zinc-500 font-mono text-[9px] uppercase tracking-widest leading-none">
            © {new Date().getFullYear()} • Prince Mourya Portfolio
          </div>
        </div>
      </footer>

      {/* Sticky Floating scrollup anchor widget */}
      {showScrollTop && (
        <button
          id="scroll-to-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 p-2.5 bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-lg rounded-full border border-zinc-800 dark:border-zinc-200 transition-all active:scale-95 z-40 cursor-pointer animate-fade-in hover:-translate-y-0.5"
          aria-label="Scroll to Top"
        >
          <ArrowUp className="w-4.5 h-4.5" />
        </button>
      )}

    </div>
  );
}
