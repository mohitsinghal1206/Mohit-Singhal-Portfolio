"use client";

import { motion } from "framer-motion";
import { Project } from "@/data/projects";
import { User, MessageCircle, GitMerge, Brain, Database, MessageSquare, Search, Sparkles, Globe, FileText, CheckSquare, FileOutput, MessageSquareCode, ClipboardList, GitPullRequest, Users, Activity, Webhook } from "lucide-react";
import { cn } from "@/lib/utils";

const getNodeIcon = (id: string) => {
  switch (id) {
    case 'user': return <User size={20} className="text-muted group-hover:text-foreground transition-colors" />;
    case 'whatsapp': return <MessageCircle size={20} className="text-[#25D366]" />;
    case 'webhook': return <Webhook size={20} className="text-secondary" />;
    case 'copilot': return <MessageSquareCode size={20} className="text-primary" />;
    case 'n8n': return <GitMerge size={20} className="text-[#FF6E6B]" />;
    case 'brain': return <Brain size={20} className="text-[#10A37F]" />;
    case 'database': return <Database size={20} className="text-secondary" />;
    case 'message': return <MessageSquare size={20} className="text-muted group-hover:text-foreground transition-colors" />;
    case 'query': return <Search size={20} className="text-muted group-hover:text-foreground transition-colors" />;
    case 'gemini': return <Sparkles size={20} className="text-[#8B5CF6]" />;
    case 'globe': return <Globe size={20} className="text-[#3B82F6]" />;
    case 'scraper': return <FileText size={20} className="text-muted group-hover:text-foreground transition-colors" />;
    case 'critique': return <CheckSquare size={20} className="text-amber-500" />;
    case 'report': return <FileOutput size={20} className="text-primary" />;
    case 'assessment': return <ClipboardList size={20} className="text-primary" />;
    case 'devops': return <GitPullRequest size={20} className="text-[#0078D4]" />;
    case 'zoho': return <Users size={20} className="text-[#F59E0B]" />;
    default: return <Activity size={20} className="text-muted group-hover:text-foreground transition-colors" />;
  }
};

interface ArchitectureDiagramProps {
  workflow: Project["workflow"];
  isInView: boolean;
}

export function ArchitectureDiagram({ workflow, isInView }: ArchitectureDiagramProps) {
  return (
    <div className="w-full h-full min-h-[400px] relative overflow-hidden bg-card rounded-2xl border border-border flex items-center justify-center p-6">
      {/* Background grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,var(--color-border)_1px,transparent_0)] bg-[size:20px_20px] opacity-30" />
      
      <div className="relative z-10 flex flex-col items-center w-full py-4">
        {workflow.map((step, index) => {
          const isLast = index === workflow.length - 1;
          
          return (
            <div key={index} className="flex flex-col items-center w-full max-w-[280px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.15,
                  type: "spring",
                  stiffness: 200,
                  damping: 15
                }}
                className="flex items-center gap-4 w-full p-4 rounded-xl border border-border bg-background shadow-lg relative group transition-all hover:border-primary/50"
              >
                {/* Node highlight glow */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-card-hover border border-border flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {getNodeIcon(step.icon)}
                </div>
                
                <div className="flex flex-col">
                  <span className="font-semibold text-text text-sm">{step.step}</span>
                  <span className="text-xs text-muted leading-tight mt-0.5">{step.detail}</span>
                </div>
              </motion.div>
              
              {!isLast && (
                <div className="h-10 w-px relative my-1">
                  {/* Static line */}
                  <div className="absolute inset-0 bg-gradient-to-b from-border to-border-hover" />
                  
                  {/* Animated flow */}
                  {isInView && (
                    <motion.div
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]"
                      initial={{ top: "0%", opacity: 0 }}
                      animate={{ top: "100%", opacity: [0, 1, 1, 0] }}
                      transition={{
                        duration: 1.5,
                        delay: index * 0.2 + 0.3,
                        repeat: Infinity,
                        repeatDelay: 1
                      }}
                    />
                  )}
                  
                  {/* Arrow head */}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-border-hover" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
