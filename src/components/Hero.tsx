"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "@mynaui/icons-react";
import Link from "next/link";
import ShinyText from "@/components/ui/ShinyText";
import SimpleShowcase from "@/components/ui/SimpleShowcase";

const mockupImages = [
  "/projects/skripsi/dashboard-no-navbar.svg",
  "/projects/artisan/home.svg"
];

export default function Hero() {
  return (
    <section id="home" className="relative flex flex-col md:flex-row items-center justify-between min-h-screen px-4 md:px-12 max-w-7xl mx-auto pt-24 pb-16 md:pt-20 gap-8 md:gap-12 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center md:text-left w-full md:w-1/2"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="px-4 py-1.5 mb-6 inline-block text-xs font-semibold tracking-widest uppercase rounded-full glass border-white/5 text-primary"
        >
          Available for New Projects
        </motion.span>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
          Designing <ShinyText text="Experiences" /> <br />
          that Users Love.
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-foreground/60 mb-10 leading-relaxed max-w-xl mx-auto md:mx-0">
          I'm a UI/UX Designer focused on building functional, beautiful, and user-centric digital products. Turning complex problems into simple solutions.
        </p>

        <div className="flex flex-col sm:flex-row items-center md:items-start justify-center md:justify-start gap-4">
          <Link
            href="#projects"
            className="w-full sm:w-auto group flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-2xl transition-all hover:bg-primary/90 hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
          >
            View My Work
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/resume.pdf"
            className="w-full sm:w-auto group flex items-center justify-center gap-2 px-8 py-4 glass border-white/10 font-semibold rounded-2xl transition-all hover:bg-white/10 hover:scale-105 active:scale-95"
          >
            <Download size={20} />
            Download CV
          </Link>
        </div>
      </motion.div>

      {/* SimpleShowcase — hidden on mobile */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="relative z-10 w-full md:w-1/2 hidden md:flex justify-center md:justify-end mt-4 md:mt-0"
      >
        <SimpleShowcase mockupImages={mockupImages} />
      </motion.div>

      {/* Subtle Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/30 font-bold">Scroll Down</span>
        <div className="w-px h-10 bg-gradient-to-b from-primary/50 to-transparent" />
      </motion.div>
    </section>
  );
}
