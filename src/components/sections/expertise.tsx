"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { expertise } from "@/data/expertise";
import { SectionHeader } from "../shared/section-header";
import { ScrollReveal } from "../shared/scroll-reveal";
import { GlowCard } from "../shared/glow-card";
import { LiveTerminal } from "../animations/live-terminal";
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
    <section id="expertise" className="pt-8 pb-24 relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <ScrollReveal>
          <SectionHeader
            label="Expertise"
            title="Technical Capabilities"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-12 items-center">
          <div className="lg:col-span-7 flex flex-col gap-4">
            {expertise.map((category, index) => {
              const Icon = iconMap[category.icon] || Brain;
              const isExpanded = expandedId === category.id;
              
              return (
                <ScrollReveal 
                  key={category.id} 
                  delay={index * 0.1}
                  direction="up"
                >
                  <GlowCard className="h-full p-5 md:p-6 flex flex-col group">
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
                          <div className="pt-6 mt-6 border-t border-white/5">
                            <p className="text-muted leading-relaxed mb-6">
                              {category.description}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {category.technologies.map((tech) => (
                                <span 
                                  key={tech}
                                  className="text-xs font-medium text-muted-dark bg-black/40 px-3 py-1.5 rounded-md border border-white/5"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </GlowCard>
                </ScrollReveal>
              );
            })}
          </div>
          
          {/* Right: Graphic (Hidden on mobile) */}
          <div className="hidden lg:flex lg:col-span-5 justify-center w-full">
            <ScrollReveal direction="left" delay={0.4} className="w-full flex justify-center">
              <LiveTerminal />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
