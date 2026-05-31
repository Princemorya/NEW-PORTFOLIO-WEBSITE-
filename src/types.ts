export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  techStack: string[];
  features: string[];
  liveLink?: string;
  githubLink?: string;
  stats?: { label: string; value: string }[];
  category: 'Full-Stack' | 'Frontend' | 'Machine Learning' | 'Other';
  image?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  date: string;
  readTime: string;
  tags: string[];
  author: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  location: string;
  description: string[];
}

export interface Education {
  institution: string;
  degree: string;
  duration: string;
  location: string;
  grade?: string;
  details?: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: string;
}
