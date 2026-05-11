"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section id="home" className="relative flex flex-col items-center justify-center min-h-screen px-4 overflow-hidden pt-20">
      {/* Background Decorative Circles */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-purple-500/10 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 text-center"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="px-4 py-1.5 mb-6 inline-block text-xs font-semibold tracking-widest uppercase rounded-full glass border-white/5 text-primary"
        >
          Available for New Projects
        </motion.span>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
          Designing <span className="text-gradient">Experiences</span> <br />
          that Users Love.
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-foreground/60 mb-10 leading-relaxed">
          I'm a UI/UX Designer focused on building functional, beautiful, and user-centric digital products. Turning complex problems into simple solutions.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="#projects"
            className="group flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-2xl transition-all hover:bg-primary/90 hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
          >
            View My Work
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </Link>
          
          <Link
            href="/resume.pdf"
            className="group flex items-center gap-2 px-8 py-4 glass border-white/10 font-semibold rounded-2xl transition-all hover:bg-white/10 hover:scale-105 active:scale-95"
          >
            <Download size={20} />
            Download CV
          </Link>
        </div>
      </motion.div>

      {/* Subtle Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/30 font-bold">Scroll Down</span>
        <div className="w-px h-12 bg-gradient-to-b from-primary/50 to-transparent" />
      </motion.div>
    </section>
  );
}
