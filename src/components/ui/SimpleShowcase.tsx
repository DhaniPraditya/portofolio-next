"use client";

import { motion } from "framer-motion";

interface SimpleShowcaseProps {
  mockupImages: string[];
}

export default function SimpleShowcase({ mockupImages }: SimpleShowcaseProps) {
  // Desktop mockup (first image), Mobile mockup (second image)
  const desktopImage = mockupImages[0];
  const mobileImage = mockupImages[1];

  return (
    <div className="relative w-full max-w-[500px] aspect-[4/3] flex items-center justify-center z-10 select-none">
      {/* ─── Ambient Backdrop Glow (Subtle & Soft) ────────────────────────────── */}
      <div className="absolute inset-0 bg-primary/10 blur-[90px] rounded-full pointer-events-none" />

      {/* ─── Layer 1: Desktop Browser Mockup ──────────────────────────────────── */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute w-[85%] aspect-[16/10.5] rounded-2xl bg-zinc-950/90 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05)] overflow-hidden flex flex-col left-4 top-8"
      >
        {/* Browser Header Bar */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-white/5 bg-zinc-950/80">
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-white/10" />
            <span className="w-2 h-2 rounded-full bg-white/10" />
            <span className="w-2 h-2 rounded-full bg-white/10" />
          </div>
          <div className="w-48 mx-auto h-4 rounded bg-white/5 border border-white/5 flex items-center justify-center">
            <span className="text-[8px] text-foreground/30 font-mono tracking-wider">
              dhanipraditya.com
            </span>
          </div>
        </div>

        {/* Viewport Screen */}
        <div className="flex-1 relative bg-zinc-900 overflow-hidden">
          <img
            src={desktopImage}
            alt="Desktop UI/UX Project Showcase"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      {/* ─── Layer 2: Overlapping Mobile Phone Mockup ─────────────────────────── */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5 // Out of sync for dynamic depth
        }}
        className="absolute right-4 bottom-4 w-[28%] aspect-[9/18.5] rounded-[1.75rem] bg-zinc-950 border-[3.5px] border-white/10 shadow-[0_20px_45px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col p-1 z-20"
      >
        {/* Dynamic Island Notch */}
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-8 h-2.5 rounded-full bg-black z-30" />

        {/* Mobile Screen Viewport */}
        <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative bg-zinc-900">
          <img
            src={mobileImage}
            alt="Mobile UI/UX Project Showcase"
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
}
