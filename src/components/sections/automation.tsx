"use client";

import { automationProjects } from "@/data/automation";
import { SectionHeader } from "../shared/section-header";
import { ScrollReveal } from "../shared/scroll-reveal";
import { GlowCard } from "../shared/glow-card";
import { WorkflowVisualization } from "../animations/workflow-visualization";
import { MessageCircle, Mail, Building, Plug, Users, Network, Activity, Globe, Video, Briefcase, RefreshCw } from "lucide-react";

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
          <div className="lg:col-span-5 flex items-center justify-center">
            <ScrollReveal direction="left" className="w-full">
              <WorkflowVisualization />
            </ScrollReveal>
          </div>

          {/* Automation Domains Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {automationProjects.map((project, index) => {
              const Icon = iconMap[project.icon] || Plug;
              
              return (
                <ScrollReveal 
                  key={project.id} 
                  delay={0.2 + (index * 0.1)}
                  direction="up"
                  className="h-full"
                >
                  <GlowCard color="purple" className="h-full p-8 flex flex-col group">
                    <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-background border border-border text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                      <Icon size={24} strokeWidth={1.5} />
                    </div>
                    
                    <h3 className="text-xl font-bold text-text mb-3">
                      {project.title}
                    </h3>
                    
                    <p className="text-muted mb-6 text-sm leading-relaxed flex-grow">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.capabilities.map(cap => (
                        <span key={cap} className="text-xs font-medium px-2 py-1 rounded bg-background border border-border text-muted-dark group-hover:border-secondary/30 group-hover:text-secondary transition-colors">
                          {cap}
                        </span>
                      ))}
                    </div>
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
