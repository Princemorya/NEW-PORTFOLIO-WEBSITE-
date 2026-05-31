import { Mail, Linkedin, Github, MessageSquare, ArrowDown, ShieldCheck } from "lucide-react";
import { PERSONAL_INFO } from "../data";

interface HeroProps {
  onStartChat: () => void;
}

export default function Hero({ onStartChat }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[85vh] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-zinc-50/50 dark:from-zinc-950 dark:to-zinc-900/30 overflow-hidden"
    >
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      {/* Decorative blurred back-lights */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 -translate-x-1/2 w-72 h-72 bg-emerald-500/10 dark:bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-y-1/2 translate-x-1/2 w-80 h-80 bg-violet-500/10 dark:bg-violet-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center z-10">
        {/* Verification Hub */}
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 mb-8 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 rounded-full shadow-sm animate-fade-in-up">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span className="font-mono text-[10px] font-bold text-zinc-600 dark:text-zinc-300 tracking-wider uppercase">
            Full-Stack & ML Specialist
          </span>
        </div>

        {/* Display Header */}
        <h1
          id="hero-title"
          className="font-sans text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.08] lg:max-w-4xl mx-auto"
        >
          Building scalable software. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-violet-500">
            Simplifying complexity.
          </span>
        </h1>

        {/* Summary Description */}
        <p
          id="hero-summary"
          className="mt-6 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed"
        >
          I am a Full Stack Developer specializing in the MERN suite and scalable API structures. I formulate smart integrations using machine learning classifiers and cloud services to design bulletproof software.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            id="hero-cta-ai"
            onClick={onStartChat}
            className="flex items-center space-x-2 px-5 py-3 text-xs font-semibold text-white bg-zinc-950 dark:bg-white dark:text-zinc-950 rounded-xl hover:opacity-90 shadow-md transition-all active:scale-98"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat with Prince AI</span>
          </button>

          <a
            id="hero-cta-projects"
            href="#projects"
            className="flex items-center space-x-1 px-5 py-3 text-xs font-semibold text-zinc-800 dark:text-zinc-200 bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 rounded-xl transition-all"
          >
            <span>View Projects</span>
            <span className="text-zinc-400 dark:text-zinc-500 font-mono">→</span>
          </a>
        </div>

        {/* Quick Social Contacts */}
        <div className="mt-12 flex items-center justify-center space-x-4">
          <a
            id="hero-social-github"
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 rounded-lg transition-all"
            title="GitHub Profile"
          >
            <Github className="w-4.5 h-4.5" />
          </a>
          <a
            id="hero-social-linkedin"
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 rounded-lg transition-all"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-4.5 h-4.5" />
          </a>
          <a
            id="hero-social-mail"
            href={`mailto:${PERSONAL_INFO.email}`}
            className="p-2.5 bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 rounded-lg transition-all"
            title="Send Email"
          >
            <Mail className="w-4.5 h-4.5" />
          </a>
        </div>

        {/* Core Stats Bar */}
        <div
          id="hero-stats"
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-t border-b border-zinc-200/50 dark:border-zinc-900/80 max-w-4xl mx-auto"
        >
          <div className="flex flex-col items-center">
            <span className="font-sans text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
              B.Tech
            </span>
            <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mt-2">
              CSE (2022 - 2026)
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-sans text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
              3+
            </span>
            <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mt-2">
              Core Architectures
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-sans text-2xl sm:text-3xl font-bold text-gradient text-emerald-500">
              87%
            </span>
            <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mt-2">
              ML Prediction Metric
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-sans text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
              AWS
            </span>
            <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mt-2">
              Certified Associate
            </span>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="mt-16 animate-bounce text-zinc-300 dark:text-zinc-700">
          <a href="#skills" aria-label="Scroll to next page">
            <ArrowDown className="w-5 h-5 mx-auto" />
          </a>
        </div>
      </div>
    </section>
  );
}
