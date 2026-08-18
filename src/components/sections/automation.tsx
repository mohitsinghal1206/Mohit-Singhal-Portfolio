"use client";

import { useState } from "react";
import { automationProjects } from "@/data/automation";
import { SectionHeader } from "../shared/section-header";
import { ScrollReveal } from "../shared/scroll-reveal";
import { GlowCard } from "../shared/glow-card";
import { WorkflowVisualization } from "../animations/workflow-visualization";
import { MessageCircle, Mail, Building, Plug, Users, Network, Activity, Globe, Video, Briefcase, RefreshCw, ChevronDown, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const iconMap: Record<string, React.ElementType> = {
  "message-circle": MessageCircle,
  mail: Mail,
  building: Building,
  plug: Plug,
  users: Users,
  network: Network,
  activity: Activity,
  globe: Globe,
  youtube: Video,
  linkedin: Briefcase,
  "refresh-cw": RefreshCw,
};

export function Automation() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <section id="automation" className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-7xl">
        <ScrollReveal>
          <SectionHeader
            label="Automation"
            title="Intelligent Workflow Engineering"
            description="Connecting enterprise systems with AI decision-making layers to create autonomous processes."
            centered
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-16">
          {/* Visual Pipeline Side */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 pt-4">
              <ScrollReveal direction="left" className="w-full">
                <WorkflowVisualization />
              </ScrollReveal>
            </div>
          </div>

          {/* Automation Domains Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 gap-4">
            {automationProjects.map((project, index) => {
              const Icon = iconMap[project.icon] || Plug;
              const isExpanded = expandedId === project.id;
              
              return (
                <ScrollReveal 
                  key={project.id} 
                  delay={0.2 + (index * 0.1)}
                  direction="up"
                  className="h-full"
                >
                  <GlowCard color="purple" className="h-full p-5 flex flex-col group">
                    <div 
                      className="cursor-pointer flex items-center justify-between"
                      onClick={() => setExpandedId(isExpanded ? null : project.id)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-background border border-border text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-300 shrink-0">
                          <Icon size={24} strokeWidth={1.5} />
                        </div>
                        <h3 className="text-xl font-bold text-text">
                          {project.title}
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
                          <div className="pt-6 mt-6 border-t border-border/50">
                            <p className="text-muted mb-6 text-sm leading-relaxed">
                              {project.description}
                            </p>
                            
                            <div className="flex flex-wrap gap-2 mb-6">
                              {project.capabilities.map(cap => (
                                <span key={cap} className="text-xs font-medium px-2 py-1 rounded bg-background border border-border text-muted-dark group-hover:border-secondary/30 group-hover:text-secondary transition-colors">
                                  {cap}
                                </span>
                              ))}
                            </div>
                            
                            {/* Context-Aware Ask Mac Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent closing the accordion
                                window.dispatchEvent(new CustomEvent('open-chatbot', { 
                                  detail: { 
                                    message: `Tell me more about the automation: ${project.title}`, 
                                    autoSend: false 
                                  } 
                                }));
                              }}
                              className="flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors group/btn bg-cyan-950/20 px-3 py-1.5 rounded-md border border-cyan-500/20 hover:border-cyan-500/50 w-max"
                            >
                              <Sparkles size={12} className="group-hover/btn:animate-pulse" />
                              Ask Mac about this
                            </button>
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
      </div>
    </section>
  );
}
