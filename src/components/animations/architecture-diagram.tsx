"use client";

import { motion } from "framer-motion";
import { Project } from "@/data/projects";

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
            <rect
              width="100"
              height="40"
              rx="6"
              className={`arch-node ${node.highlight ? "stroke-primary shadow-lg" : ""}`}
              style={{
                filter: node.highlight ? "drop-shadow(0 0 10px rgba(59, 130, 246, 0.3))" : "none"
              }}
            />
            <text
              x="50"
              y="25"
              textAnchor="middle"
              className="text-xs font-medium fill-text font-sans"
            >
              {node.label}
            </text>
            
            {node.highlight && (
              <circle
                cx="90"
                cy="10"
                r="3"
                className="fill-primary animate-pulse"
              />
            )}
          </motion.g>
        ))}
      </svg>
    </div>
  );
}
