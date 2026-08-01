"use client";

import { certifications } from "@/data/certifications";
import { SectionHeader } from "../shared/section-header";
import { ScrollReveal } from "../shared/scroll-reveal";
import { GlowCard } from "../shared/glow-card";
import { ExternalLink, Award } from "lucide-react";

export function Certifications() {
  return (
    <section id="certifications" className="py-24 relative z-10 bg-[var(--color-background)]">
      <div className="container mx-auto px-6 max-w-5xl">
        <ScrollReveal>
          <SectionHeader
            label="Certifications"
            title="Professional Credentials"
            centered
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          {certifications.map((cert, index) => (
            <ScrollReveal key={cert.id} delay={index * 0.1} direction="up">
              <a href={cert.url} target="_blank" rel="noopener noreferrer" className="block h-full outline-none">
                <div className={cert.highlighted ? "cert-glow-microsoft rounded-2xl h-full" : "h-full"}>
                  <GlowCard 
                    color={cert.highlighted ? "blue" : "purple"} 
                    className={`h-full p-8 flex flex-col group ${cert.highlighted ? 'border-transparent' : ''}`}
                  >
                    {cert.highlighted && (
                      <div className="absolute top-0 right-0 px-3 py-1 bg-[var(--color-primary)] text-white text-[10px] font-bold tracking-widest uppercase rounded-bl-lg rounded-tr-xl z-10 shadow-lg">
                        Highlighted
                      </div>
                    )}
                    
                    <div className="flex items-start justify-between mb-6">
                      <div className={`p-3 rounded-lg border ${cert.highlighted ? 'bg-[var(--color-glow-blue)] border-[var(--color-primary)]/30 text-[var(--color-primary)]' : 'bg-[var(--color-background)] border-[var(--color-border)] text-[var(--color-muted)] group-hover:text-white'} transition-colors`}>
                        <Award size={24} />
                      </div>
                      <ExternalLink size={20} className="text-[var(--color-border)] group-hover:text-[var(--color-primary)] transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-[var(--color-text)] mb-2 flex-grow">
                      {cert.name}
                    </h3>
                    
                    <p className="text-[var(--color-muted)] font-medium">
                      {cert.issuer}
                    </p>
                  </GlowCard>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
