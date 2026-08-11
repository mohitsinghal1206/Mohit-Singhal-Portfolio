"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, Sparkles } from "lucide-react";

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);

  useEffect(() => {
    // Delay the notification to simulate it arriving after the page loads
    const timer = setTimeout(() => {
      setHasUnread(true);
      
      // Attempt to play a subtle "tick/pop" sound
      // Note: Browsers may block this if the user hasn't interacted with the page yet
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        
        // High pitched pop sound
        osc.type = "sine";
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.1);
        
        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
        
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.1);
      } catch (e) {
        console.log("Audio autoplay blocked by browser");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleOpen = () => {
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
            className="absolute bottom-16 right-0 mb-4 w-80 sm:w-96 rounded-2xl border border-border bg-card/95 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-black/20">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center relative">
                  <Bot size={18} />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-card"></span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-text flex items-center gap-1.5">
                    Mohit&apos;s AI Assistant
                    <Sparkles size={12} className="text-primary" />
                  </h3>
                  <p className="text-[10px] text-muted-dark font-mono uppercase tracking-wider">GPT-4o / LangChain</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-md text-muted hover:text-white hover:bg-white/10 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 flex flex-col gap-4 h-72 overflow-y-auto custom-scrollbar bg-black/10">
              
              {/* System Notice */}
              <div className="flex justify-center">
                <span className="text-[10px] font-medium text-muted-dark uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full border border-border">
                  Integration in Progress
                </span>
              </div>

              {/* Bot Message */}
              <div className="flex gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot size={12} />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm p-3 text-sm text-muted leading-relaxed shadow-sm">
                  <p className="mb-2">
                    Hi there! 👋 I&apos;m Mohit&apos;s AI assistant. 
                  </p>
                  <p className="mb-2">
                    I&apos;m currently being trained on his resume, projects, and codebase using a Python/LangChain RAG pipeline.
                  </p>
                  <p className="text-primary font-medium">
                    Coming soon... 🚀
                  </p>
                </div>
              </div>
              
            </div>

            {/* Chat Input */}
            <div className="p-3 border-t border-border bg-black/20">
              <div className="relative flex items-center">
                <input 
                  type="text" 
                  disabled
                  placeholder="Chat integration coming soon..." 
                  className="w-full bg-black/30 border border-border rounded-full pl-4 pr-10 py-2.5 text-sm text-white placeholder:text-muted focus:outline-none focus:border-primary/50 transition-colors opacity-70 cursor-not-allowed"
                />
                <button 
                  disabled
                  className="absolute right-1.5 p-1.5 rounded-full bg-primary/50 text-black cursor-not-allowed"
                >
                  <Send size={14} />
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
        className="w-14 h-14 rounded-full bg-primary text-black flex items-center justify-center shadow-[0_0_20px_rgba(255,197,61,0.3)] hover:shadow-[0_0_30px_rgba(255,197,61,0.5)] transition-shadow group relative"
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
              <MessageSquare size={24} className="group-hover:animate-pulse" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
