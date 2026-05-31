import { useState, useEffect, useRef } from "react";
import { MessageSquare, Send, Sparkles, User, RefreshCw, Terminal, AlertTriangle } from "lucide-react";
import { ChatMessage } from "../types";

export default function AiAssistant() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const listEndRef = useRef<HTMLDivElement>(null);

  const presetSuggestions = [
    "Tell me about Prince's Roomzy PG project",
    "What are Prince's core backend development skills?",
    "Does Prince have any certified AWS credentials?",
    "Review Prince's experience at Edunet Foundation"
  ];

  // Load starter messages
  useEffect(() => {
    setMessages([
      {
        id: "start-1",
        role: "model",
        content: "Hello! I am Prince Mourya's Virtual Assistant. I am backed by real context from Prince's resume records and powered by Google's native gemini-3.5-flash AI engine! Ask me anything regarding his engineering skills, project topologies, writing publications, or credentials.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  }, []);

  // Sync scroll focus
  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    setErrorMsg(null);
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Package messages for history context
      const chatHistory = [...messages, userMsg].map(m => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: chatHistory })
      });

      if (!res.ok) {
        throw new Error("Failed to consult Gemini Assistant. Key may be missing or limit exceeded.");
      }

      const data = await res.json();
      
      setMessages(prev => [...prev, {
        id: `reply-${Date.now()}`,
        role: "model",
        content: data.text || "I was unable to assemble a reply. Please try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } catch (err: any) {
      console.error("AI chat error:", err);
      setErrorMsg(err.message || "An error occurred during transaction.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: "start-req",
        role: "model",
        content: "Session refreshed! Ask me anything regarding Prince Mourya's achievements, skills, or portfolio insights.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setErrorMsg(null);
  };

  return (
    <section id="ai-assistant" className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-50 dark:bg-zinc-900/40 border-b border-zinc-100 dark:border-zinc-900 transition-colors">
      <div className="max-w-5xl mx-auto">
        
        {/* Title & Info Banner */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-teal-600 bg-teal-600/10 px-2.5 py-1 rounded">
            Virtual Co-Pilot
          </span>
          <h2 className="mt-3 font-sans text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
            Ask Prince’s AI Companion
          </h2>
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
            A real-time artificial agent calibrated with Prince Mourya's professional background records to answer questions about his software structures.
          </p>
        </div>

        {/* Console Mesh */}
        <div className="bg-white dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-900 rounded-2xl overflow-hidden shadow-xl flex flex-col h-[520px] font-sans">
          
          {/* Deck Header */}
          <div className="px-5 py-4 bg-zinc-50/50 dark:bg-zinc-900/40 border-b border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="relative">
                <div className="w-8 h-8 rounded-lg bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 flex items-center justify-center font-mono font-bold text-sm border border-zinc-805 dark:border-zinc-150">
                  PM
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border border-white dark:border-zinc-950 rounded-full" />
              </div>

              <div>
                <div className="flex items-center space-x-1">
                  <span className="font-sans text-xs font-bold text-zinc-900 dark:text-white">Prince Virtual AI</span>
                  <Sparkles className="w-3 h-3 text-emerald-500" />
                </div>
                <span className="font-mono text-[9px] text-zinc-400 hover:text-zinc-500">gemini-3.5-flash engine active</span>
              </div>
            </div>

            <button
              onClick={handleClearChat}
              className="p-1.8 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors text-xs"
              title="Reset conversation"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* List Stream viewport */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-zinc-50/10 dark:bg-zinc-950/10">
            {messages.map((message) => {
              const isAi = message.role === "model";
              return (
                <div key={message.id} className={`flex items-start gap-3.5 ${isAi ? "" : "flex-row-reverse"}`}>
                  
                  {/* Icon Avatar */}
                  <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border text-[10px] ${
                    isAi
                      ? "bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 border-zinc-800 dark:border-zinc-200"
                      : "bg-emerald-500/10 text-emerald-600 border-emerald-500/10 font-bold"
                  }`}>
                    {isAi ? <Terminal className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                  </div>

                  {/* Bubble content */}
                  <div className={`max-w-[80%] flex flex-col space-y-1`}>
                    <div className={`p-4 rounded-2xl text-xs sm:text-[13px] leading-relaxed font-sans ${
                      isAi
                        ? "bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-200/40 dark:border-zinc-850/60 shadow-sm"
                        : "bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950"
                    }`}>
                      {/* Simple paragraph or newline formatting */}
                      {message.content.split("\n\n").map((chunk, cIdx) => (
                        <p key={cIdx} className={`${cIdx > 0 ? "mt-2.5" : ""}`}>
                          {chunk.split("\n").map((line, lIdx) => {
                            if (line.startsWith("- ") || line.startsWith("* ")) {
                              return (
                                <span key={lIdx} className="block pl-3 relative mt-1">
                                  <span className="absolute left-0 top-1 text-emerald-500">•</span>
                                  {line.replace(/^[-*]\s+/, "")}
                                </span>
                              );
                            }
                            return <span key={lIdx} className="block">{line}</span>;
                          })}
                        </p>
                      ))}
                    </div>
                    <span className="text-[9px] font-mono text-zinc-400 px-1 self-end">
                      {message.timestamp}
                    </span>
                  </div>

                </div>
              );
            })}

            {/* Simulated Loading Typing effect */}
            {isLoading && (
              <div className="flex items-start gap-3.5 animate-pulse">
                <div className="w-7 h-7 rounded-lg bg-zinc-900 dark:bg-zinc-200 text-white dark:text-zinc-850 flex items-center justify-center shrink-0 border border-zinc-800">
                  <Terminal className="w-3.5 h-3.5" />
                </div>
                <div className="bg-white dark:bg-zinc-900 p-4 border border-zinc-200/40 dark:border-zinc-850/60 rounded-2xl max-w-sm">
                  <div className="flex items-center space-x-1.5 py-1">
                    <span className="w-2 h-2 bg-zinc-300 dark:bg-zinc-600 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-zinc-300 dark:bg-zinc-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 bg-zinc-300 dark:bg-zinc-600 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}

            {/* Error indicators */}
            {errorMsg && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/15 rounded-xl text-xs text-rose-600 dark:text-rose-400 flex items-start space-x-2">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold">Execution Error: </span>
                  <span>{errorMsg}</span>
                </div>
              </div>
            )}

            <div ref={listEndRef} />
          </div>

          {/* Quick presets layout */}
          {messages.length < 3 && (
            <div className="px-5 py-3 border-t border-zinc-100 dark:border-zinc-900 bg-zinc-50/20 dark:bg-zinc-900/10 flex flex-wrap gap-2">
              {presetSuggestions.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(preset)}
                  className="text-[10px] font-mono font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white px-3 py-1 bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800 rounded-full hover:border-zinc-300 dark:hover:border-zinc-750 transition-colors cursor-pointer text-left"
                >
                  {preset}
                </button>
              ))}
            </div>
          )}

          {/* Form console input controls */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(inputValue);
            }}
            className="p-3.5 bg-zinc-50/50 dark:bg-zinc-900/40 border-t border-zinc-100 dark:border-zinc-900 flex items-center space-x-3.5"
          >
            <input
              id="ai-console-input"
              type="text"
              placeholder="Query Prince's virtual agent about Roomzy, code skills..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isLoading}
              className="flex-1 bg-white dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 text-xs px-4 py-3 border border-zinc-200 dark:border-zinc-850 rounded-xl focus:outline-none focus:ring-1 focus:ring-zinc-950 dark:focus:ring-white transition-all disabled:opacity-50"
            />

            <button
              id="send-ai-message"
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="p-3 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:opacity-90 rounded-xl transition-all disabled:opacity-30 active:scale-95 cursor-pointer shrink-0"
              aria-label="Send query"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>

      </div>
    </section>
  );
}
