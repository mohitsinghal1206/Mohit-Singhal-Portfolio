"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Sparkles, Maximize2, Minimize2, BrainCircuit } from "lucide-react";
import { cn } from "@/lib/utils";

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const hasNotified = useRef(false);

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
      if (!hasNotified.current && window.scrollY > 100) {
        hasNotified.current = true;
        setHasUnread(true);
        playSound(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };
    
    const handleOpenChatbot = () => {
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
  }, []);

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
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-card"></span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text flex items-center gap-1.5">
                    Mac
                    <Sparkles size={12} className="text-cyan-400" />
                  </h3>
                  <p className="text-[10px] text-muted-dark font-mono uppercase tracking-wider">Mohit&apos;s AI Clone</p>
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
            <div className="p-4 md:p-6 flex flex-col gap-4 flex-grow overflow-y-auto custom-scrollbar bg-black/10">
              
              {/* System Notice */}
              <div className="flex justify-center">
                <span className="text-[10px] font-medium text-muted-dark uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full border border-border">
                  Integration in Progress
                </span>
              </div>

              {/* Bot Message */}
              <div className="flex gap-3 max-w-[85%]">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center flex-shrink-0 mt-1">
                  <Sparkles size={16} />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm p-4 text-sm md:text-base text-muted leading-relaxed shadow-sm">
                  <p className="mb-3 text-white font-medium">
                    Hi there! 👋 I&apos;m Mac (Mohit&apos;s AI Clone). 
                  </p>
                  <p className="mb-3">
                    I am currently offline while my knowledge base is being updated with Mohit&apos;s latest projects and experience. Please reach out to Mohit directly in the meantime!
                  </p>
                  <p className="text-cyan-400 font-medium flex items-center gap-2">
                    <Sparkles size={14} /> Integration in Progress
                  </p>
                </div>
              </div>
              
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-border bg-black/20">
              <div className="relative flex items-center">
                <input 
                  type="text" 
                  disabled
                  placeholder="Chat temporarily unavailable..." 
                  className="w-full bg-black/30 border border-border rounded-full pl-5 pr-12 py-3 text-sm text-white placeholder:text-muted focus:outline-none transition-colors opacity-70 cursor-not-allowed"
                />
                <button 
                  disabled
                  className="absolute right-2 p-2 rounded-full bg-primary/50 text-black cursor-not-allowed"
                >
                  <Send size={16} />
                </button>
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
