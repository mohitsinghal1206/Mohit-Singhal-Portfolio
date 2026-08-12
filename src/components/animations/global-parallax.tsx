"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function GlobalParallax() {
  const { scrollY } = useScroll();
  
  // Move the background up at 20% of the scroll speed to create a deep 3D parallax effect
  const y = useTransform(scrollY, [0, 5000], [0, -1000]);

  return (
    <motion.div 
      className="fixed inset-[-100%] -z-50 pointer-events-none"
      style={{ y }}
    >
      <div className="absolute inset-0 bg-[#0A0E17]" />
      
      {/* Minimal Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]" />
      
      {/* Glowing Ambient Orbs */}
      <div className="absolute top-[30%] left-[30%] w-[800px] h-[800px] rounded-full bg-primary/5 blur-[150px]" />
      <div className="absolute top-[60%] right-[20%] w-[1000px] h-[1000px] rounded-full bg-cyan-500/5 blur-[150px]" />
      <div className="absolute top-[10%] left-[60%] w-[600px] h-[600px] rounded-full bg-purple-500/5 blur-[150px]" />
    </motion.div>
  );
}
