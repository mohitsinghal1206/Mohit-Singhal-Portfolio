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
            <div className="flex items-start gap-6">
              <div className="hidden sm:flex items-center justify-center w-14 h-14 rounded-full bg-background border border-border text-primary">
                <GraduationCap size={28} />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-text mb-2">
                  B.Tech in Computer Science & Engineering
                </h3>
                <div className="text-lg text-primary font-medium mb-2">
                  Uttaranchal University
                </div>
                <div className="text-muted flex items-center gap-2">
                  <span>2021 – 2025</span>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0">
              <div className="inline-flex flex-col items-center justify-center px-6 py-4 rounded-xl border border-border bg-background shadow-inner">
                <span className="text-xs font-semibold text-muted-dark uppercase tracking-wider mb-1">CGPA</span>
                <span className="text-3xl font-bold text-text font-mono">8.5</span>
              </div>
            </div>
          </GlowCard>
        </ScrollReveal>
      </div>
    </section>
  );
}
