"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import { SectionHeader } from "../shared/section-header";
import { TechTag } from "../shared/tech-tag";
import { ArchitectureDiagram } from "../animations/architecture-diagram";
import { ExternalLink, FileText, CheckCircle2, ChevronDown, Sparkles } from "lucide-react";
import { GithubIcon } from "../shared/brand-icons";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

function ProjectShowcase({ project, index }: { project: typeof projects[0], index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  const isEven = index % 2 === 0;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      ref={ref}
      className={cn(
        "flex flex-col gap-12 lg:gap-16 py-12",
        isEven ? "lg:flex-row" : "lg:flex-row-reverse"
      )}
    >
      {/* Visual Side */}
      <motion.div 
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full lg:w-1/2 flex flex-col gap-4"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold tracking-widest text-primary uppercase">
            {project.category}
          </span>
          <span className="text-white font-mono text-xl font-bold opacity-80">
            {project.index}
          </span>
        </div>
        
        {/* Vertical Workflow Diagram */}
        <div className="w-full h-auto py-8 rounded-2xl overflow-hidden flex items-center justify-center p-2 bg-gradient-to-br from-card to-background border border-border shadow-xl shadow-black/50">
          <ArchitectureDiagram workflow={project.workflow} isInView={isInView} />
        </div>
      </motion.div>

      {/* Content Side */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="w-full lg:w-1/2 flex flex-col justify-center"
      >
        <h3 className="text-3xl md:text-4xl font-bold text-text mb-4">
          {project.title}
        </h3>
        
        <p className="text-lg text-muted mb-8 leading-relaxed">
          {project.description}
        </p>

        <div 
          className="cursor-pointer group flex items-center justify-between py-4 border-y border-border/50 mb-4"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span className="font-semibold text-text group-hover:text-primary transition-colors">View Project Details</span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center text-muted group-hover:text-white transition-colors"
          >
            <ChevronDown size={16} />
          </motion.div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-4 space-y-6 mb-8">
                {project.sections.map((section, idx) => (
                  <div key={idx}>
                    <h4 className="text-sm font-semibold text-text uppercase tracking-wider mb-2 flex items-center gap-2">
                      <div className={cn("w-1.5 h-1.5 rounded-full", idx === 0 ? "bg-red-500" : "bg-primary")} />
                      {section.title}
                    </h4>
                    <p className="text-muted text-sm leading-relaxed whitespace-pre-line">{section.content}</p>
                  </div>
                ))}
              </div>

              <div className="mb-8">
                <h4 className="text-sm font-semibold text-text uppercase tracking-wider mb-3">Key Results</h4>
                <ul className="space-y-2">
                  {project.results.map((result, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-muted">
                      <CheckCircle2 size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 mb-8">
                {project.technologies.map(tech => (
                  <TechTag key={tech} name={tech} />
                ))}
              </div>

              <div className="flex items-center gap-6 pt-6 border-t border-border">
                {project.links.demo && (
                  <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-white hover:text-primary transition-colors group">
                    <ExternalLink size={16} className="group-hover:scale-110 transition-transform" />
                    Live Demo
                  </a>
                )}
                {project.links.github && (
                  <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-muted hover:text-white transition-colors group">
                    <GithubIcon size={16} className="group-hover:scale-110 transition-transform" />
                    Source Code
                  </a>
                )}
                {project.links.docs && (
                  <a href={project.links.docs} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-muted hover:text-white transition-colors group">
                    <FileText size={16} className="group-hover:scale-110 transition-transform" />
                    Documentation
                  </a>
                )}
                
                {/* Context-Aware Ask Mac Button */}
                <button
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent('open-chatbot', { 
                      detail: { 
                        message: `Tell me more about the ${project.title} project`, 
                        autoSend: false 
                      } 
                    }));
                  }}
                  className="flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors group ml-auto bg-cyan-950/30 px-3 py-1.5 rounded-full border border-cyan-500/20 hover:border-cyan-500/50"
                >
                  <Sparkles size={14} className="group-hover:animate-pulse" />
                  Ask Mac
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-24 relative z-10 bg-background">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="mb-16">
          <SectionHeader
            label="Projects"
            title="AI Systems I've Built"
            description="A selection of production-grade AI applications and intelligent automation systems."
          />
        </div>

        <div className="flex flex-col gap-12 lg:gap-24">
          {projects.map((project, index) => (
            <div key={project.id}>
              <ProjectShowcase project={project} index={index} />
              {index !== projects.length - 1 && (
                <div className="section-divider my-8" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
