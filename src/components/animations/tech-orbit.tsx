"use client";

import { motion } from "framer-motion";
import { Brain, Database, Cloud, Code2, Layers, Zap, Server, Globe, Cpu, Terminal, GitBranch } from "lucide-react";

const OrbitItem = ({ icon: Icon, angle, radius, duration, color, reverse = false }: any) => {
  const direction = reverse ? -1 : 1;
  
  return (
    <motion.div
      className="absolute top-1/2 left-1/2 -z-10"
      style={{ originX: 0, originY: 0 }}
      animate={{ rotate: [angle, angle + (360 * direction)] }}
      transition={{ duration, repeat: Infinity, ease: "linear" }}
    >
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 bg-[#1A1D24] border border-white/10 rounded-full p-3 shadow-[0_0_15px_rgba(0,0,0,0.8)]"
        style={{ x: radius, y: 0 }}
        animate={{ rotate: [-angle, -(angle + (360 * direction))] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        <Icon className={color} size={20} />
      </motion.div>
    </motion.div>
  );
};

export function TechOrbit() {
  return (
    <div className="relative w-full aspect-square max-w-[450px] flex items-center justify-center overflow-hidden mx-auto">
      
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-[60px] pointer-events-none" />

      {/* Orbit Rings (Dashed Circles) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[160px] h-[160px] rounded-full border border-white/5 border-dashed" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] rounded-full border border-white/5 border-dashed" />

      {/* Center Core */}
      <motion.div 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 1 }}
        className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-br from-[#0F172A] to-[#020617] border-2 border-primary shadow-[0_0_30px_rgba(var(--color-primary-rgb),0.4)] flex flex-col items-center justify-center"
      >
        <Brain size={32} className="text-primary mb-1 animate-pulse" />
        <span className="text-[10px] font-bold tracking-widest text-primary uppercase">AI Core</span>
      </motion.div>

      {/* Inner Orbit (Radius 80) */}
      <OrbitItem icon={Code2} angle={0} radius={80} duration={15} color="text-blue-400" />
      <OrbitItem icon={Database} angle={120} radius={80} duration={15} color="text-emerald-400" />
      <OrbitItem icon={Zap} angle={240} radius={80} duration={15} color="text-yellow-400" />

      {/* Outer Orbit (Radius 140, Reverse Direction) */}
      <OrbitItem icon={Cloud} angle={45} radius={140} duration={25} color="text-orange-400" reverse />
      <OrbitItem icon={Server} angle={117} radius={140} duration={25} color="text-cyan-400" reverse />
      <OrbitItem icon={Layers} angle={189} radius={140} duration={25} color="text-pink-400" reverse />
      <OrbitItem icon={GitBranch} angle={261} radius={140} duration={25} color="text-purple-400" reverse />
      <OrbitItem icon={Cpu} angle={333} radius={140} duration={25} color="text-rose-400" reverse />

    </div>
  );
}
