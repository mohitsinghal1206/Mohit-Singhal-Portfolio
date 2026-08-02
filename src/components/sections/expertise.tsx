"use client";

import { expertise } from "@/data/expertise";
import { SectionHeader } from "../shared/section-header";
import { ScrollReveal } from "../shared/scroll-reveal";
import { GlowCard } from "../shared/glow-card";
import { Brain, Zap, Server, Cloud } from "lucide-react";

// Map string icon names to Lucide components
const iconMap: Record<string, React.ElementType> = {
  brain: Brain,
  zap: Zap,
  server: Server,
  cloud: Cloud,
};

export function Expertise() {
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
            
            return (
              <ScrollReveal 
                key={category.id} 
                delay={index * 0.1}
                direction="up"
              >
                <GlowCard className="h-full p-8 md:p-10 flex flex-col group">
                  <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-background border border-border text-text group-hover:text-primary group-hover:border-primary transition-all duration-300 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                    <Icon size={24} strokeWidth={1.5} />
                  </div>
                  
                  <h3 className="text-2xl font-semibold tracking-tight text-text mb-3">
                    {category.title}
                  </h3>
                  
                  <p className="text-muted mb-8 leading-relaxed flex-grow">
                    {category.description}
                  </p>
                  
                  <div className="pt-6 border-t border-border">
                    <ul className="flex flex-wrap gap-x-6 gap-y-3">
                      {category.technologies.map((tech) => (
                        <li key={tech} className="flex items-center text-sm font-medium text-text">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2 opacity-70"></span>
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                </GlowCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
