"use client";

import { motion } from "framer-motion";
import { workflowSteps } from "@/data/automation";
import { Play, Brain, GitBranch, Globe, Database, Bell } from "lucide-react";
import { GlowCard } from "../shared/glow-card";

const iconMap: Record<string, React.ElementType> = {
  play: Play,
  brain: Brain,
  "git-branch": GitBranch,
  globe: Globe,
  database: Database,
  bell: Bell,
};

export function WorkflowVisualization() {
  return (
    <GlowCard color="purple" className="w-full p-8 relative overflow-hidden">
      {/* Background styling */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(139,92,246,0.1),transparent_50%)]" />
      
      <div className="relative z-10 flex flex-col items-center max-w-3xl mx-auto py-8">
        {workflowSteps.map((step, index) => {
          const Icon = iconMap[step.icon] || Brain;
          const isLast = index === workflowSteps.length - 1;
          
          return (
            <div key={step.id} className="flex flex-col items-center w-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
                className="flex items-center gap-4 w-64 p-4 rounded-xl border border-border bg-background shadow-lg relative group"
              >
                {/* Node highlight glow */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-card-hover border border-border flex items-center justify-center text-secondary group-hover:scale-110 group-hover:text-primary transition-all duration-300">
                  <Icon size={20} />
                </div>
                
                <span className="font-medium text-text tracking-wide">{step.label}</span>
              </motion.div>
              
              {!isLast && (
                <div className="h-12 w-px relative my-2">
                  {/* Static line */}
                  <div className="absolute inset-0 bg-gradient-to-b from-border to-border-hover" />
                  
                  {/* Animated flow */}
                  <motion.div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(139,92,246,0.8)]"
                    initial={{ top: "0%", opacity: 0 }}
                    whileInView={{ top: "100%", opacity: [0, 1, 1, 0] }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                      duration: 1.5,
                      delay: index * 0.2 + 0.3,
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                  />
                  
                  {/* Arrow head */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-border-hover" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </GlowCard>
  );
}
