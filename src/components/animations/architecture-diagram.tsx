"use client";

import { motion } from "framer-motion";
import { Project, WorkflowStep, WorkflowNode, ParallelGroup } from "@/data/projects";
import { User, MessageCircle, GitMerge, Brain, Database, MessageSquare, Search, Sparkles, Globe, FileText, CheckSquare, FileOutput, MessageSquareCode, ClipboardList, GitPullRequest, Users, Activity, Webhook } from "lucide-react";

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

const renderNode = (step: WorkflowStep, index: number, isInView: boolean, fullWidth: boolean = false) => (
  <motion.div
    key={step.step + index}
    initial={{ opacity: 0, scale: 0.8, y: 20 }}
    animate={isInView ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 20 }}
    transition={{ 
      duration: 0.5, 
      delay: index * 0.15,
      type: "spring",
      stiffness: 200,
      damping: 15
    }}
    className={`flex items-center gap-3 ${fullWidth ? 'w-full max-w-md' : 'w-full max-w-[240px]'} p-3 rounded-xl border border-border bg-background shadow-lg relative group transition-all hover:border-primary/50`}
  >
    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-card-hover border border-border flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
      {getNodeIcon(step.icon)}
    </div>
    <div className="flex flex-col min-w-0">
      <span className="font-semibold text-text text-xs truncate">{step.step}</span>
      <span className="text-[10px] text-muted leading-tight mt-0.5 truncate">{step.detail}</span>
    </div>
  </motion.div>
);

const renderLinearFlow = (steps: WorkflowStep[], isInView: boolean, colIndex: number = 0, isInsideParallel: boolean = false) => {
  return (
    <div className="flex flex-col items-center w-full">
      {steps.map((node, index) => {
        const isLast = index === steps.length - 1;
        const drawLine = !isLast || isInsideParallel;

        return (
          <div key={index} className="flex flex-col items-center w-full z-10">
            {renderNode(node, index + (colIndex * 10), isInView)}
            
            {drawLine && (
              <div className="h-6 md:h-8 w-px relative my-1">
                <div className="absolute inset-0 bg-gradient-to-b from-border to-border-hover" />
                {isInView && (
                  <motion.div
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]"
                    animate={{ top: ["0%", "100%", "100%", "100%"], opacity: [0, 1, 0, 0] }}
                    transition={{ duration: 3, times: [0, 0.33, 0.34, 1], repeat: Infinity, ease: "linear" }}
                  />
                )}
                {/* Only draw arrow head if it's NOT the last item of a parallel column connecting to the horizontal line */}
                {(!isLast || !isInsideParallel) && (
                   <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-border-hover" />
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export function ArchitectureDiagram({ workflow, isInView }: ArchitectureDiagramProps) {
  return (
    <div className="w-full h-full min-h-[400px] relative overflow-hidden bg-card rounded-2xl border border-border flex items-center justify-center p-4 md:p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,var(--color-border)_1px,transparent_0)] bg-[size:20px_20px] opacity-30" />
      
      <div className="relative z-10 w-full py-4 flex flex-col items-center">
        {workflow.map((node, mainIndex) => {
          const isParallel = 'parallel' in node;
          const isLast = mainIndex === workflow.length - 1;

          return (
            <div key={mainIndex} className="flex flex-col items-center w-full">
              {isParallel ? (
                <div className="flex flex-col w-full items-center">
                  <div className="flex flex-col md:flex-row gap-4 md:gap-6 w-full justify-center items-start">
                    {(node as ParallelGroup).parallel.map((group, colIndex) => (
                      <div key={group.title} className="flex flex-col w-full flex-1 items-center relative">
                        <motion.div 
                          initial={{ opacity: 0, y: -10 }}
                          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                          transition={{ delay: colIndex * 0.2 }}
                          className="text-center mb-4 pb-2 border-b border-white/5 w-[80%]"
                        >
                          <span className="text-[10px] md:text-xs font-semibold text-primary uppercase tracking-wider">{group.title}</span>
                        </motion.div>
                        {/* Pass true for isInsideParallel so the last node gets a connecting drop line */}
                        {renderLinearFlow(group.steps, isInView, colIndex, true)}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                renderNode(node as WorkflowStep, mainIndex + 20, isInView, true)
              )}

              {/* Connecting line to the next block */}
              {!isLast && (
                <div className="flex flex-col items-center w-full">
                  {/* CONVERGING logic if the CURRENT node was parallel */}
                  {isParallel && (
                    <div className={`h-[2px] bg-border-hover opacity-50 z-0 relative ${((node as ParallelGroup).parallel?.length || 3) === 2 ? 'w-[50%]' : 'w-[66%]'}`}>
                       {isInView && (
                         <motion.div
                           className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]"
                           animate={{ left: ["0%", "0%", "50%", "50%"], opacity: [0, 0, 1, 0] }}
                           transition={{ duration: 3, times: [0, 0.33, 0.66, 1], repeat: Infinity, ease: "linear" }}
                         />
                       )}
                       {isInView && (
                         <motion.div
                           className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]"
                           animate={{ right: ["0%", "0%", "50%", "50%"], opacity: [0, 0, 1, 0] }}
                           transition={{ duration: 3, times: [0, 0.33, 0.66, 1], repeat: Infinity, ease: "linear" }}
                         />
                       )}
                    </div>
                  )}

                  <div className="h-6 md:h-12 w-px relative my-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-border to-border-hover" />
                    {isInView && (
                      <motion.div
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_var(--color-primary)]"
                        animate={{ top: ["0%", "0%", "100%", "100%"], opacity: [0, 0, 1, 0] }}
                        transition={{ duration: 3, times: [0, 0.66, 0.99, 1], repeat: Infinity, ease: "linear" }}
                      />
                    )}
                    {/* Only draw arrow head if it doesn't drop into a diverging bracket */}
                    {!(workflow[mainIndex + 1] && 'parallel' in workflow[mainIndex + 1]) && (
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-border-hover" />
                    )}
                  </div>

                  {/* DIVERGING logic if the NEXT node is parallel */}
                  {workflow[mainIndex + 1] && 'parallel' in workflow[mainIndex + 1] && (
                    <div className={`h-4 border-t border-l border-r border-border rounded-t-xl opacity-30 mt-0 ${(workflow[mainIndex + 1] as ParallelGroup).parallel.length === 2 ? 'w-[50%]' : 'w-[66%]'}`} />
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
