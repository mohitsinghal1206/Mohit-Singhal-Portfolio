"use client";

import { motion, Variants, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { siteConfig } from "@/data/site-config";
import { AmbientBackground } from "../animations/ambient-background";
import { MagneticButton } from "../shared/magnetic-button";
import { Mail, Bot, Database, Link, Network, Building2, Brain, Cloud, GitMerge, MessageSquareCode, Zap } from "lucide-react";
import { SiFastapi, SiPython, SiHuggingface } from "react-icons/si";
import { GithubIcon, LinkedinIcon } from "../shared/brand-icons";
import { cn } from "@/lib/utils";
import { LangGraph, Zapier, MCP } from "@lobehub/icons";

export function Hero() {
  const keywords = [
    { text: "LLMs", icon: <img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/openai-light.svg" style={{ height: '0.9em', width: 'auto' }} alt="LLM's" /> },
    { text: "Agentic AI", icon: null },
    { text: "RAG", icon: null },
    { text: "LangChain", icon: <img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/langchain-color.svg" style={{ height: '0.9em', width: 'auto' }} alt="LangChain" /> },
    { text: "LangGraph", icon: <LangGraph size="0.9em" /> },
    { text: "FastAPI", icon: <img src="https://cdn.simpleicons.org/fastapi/009688" style={{ height: '0.9em', width: 'auto' }} alt="FastAPI" /> },
    { text: "Python", icon: <img src="https://cdn.simpleicons.org/python/3776AB" style={{ height: '0.9em', width: 'auto' }} alt="Python" /> },
    { text: "Power Automate", icon: <img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/microsoft-power-automate.svg" style={{ height: '0.9em', width: 'auto' }} alt="Power Automate" /> },
    { text: "Copilot Studio", icon: <img src="https://cdn.jsdelivr.net/gh/selfhst/icons/svg/microsoft-copilot.svg" style={{ height: '0.9em', width: 'auto' }} alt="Copilot" /> },
    { text: "Zapier", icon: <Zapier size="0.9em" /> },
    { text: "MCP", icon: <MCP size="0.9em" /> },
    { text: "OpenAI", icon: <img src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/openai-light.svg" style={{ height: '0.9em', width: 'auto' }} alt="OpenAI" /> },
    { text: "Azure", icon: <img src="https://cdn.jsdelivr.net/npm/@lobehub/icons-static-svg@latest/icons/azure-color.svg" style={{ height: '0.9em', width: 'auto' }} alt="Azure" /> },
    { text: "HuggingFace", icon: <SiHuggingface className="text-[#FFD21E]" size="0.9em" /> },
    { text: "n8n", icon: <img src="https://cdn.simpleicons.org/n8n/FF6E6B" style={{ height: '0.9em', width: 'auto' }} alt="n8n" /> },

  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % keywords.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

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
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col items-start lg:col-span-7"
          >
            <motion.div variants={item} className="mb-6 flex items-center gap-3">
              <div className="flex items-center justify-center px-4 py-2 md:px-5 md:py-2.5 rounded-full border border-border bg-card glass shadow-sm">
                <span className="relative flex h-3 w-3 mr-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
                <span className="text-base md:text-lg font-bold text-foreground">Open to opportunities</span>
              </div>
            </motion.div>

            <motion.h2 
              variants={item} 
              className="text-3xl md:text-5xl font-medium text-muted mb-4 font-display"
            >
              Hi, I&apos;m <span className="font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">{siteConfig.name}</span>
            </motion.h2>

            <motion.h1 
              variants={item}
              className="text-3xl sm:text-4xl md:text-7xl font-bold tracking-tighter mb-8 font-display leading-tight"
            >
              Building Enterprise AI <br />
              <span className="inline-flex items-center whitespace-nowrap">
                with&nbsp;
                <span className="inline-flex items-center min-h-[1.25em]">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.15 }}
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
              className="text-lg md:text-xl text-muted max-w-lg mb-10 leading-relaxed"
            >
              AI Engineer passionate about building LLM applications, agentic AI systems, and intelligent workflows.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap items-center gap-4 mb-12">
              <MagneticButton href="#projects" variant="primary">
                View Projects
              </MagneticButton>
              <MagneticButton href={siteConfig.resumeUrl} variant="outline">
                Resume
              </MagneticButton>
            </motion.div>

            <motion.div variants={item} className="flex items-center gap-6">
              {[
                { icon: GithubIcon, href: siteConfig.github, label: "GitHub", colorClass: "text-[#8957E5]" },
                { icon: LinkedinIcon, href: siteConfig.linkedin, label: "LinkedIn", colorClass: "text-[#0A66C2]" },
                { icon: Mail, href: `mailto:${siteConfig.email}`, label: "Email", colorClass: "text-[#EA4335]" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn("transition-colors p-2 -m-2 group hover:opacity-80", social.colorClass)}
                  aria-label={social.label}
                >
                  <social.icon size={24} className="group-hover:scale-110 transition-transform" />
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
            {/* Hexagon Tech Border */}
            <div className="relative w-[280px] h-[323px] flex items-center justify-center z-10 group">
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
                  className="object-cover"
                  sizes="(max-width: 768px) 300px, 340px"
                />
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
            className="relative lg:col-span-5 hidden md:flex items-center justify-center lg:justify-end float-animation"
          >
            {/* Hexagon Tech Border */}
            <div className="relative w-[320px] h-[369px] flex items-center justify-center z-10 group">
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
                className="absolute inset-[14px] overflow-hidden"
                style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
              >
                <Image
                  src={siteConfig.profileImage}
                  alt={siteConfig.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 300px, 340px"
                />
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
