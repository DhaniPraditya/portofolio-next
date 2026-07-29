"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "@mynaui/icons-react";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let isScrolled = false;
    const handleScroll = () => {
      const shouldScroll = window.scrollY > 30;
      if (shouldScroll !== isScrolled) {
        isScrolled = shouldScroll;
        setScrolled(shouldScroll);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center p-3 sm:p-4"
      >
        {/* Glassmorphism Navbar Capsule */}
        <div
          className={`flex items-center justify-between w-full max-w-5xl px-5 py-2.5 sm:px-6 sm:py-3 transition-all duration-300 rounded-full border ${
            scrolled
              ? "backdrop-blur-2xl bg-slate-950/80 border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)]"
              : "backdrop-blur-xl bg-slate-950/60 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.1)]"
          }`}
        >
          {/* Brand Logo */}
          <Link
            href="/"
            className="text-lg sm:text-xl font-bold tracking-tighter text-gradient hover:opacity-90 transition-opacity cursor-pointer flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            DESIGNER.
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 sm:space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-1.5 text-xs sm:text-sm font-semibold rounded-full text-foreground/80 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
              >
                {link.name}
              </Link>
            ))}

            {/* Glass Gradient CTA Button */}
            <Link
              href="#contact"
              className="ml-3 px-5 py-2 text-xs sm:text-sm font-bold text-white transition-all duration-300 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 active:scale-95 cursor-pointer border border-white/20"
            >
              Hire Me
            </Link>
          </div>

          {/* Mobile Menu Control */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              className="p-2 rounded-full bg-white/5 border border-white/10 text-foreground hover:text-white active:scale-95 transition-all cursor-pointer flex items-center justify-center backdrop-blur-md"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Glass Overlay Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-4 top-20 z-50 p-6 backdrop-blur-2xl bg-slate-950/95 border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.15)] rounded-3xl md:hidden"
            >
              <div className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="px-4 py-2.5 text-base font-semibold text-foreground/90 hover:text-white hover:bg-white/10 rounded-2xl transition-all cursor-pointer"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href="#contact"
                  className="w-full py-3 mt-2 text-center text-sm font-bold text-white transition-all rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg shadow-blue-500/25 active:scale-98 cursor-pointer border border-white/20"
                  onClick={() => setIsOpen(false)}
                >
                  Hire Me
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
