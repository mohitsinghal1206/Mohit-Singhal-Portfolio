"use client";

import { motion, Variants, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { siteConfig } from "@/data/site-config";
import { AmbientBackground } from "../animations/ambient-background";
import { MagneticButton } from "../shared/magnetic-button";
import { Sparkles, Database, Link, Network, Building2, Brain, Cloud, GitMerge, MessageSquareCode, Zap } from "lucide-react";
import { SiFastapi, SiPython, SiHuggingface } from "react-icons/si";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { cn } from "@/lib/utils";
import { LangGraph, Zapier, MCP } from "@lobehub/icons";

const TYPEWRITER_PREFIX = "Ask Mac:\u00A0";
const TYPEWRITER_PHRASES = [
  "Does he know AI Automation?",
  "Does he know n8n?",
  "Does he know LangChain?",
  "How much experience does he have?",
  "Can he lead a project?",
  "What are his hobbies?",
  "What are his strengths & weakness?",
  "What are his technical skills?",
  "Is Mohit a good cultural fit?",
  "Is Mohit a good communicator?",
  "Is Mohit available for hire?"
];

export function Hero() {
  const keywords = [
    { text: "LangChain", icon: <img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/langchain-color.svg" style={{ height: '0.9em', width: 'auto' }} alt="LangChain" /> },
    { text: "OpenAI", icon: <img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/openai-light.svg" style={{ height: '0.9em', width: 'auto' }} alt="OpenAI" /> },
    { text: "HuggingFace", icon: <SiHuggingface className="text-[#FFD21E]" size="0.9em" /> },
    { text: "FastAPI", icon: <img src="https://cdn.simpleicons.org/fastapi/009688" style={{ height: '0.9em', width: 'auto' }} alt="FastAPI" /> },
    { text: "Python", icon: <img src="https://cdn.simpleicons.org/python/3776AB" style={{ height: '0.9em', width: 'auto' }} alt="Python" /> },
    { text: "Agentic AI", icon: null },
    { text: "RAG", icon: null },
    { text: "LangGraph", icon: <LangGraph size="0.9em" /> },
    { text: "Power Automate", icon: <img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/microsoft-power-automate.svg" style={{ height: '0.9em', width: 'auto' }} alt="Power Automate" /> },
    { text: "Copilot Studio", icon: <img src="https://cdn.jsdelivr.net/gh/selfhst/icons/svg/microsoft-copilot.svg" style={{ height: '0.9em', width: 'auto' }} alt="Copilot" /> },
    { text: "Zapier", icon: <Zapier size="0.9em" /> },
    { text: "n8n", icon: <img src="https://cdn.simpleicons.org/n8n/FF6E6B" style={{ height: '0.9em', width: 'auto' }} alt="n8n" /> },
    { text: "Azure", icon: <img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/azure-color.svg" style={{ height: '0.9em', width: 'auto' }} alt="Azure" /> },
    { text: "MCP", icon: <MCP size="0.9em" /> },
    { text: "LLMs", icon: <img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/openai-light.svg" style={{ height: '0.9em', width: 'auto' }} alt="LLM's" /> },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % keywords.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [typewriterText, setTypewriterText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const currentFullPhrase = TYPEWRITER_PHRASES[phraseIndex];
    const nextFullPhrase = TYPEWRITER_PHRASES[nextIndex];
    
    let commonPrefixLen = 0;
    while (
      commonPrefixLen < currentFullPhrase.length &&
      commonPrefixLen < nextFullPhrase.length &&
      currentFullPhrase[commonPrefixLen] === nextFullPhrase[commonPrefixLen]
    ) {
      commonPrefixLen++;
    }

    // Special rule: only stop at complete words, don't stop mid-word if they happen to share characters
    // e.g., "how much" and "how many" shares "how m", but we should backspace to "how "
    while (commonPrefixLen > 0 && currentFullPhrase[commonPrefixLen - 1] !== ' ') {
      commonPrefixLen--;
    }

    if (isDeleting) {
      if (typewriterText.length > commonPrefixLen) {
        timeout = setTimeout(() => setTypewriterText(currentFullPhrase.substring(0, typewriterText.length - 1)), 30);
      } else {
        setIsDeleting(false);
        setPhraseIndex(nextIndex);
        setNextIndex((prev) => (prev + 1) % TYPEWRITER_PHRASES.length);
      }
    } else {
      if (typewriterText.length < currentFullPhrase.length) {
        timeout = setTimeout(() => setTypewriterText(currentFullPhrase.substring(0, typewriterText.length + 1)), 60);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2500); // pause before deleting
      }
    }

    return () => clearTimeout(timeout);
  }, [typewriterText, isDeleting, phraseIndex, nextIndex]);

  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      }
    },
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden">
      <AmbientBackground />
      
      {/* Preload images to prevent flashing during rotation */}
      <div className="absolute w-0 h-0 opacity-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {keywords.map((k, i) => (
          <span key={`preload-${i}`}>{k.icon}</span>
        ))}
      </div>
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col items-start lg:col-span-7"
          >
            <motion.div variants={item} className="mb-6 flex items-center gap-3">
              <div className="flex items-center justify-center px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-border bg-card glass shadow-sm">
                <span className="relative flex h-2.5 w-2.5 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                </span>
                <span className="text-sm md:text-base font-bold text-foreground">Open to opportunities</span>
              </div>
            </motion.div>

            <motion.h2 
              variants={item} 
              className="text-2xl md:text-4xl font-medium text-muted mb-4 font-display"
            >
              Hi, I&apos;m <span className="font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{siteConfig.name}</span>
            </motion.h2>

            <motion.h1 
              variants={item}
              className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter mb-8 font-display leading-tight"
            >
              Building Enterprise AI <br />
              <span className="inline-flex items-center whitespace-nowrap">
                with&nbsp;
                <span className="inline-flex items-center min-h-[1.25em] overflow-hidden px-1 -ml-1">
                  <AnimatePresence mode="popLayout">
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -40 }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className="inline-flex items-center gap-2 md:gap-3"
                    >
                    {keywords[index].icon && (
                      <span className="flex items-center justify-center">
                        {keywords[index].icon}
                      </span>
                    )}
                    <span className="gradient-text">{keywords[index].text}</span>
                  </motion.span>
                </AnimatePresence>
                </span>
              </span> <br />

            </motion.h1>

            <motion.p 
              variants={item}
              className="text-base md:text-lg text-muted max-w-lg mb-10 leading-relaxed"
            >
              AI Engineer passionate about building LLM applications, agentic AI systems, and intelligent automations.
            </motion.p>

            <motion.div variants={item} className="flex flex-col items-start gap-6 mb-12 w-full">
              {/* "Out of the box" Functional ChatGPT style input CTA */}
              <div className="relative w-full max-w-lg group">
                {/* Glowing border effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-pulse"></div>
                
                {/* Input Bar Form */}
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    const input = e.currentTarget.querySelector('input');
                    if (input && input.value.trim().length > 0) {
                      window.dispatchEvent(new CustomEvent('open-chatbot', { 
                        detail: { message: input.value.trim() } 
                      }));
                      // Clear the input after submission
                      input.value = "";
                      // Restore the placeholder overlay
                      const overlay = input.nextElementSibling as HTMLElement;
                      if (overlay) overlay.style.opacity = '1';
                    }
                  }}
                  className="relative flex items-center bg-black/90 backdrop-blur-xl border border-primary/40 rounded-full py-2 sm:py-2.5 px-3 sm:px-6 shadow-[0_0_30px_rgba(255,197,61,0.3)] hover:bg-black transition-colors focus-within:bg-black focus-within:border-primary"
                >
                  {/* Cyan Icon only */}
                  <Sparkles className="w-4 h-4 sm:w-[22px] sm:h-[22px] text-cyan-400 mr-2 sm:mr-4 flex-shrink-0 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                  
                  {/* Real Input and Animated Placeholder Wrapper */}
                  <div className="flex-1 relative flex items-center h-10">
                    <input 
                      type="text"
                      className="peer absolute inset-0 w-full h-full bg-transparent text-sm sm:text-base text-white font-medium focus:outline-none z-20 placeholder-transparent"
                      placeholder="Ask Mac..."
                      onChange={(e) => {
                        // We use a peer-focus and peer-valid trick, or just CSS to hide the placeholder
                        const target = e.target as HTMLInputElement;
                        const overlay = target.nextElementSibling as HTMLElement;
                        if (overlay) {
                          overlay.style.opacity = target.value.length > 0 ? '0' : '1';
                        }
                      }}
                    />
                    
                    {/* Animated Streaming Placeholder Overlay */}
                    <div className="absolute inset-0 flex items-center pointer-events-none z-10 overflow-hidden transition-opacity duration-200">
                      <span className="text-[13px] sm:text-sm text-white/50 font-medium tracking-tight sm:tracking-wide flex items-center whitespace-nowrap">
                        <span className="text-white/70 flex-shrink-0 hidden sm:inline">{TYPEWRITER_PREFIX}</span>
                        <span className="truncate">{typewriterText}</span>
                        <motion.span
                          animate={{ opacity: [1, 0] }}
                          transition={{ repeat: Infinity, duration: 0.8 }}
                          className="inline-block flex-shrink-0 w-[2px] h-3.5 sm:h-4 bg-primary/50 ml-0.5 sm:ml-1 sm:translate-y-0.5"
                        />
                      </span>
                    </div>
                  </div>
                  
                  {/* Send Button */}
                  <button 
                    type="submit"
                    className="ml-3 flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/80 flex items-center justify-center hover:bg-primary transition-all duration-300 shadow-[0_0_15px_rgba(255,197,61,0.6)] hover:shadow-[0_0_20px_rgba(255,197,61,1)] hover:scale-110 z-20"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-black transition-colors">
                      <path d="m5 12 7-7 7 7"/>
                      <path d="M12 19V5"/>
                    </svg>
                  </button>
                </form>
              </div>

              {/* Normal Buttons below */}
              <div className="flex flex-wrap items-center gap-4">
                <MagneticButton href="#projects" variant="primary">
                  View Projects
                </MagneticButton>
                <MagneticButton href={siteConfig.resumeUrl} variant="outline" download="Mohit_Singhal_Resume.pdf">
                  Resume
                </MagneticButton>
              </div>
            </motion.div>

            <motion.div variants={item} className="flex items-center gap-2 md:gap-4 -ml-2">
              {[
                { icon: FiGithub, href: siteConfig.github, label: "GitHub", colorClass: "text-[#8957E5]" },
                { icon: FiLinkedin, href: siteConfig.linkedin, label: "LinkedIn", colorClass: "text-[#0A66C2]" },
                { icon: FiMail, href: `mailto:${siteConfig.email}`, label: "Email", colorClass: "text-[#EA4335]" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn("flex items-center justify-center w-10 h-10 transition-colors group hover:opacity-80 rounded-full", social.colorClass)}
                  aria-label={social.label}
                >
                  <social.icon size={26} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Mobile Visual: Scroll Reveal with Blur */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 40, filter: "blur(20px)" }}
            whileInView={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative lg:col-span-5 flex md:hidden items-center justify-center float-animation"
          >
            {/* Interactive Hexagon Portal */}
            <div 
              className="relative w-[280px] h-[323px] flex items-center justify-center z-10 group cursor-pointer"
              onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))}
            >
              {/* The dynamic theme border background */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-primary/50 to-secondary/50 group-hover:from-primary group-hover:to-secondary transition-colors duration-700 animate-pulse" 
                style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
              />
              
              {/* The inner dark hexagon to create the border thickness */}
              <div 
                className="absolute inset-[4px] bg-background" 
                style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
              />

              {/* The cutouts for the brackets on the left and right */}
              <div className="absolute top-[34%] bottom-[34%] left-[-2px] w-[14px] bg-background z-10" />
              <div className="absolute top-[34%] bottom-[34%] right-[-2px] w-[14px] bg-background z-10" />

              {/* The actual image inside the inner hexagon */}
              <div 
                className="absolute inset-[10px] overflow-hidden"
                style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
              >
                <Image
                  src={siteConfig.profileImage}
                  alt={siteConfig.name}
                  fill
                  priority
                  className="object-cover group-hover:scale-110 group-hover:opacity-30 transition-all duration-500"
                  sizes="(max-width: 768px) 300px, 340px"
                />
              </div>

              {/* Interactive AI Clone HUD Overlay */}
              <div 
                className="absolute inset-[10px] z-20 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm" 
                style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
              >
                <Sparkles size={40} className="text-cyan-400 mb-3 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)]" />
                <span className="text-xs font-bold text-white tracking-[0.2em] uppercase">Initialize</span>
                <span className="text-[10px] text-cyan-400 font-mono mt-1 font-bold">Mac Agent</span>
              </div>
            </div>

            {/* Decorative glow behind the hexagon */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] bg-primary/20 blur-[100px] rounded-full z-0 pointer-events-none transition-all duration-700 group-hover:bg-primary/40 animate-pulse" />
          </motion.div>

          {/* PC Visual: Immediate Load without Blur */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative lg:col-span-5 hidden md:flex items-center justify-center lg:justify-start float-animation"
          >
            {/* Floating Hint (Desktop Only) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2, duration: 1 }}
              className="absolute -right-6 top-[20%] translate-x-full hidden xl:flex items-center gap-3 z-20 pointer-events-none"
            >
               <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-primary/50 relative">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary animate-pulse" />
               </div>
            </motion.div>

            {/* Interactive Hexagon Portal */}
            <div 
              className="relative w-[320px] h-[369px] flex items-center justify-center z-10 group cursor-pointer"
              onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))}
            >
              {/* The dynamic theme border background */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-primary/50 to-secondary/50 group-hover:from-primary group-hover:to-secondary transition-colors duration-700 animate-pulse" 
                style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
              />
              
              {/* The inner dark hexagon to create the border thickness */}
              <div 
                className="absolute inset-[6px] bg-background" 
                style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
              />

              {/* The cutouts for the brackets on the left and right */}
              <div className="absolute top-[34%] bottom-[34%] left-[-2px] w-[20px] bg-background z-10" />
              <div className="absolute top-[34%] bottom-[34%] right-[-2px] w-[20px] bg-background z-10" />

              {/* The actual image inside the inner hexagon */}
              <div 
                className="absolute inset-[14px] overflow-hidden bg-black"
                style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
              >
                <Image
                  src={siteConfig.profileImage}
                  alt={siteConfig.name}
                  fill
                  priority
                  className="object-cover group-hover:scale-110 group-hover:opacity-30 transition-all duration-500"
                  sizes="(max-width: 768px) 300px, 340px"
                />
              </div>

              {/* Interactive AI Clone HUD Overlay */}
              <div 
                className="absolute inset-[14px] z-20 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm" 
                style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
              >
                <div className="absolute inset-4 border border-primary/30 rounded-full scale-150 group-hover:scale-100 transition-transform duration-700 ease-out border-dashed animate-[spin_10s_linear_infinite]" />
                <div className="absolute inset-8 border border-cyan-400/30 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500 delay-100 animate-[spin_15s_linear_infinite_reverse]" />
                
                <Sparkles size={56} className="text-cyan-400 mb-3 drop-shadow-[0_0_15px_rgba(34,211,238,0.8)] group-hover:animate-pulse" />
                <span className="text-sm font-bold text-white tracking-[0.2em] uppercase">Initialize</span>
                <span className="text-xs text-cyan-400 font-mono mt-1 font-bold">Mac_AI</span>
              </div>
            </div>

            {/* Decorative glow behind the hexagon */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] bg-primary/20 blur-[100px] rounded-full z-0 pointer-events-none transition-all duration-700 group-hover:bg-primary/40 animate-pulse" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
