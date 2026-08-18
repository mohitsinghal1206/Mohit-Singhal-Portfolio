"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, Maximize2, Minimize2, BrainCircuit, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  
  const chatbotEnabled = process.env.NEXT_PUBLIC_CHATBOT_ENABLED !== "false";
  
  const [serverStatus, setServerStatus] = useState<'checking' | 'online' | 'offline'>('checking');
  
  const [messages, setMessages] = useState<{role: 'user'|'bot'|'error', content: string}[]>([
    { role: 'bot', content: "Hi there! 👋 I'm Mac [Beta] (Mohit's AI Assistant). How can I help you today?" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  
  const [sessionId] = useState(() => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatBodyRef = useRef<HTMLDivElement>(null);
  const hasNotified = useRef(false);

  // Health Check Logic
  const checkHealth = async () => {
    if (!chatbotEnabled) return;
    try {
      const apiUrl = process.env.NEXT_PUBLIC_CHAT_API_URL;
      if (!apiUrl) throw new Error("NEXT_PUBLIC_CHAT_API_URL is not configured");
      
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const res = await fetch(`${apiUrl}/health`, { signal: controller.signal });
      clearTimeout(timeoutId);
      
      if (res.ok) {
        setServerStatus('online');
      } else {
        setServerStatus('offline');
      }
    } catch (err) {
      setServerStatus('offline');
    }
  };

  useEffect(() => {
    if (chatbotEnabled) {
      checkHealth();
      const interval = setInterval(checkHealth, 30000); // Check every 30s
      return () => clearInterval(interval);
    }
  }, [chatbotEnabled]);

  useEffect(() => {
    if (!chatBodyRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatBodyRef.current;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 150;
    
    if (isNearBottom || isLoading) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen, isStreaming]);

  const handleSendMessage = async (overrideMessage?: string) => {
    const textToSend = typeof overrideMessage === 'string' ? overrideMessage : inputValue.trim();
    if (!chatbotEnabled || !textToSend || isLoading || isStreaming) return;
    
    if (typeof overrideMessage !== 'string') setInputValue("");
    setMessages(prev => [...prev, { role: 'user', content: textToSend }, { role: 'bot', content: "" }]);
    setIsLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_CHAT_API_URL;
      if (!apiUrl) throw new Error("NEXT_PUBLIC_CHAT_API_URL is not configured");
      
      const response = await fetch(`${apiUrl}/chat/stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: sessionId, message: textToSend, model: "gemini" }),
      });

      if (!response.ok) throw new Error(`API error: ${response.status}`);
      if (!response.body) throw new Error("No response body");

      setIsLoading(false);
      setIsStreaming(true);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          setMessages(prev => {
            const updated = [...prev];
            const lastIndex = updated.length - 1;
            if (updated[lastIndex].role === 'bot') {
                updated[lastIndex] = { 
                  ...updated[lastIndex], 
                  content: updated[lastIndex].content + chunk 
                };
            }
            return updated;
          });
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setServerStatus('offline'); 
      setMessages(prev => {
        const lastMsg = prev[prev.length - 1];
        if (lastMsg.role === 'bot' && lastMsg.content === "") {
           return [...prev.slice(0, -1), { role: 'error', content: "⚠️ Error: Unable to connect to backend server. Please try again later." }];
        }
        return [...prev, { role: 'error', content: "⚠️ Stream interrupted." }];
      });
      setIsLoading(false);
    } finally {
      setIsStreaming(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  const playSound = (isNotification = false) => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.type = "sine";
      
      if (isNotification) {
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
      } else {
        osc.frequency.setValueAtTime(isOpen ? 600 : 800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(isOpen ? 300 : 1200, ctx.currentTime + 0.1);
      }
      
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) {
      console.log("Audio playback failed", e);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Trigger notification sound reliably on first scroll
      if (!hasNotified.current && window.scrollY > 100 && chatbotEnabled) {
        hasNotified.current = true;
        setHasUnread(true);
        playSound(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };
    
    const handleOpenChatbot = () => {
       if (!chatbotEnabled) return;
       setIsOpen(true);
       setIsExpanded(true); // Open in theater mode when opened externally (e.g. from Hero)
       setHasUnread(false);
       playSound(false);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("open-chatbot", handleOpenChatbot);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("open-chatbot", handleOpenChatbot);
    };
  }, [chatbotEnabled]);

  // Lock body scroll when in theater mode
  useEffect(() => {
    if (isOpen && isExpanded) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen, isExpanded]);

  const handleOpen = () => {
    if (!chatbotEnabled) return;
    playSound(false);
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasUnread(false);
    }
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={cn(
              "rounded-2xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300",
              isExpanded 
                ? "fixed inset-4 sm:inset-10 md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[900px] md:h-[700px] z-[60]" 
                : "absolute bottom-16 right-0 mb-4 w-[90vw] sm:w-96 h-[500px]"
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-black/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center relative">
                  <Sparkles size={22} />
                  {chatbotEnabled && serverStatus === 'online' && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-card"></span>
                  )}
                  {chatbotEnabled && serverStatus === 'checking' && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-yellow-500 border-2 border-card animate-pulse"></span>
                  )}
                  {(!chatbotEnabled || serverStatus === 'offline') && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-red-500 border-2 border-card"></span>
                  )}
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text flex items-center gap-1.5">
                    Mac
                    <Sparkles size={12} className="text-cyan-400" />
                    <span className="bg-yellow-500/20 text-yellow-500 text-[9px] px-1.5 py-0.5 rounded font-bold tracking-wider ml-1">
                      BETA
                    </span>
                  </h3>
                  <p className="text-[10px] text-muted-dark font-mono uppercase tracking-wider">Mohit&apos;s AI Assistant</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-2 rounded-md text-muted hover:text-white hover:bg-white/10 transition-colors hidden md:block"
                  title={isExpanded ? "Minimize" : "Expand to Theater Mode"}
                >
                  {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-md text-muted hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div ref={chatBodyRef} className="p-4 md:p-6 flex flex-col gap-4 flex-grow overflow-y-auto custom-scrollbar bg-black/10">
              
              {/* System Notice */}
              <div className="flex justify-center">
                {!chatbotEnabled ? (
                  <span className="text-[10px] font-medium text-red-400 uppercase tracking-widest bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                    Connection Failed
                  </span>
                ) : serverStatus === 'checking' ? (
                  <span className="text-[10px] font-medium text-yellow-400 uppercase tracking-widest bg-yellow-500/10 px-3 py-1 rounded-full border border-yellow-500/20 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse"></span>
                    Connecting to Mac...
                  </span>
                ) : serverStatus === 'online' ? (
                  <span className="text-[10px] font-medium text-green-400 uppercase tracking-widest bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    SYSTEM ONLINE
                  </span>
                ) : (
                  <span className="text-[10px] font-medium text-red-400 uppercase tracking-widest bg-red-500/10 px-3 py-1 rounded-full border border-red-500/20 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                    Connection Failed
                  </span>
                )}
              </div>

              {!chatbotEnabled ? (
                /* Dummy Bot Message */
                <div className="flex gap-3 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0 mt-1">
                    <Sparkles size={16} />
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm p-4 text-sm md:text-base text-muted leading-relaxed shadow-sm">
                    <p className="mb-3 text-white font-medium">
                      Hi there! 👋 I&apos;m Mac [Beta] (Mohit&apos;s AI Assistant). 
                    </p>
                    <p className="mb-3">
                      <strong className="text-red-400">⚠️ Error 503: Connection Timeout.</strong><br/>
                      I am currently unable to connect to my Python LangChain backend. Please reach out to Mohit directly via email in the meantime!
                    </p>
                    <p className="text-red-400 font-medium flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Disconnected from Server
                    </p>
                  </div>
                </div>
              ) : (
                /* Dynamic Messages */
                <>
                  {messages.map((msg, idx) => (
                    <div key={idx} className={cn("flex gap-3", msg.role === 'user' ? "ml-auto flex-row-reverse max-w-[85%]" : "max-w-[95%] md:max-w-[90%]")}>
                      {msg.role !== 'user' && (
                        <div className={cn(
                          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1",
                          msg.role === 'error' ? "bg-red-500/20 text-red-400" : "bg-cyan-500/20 text-cyan-400"
                        )}>
                          {msg.role === 'error' ? <X size={16} /> : <Sparkles size={16} />}
                        </div>
                      )}
                      
                      <div className={cn(
                        "border rounded-2xl p-4 text-sm md:text-base leading-relaxed shadow-sm overflow-x-auto",
                        msg.role === 'user' 
                          ? "bg-primary/10 border-primary/20 text-white rounded-tr-sm" 
                          : msg.role === 'error'
                            ? "bg-red-500/10 border-red-500/20 text-red-400 rounded-tl-sm"
                            : "bg-white/5 border-white/10 text-muted rounded-tl-sm w-full"
                      )}>
                        {msg.role === 'bot' ? (
                           <div className="prose prose-invert prose-sm md:prose-base max-w-none prose-p:mb-3 last:prose-p:mb-0 prose-code:text-pink-400 prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10 prose-ul:my-2 prose-li:my-0.5">
                             {msg.content === "" && isLoading ? (
                               <div className="flex items-center gap-1 h-6">
                                 <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                                 <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                                 <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                               </div>
                             ) : (
                               <>
                                 <ReactMarkdown 
                                   remarkPlugins={[remarkGfm]}
                                   components={{
                                     a: ({node, ...props}) => {
                                       const href = props.href || "";
                                       const isEmail = href.startsWith('mailto:');
                                       
                                       // Check if the LLM outputted a raw URL instead of a descriptive markdown link
                                       let isRawUrl = false;
                                       if (typeof props.children === 'string' && (props.children.startsWith('http') || props.children.includes('@'))) isRawUrl = true;
                                       if (Array.isArray(props.children) && typeof props.children[0] === 'string' && (props.children[0].startsWith('http') || props.children[0].includes('@'))) isRawUrl = true;
                                       
                                       const displayText = isRawUrl ? (isEmail ? "Email Mohit" : "View Link") : props.children;

                                       return (
                                         <a 
                                           href={href}
                                           target="_blank" 
                                           rel="noopener noreferrer"
                                           className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-medium underline underline-offset-4 decoration-cyan-400/30 transition-colors no-underline"
                                         >
                                           <span>{displayText}</span>
                                           {!isEmail && <ExternalLink size={12} className="opacity-70 mb-0.5" />}
                                         </a>
                                       );
                                     }
                                   }}
                                 >
                                   {msg.content}
                                 </ReactMarkdown>
                                 {isStreaming && idx === messages.length - 1 && (
                                    <span className="inline-block w-1.5 h-4 ml-1 bg-cyan-400 animate-pulse align-middle"></span>
                                 )}
                               </>
                             )}
                           </div>
                        ) : (
                           <span className={msg.role === 'user' ? "text-white" : ""}>{msg.content}</span>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {/* Starter Prompts */}
                  {chatbotEnabled && messages.length === 1 && serverStatus !== 'offline' && (
                    <div className="flex flex-wrap gap-2 mt-2 w-full max-w-[85%] mx-auto md:ml-11">
                      {[
                        "Tell me about Mohit",
                        "What are his core skills?",
                        "Explore his AI projects",
                        "Tell me about his RAG work",
                        "What AI agents has he built?",
                        "Why should I hire Mohit?"
                      ].map((prompt, i) => (
                        <button
                          key={i}
                          onClick={() => handleSendMessage(prompt)}
                          disabled={isLoading || isStreaming}
                          className="text-xs md:text-sm bg-primary/5 hover:bg-primary/20 border border-primary/20 hover:border-primary/50 text-cyan-100 px-3 py-1.5 rounded-full transition-all duration-300 text-left disabled:opacity-50 disabled:cursor-not-allowed group flex items-center gap-2"
                        >
                          <span>{prompt}</span>
                          <Send size={10} className="opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-border bg-black/20">
              <div className="relative flex items-center">
                {!chatbotEnabled ? (
                  <>
                    <input 
                      type="text" 
                      disabled
                      placeholder="Connecting to server... (Failed)" 
                      className="w-full bg-black/30 border border-border rounded-full pl-5 pr-12 py-3 text-sm text-white placeholder:text-red-400/50 focus:outline-none transition-colors opacity-70 cursor-not-allowed"
                    />
                    <button 
                      disabled
                      className="absolute right-2 p-2 rounded-full bg-primary/50 text-black cursor-not-allowed"
                    >
                      <Send size={16} />
                    </button>
                  </>
                ) : (
                  <>
                    <input 
                      type="text" 
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={serverStatus === 'checking' ? "Connecting..." : "Message Mac..."}
                      className="w-full bg-black/30 border border-border rounded-full pl-5 pr-12 py-3 text-sm text-white placeholder:text-muted-dark focus:outline-none focus:border-primary/50 transition-colors"
                    />
                    <button 
                      onClick={() => handleSendMessage()}
                      disabled={!inputValue.trim() || isLoading || isStreaming}
                      className={cn(
                        "absolute right-2 p-2 rounded-full transition-colors",
                        inputValue.trim() && !isLoading && !isStreaming
                          ? "bg-primary text-black hover:bg-primary/90" 
                          : "bg-primary/20 text-black/50 cursor-not-allowed"
                      )}
                    >
                      <Send size={16} />
                    </button>
                  </>
                )}
              </div>
              <div className="mt-2 text-center text-[10px] text-muted-dark opacity-70">
                Currently in Beta testing phase. Built by Mohit to showcase RAG concepts.
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleOpen}
        className={cn(
          "w-14 h-14 rounded-full text-white flex items-center justify-center transition-all duration-300 group relative z-50 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500",
          hasUnread && !isOpen 
            ? "animate-pulse shadow-[0_0_30px_rgba(168,85,247,0.6)]" 
            : "shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)]"
        )}
      >
        <AnimatePresence>
          {hasUnread && !isOpen && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 border-2 border-background text-white text-[10px] font-bold flex items-center justify-center shadow-lg z-10"
            >
              1
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Sparkles size={24} className={hasUnread ? "animate-bounce" : "group-hover:animate-pulse"} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
