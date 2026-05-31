import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import { PERSONAL_INFO, PROJECTS, SKILL_CATEGORIES, EXPERIENCES, EDUCATION_DETAILS, CERTIFICATIONS, BLOG_POSTS } from "./src/data";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini safely
let ai: GoogleGenAI | null = null;
try {
  const apiKey = process.env.GEMINI_API_KEY;
  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  } else {
    console.warn("⚠️ GEMINI_API_KEY is not defined. AI Assistant will operate in fallback mode.");
  }
} catch (error) {
  console.error("Initialization error for GoogleGenAI:", error);
}

// Persisted Lists (simple local json storage)
const NEWSLETTER_FILE = path.join(process.cwd(), "newsletter_signups.json");
const CONTACTS_FILE = path.join(process.cwd(), "contact_messages.json");

const loadJsonFile = (filePath: string): any[] => {
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error(`Error loading file ${filePath}:`, err);
  }
  return [];
};

const saveJsonFile = (filePath: string, data: any[]) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error(`Error saving file ${filePath}:`, err);
  }
};

// --- API ROUTES ---

// Health route
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Prince AI Assistant Route
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages body. Must be an array of chat items." });
  }

  // Fallback if APIs are not configured
  if (!ai) {
    return res.json({
      text: "Hello! I am Prince's AI Assistant. We are running in a local session and process.env.GEMINI_API_KEY is missing, but let me quickly tell you that Prince is a talented Full-Stack Developer with hands-on experience in the MERN stack, PyTorch machine learning, and AWS cloud solutions! Ask me any question, and once your Gemini key is added via AI Studio Secrets, I'll answer dynamically using Google's native gemini-3.5-flash AI engine!"
    });
  }

  try {
    // Compile a highly rich, accurate description of Prince to inject as system instructions
    const princeKnowledgeBase = `
You are the official AI Assistant of Prince Mourya, representing him as an experienced Full Stack Developer.
Your goal is to converse smoothly, answer technical and professional questions about Prince, and share his contact information and project architectures.

Prince's Background & Profile:
- Name: ${PERSONAL_INFO.name}
- Profession: ${PERSONAL_INFO.tagline}
- Contact Details:
  - Email: ${PERSONAL_INFO.email}
  - Phone: ${PERSONAL_INFO.phone}
  - Github: ${PERSONAL_INFO.github}
  - LinkedIn: ${PERSONAL_INFO.linkedin}
  - Current Residence: ${PERSONAL_INFO.location}
- Professional Profile Summary:
  "${PERSONAL_INFO.summary}"

Technical Skills:
${SKILL_CATEGORIES.map(cat => `- ${cat.category}: ${cat.items.join(", ")}`).join("\n")}

Key Projects implemented by Prince:
${PROJECTS.map(proj => `
* Name: ${proj.title}
  Category: ${proj.category}
  Short Summary: ${proj.description}
  Details: ${proj.longDescription}
  Core Tech: ${proj.techStack.join(", ")}
  Key Features:
    ${proj.features.map(f => `  - ${f}`).join("\n")}
  Key Stats:
    ${proj.stats ? proj.stats.map(s => `  - ${s.label}: ${s.value}`).join("\n") : "None"}
`).join("\n")}

Experience:
${EXPERIENCES.map(exp => `
* Company: ${exp.company}
  Role: ${exp.role}
  Duration: ${exp.duration}
  Location: ${exp.location}
  Actions:
    ${exp.description.map(d => `  - ${d}`).join("\n")}
`).join("\n")}

Education:
${EDUCATION_DETAILS.map(edu => `
* Institution: ${edu.institution}
  Degree: ${edu.degree}
  Duration: ${edu.duration}
  Location: ${edu.location}
`).join("\n")}

Certifications obtained:
${CERTIFICATIONS.map(cert => `- ${cert}`).join("\n")}

Blogs authored by Prince:
${BLOG_POSTS.map(blog => `- "${blog.title}" published on ${blog.date}. Overview: ${blog.summary}`).join("\n")}

Guidelines for your Tone & Strategy:
1. Speak in first person singular when acting as 'Prince's AI avatar' or speak on behalf of Prince as his dedicated virtual co-pilot. Keep it friendly, highly competent, clean, and humble.
2. If asked about his contact details, share his email: ${PERSONAL_INFO.email} and his phone: ${PERSONAL_INFO.phone}.
3. Keep response paragraphs short and highly scannable using markdown formatting (bullet points, bold highlights, small tables).
4. If asked about topics completely unrelated to computers or Prince's projects, redirect politely to his experience and technical talents.
5. Keep descriptions precise, never exaggerate facts beyond this context.
`;

    // Map message list to Gemini standard
    // We map { role: 'user' | 'model', content: string } to Gemini structure
    const contents = messages.map(msg => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    }));

    // Call generateContent
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction: princeKnowledgeBase,
        temperature: 0.7,
      }
    });

    return res.json({ text: response.text });
  } catch (error: any) {
    console.error("Gemini API call failed:", error);
    return res.status(500).json({
      error: "Could not generate AI reply at this moment.",
      details: error.message
    });
  }
});

// Newsletter Signup Route
app.post("/api/newsletter", (req, res) => {
  const { email } = req.body;
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return res.status(400).json({ error: "Please enter a valid email address." });
  }

  const signups = loadJsonFile(NEWSLETTER_FILE);
  if (signups.some(s => s.email.toLowerCase() === email.toLowerCase())) {
    return res.json({ success: true, message: "You are already subscribed to Prince's newsletter!" });
  }

  signups.push({ email, subscribedAt: new Date().toISOString() });
  saveJsonFile(NEWSLETTER_FILE, signups);

  return res.json({ success: true, message: "Thank you! You've successfully subscribed to Prince's insights." });
});

// Contact Route
app.post("/api/contact", (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message fields are required." });
  }

  const messages = loadJsonFile(CONTACTS_FILE);
  const newMsg = {
    id: Date.now().toString(),
    name,
    email,
    subject: subject || "No Subject",
    message,
    sentAt: new Date().toISOString()
  };

  messages.push(newMsg);
  saveJsonFile(CONTACTS_FILE, messages);

  return res.json({
    success: true,
    message: "Your message has been received! Prince will reach out to you directly at " + email + "."
  });
});

// --- ENHANCED BUNDLER MIDDLEWARE OR ASSET HANDLER ---
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Prince's Portfolio server active on http://0.0.0.0:${PORT}`);
    console.log(`Environment mode: ${process.env.NODE_ENV || "development"}`);
  });
}

startServer();
