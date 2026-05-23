"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

const links = [
  { label: "Education", href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { dark, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#f5f5f0]/90 dark:bg-[#0a0a0a]/90 backdrop-blur-md border-b border-black/8 dark:border-white/8" : ""
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => handleClick("#hero")}
          className="text-sm font-semibold text-black/80 dark:text-white/80 hover:text-black dark:hover:text-white transition-colors"
        >
          Raymond Fang
        </button>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button key={l.href} onClick={() => handleClick(l.href)}
              className="text-sm text-black/50 dark:text-white/55 hover:text-black dark:hover:text-white transition-colors">
              {l.label}
            </button>
          ))}
          <button onClick={toggle} aria-label="Toggle theme"
            className="text-black/45 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors">
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <button onClick={toggle} aria-label="Toggle theme" className="text-black/45 dark:text-white/50">
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button onClick={() => setOpen(!open)} aria-label="Toggle menu"
            className="text-black/50 dark:text-white/60 hover:text-black dark:hover:text-white">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#f5f5f0]/95 dark:bg-[#0a0a0a]/95 border-b border-black/8 dark:border-white/8"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map((l) => (
                <button key={l.href} onClick={() => handleClick(l.href)}
                  className="text-sm text-black/50 dark:text-white/55 hover:text-black dark:hover:text-white transition-colors text-left">
                  {l.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
