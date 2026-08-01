"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  onClick?: () => void;
}

export function MagneticButton({
  children,
  href,
  className,
  variant = "primary",
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth spring physics for the magnetic effect
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    // Calculate distance from center (max 15px movement)
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    x.set(distanceX * 0.2);
    y.set(distanceY * 0.2);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "bg-white text-black hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.15)]";
      case "secondary":
        return "bg-[var(--color-card)] border border-[var(--color-border)] text-white hover:border-[var(--color-primary)] hover:bg-[var(--color-card-hover)]";
      case "outline":
        return "border border-white/20 text-white hover:bg-white/10";
      case "ghost":
        return "text-[var(--color-muted)] hover:text-white hover:bg-white/5";
      default:
        return "";
    }
  };

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors duration-300",
        getVariantStyles(),
        className
      )}
      onClick={onClick}
    >
      {/* Background glow for primary button on hover */}
      {variant === "primary" && (
        <motion.div
          className="absolute inset-0 -z-10 rounded-full bg-white blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.3 : 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
      {children}
    </motion.div>
  );

  if (href) {
    // If it's an anchor link for smooth scrolling
    if (href.startsWith("#")) {
      return (
        <a 
          href={href} 
          onClick={(e) => {
            e.preventDefault();
            const element = document.querySelector(href);
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className="inline-block"
        >
          {content}
        </a>
      );
    }
    return <Link href={href} className="inline-block">{content}</Link>;
  }

  return <button className="inline-block">{content}</button>;
}
