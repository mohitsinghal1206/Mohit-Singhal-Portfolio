"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { expertise } from "@/data/expertise";
import { SectionHeader } from "../shared/section-header";
import { ScrollReveal } from "../shared/scroll-reveal";
import { GlowCard } from "../shared/glow-card";
import { Brain, Zap, Server, Cloud, ChevronDown } from "lucide-react";

// Map string icon names to Lucide components
const iconMap: Record<string, React.ElementType> = {
  brain: Brain,
  zap: Zap,
  server: Server,
  cloud: Cloud,
};

export function Expertise() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section id="expertise" className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <ScrollReveal>
          <SectionHeader
            label="Expertise"
            title="Technical Capabilities"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {expertise.map((category, index) => {
            const Icon = iconMap[category.icon] || Brain;
            const isExpanded = expandedId === category.id;
            
            return (
              <ScrollReveal 
                key={category.id} 
                delay={index * 0.1}
                direction="up"
              >
                <GlowCard className="h-full p-6 md:p-8 flex flex-col group">
                  <div 
                    className="cursor-pointer flex items-center justify-between"
                    onClick={() => setExpandedId(isExpanded ? null : category.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-background border border-border text-text group-hover:text-primary group-hover:border-primary transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] shrink-0">
                        <Icon size={24} strokeWidth={1.5} />
                      </div>
                      <h3 className="text-xl font-semibold tracking-tight text-text">
                        {category.title}
                      </h3>
                    </div>
                    
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-8 h-8 shrink-0 rounded-full bg-background border border-border flex items-center justify-center text-muted group-hover:text-white transition-colors"
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
                        <div className="pt-6 mt-6 border-t border-border">
                          <p className="text-muted mb-6 leading-relaxed">
                            {category.description}
                          </p>
                          
                          <ul className="flex flex-wrap gap-x-6 gap-y-3">
                            {category.technologies.map((tech) => (
                              <li key={tech} className="flex items-center text-sm font-medium text-text">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 opacity-70"></span>
                                {tech}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </GlowCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
