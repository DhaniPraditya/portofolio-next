"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { Menu, X, Sun, Moon } from "@mynaui/icons-react";
import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";

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
  const navRef = useRef<HTMLDivElement>(null);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    let isScrolled = false;
    const handleScroll = () => {
      const shouldScroll = window.scrollY > 50;
      if (shouldScroll !== isScrolled) {
        isScrolled = shouldScroll;
        setScrolled(shouldScroll);
      }
    };
    // Use passive listener for better scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (navRef.current) {
        gsap.fromTo(
          navRef.current,
          { y: -100, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
        );
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4">
      <div
        ref={navRef}
        className={`flex items-center justify-between w-full max-w-5xl px-6 py-3 transition-colors duration-300 rounded-2xl ${scrolled ? "glass shadow-xl" : "bg-transparent"
          }`}
      >
        <Link href="/" className="text-xl font-bold tracking-tighter text-gradient">
          DESIGNER.
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium transition-colors hover:text-primary text-foreground/70"
            >
              {link.name}
            </Link>
          ))}
          
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-card-border bg-card text-foreground hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center group/theme"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun size={18} className="text-amber-400 transition-transform duration-500 group-hover/theme:rotate-90" />
            ) : (
              <Moon size={18} className="text-slate-700 transition-transform duration-500 group-hover/theme:-rotate-12" />
            )}
          </button>

          <Link
            href="#contact"
            className="px-5 py-2 text-sm font-medium text-white transition-all rounded-full bg-primary hover:bg-primary/80 hover:scale-105 active:scale-95"
          >
            Hire Me
          </Link>
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-card-border bg-card text-foreground active:scale-95 transition-all cursor-pointer flex items-center justify-center"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun size={18} className="text-amber-400" />
            ) : (
              <Moon size={18} className="text-slate-700" />
            )}
          </button>

          <button
            className="p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-x-4 top-20 z-40 p-6 glass rounded-3xl md:hidden transition-all duration-300 origin-top ${
          isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="flex flex-col space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-lg font-medium text-foreground/80"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="#contact"
            className="w-full py-3 mt-4 text-center text-white transition-all rounded-xl bg-primary"
            onClick={() => setIsOpen(false)}
          >
            Hire Me
          </Link>
        </div>
      </div>
    </nav>
  );
}
