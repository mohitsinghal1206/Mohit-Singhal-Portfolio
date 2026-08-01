"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { siteConfig } from "@/data/site-config";
import { AmbientBackground } from "../animations/ambient-background";
import { MagneticButton } from "../shared/magnetic-button";
import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../shared/brand-icons";
import { cn } from "@/lib/utils";

export function Hero() {
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
      
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col items-start"
          >
            <motion.div variants={item} className="mb-6 flex items-center gap-3">
              <div className="flex items-center justify-center px-3 py-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] glass">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-primary)] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--color-primary)]"></span>
                </span>
                <span className="text-xs font-medium text-[var(--color-text)]">Available for opportunities</span>
              </div>
            </motion.div>

            <motion.h1 
              variants={item}
              className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 font-display"
            >
              Engineering <br />
              <span className="gradient-text">Production-Ready</span> <br />
              AI Systems.
            </motion.h1>

            <motion.p 
              variants={item}
              className="text-lg md:text-xl text-[var(--color-muted)] max-w-lg mb-10 leading-relaxed"
            >
              AI Engineer building enterprise LLM applications, agentic AI systems, and intelligent automation at <span className="text-[var(--color-text)] font-medium">{siteConfig.company}</span>.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap items-center gap-4 mb-12">
              <MagneticButton href="#projects" variant="primary">
                View Projects
              </MagneticButton>
              <MagneticButton href={siteConfig.resumeUrl} variant="outline">
                Download Resume
              </MagneticButton>
            </motion.div>

            <motion.div variants={item} className="flex items-center gap-6">
              {[
                { icon: GithubIcon, href: siteConfig.github, label: "GitHub" },
                { icon: LinkedinIcon, href: siteConfig.linkedin, label: "LinkedIn" },
                { icon: Mail, href: `mailto:${siteConfig.email}`, label: "Email" },
              ].map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-muted)] hover:text-white transition-colors p-2 -m-2 group"
                  aria-label={social.label}
                >
                  <social.icon size={24} className="group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="relative lg:h-[600px] flex items-center justify-center lg:justify-end float-animation"
          >
            <div className="relative w-[280px] h-[360px] md:w-[360px] md:h-[460px] rounded-3xl overflow-hidden glass border border-[var(--color-border)] p-2 z-10">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[var(--color-background)]">
                <Image
                  src={siteConfig.profileImage}
                  alt={siteConfig.name}
                  fill
                  priority
                  className="object-cover object-top grayscale-[20%] contrast-125"
                  sizes="(max-width: 768px) 280px, 360px"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-background)] via-transparent to-transparent opacity-60" />
              </div>
            </div>

            {/* Decorative background elements behind image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,var(--color-glow-blue)_0%,transparent_50%)] z-0 pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
