"use client";

import { ScrollReveal } from "../shared/scroll-reveal";
import { SectionHeader } from "../shared/section-header";
import { GlowCard } from "../shared/glow-card";
import { GraduationCap, Award } from "lucide-react";

export function Education() {
  return (
    <section id="education" className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-4xl">
        <ScrollReveal>
          <SectionHeader
            label="Education"
            title="Academic Foundation"
            centered
          />
        </ScrollReveal>

        <ScrollReveal delay={0.2} direction="up">
          <GlowCard className="mt-12 p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-6 w-full">
              <div className="hidden sm:flex items-center justify-center w-14 h-14 rounded-full bg-background border border-border text-primary shrink-0">
                <GraduationCap size={28} />
              </div>
              
              <div className="w-full">
                <h3 className="text-xl md:text-2xl font-bold text-text mb-2">
                  B.Tech in Computer Science & Engineering
                </h3>
                <div className="flex flex-wrap items-center gap-4 mb-2 w-full">
                  <div className="text-lg text-primary font-medium">
                    Uttaranchal University
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-background/50 shadow-inner w-fit">
                    <span className="text-xs font-semibold text-muted-dark uppercase tracking-wider">CGPA</span>
                    <span className="text-2xl font-bold text-text font-mono">8.5</span>
                  </div>
                </div>
                <div className="text-muted flex items-center gap-2 text-sm font-mono">
                  <span>2021 — 2025</span>
                </div>
              </div>
            </div>
          </GlowCard>
        </ScrollReveal>
      </div>
    </section>
  );
}
