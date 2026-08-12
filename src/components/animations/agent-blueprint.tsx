"use client";

import { motion } from "framer-motion";
import { Brain, Database, Zap, Server, Cloud, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

function Node({ 
  icon: Icon, 
  label, 
  delay, 
  className, 
  color = "text-muted" 
}: { 
  icon: any; 
  label: string; 
  delay: number; 
  className?: string;
  color?: string;
}) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: "spring", delay, bounce: 0.5 }}
      className={cn("flex flex-col items-center gap-2", className)}
    >
      <div className="w-14 h-14 rounded-xl bg-background border border-border flex items-center justify-center shadow-lg relative group">
        <div className="absolute inset-0 bg-white/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
        <Icon size={24} className={color} />
      </div>
      <span className="text-[11px] font-mono font-medium text-muted-dark uppercase tracking-widest bg-background/80 px-2 py-0.5 rounded border border-border/50">
        {label}
      </span>
    </motion.div>
  );
}

function AnimatedLine({ d, delay }: { d: string; delay: number }) {
  return (
    <g>
      {/* Background dashed line */}
      <path d={d} fill="none" stroke="currentColor" strokeWidth="1.5" className="text-border" strokeDasharray="4 4" />
      
      {/* Animated solid line representing data flow */}
      <motion.path
        d={d}
        fill="none"
        stroke="var(--color-primary)"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay, ease: "easeInOut" }}
      />
      
      {/* Pulsing data packet */}
      <motion.circle
        r="3"
        fill="var(--color-primary)"
        initial={{ offsetDistance: "0%", opacity: 0 }}
        whileInView={{ offsetDistance: "100%", opacity: [0, 1, 1, 0] }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: delay + 0.5, ease: "linear", repeat: Infinity, repeatDelay: 2 }}
        style={{ offsetPath: `path('${d}')` } as any}
      />
    </g>
  );
}

export function AgentBlueprint() {
  return (
    <div className="relative w-full aspect-square max-w-[450px] flex items-center justify-center p-8 mx-auto">
      {/* Background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-20 pointer-events-none" />
      
      <div className="relative w-full h-full flex items-center justify-center">
        
        {/* SVG Connecting Lines (Absolute behind nodes) */}
        <div className="absolute inset-0 -z-10 flex items-center justify-center">
          <svg className="w-[300px] h-[300px]" viewBox="0 0 300 300" style={{ overflow: 'visible' }}>
            <defs>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            
            {/* Top to Center */}
            <AnimatedLine d="M 150,50 L 150,110" delay={0.2} />
            
            {/* Center to Right */}
            <AnimatedLine d="M 190,150 L 250,150" delay={0.6} />
            
            {/* Center to Bottom */}
            <AnimatedLine d="M 150,190 L 150,250" delay={0.8} />
            
            {/* Center to Left */}
            <AnimatedLine d="M 110,150 L 50,150" delay={1.0} />
          </svg>
        </div>

        {/* Nodes */}
        <Node 
          icon={Brain} 
          label="AI Engineering" 
          delay={0}
          className="absolute top-0 left-1/2 -translate-x-1/2"
          color="text-primary"
        />
        
        <Node 
          icon={Zap} 
          label="Automation" 
          delay={0.7}
          className="absolute bottom-0 left-1/2 -translate-x-1/2"
          color="text-yellow-400"
        />
        
        <Node 
          icon={Server} 
          label="Backend Systems" 
          delay={0.5}
          className="absolute top-1/2 right-0 -translate-y-1/2"
          color="text-cyan-400"
        />
        
        <Node 
          icon={Cloud} 
          label="Cloud & DevOps" 
          delay={0.9}
          className="absolute top-1/2 left-0 -translate-y-1/2"
          color="text-green-400"
        />

        {/* Central Hub Node */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", delay: 0.3, bounce: 0.5 }}
          className="relative z-10 w-24 h-24 rounded-full bg-black border-2 border-primary/40 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(var(--color-primary-rgb),0.2)] group"
        >
          <div className="absolute inset-0 bg-primary/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <Database size={32} className="text-primary mb-1 animate-pulse" />
          <span className="text-[9px] font-bold tracking-widest text-primary uppercase text-center leading-tight">System<br/>Arch</span>
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute -top-2 -right-2"
          >
            <Sparkles size={16} className="text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.8)]" />
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
}
