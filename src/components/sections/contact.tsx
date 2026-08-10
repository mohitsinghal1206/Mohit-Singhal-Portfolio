"use client";

import { siteConfig } from "@/data/site-config";
import { ScrollReveal } from "../shared/scroll-reveal";
import { MagneticButton } from "../shared/magnetic-button";
import { Mail, FileText } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../shared/brand-icons";

export function Contact() {
  return (
    <section id="contact" className="py-32 relative z-10">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <ScrollReveal>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 gradient-text-shimmer">
            Let's Build Something Together.
          </h2>
          
          <p className="text-xl text-muted max-w-2xl mx-auto mb-16 leading-relaxed">
            Have a project in mind? I'm always open to discussing AI engineering opportunities, complex system architectures, and intelligent automation solutions.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2} direction="up">
          <div className="flex flex-wrap justify-center gap-6">
            <MagneticButton href={`mailto:${siteConfig.email}`} variant="primary" className="py-4 px-8 text-base">
              <Mail size={20} />
              Email Me
            </MagneticButton>
            
            <MagneticButton href={siteConfig.linkedin} variant="secondary" className="py-4 px-8 text-base">
              <LinkedinIcon size={20} />
              LinkedIn
            </MagneticButton>
            
            <MagneticButton href={siteConfig.github} variant="secondary" className="py-4 px-8 text-base">
              <GithubIcon size={20} />
              GitHub
            </MagneticButton>
            
            <MagneticButton href={siteConfig.resumeUrl} variant="outline" className="py-4 px-8 text-base" download="Mohit_Singhal_Resume.pdf">
              <FileText size={20} />
              Resume
            </MagneticButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
