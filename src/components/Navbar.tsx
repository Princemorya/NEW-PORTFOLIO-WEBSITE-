import { useState, useEffect, useRef } from "react";
import { Search, Moon, Sun, Menu, X, ArrowUpRight, Code, MessageSquare, BookOpen, User } from "lucide-react";
import { PROJECTS, BLOG_POSTS, SKILL_CATEGORIES } from "../data";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
  onSearchSelect: (type: 'project' | 'blog' | 'skill', idOrName: string) => void;
}

interface SearchResult {
  id: string;
  title: string;
  category: string;
  type: 'project' | 'blog' | 'skill';
}

export default function Navbar({ darkMode, setDarkMode, onSearchSelect }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);

  // Close search suggestion list on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Update search suggestions in real-time
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results: SearchResult[] = [];

    // Search Projects
    PROJECTS.forEach(proj => {
      if (
        proj.title.toLowerCase().includes(query) ||
        proj.description.toLowerCase().includes(query) ||
        proj.techStack.some(tech => tech.toLowerCase().includes(query))
      ) {
        results.push({
          id: proj.id,
          title: proj.title,
          category: proj.category,
          type: 'project'
        });
      }
    });

    // Search Blogs
    BLOG_POSTS.forEach(blog => {
      if (
        blog.title.toLowerCase().includes(query) ||
        blog.summary.toLowerCase().includes(query) ||
        blog.tags.some(tag => tag.toLowerCase().includes(query))
      ) {
        results.push({
          id: blog.id,
          title: blog.title,
          category: "Blog Post",
          type: 'blog'
        });
      }
    });

    // Search Skills
    SKILL_CATEGORIES.forEach(cat => {
      const matchingItems = cat.items.filter(skill => skill.toLowerCase().includes(query));
      if (cat.category.toLowerCase().includes(query) || matchingItems.length > 0) {
        results.push({
          id: cat.category,
          title: matchingItems.length > 0 ? `${cat.category} (${matchingItems[0]})` : cat.category,
          category: "Skill Pool",
          type: 'skill'
        });
      }
    });

    setSearchResults(results.slice(0, 6)); // limit to top 6 results
  }, [searchQuery]);

  const handleResultClick = (result: SearchResult) => {
    onSearchSelect(result.type, result.id);
    setSearchQuery("");
    setIsSearchFocused(false);
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: "Portfolio", href: "#hero", icon: User },
    { name: "Skills", href: "#skills", icon: Code },
    { name: "Projects", href: "#projects", icon: ArrowUpRight },
    { name: "Blog", href: "#blog", icon: BookOpen },
    { name: "AI Assistant", href: "#ai-assistant", icon: MessageSquare },
  ];

  return (
    <nav className="sticky top-0 z-50 transition-colors duration-300 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <a
            href="#hero"
            id="nav-logo"
            className="flex items-center space-x-2 text-zinc-900 dark:text-white"
          >
            <div className="relative flex items-center justify-center w-9 h-9 font-mono font-bold text-sm text-white bg-zinc-950 dark:bg-white dark:text-zinc-950 rounded-lg shadow-sm border border-zinc-800 dark:border-zinc-200">
              P
              <span className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white dark:border-zinc-950" />
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-bold tracking-tight text-sm leading-none">Prince Mourya</span>
              <span className="font-mono text-[10px] text-zinc-500 dark:text-emerald-400 mt-1 leading-none font-medium">@princemourya581</span>
            </div>
          </a>

          {/* Desktop Search Center */}
          <div ref={searchRef} className="hidden md:relative md:block w-72 max-w-lg mx-6">
            <div className="relative">
              <input
                id="search-input-desktop"
                type="text"
                placeholder="Search projects, skills, blogs..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchFocused(true);
                }}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full text-zinc-800 dark:text-zinc-100 text-xs pl-9 pr-4 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-zinc-950 dark:focus:ring-white focus:border-transparent transition-all font-sans"
              />
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-400" />
            </div>

            {/* Suggestions Overlay */}
            {isSearchFocused && searchResults.length > 0 && (
              <div
                id="search-suggestions-desktop"
                className="absolute left-0 right-0 mt-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl overflow-hidden z-50 text-left font-sans animate-fade-in"
              >
                <div className="px-3 py-1.5 bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-100 dark:border-zinc-700">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400 dark:text-zinc-500">
                    Search Matches
                  </span>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {searchResults.map((result, idx) => (
                    <button
                      key={idx}
                      id={`search-item-${result.type}-${result.id}`}
                      onClick={() => handleResultClick(result)}
                      className="w-full flex items-center justify-between px-4 py-2.5 text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 border-b border-zinc-100 dark:border-zinc-800/50 last:border-0 transition-colors text-left"
                    >
                      <div className="flex flex-col">
                        <span className="font-medium text-zinc-900 dark:text-white truncate max-w-[180px]">
                          {result.title}
                        </span>
                        <span className="text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">
                          {result.category}
                        </span>
                      </div>
                      <span className="text-[9px] px-2 py-0.5 font-mono uppercase bg-zinc-100 dark:bg-zinc-800 rounded text-zinc-500 dark:text-emerald-400 border border-zinc-200/50 dark:border-zinc-700/50">
                        {result.type}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Nav items list */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                id={`nav-${link.name.toLowerCase().replace(" ", "-")}`}
                href={link.href}
                className="text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors tracking-tight"
              >
                {link.name}
              </a>
            ))}

            {/* Dark/Light toggle */}
            <button
              id="theme-toggler-desktop"
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 focus:outline-none transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="h-4.5 w-4.5" /> : <Moon className="h-4.5 w-4.5" />}
            </button>
          </div>

          {/* Mobile Right Bar */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              id="theme-toggler-mobile"
              onClick={() => setDarkMode(!darkMode)}
              className="p-1.5 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900 focus:outline-none transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none transition-colors"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div id="mobile-drawer" className="md:hidden border-t border-zinc-100 dark:border-zinc-900 bg-white dark:bg-zinc-950 py-4 px-4 space-y-3 font-sans shadow-lg animate-slide-down">
          {/* Mobile Search */}
          <div className="relative">
            <input
              id="search-input-mobile"
              type="text"
              placeholder="Search projects, skills, blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-zinc-800 dark:text-zinc-100 text-xs pl-9 pr-4 py-2 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-zinc-950 dark:focus:ring-white transition-all"
            />
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-400" />

            {/* Mobile Results */}
            {searchQuery.trim().length > 0 && searchResults.length > 0 && (
              <div id="search-suggestions-mobile" className="absolute left-0 right-0 mt-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl overflow-hidden z-50 text-left max-h-52 overflow-y-auto">
                {searchResults.map((result, idx) => (
                  <button
                    key={idx}
                    id={`mobile-search-item-${result.type}-${result.id}`}
                    onClick={() => handleResultClick(result)}
                    className="w-full flex items-center justify-between px-3.5 py-2 text-xs hover:bg-zinc-50 dark:hover:bg-zinc-800 border-b border-zinc-100 dark:border-zinc-800 last:border-0 transition-colors text-left"
                  >
                    <div>
                      <div className="font-semibold text-zinc-900 dark:text-white truncate max-w-[200px]">{result.title}</div>
                      <div className="text-[10px] text-zinc-400 dark:text-zinc-500">{result.category}</div>
                    </div>
                    <span className="text-[8px] px-1.5 py-0.2 bg-zinc-100 dark:bg-zinc-800 rounded text-zinc-500 dark:text-emerald-400 font-mono">
                      {result.type}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  id={`mobile-nav-${link.name.toLowerCase().replace(" ", "-")}`}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center space-x-2 p-3 text-xs font-semibold text-zinc-700 dark:text-zinc-200 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-900 border border-zinc-100 dark:border-zinc-900"
                >
                  <Icon className="h-4 w-4 text-zinc-400 dark:text-zinc-500" />
                  <span>{link.name}</span>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
