"use client";

import { SectionHeader } from "../shared/section-header";
import { ScrollReveal } from "../shared/scroll-reveal";
import { GlowCard } from "../shared/glow-card";
import { TechTag } from "../shared/tech-tag";
import { Activity, Zap, TrendingUp, ShieldCheck, Cloud, Server } from "lucide-react";
import { motion } from "framer-motion";

export function Lab() {
  return (
    <section id="lab" className="py-24 relative z-10 bg-background">
      <div className="container mx-auto px-6 max-w-5xl">
        <ScrollReveal>
          <SectionHeader
            label="Engineering Lab"
            title="Beyond the Day Job"
            description="Showcasing passion projects and complex systems engineering challenges outside of AI."
            centered
          />
        </ScrollReveal>

        <ScrollReveal delay={0.2} direction="up">
          <GlowCard className="mt-16 overflow-hidden">
            {/* Background design */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(39,39,42,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(39,39,42,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Activity size={200} />
            </div>

            <div className="relative z-10 p-8 md:p-12">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex h-3 w-3 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                    </span>
                    <span className="text-sm font-medium text-muted uppercase tracking-wider">In Development</span>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-text tracking-tight">
                    Algorithmic Trading Platform
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <p className="text-lg text-muted leading-relaxed mb-8">
                    An end-to-end distributed system focused on high-throughput automation, resilient backend architecture, and quantitative research. Built as an engineering challenge to master real-time data streams and low-latency execution.
                  </p>

                  <div className="space-y-6">
                    <h4 className="text-sm font-semibold text-text uppercase tracking-wider">Core Challenges</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { icon: Activity, label: "Live Market Data" },
                        { icon: Zap, label: "Auto Order Execution" },
                        { icon: TrendingUp, label: "Strategy Backtesting" },
                        { icon: ShieldCheck, label: "Risk Management" },
                        { icon: Cloud, label: "Cloud Deployment" },
                        { icon: Server, label: "Distributed Systems" }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-border bg-background">
                          <item.icon size={16} className="text-primary" />
                          <span className="text-sm font-medium text-text">{item.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-between">
                  <div className="bg-background border border-border rounded-xl p-6 h-full flex flex-col justify-center relative overflow-hidden">
                    {/* Premium Financial Chart Animation */}
                    <div className="absolute inset-0 opacity-40">
                      <svg viewBox="0 0 400 200" preserveAspectRatio="none" className="w-full h-full">
                        <defs>
                          <linearGradient id="chart-grad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
                          </linearGradient>
                          <linearGradient id="chart-line" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="var(--color-secondary)" />
                            <stop offset="50%" stopColor="var(--color-primary)" />
                            <stop offset="100%" stopColor="#00F098" />
                          </linearGradient>
                          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                          </filter>
                        </defs>
                        
                        {/* Grid Lines */}
                        <g stroke="var(--color-border)" strokeWidth="1" strokeDasharray="4,4" opacity="0.5">
                          <path d="M0,50 L400,50 M0,100 L400,100 M0,150 L400,150" />
                          <path d="M50,0 L50,200 M150,0 L150,200 M250,0 L250,200 M350,0 L350,200" />
                        </g>

                        {/* Animated Main Line */}
                        <motion.path 
                          d="M0,160 L40,120 L80,140 L120,70 L160,90 L200,40 L240,70 L280,20 L320,50 L360,10 L400,30" 
                          fill="none" 
                          stroke="url(#chart-line)" 
                          strokeWidth="3"
                          filter="url(#glow)"
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 2, ease: "easeInOut" }}
                        />
                        
                        {/* Animated Area Fill */}
                        <motion.path 
                          d="M0,160 L40,120 L80,140 L120,70 L160,90 L200,40 L240,70 L280,20 L320,50 L360,10 L400,30 L400,200 L0,200 Z" 
                          fill="url(#chart-grad)" 
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
                        />
                        
                        {/* Live Price Pulsing Dot */}
                        <motion.circle 
                          cx="400" cy="30" r="4" 
                          fill="#00F098"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 2 }}
                        />
                        <motion.circle 
                          cx="400" cy="30" r="10" 
                          fill="#00F098"
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: [0, 0.4, 0], scale: [1, 2.5, 1] }}
                          viewport={{ once: true }}
                          transition={{ delay: 2, duration: 2, repeat: Infinity }}
                        />
                      </svg>
                    </div>
                    
                    <div className="relative z-10 text-center">
                      <div className="text-muted-dark text-sm font-mono mb-2">EXECUTION</div>
                      <div className="text-4xl font-bold font-mono text-text">
                        <motion.span
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                        >
                          Real-time
                        </motion.span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-border">
                    <div className="flex flex-wrap gap-2">
                      {["Python", "FastAPI", "Upstox APIs", "WebSockets", "PostgreSQL", "Azure VM", "Linux", "OAuth2"].map(tech => (
                        <TechTag key={tech} name={tech} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </GlowCard>
        </ScrollReveal>
      </div>
    </section>
  );
}
