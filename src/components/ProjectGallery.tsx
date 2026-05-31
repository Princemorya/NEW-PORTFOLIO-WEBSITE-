import { useState, useEffect } from "react";
import { FolderGit2, ArrowUpRight, Github, Code, Sparkles, SlidersHorizontal, Info, X } from "lucide-react";
import { PROJECTS } from "../data";
import { Project } from "../types";

import roomzyImg from "../assets/images/roomzy_project_1780249969815.png";
import teamTaskImg from "../assets/images/team_task_project_1780249990442.png";
import heartDiseaseImg from "../assets/images/heart_disease_project_1780250015520.png";

const getProjectImage = (imageKey?: string) => {
  if (imageKey === "roomzy") return roomzyImg;
  if (imageKey === "task-manager") return teamTaskImg;
  if (imageKey === "heart-disease") return heartDiseaseImg;
  return imageKey;
};

interface ProjectGalleryProps {
  activeSearchProjectId: string | null;
  clearSearchHighlight: () => void;
}

export default function ProjectGallery({ activeSearchProjectId, clearSearchHighlight }: ProjectGalleryProps) {
  const [activeTab, setActiveTab] = useState<'All' | 'Full-Stack' | 'Machine Learning'>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  // Filter projects list
  const filteredProjects = PROJECTS.filter(proj => {
    if (activeTab === "All") return true;
    return proj.category === activeTab;
  });

  // Handle outside search triggers
  useEffect(() => {
    if (activeSearchProjectId) {
      const match = PROJECTS.find(p => p.id === activeSearchProjectId);
      if (match) {
        // Open the detail modal instantly
        setSelectedProject(match);
        // Highlight card
        setHighlightedId(activeSearchProjectId);
        // Scroll to container
        const el = document.getElementById("projects");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
        // Remove highlight timing
        const timer = setTimeout(() => {
          setHighlightedId(null);
          clearSearchHighlight();
        }, 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [activeSearchProjectId]);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-50 dark:bg-zinc-900/40 border-b border-zinc-100 dark:border-zinc-900 transition-colors">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-violet-500 bg-violet-500/10 px-2.5 py-1 rounded">
              Engineering Logs
            </span>
            <h2 className="mt-3 font-sans text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
              Project Gallery
            </h2>
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              Interactive case studies and predictive pipelines crafted to resolve specific user constraints.
            </p>
          </div>

          {/* Filtering Tabs */}
          <div className="flex items-center space-x-1 p-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 rounded-xl mt-6 md:mt-0 max-w-fit">
            {(["All", "Full-Stack", "Machine Learning"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.8 text-[11px] font-semibold tracking-tight rounded-lg transition-all ${
                  activeTab === tab
                    ? "bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-sm font-bold border border-zinc-200/45 dark:border-zinc-700/50"
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((proj) => {
            const isHighlighted = highlightedId === proj.id;
            return (
              <div
                key={proj.id}
                id={`project-card-${proj.id}`}
                className={`group flex flex-col h-full bg-white dark:bg-zinc-950 border rounded-2xl overflow-hidden transition-all duration-500 ${
                  isHighlighted
                    ? "ring-2 ring-emerald-500 scale-102 border-emerald-500/50 dark:bg-zinc-900"
                    : "border-zinc-200/65 dark:border-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-800 hover:shadow-md"
                }`}
              >
                {/* Project Thumbnail with overlay-category */}
                <div className="relative aspect-video w-full bg-zinc-100 dark:bg-zinc-900 overflow-hidden border-b border-zinc-150 dark:border-zinc-900/40">
                  {proj.image ? (
                    <img
                      src={getProjectImage(proj.image)}
                      alt={proj.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-violet-500/10 to-indigo-500/10 text-violet-500 dark:text-violet-400">
                      <FolderGit2 className="w-10 h-10 stroke-[1.25]" />
                    </div>
                  )}
                  {/* Category overlay badge */}
                  <span className="absolute top-3.5 right-3.5 text-[9px] font-mono font-black uppercase tracking-wider px-2.5 py-1 bg-zinc-950/80 dark:bg-zinc-900/90 text-emerald-400 border border-white/10 dark:border-zinc-800 backdrop-blur-md rounded-full shadow-md">
                    {proj.category}
                  </span>
                </div>

                {/* Header text info */}
                <div className="p-6 pb-2">
                  <h3 className="font-sans text-base font-extrabold text-zinc-900 dark:text-white tracking-tight leading-normal group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors duration-300">
                    {proj.title}
                  </h3>
                </div>

                {/* Body Details */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed line-clamp-3">
                      {proj.description}
                    </p>

                    {/* Quick Stats list if exist */}
                    {proj.stats && (
                      <div className="mt-5 flex items-center gap-x-4 flex-wrap border-t border-b border-zinc-100 dark:border-zinc-900 py-3.5">
                        {proj.stats.map((stat, sIdx) => (
                          <div key={sIdx} className="flex flex-col">
                            <span className="font-sans text-xs font-bold text-zinc-900 dark:text-zinc-100">
                              {stat.value}
                            </span>
                            <span className="font-mono text-[8px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mt-0.5">
                              {stat.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer tools and triggers */}
                  <div className="mt-6">
                    <div className="flex flex-wrap gap-1 mb-5">
                      {proj.techStack.slice(0, 4).map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="text-[9px] font-mono font-medium bg-zinc-100/60 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 px-2 py-0.5 border border-zinc-150 dark:border-zinc-800/40 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                      {proj.techStack.length > 4 && (
                        <span className="text-[9px] font-mono text-zinc-400 px-1.5 py-0.5">
                          +{proj.techStack.length - 4} more
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        id={`proj-trigger-modal-${proj.id}`}
                        onClick={() => setSelectedProject(proj)}
                        className="inline-flex items-center space-x-1.5 text-xs font-bold text-zinc-700 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors"
                      >
                        <Info className="w-3.5 h-3.5" />
                        <span>Case Dynamics</span>
                      </button>

                      {proj.githubLink && (
                        <a
                          id={`proj-git-link-${proj.id}`}
                          href={proj.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-500 hover:text-zinc-950 dark:hover:text-white rounded-md transition-all"
                          title="Open Repository"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Full Modal Sheet Overlay */}
        {selectedProject && (
          <div
            id="project-overlay-modal"
            className="fixed inset-0 bg-zinc-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <div
              id="project-modal-container"
              className="bg-white dark:bg-zinc-950 max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-2xl border border-zinc-200 dark:border-zinc-900 shadow-2xl font-sans"
            >
              <div className="sticky top-0 bg-white/90 dark:bg-zinc-950/95 backdrop-blur-md px-6 py-4 border-b border-zinc-100 dark:border-zinc-900 flex items-center justify-between z-10">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4.5 h-4.5 text-violet-500" />
                  <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-violet-500">
                    Product Architecture
                  </span>
                </div>
                <button
                  id="close-project-modal"
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 hover:bg-zinc-150 dark:hover:bg-zinc-900 rounded-lg text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {selectedProject.image && (
                  <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-zinc-200/60 dark:border-zinc-800/80 shadow-md">
                    <img
                      src={getProjectImage(selectedProject.image)}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}

                <div>
                  <h3 className="font-sans text-2xl font-bold text-zinc-900 dark:text-white leading-snug">
                    {selectedProject.title}
                  </h3>
                  <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-mono px-2 py-0.5 uppercase tracking-wider bg-violet-600/10 text-violet-600 dark:text-violet-400 font-semibold rounded">
                      {selectedProject.category}
                    </span>
                    {selectedProject.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] font-mono px-2 py-0.5 bg-zinc-50 dark:bg-zinc-900 text-zinc-500 dark:text-zinc-400 border border-zinc-150 dark:border-zinc-800 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Long detailed summary */}
                <div className="space-y-2">
                  <h4 className="font-sans text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                    Core Mandate
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {selectedProject.longDescription}
                  </p>
                </div>

                {/* Key Features */}
                <div className="space-y-3">
                  <h4 className="font-sans text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider">
                    Implementation Metrics & Features
                  </h4>
                  <ul className="grid grid-cols-1 gap-2.5">
                    {selectedProject.features.map((feat, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed p-3 bg-zinc-50 dark:bg-zinc-900/50 rounded-xl flex items-start"
                      >
                        <span className="inline-block h-1.5 w-1.5 bg-violet-500 rounded-full mt-1.5 mr-2.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quick stats panel */}
                {selectedProject.stats && (
                  <div className="grid grid-cols-3 gap-3 p-4 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/60 rounded-xl">
                    {selectedProject.stats.map((stat, idx) => (
                      <div key={idx} className="text-center">
                        <div className="font-sans text-base font-bold text-zinc-900 dark:text-white">
                          {stat.value}
                        </div>
                        <div className="font-mono text-[9px] text-zinc-400 dark:text-zinc-500 uppercase mt-0.5">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Bottom Trigger Panel */}
                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900 flex justify-end gap-3 text-xs">
                  {selectedProject.githubLink && (
                    <a
                      id="modal-trigger-repo"
                      href={selectedProject.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 px-4 py-2 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-150 text-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 rounded-xl transition-all"
                    >
                      <Github className="w-4 h-4" />
                      <span>Repository</span>
                    </a>
                  )}
                  {selectedProject.liveLink && (
                    <a
                      id="modal-trigger-live"
                      href={selectedProject.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1.5 px-4 py-2 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 rounded-xl font-semibold hover:opacity-90 transition-all"
                    >
                      <span>Live Demo</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
