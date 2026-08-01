"use client";

import { motion } from "framer-motion";

export function GradientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        animate={{
          x: [0, 100, 0, -100, 0],
          y: [0, -50, -100, -50, 0],
          scale: [1, 1.1, 1, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="gradient-orb gradient-orb-blue w-[600px] h-[600px] top-[-100px] left-[-200px] opacity-40"
      />
      <motion.div
        animate={{
          x: [0, -100, 0, 100, 0],
          y: [0, 100, 50, 100, 0],
          scale: [1, 0.9, 1, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="gradient-orb gradient-orb-purple w-[500px] h-[500px] top-[20%] right-[-100px] opacity-30"
      />
    </div>
  );
}
