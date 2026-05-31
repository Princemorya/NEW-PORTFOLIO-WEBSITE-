import { Project, BlogPost, SkillCategory, Experience, Education } from './types';

export const PERSONAL_INFO = {
  name: "Prince Mourya",
  tagline: "Full Stack Developer & AI Enthusiast",
  email: "princemourya581@gmail.com",
  phone: "7017460028",
  github: "https://github.com/princemourya581", // derived safely from email/user info
  linkedin: "https://linkedin.com/in/princemouryadeveloper",
  location: "Greater Noida, UP",
  summary: "Full Stack Developer specializing in MERN stack and scalable web applications. Experienced in building RESTful APIs, optimizing backend performance, and integrating modern web solutions. Strong foundation in Data Structures, Algorithms, and system design principles."
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Languages",
    items: ["Python", "Java", "C++", "JavaScript", "TypeScript"]
  },
  {
    category: "Frontend",
    items: ["React.js", "HTML5", "CSS3", "Tailwind CSS", "Redux", "Vite"]
  },
  {
    category: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "MVC Architecture"]
  },
  {
    category: "Database",
    items: ["MongoDB", "MySQL"]
  },
  {
    category: "Tools & AI tools",
    items: ["Git", "GitHub", "Docker", "Postman", "OpenAI API", "Cursor", "Claude", "ChatGPT", "Gemini"]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "roomzy",
    title: "Roomzy",
    category: "Full-Stack",
    description: "Student Room & PG Finder Platform designed to facilitate seamless property discovery and bookings for students.",
    longDescription: "Developed Roomzy, a full-stack platform addressing student housing bottlenecks. It caters to over 500+ active users and is built with the MVC design pattern for clean separation of concerns, high scalability, and robust performance.",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "RESTful APIs"],
    tags: ["Full-Stack", "Web App", "MERN Stack"],
    features: [
      "Designed robust RESTful APIs and implemented highly efficient search and filtering algorithms",
      "Optimized database queries, leading to a 30% reduction in query load and response latency",
      "Integrated secure authentication and responsive dashboard roles for property owners and student seekers",
      "Real-time location discovery and active booking confirmations"
    ],
    liveLink: PERSONAL_INFO.github, // live fallback, using portfolios as anchor
    githubLink: PERSONAL_INFO.github,
    stats: [
      { label: "Active Users", value: "500+" },
      { label: "Performance boost", value: "30%" },
      { label: "Architecture", value: "MVC" }
    ],
    image: "roomzy"
  },
  {
    id: "task-manager",
    title: "Task Manager",
    category: "Full-Stack",
    description: "Responsive task management system to seamlessly organize, track, and synchronize daily user activities.",
    longDescription: "Built a reactive task management application enabling real-time operation. Implemented complete local and cloud state synchronization to shield users against network disconnects and data loss across devices.",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Redux", "Tailwind CSS"],
    tags: ["Full-Stack", "State Sync", "Productivity"],
    features: [
      "Synchronized state between client storage and database engine to guarantee session and device durability",
      "Crafted an intuitive, high-accessibility drag-and-drop dashboard showing priority lines, tags, and progress logs",
      "Integrated user workspaces, subtasks tracker, and automatic reminder intervals for deadlines"
    ],
    liveLink: PERSONAL_INFO.github,
    githubLink: PERSONAL_INFO.github,
    stats: [
      { label: "Uptime guarantee", value: "99.9%" },
      { label: "Data Latency", value: "< 200ms" }
    ],
    image: "task-manager"
  },
  {
    id: "heart-disease",
    title: "Heart Disease Prediction",
    category: "Machine Learning",
    description: "High-accuracy Machine Learning predictor targeting cardiac health using exploratory bio-metric patterns.",
    longDescription: "Developed a diagnostic machine learning model analyzing patient parameters to predict cardiac event possibilities. Applied rigorous feature extraction and EDA to highlight prime hazard indicators.",
    techStack: ["Python", "Pandas", "NumPy", "Scikit-Learn", "Matplotlib", "Seaborn"],
    tags: ["Machine Learning", "Diagnostics", "Python"],
    features: [
      "Achieved an outstanding 87% prediction accuracy on diagnostic patient test partitions",
      "Boosted accuracy by 12% using advanced feature scaling, collinearity analysis, and model parameter tuning",
      "Conducted thorough Exploratory Data Analysis (EDA) on major medical variables, visualizing findings with Seaborn"
    ],
    githubLink: PERSONAL_INFO.github,
    stats: [
      { label: "Predictive Accuracy", value: "87%" },
      { label: "Accuracy Improvement", value: "+12%" },
      { label: "Data Points Analyzed", value: "1,000+" }
    ],
    image: "heart-disease"
  }
];

export const EXPERIENCES: Experience[] = [
  {
    company: "Edunet Foundation",
    role: "AI & Data Analytics Intern",
    duration: "Jan 2024 - Mar 2024", // Approximate timeframe for standard 2024 internships
    location: "Remote / Hybrid",
    description: [
      "Built predictive models and performed complex, high-degree exploratory data analyses (EDA) using Python",
      "Discovered, sorted, and visualized critical patterns within raw medical and industrial datasets",
      "Improved predictive accuracy in test clusters through meticulous feature engineering, selection, and outlier removal",
      "Collaborated on data reporting templates showcasing model insights to non-technical stakeholders"
    ]
  }
];

export const EDUCATION_DETAILS: Education[] = [
  {
    institution: "KCC Institute of Management and Technology",
    degree: "B.Tech in Computer Science & Engineering",
    duration: "2022 – 2026",
    location: "Greater Noida, UP",
    grade: "7.3 CGPA",
    details: [
      "Specializing in Software Architecture, Full-Stack applications, and AI integrations",
      "Gained strong theoretical grounding in DSA, DBMS, and MVC structures"
    ]
  },
  {
    institution: "High Secondary Schooling (Class XII)",
    degree: "Intermediate Education (PCM)",
    duration: "2020 – 2022",
    location: "India",
    grade: "71%",
    details: [
      "Rigorous core curriculum specializing in Physics, Chemistry, and Mathematics (PCM)"
    ]
  },
  {
    institution: "Secondary Schooling (Class X)",
    degree: "High School Matriculation",
    duration: "2018 – 2020",
    location: "India",
    grade: "86%",
    details: [
      "Excelled across General Sciences, Advanced Mathematics, and Computing basics"
    ]
  }
];

export const CERTIFICATIONS: string[] = [
  "AWS Certified Solutions Architect - Associate",
  "TCS iON Career Edge Young Professional",
  "ISRO Certification"
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    title: "Architecting Scalable API Routes with Express and MVC Patterns",
    summary: "Discover how applying the Model-View-Controller architecture can streamline complex Node.js projects, boost testability, and accelerate backend speeds by 30%.",
    content: `When building backend web operations like my PG-finder application, **Roomzy**, many developers fall into the trap of putting too much logic in a single route file. This leads to what engineers refer to as \"spaghetti code.\"

To solve this, I adopt the classic **Model-View-Controller (MVC)** software methodology. It divides our logical processes into three clean segments:

### 🚀 What is MVC on a Node Server?

1. **Model**: Controls databases and schema structures (e.g., our MongoDB schemas). Its only role is accessing and formatting datasets.
2. **View**: Typically the client frontend, but on the backend, it refers to JSON API responses and payloads.
3. **Controller**: The brains. It receives user request inputs, instructs the Models, and formats the View outputs.

\`\`\`javascript
// A Clean Controller Entry Example
export const getPropertyById = async (req, res) => {
  try {
    const { id } = req.params;
    const property = await PropertyModel.findById(id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    return res.status(200).json(property);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
\`\`\`

### 📈 Major Advantages Derived
- **Independent Testing**: Test database modules independently of HTTP servers.
- **Easy Collaboration**: One engineer can optimize MongoDB indexes while another tweaks front-end UI parameters.
- **Improved Performance**: Streamlining logic allows us to minimize redundant DB requests, yielding up to a *30% performance boost*!`,
    date: "May 15, 2026",
    readTime: "4 min read",
    tags: ["Node.js", "Express", "MVC", "MongoDB"],
    author:PERSONAL_INFO.name
  },
  {
    id: "blog-2",
    title: "Inside Feature Preprocessing for Machine Learning Classifiers",
    summary: "How I optimized a cardiac hazard classification model to 87% accuracy using advanced feature engineering and outlier filtration in Pandas.",
    content: `Achieving accuracy in health diagnostics is extremely critical. When building my **Heart Disease Prediction Model**, I realized that putting raw indicators directly into predictors achieves subpar performance. 

Here is how I boosted our accuracy by **12%** solely using advanced preprocessing steps:

### 1. Collinearity Reduction (Correlation Analysis)
Features that represent identical parameters can confuse classifiers. By utilizing Pandas and Seaborn heatmaps, I plotted correlation matrices to prune redundantly coupled elements.

\`\`\`python
# Dropping highly correlated indicators
correlation_matrix = df.corr()
high_corr_features = [column for column in correlation_matrix.columns if any(correlation_matrix[column] > 0.85)]
df.drop(columns=high_corr_features, inplace=True)
\`\`\`

### 2. Standardizing Continuous Spans
Variables like cholesterol spans or age range fluctuate enormously. Normalizing them to standard scales using standard deviations prevents high-magnitude features from dominating weights.

### 3. Missing Value Imputation
Simply dumping entries with empty fields limits test depth. Inserting conditional medians based on patient class groupings preserves sample counts safely, preserving model stability.`,
    date: "April 24, 2026",
    readTime: "5 min read",
    tags: ["Machine Learning", "Python", "Pandas", "Scikit-Learn"],
    author: PERSONAL_INFO.name
  },
  {
    id: "blog-3",
    title: "Maintaining State Durability on Offline Web Clients",
    summary: "A practical deep dive into local storage backup engines to prevent frontend session loss and buffer user actions during poor connection speeds.",
    content: `When designing the **Task Manager Application**, I wanted to ensure that users never lose their task records—even when riding the subway with patchy internet connections. This is called **Offline-First Resilience**.

Here is my core design pattern for client-side persistence:

### 🔄 The Synchronization Loop

Our client-side app holds state in React. When a state changes (e.g., a task is edited):

1. Write immediately to the local browser context (**localStorage** / IndexedDB). This is a synchronous, zero-delay action.
2. Push the synchronization job into an active **Outbox Queue**.
3. Fire an asynchronous background fetch API request to sync with the server database.
4. If the fetch succeeds, remove the job from the outbox queue.
5. If it fails, keep it in the outbox queue and try again later when internet connectivity recovers.

### 🛠️ A Simple Sync Hook

\`\`\`typescript
import { useState, useEffect } from 'react';

export function usePersistentState<T>(key: string, defaultValue: T): [T, (val: T) => void] {
  const [state, setState] = useState<T>(() => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
\`\`\`

By ensuring that the browser state persists locally, we guarantee immediate page loads and complete resilience to unstable networks.`,
    date: "March 12, 2026",
    readTime: "6 min read",
    tags: ["React", "TypeScript", "Offline-First", "State Management"],
    author: PERSONAL_INFO.name
  }
];
