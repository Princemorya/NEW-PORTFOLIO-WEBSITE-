import { Code2, Server, Database, BrainCircuit, GraduationCap, Briefcase, Award, CheckCircle2 } from "lucide-react";
import { SKILL_CATEGORIES, EXPERIENCES, EDUCATION_DETAILS, CERTIFICATIONS } from "../data";

interface AboutAndSkillsProps {
  highlightedSkillCategory: string | null;
}

export default function AboutAndSkills({ highlightedSkillCategory }: AboutAndSkillsProps) {
  // Category visual themes
  const getCategoryStyles = (category: string) => {
    switch (category.toLowerCase()) {
      case "languages":
        return {
          cardBg: "bg-emerald-500/[0.02] dark:bg-emerald-500/[0.01] border-emerald-500/10 dark:border-emerald-500/[0.08] hover:border-emerald-500/30 focus:border-emerald-500/30 hover:shadow-sm hover:shadow-emerald-500/[0.02] hover:-translate-y-0.5",
          headerText: "text-emerald-700 dark:text-emerald-400 font-extrabold",
          badgeBg: "bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/10 dark:border-emerald-400/15 font-sans",
          iconContainer: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
          icon: <Code2 className="w-4 h-4 stroke-[2]" />,
          glowRing: "ring-emerald-500/20"
        };
      case "frontend":
        return {
          cardBg: "bg-blue-500/[0.02] dark:bg-blue-500/[0.01] border-blue-500/10 dark:border-blue-500/[0.08] hover:border-blue-500/30 focus:border-blue-500/30 hover:shadow-sm hover:shadow-blue-500/[0.02] hover:-translate-y-0.5",
          headerText: "text-blue-700 dark:text-blue-400 font-extrabold",
          badgeBg: "bg-blue-500/5 hover:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/10 dark:border-blue-400/15 font-sans",
          iconContainer: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
          icon: <Server className="w-4 h-4 stroke-[2]" />,
          glowRing: "ring-blue-500/20"
        };
      case "backend":
        return {
          cardBg: "bg-violet-500/[0.02] dark:bg-violet-500/[0.01] border-violet-500/10 dark:border-violet-500/[0.08] hover:border-violet-500/30 focus:border-violet-500/30 hover:shadow-sm hover:shadow-violet-500/[0.02] hover:-translate-y-0.5",
          headerText: "text-violet-700 dark:text-violet-400 font-extrabold",
          badgeBg: "bg-violet-500/5 hover:bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/10 dark:border-violet-400/15 font-sans",
          iconContainer: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
          icon: <Database className="w-4 h-4 stroke-[2]" />,
          glowRing: "ring-violet-500/20"
        };
      case "database":
        return {
          cardBg: "bg-pink-500/[0.02] dark:bg-pink-500/[0.01] border-pink-500/10 dark:border-pink-500/[0.08] hover:border-pink-500/30 focus:border-pink-500/30 hover:shadow-sm hover:shadow-pink-500/[0.02] hover:-translate-y-0.5",
          headerText: "text-pink-700 dark:text-pink-400 font-extrabold",
          badgeBg: "bg-pink-500/5 hover:bg-pink-500/10 text-pink-600 dark:text-pink-400 border border-pink-500/10 dark:border-pink-400/15 font-sans",
          iconContainer: "bg-pink-500/10 text-pink-600 dark:text-pink-400",
          icon: <Database className="w-4 h-4 stroke-[2]" />,
          glowRing: "ring-pink-500/20"
        };
      default:
        return {
          cardBg: "bg-amber-500/[0.02] dark:bg-amber-500/[0.01] border-amber-500/10 dark:border-amber-500/[0.08] hover:border-amber-500/30 focus:border-amber-500/30 hover:shadow-sm hover:shadow-amber-500/[0.02] hover:-translate-y-0.5",
          headerText: "text-amber-700 dark:text-amber-400 font-extrabold",
          badgeBg: "bg-amber-500/5 hover:bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/10 dark:border-amber-400/15 font-sans",
          iconContainer: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
          icon: <BrainCircuit className="w-4 h-4 stroke-[2]" />,
          glowRing: "ring-amber-500/20"
        };
    }
  };

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 bg-white dark:bg-zinc-950 border-b border-zinc-100 dark:border-zinc-900 transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Skills Column (Left side) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded animate-pulse">
                Capabilities
              </span>
              <h2 className="mt-3 font-sans text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
                Technical Stack
              </h2>
              <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Structured libraries, frameworks, database environments, and cognitive tools I deploy across high-grade production architectures.
              </p>
            </div>

            <div className="space-y-4">
              {SKILL_CATEGORIES.map((cat, idx) => {
                const isHighlighted = highlightedSkillCategory === cat.category;
                const style = getCategoryStyles(cat.category);
                return (
                  <div
                    key={idx}
                    id={`skill-cat-${cat.category.toLowerCase().replace(/\s+/g, "-")}`}
                    className={`p-5 border rounded-2xl transition-all duration-300 ${
                      isHighlighted
                        ? `bg-zinc-950 border-emerald-500 dark:bg-zinc-900 scale-102 ring-4 ${style.glowRing}`
                        : `${style.cardBg}`
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 pb-3 border-b border-zinc-200/40 dark:border-zinc-800/25">
                      <div className={`p-1.5 rounded-lg ${style.iconContainer}`}>
                        {style.icon}
                      </div>
                      <h3 className={`font-sans text-xs font-black uppercase tracking-wider ${isHighlighted ? "text-emerald-400" : style.headerText}`}>
                        {cat.category}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-3.5">
                      {cat.items.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className={`text-[10px] font-mono font-semibold px-3 py-1 rounded-lg transition-all duration-200 ${
                            isHighlighted
                              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/20 shadow-sm"
                              : `${style.badgeBg} hover:shadow-xs hover:scale-102`
                          }`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Experience, Education & Certifications Timeline Columns (Right side) */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Experience Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Briefcase className="w-5 h-5 text-emerald-500" />
                <h3 className="font-sans text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
                  Work History
                </h3>
              </div>
              
              <div className="relative pl-6 border-l-2 border-zinc-200 dark:border-zinc-800 space-y-8">
                {EXPERIENCES.map((exp, idx) => (
                  <div key={idx} className="relative">
                    {/* Circle bulb */}
                    <span className="absolute -left-[31px] top-1.5 w-4 h-4 bg-white dark:bg-zinc-950 border-2 border-emerald-500 rounded-full" />
                    
                    <div>
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <h4 className="font-sans text-sm font-bold text-zinc-900 dark:text-white">
                          {exp.role}
                        </h4>
                        <span className="text-[10px] font-mono text-zinc-400 font-medium">
                          {exp.duration}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-x-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">
                        <span>{exp.company}</span>
                        <span className="text-zinc-300 dark:text-zinc-700">•</span>
                        <span>{exp.location}</span>
                      </div>

                      <ul className="mt-3.5 space-y-2">
                        {exp.description.map((item, dIdx) => (
                          <li key={dIdx} className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed flex items-start">
                            <span className="text-emerald-500 mr-2 mt-1 select-none">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education Section */}
            <div className="space-y-6 pt-4">
              <div className="flex items-center space-x-2.5">
                <div className="p-1.5 bg-violet-500/10 text-violet-500 rounded-lg">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="font-sans text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
                  Academic Milestones
                </h3>
              </div>

              <div className="space-y-5">
                {EDUCATION_DETAILS.map((edu, idx) => {
                  // Determine corresponding bar widths and accent themes based on degree
                  const getThemeClasses = (index: number) => {
                    switch (index) {
                      case 0: // B.Tech
                        return {
                          barWidth: "73%",
                          colorClass: "bg-indigo-600 dark:bg-indigo-500",
                          textClass: "text-indigo-600 dark:text-indigo-400",
                          bgLight: "bg-indigo-500/10",
                          borderAccent: "group-hover:border-indigo-500/30",
                        };
                      case 1: // Class XII
                        return {
                          barWidth: "71%",
                          colorClass: "bg-teal-600 dark:bg-teal-500",
                          textClass: "text-teal-600 dark:text-teal-400",
                          bgLight: "bg-teal-500/10",
                          borderAccent: "group-hover:border-teal-500/30",
                        };
                      default: // Class X
                        return {
                          barWidth: "86%",
                          colorClass: "bg-emerald-600 dark:bg-emerald-500",
                          textClass: "text-emerald-600 dark:text-emerald-400",
                          bgLight: "bg-emerald-500/10",
                          borderAccent: "group-hover:border-emerald-500/30",
                        };
                    }
                  };

                  const theme = getThemeClasses(idx);

                  return (
                    <div
                      key={idx}
                      className="group relative p-5 bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200/50 dark:border-zinc-900 rounded-2xl transition-all duration-350 hover:-translate-y-1 hover:shadow-md hover:bg-white dark:hover:bg-zinc-900/60"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="space-y-1">
                          <span className="font-mono text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                            {edu.duration} • {edu.location}
                          </span>
                          <h4 className="font-sans text-sm font-bold text-zinc-900 dark:text-white tracking-tight group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
                            {edu.degree}
                          </h4>
                          <p className="font-sans text-xs text-zinc-500 dark:text-zinc-400">
                            {edu.institution}
                          </p>
                        </div>

                        {/* Grade performance widget */}
                        {edu.grade && (
                          <div className="shrink-0 flex flex-col items-start sm:items-end space-y-1.5 min-w-[124px]">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[9px] uppercase font-mono text-zinc-400 font-semibold">Score:</span>
                              <span className={`font-mono text-xs font-black px-2.5 py-0.5 rounded-full ${theme.bgLight} ${theme.textClass} tracking-wide border border-current/10`}>
                                {edu.grade}
                              </span>
                            </div>
                            
                            {/* Performance Bar */}
                            <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                              <div
                                className={`h-full rounded-full transition-all duration-1000 ${theme.colorClass}`}
                                style={{ width: theme.barWidth }}
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Achievements lists */}
                      {edu.details && edu.details.length > 0 && (
                        <div className="mt-4 pt-3.5 border-t border-zinc-200/50 dark:border-zinc-800/40 space-y-1.5">
                          {edu.details.map((detail, dIdx) => (
                            <div key={dIdx} className="flex items-start gap-2.5 text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
                              <span className={`w-1 h-1 rounded-full shrink-0 mt-1.5 ${theme.colorClass}`} />
                              <span>{detail}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Certifications Section */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-emerald-500" />
                <h3 className="font-sans text-xl font-bold text-zinc-900 dark:text-white tracking-tight">
                  Professional Credentials
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {CERTIFICATIONS.map((cert, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col p-4 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200/50 dark:border-zinc-900 rounded-xl"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mb-2.5" />
                    <span className="font-sans text-[11px] font-semibold text-zinc-800 dark:text-zinc-200 leading-relaxed">
                      {cert}
                    </span>
                    <span className="font-mono text-[9px] text-emerald-600 dark:text-emerald-400 font-medium mt-1 uppercase">
                      Verified
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
