"use client";

import { experiences } from "@/data/experience";
import { SectionHeader } from "../shared/section-header";
import { ScrollReveal } from "../shared/scroll-reveal";
import { TechTag } from "../shared/tech-tag";
import { GlowCard } from "../shared/glow-card";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, MapPin, Calendar, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function Experience() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section id="experience" className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-4xl">
        <ScrollReveal>
          <SectionHeader
            title="Experience"
            centered
          />
          <div className="flex justify-center mt-6">
            <button
              onClick={() => {
                window.dispatchEvent(new CustomEvent('open-chatbot', { 
                  detail: { 
                    message: `Tell me more about your work experience and background`, 
                    autoSend: false 
                  } 
                }));
              }}
              className="flex items-center gap-2 text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors group/btn bg-cyan-950/20 px-4 py-2 rounded-full border border-cyan-500/20 hover:border-cyan-500/50"
            >
              <Sparkles size={16} className="group-hover/btn:animate-pulse" />
              Ask Mac about my experience
            </button>
          </div>
        </ScrollReveal>

        <div className="relative mt-16">
          {/* Animated Timeline Line */}
          <div className="absolute left-[15px] top-4 bottom-0 w-[2px] bg-border">
            <motion.div 
              className="absolute top-0 left-0 right-0 timeline-line origin-top"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{ bottom: "0" }}
            />
          </div>

          <div className="flex flex-col gap-12">
            {experiences.map((exp, index) => {
              const isExpanded = expandedId === exp.id;
              
              return (
                <div key={exp.id} className="relative pl-12 md:pl-16">
                  {/* Timeline Dot */}
                  <motion.div 
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (index * 0.1), type: "spring" }}
                    className={cn(
                      "absolute left-[11px] top-6 w-[10px] h-[10px] rounded-full z-10 transform -translate-x-1/2 -translate-y-1/2",
                      exp.current 
                        ? "bg-primary timeline-dot" 
                        : "bg-muted border-2 border-background"
                    )}
                  />

                  <ScrollReveal delay={index * 0.1} direction={index % 2 === 0 ? "left" : "right"}>
                    <GlowCard className="p-6 md:p-8">
                      <div 
                        className="cursor-pointer group flex flex-col md:flex-row md:items-center justify-between gap-4"
                        onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                      >
                        <div>
                          <h3 className="text-xl md:text-2xl font-bold text-text mb-1">
                            {exp.role}
                          </h3>
                          <div className="text-primary font-medium mb-3">
                            {exp.company}
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
                            <span className="flex items-center gap-1.5">
                              <Calendar size={14} />
                              {exp.period}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <MapPin size={14} />
                              {exp.location}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          {exp.current && (
                            <span className="px-3 py-1 text-xs font-medium bg-glow-blue text-primary rounded-full border border-border-hover">
                              Current
                            </span>
                          )}
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center text-muted group-hover:text-white transition-colors"
                          >
                            <ChevronDown size={16} />
                          </motion.div>
                        </div>
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
                              <p className="text-text text-base mb-6 leading-relaxed">
                                {exp.description}
                              </p>
                              
                              <ul className="space-y-3 mb-8">
                                {exp.highlights.map((highlight, i) => (
                                  <li key={i} className="flex items-start gap-3 text-muted">
                                    <span className="text-primary mt-1">•</span>
                                    <span>{highlight}</span>
                                  </li>
                                ))}
                              </ul>

                              <div className="flex flex-wrap gap-2">
                                {exp.technologies.map((tech) => (
                                  <TechTag key={tech} name={tech} />
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </GlowCard>
                  </ScrollReveal>
                </div>
              );
            })}


          </div>
        </div>
      </div>
    </section>
  );
}
