"use client";

import { motion } from "framer-motion";
import { Project } from "@/data/projects";
import { User, MessageCircle, GitMerge, Brain, Database, MessageSquare, Search, Sparkles, Globe, FileText, CheckSquare, FileOutput, MessageSquareCode, ClipboardList, GitPullRequest, Users, Activity } from "lucide-react";

const getNodeIcon = (id: string) => {
  switch (id) {
    case 'user':
    case 'employee': return <User size={14} className="text-muted group-hover:text-foreground transition-colors" />;
    case 'whatsapp': return <MessageCircle size={14} className="text-[#25D366]" />;
    case 'wati':
    case 'copilot': return <MessageSquareCode size={14} className="text-primary" />;
    case 'n8n': return <GitMerge size={14} className="text-[#FF6E6B]" />;
    case 'gpt4': return <Brain size={14} className="text-[#10A37F]" />;
    case 'pinecone':
    case 'postgres': return <Database size={14} className="text-secondary" />;
    case 'response': return <MessageSquare size={14} className="text-muted group-hover:text-foreground transition-colors" />;
    case 'query': return <Search size={14} className="text-muted group-hover:text-foreground transition-colors" />;
    case 'gemini': return <Sparkles size={14} className="text-[#8B5CF6]" />;
    case 'tavily': return <Globe size={14} className="text-[#3B82F6]" />;
    case 'scraper': return <FileText size={14} className="text-muted group-hover:text-foreground transition-colors" />;
    case 'critique': return <CheckSquare size={14} className="text-amber-500" />;
    case 'report': return <FileOutput size={14} className="text-primary" />;
    case 'assessment': return <ClipboardList size={14} className="text-primary" />;
    case 'devops': return <GitPullRequest size={14} className="text-[#0078D4]" />;
    case 'zoho': return <Users size={14} className="text-[#F59E0B]" />;
    default: return <Activity size={14} className="text-muted group-hover:text-foreground transition-colors" />;
  }
};

interface ArchitectureDiagramProps {
  architecture: Project["architecture"];
  isInView: boolean;
}

export function ArchitectureDiagram({ architecture, isInView }: ArchitectureDiagramProps) {
  return (
    <div className="w-full h-full min-h-[300px] relative overflow-hidden bg-card rounded-xl border border-border p-4 flex items-center justify-center group">
      {/* Grid background for the diagram */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,var(--color-border)_1px,transparent_0)] bg-[size:20px_20px] opacity-30" />
      
      <svg
        viewBox="0 0 900 250"
        className="w-full h-full max-h-[250px] relative z-10"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Draw connections */}
        {architecture.connections.map((conn, i) => {
          const fromNode = architecture.nodes.find(n => n.id === conn.from);
          const toNode = architecture.nodes.find(n => n.id === conn.to);
          
          if (!fromNode || !toNode) return null;

          // Calculate path connecting centers of nodes (nodes are 100x40 rectangles)
          const startX = fromNode.x + 50;
          const startY = fromNode.y + 20;
          const endX = toNode.x + 50;
          const endY = toNode.y + 20;

          // Create a nice curved path if they are not on the same Y line
          let d = `M ${startX} ${startY}`;
          if (Math.abs(startY - endY) > 10) {
            d += ` C ${startX + 50} ${startY}, ${endX - 50} ${endY}, ${endX} ${endY}`;
          } else {
            d += ` L ${endX} ${endY}`;
          }

          return (
            <g key={`conn-${i}`}>
              <motion.path
                d={d}
                className="arch-line"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                transition={{ duration: 1, delay: 0.5 + i * 0.1, ease: "easeInOut" }}
              />
              
              {/* Animated data flow dot */}
              {isInView && (
                <circle r="3" className="arch-flow-dot">
                  <animateMotion
                    dur="3s"
                    repeatCount="indefinite"
                    path={d}
                    begin={`${i * 0.5}s`}
                  />
                </circle>
              )}
            </g>
          );
        })}

        {/* Draw nodes */}
        {architecture.nodes.map((node, i) => (
          <motion.g
            key={node.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1, type: "spring" }}
            transform={`translate(${node.x}, ${node.y})`}
            className="cursor-pointer"
          >
            <foreignObject width="120" height="50" x="-10" y="-5">
              <div 
                className={`w-[100px] h-[40px] m-[5px] flex items-center justify-center gap-2 rounded-lg border bg-card/80 backdrop-blur-sm shadow-sm transition-all hover:scale-110 group ${
                  node.highlight 
                    ? "border-primary shadow-[0_0_15px_rgba(59,130,246,0.2)] bg-primary/10" 
                    : "border-border hover:border-primary/50"
                }`}
              >
                {getNodeIcon(node.id)}
                <span className={`text-[11px] font-medium leading-tight text-center px-1 ${node.highlight ? "text-primary font-bold" : "text-text group-hover:text-foreground transition-colors"}`}>
                  {node.label}
                </span>
                
                {node.highlight && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                  </span>
                )}
              </div>
            </foreignObject>
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
