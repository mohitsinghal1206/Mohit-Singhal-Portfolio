"use client";

import { siteConfig } from "@/data/site-config";
import { cn } from "@/lib/utils";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    
    // Show navbar background when scrolled
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    // Hide navbar when scrolling down, show when scrolling up
    if (latest > 150 && latest > previous) {
      setHidden(true);
      setMobileMenuOpen(false); // Close mobile menu on scroll down
    } else {
      setHidden(false);
    }
  });

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: "-100%", opacity: 0 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={cn(
          "fixed top-0 inset-x-0 z-40 w-full transition-all duration-300",
          isScrolled
            ? "glass py-4 border-b"
            : "bg-transparent py-6 border-b-transparent"
        )}
      >
        <div className="container mx-auto px-6 max-w-6xl flex items-center justify-between">
          <a 
            href="#" 
            onClick={(e) => handleNavClick(e, "body")}
            className="text-lg font-bold tracking-tighter"
          >
            MS<span className="text-primary">.</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {siteConfig.nav.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className="text-sm font-medium text-muted transition-colors hover:text-text relative group py-2"
                  >
                    {item.label}
                    <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </a>
                </li>
              ))}
            </ul>
            
            <div className="flex items-center gap-4">
              <a
                href="#lab"
                onClick={(e) => handleNavClick(e, "#lab")}
                className="hidden lg:block px-4 py-2 text-sm font-medium rounded-full border border-border text-muted hover:text-text hover:border-primary/50 transition-colors"
              >
                Beyond the Work
              </a>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="px-4 py-2 text-sm font-medium rounded-full bg-white text-black hover:bg-white/90 transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 text-text"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-30 glass transition-all duration-300 md:hidden flex flex-col justify-center items-center",
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <ul className="flex flex-col items-center gap-8">
          {siteConfig.nav.map((item, i) => (
            <motion.li
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={mobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <a
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-2xl font-medium text-text"
              >
                {item.label}
              </a>
            </motion.li>
          ))}
          <motion.li
            initial={{ opacity: 0, y: 20 }}
            animate={mobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.3, delay: siteConfig.nav.length * 0.1 }}
            className="mt-4"
          >
             <div className="flex flex-col gap-4 w-full px-8">
               <a
                href="#lab"
                onClick={(e) => handleNavClick(e, "#lab")}
                className="w-full text-center py-3 text-lg font-medium rounded-full border border-border text-muted"
              >
                Beyond the Work
              </a>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="w-full text-center py-3 text-lg font-medium rounded-full bg-white text-black"
              >
                Get in Touch
              </a>
            </div>
          </motion.li>
        </ul>
      </div>
    </>
  );
}
