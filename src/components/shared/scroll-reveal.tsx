"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  width?: "fit-content" | "100%";
}

export function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
  width = "100%",
}: ScrollRevealProps) {
  const getDirectionOffset = () => {
    switch (direction) {
      case "up": return { y: 40, x: 0 };
      case "down": return { y: -40, x: 0 };
      case "left": return { x: 40, y: 0 };
      case "right": return { x: -40, y: 0 };
      case "none": return { x: 0, y: 0 };
      default: return { y: 40, x: 0 };
    }
  };

  const offset = getDirectionOffset();

  return (
    <div style={{ width }} className={className}>
      <motion.div
        initial={{ opacity: 0, ...offset }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          duration: 0.7,
          delay,
          ease: [0.16, 1, 0.3, 1], // easeOutExpo
        }}
        style={{ width: "100%", height: "100%" }}
      >
        {children}
      </motion.div>
    </div>
  );
}
