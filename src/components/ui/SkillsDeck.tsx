"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Layout, Sparkles, Check } from "@mynaui/icons-react";
import BorderGlow from "@/components/BorderGlow";

const softwareTools = [
  { name: "Figma", color: "#F24E1E", icon: "/icons/figma.webp" },
  { name: "Illustrator", color: "#FF9A00", icon: "/icons/illustrator.webp" },
  { name: "Photoshop", color: "#00C8FF", icon: "/icons/photoshop.webp" },
  { name: "Canva", color: "#00C4CC", icon: "/icons/canva.webp" },
  { name: "CapCut", color: "#00F0FF", icon: "/icons/capcut.webp" }
];

const techStack = [
  { name: "HTML", color: "#E34F26", icon: "/icons/html.webp" },
  { name: "CSS", color: "#1572B6", icon: "/icons/css.webp" },
  { name: "JavaScript", color: "#F7DF1E", icon: "/icons/javascript.webp" },
  { name: "Laravel", color: "#FF2D20", icon: "/icons/laravel.webp" },
  { name: "PHP", color: "#777BB4", icon: "/icons/php.webp" },
  { name: "MySQL", color: "#4479A1", icon: "/icons/mysql.webp" },
  { name: "Python", color: "#3776AB", icon: "/icons/python.webp" }
];

const designPhases = [
  {
    subtitle: "01. DISCOVER & RESEARCH",
    title: "User Research & Audit",
    description: "Conducting qualitative interviews, usability audits, and competitor analysis to empathize with users and define core problem spaces.",
    icon: <Search size={22} className="text-primary" />,
    colors: ["#3b82f6", "#60a5fa", "#93c5fd"],
    glowColor: "217 91 60"
  },
  {
    subtitle: "02. STRATEGY & FLOWS",
    title: "UX Architecture",
    description: "Designing sitemaps, interactive user flows, and low-fidelity wireframes to establish logical information hierarchies.",
    icon: <Layout size={22} className="text-teal-500" />,
    colors: ["#14b8a6", "#2dd4bf", "#5eead4"],
    glowColor: "173 80 50"
  },
  {
    subtitle: "03. VISUAL & SYSTEMS",
    title: "UI Design & Figma Systems",
    description: "Crafting beautiful UI screens using advanced auto layout, master components, variants, variables, and responsive grid layouts.",
    icon: <Sparkles size={22} className="text-pink-500" />,
    colors: ["#ec4899", "#f472b6", "#f43f5e"],
    glowColor: "330 85 60"
  },
  {
    subtitle: "04. PROTOTYPE & TEST",
    title: "Prototyping & Testing",
    description: "Building interactive user prototypes, conducting user testing sessions to iterate on feedback, and preparing assets for developer handoff.",
    icon: <Check size={22} className="text-emerald-500" />,
    colors: ["#10b981", "#34d399", "#6ee7b7"],
    glowColor: "160 84 50"
  }
];

export default function SkillsDeck() {
  const [activeTab, setActiveTab] = useState<"uiux" | "tools">("uiux");

  return (
    <div className="w-full flex flex-col gap-6">
      
      {/* ─── Tab Selector ──────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex justify-center mb-8"
      >
        <div className="relative p-1 bg-secondary/50 dark:bg-card-border/10 rounded-full flex gap-1 border border-card-border">
          <button
            type="button"
            onClick={() => setActiveTab("uiux")}
            className={`relative z-10 px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeTab === "uiux"
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "text-foreground/50 hover:text-foreground/80"
            }`}
          >
            UI/UX Design Process
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("tools")}
            className={`relative z-10 px-6 py-2.5 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeTab === "tools"
                ? "bg-primary text-white shadow-md shadow-primary/20"
                : "text-foreground/50 hover:text-foreground/80"
            }`}
          >
            Tools & Stack
          </button>
        </div>
      </motion.div>

      {/* ─── Tab Content Panel (AnimatePresence Transition) ───────────────────── */}
      <div className="w-full min-h-[350px]">
        <AnimatePresence mode="wait">
          {activeTab === "uiux" ? (
            /* UI/UX Design Process Grid */
            <motion.div
              key="uiux-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch w-full"
            >
              {designPhases.map((phase, index) => (
                <motion.div
                  key={phase.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="h-full flex"
                >
                  <BorderGlow
                    borderRadius={32}
                    glowColor={phase.glowColor}
                    colors={phase.colors}
                    edgeSensitivity={20}
                    glowRadius={30}
                    glowIntensity={1.2}
                    backgroundColor="var(--card-bg)"
                    className="w-full h-full p-6 sm:p-8 flex flex-col justify-between border-card-border/60 hover:border-card-border transition-all group/card"
                  >
                    <div className="flex flex-col justify-between h-full">
                      <div>
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                          {phase.icon}
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary/80 mb-2 block">
                          {phase.subtitle}
                        </span>
                        <h3 className="text-lg sm:text-xl font-extrabold text-foreground mb-3">
                          {phase.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-foreground/60 leading-relaxed">
                          {phase.description}
                        </p>
                      </div>
                    </div>
                  </BorderGlow>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* Tools & Stack Icon Only Grid */
            <motion.div
              key="tools-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="space-y-12 w-full"
            >
              {/* Design Software */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-6 flex items-center gap-2">
                  <span className="w-8 h-px bg-foreground/20" /> Design Software
                </h4>
                <div className="flex flex-wrap gap-4 sm:gap-6 justify-start">
                  {softwareTools.map((tool, index) => (
                    <motion.div
                      key={tool.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.03 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group/tile flex flex-col items-center justify-center p-4 w-24 h-24 rounded-2xl border border-card-border bg-card/40 transition-all duration-300 hover:shadow-lg cursor-pointer"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = tool.color;
                        e.currentTarget.style.boxShadow = `0 0 20px ${tool.color}20`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "";
                        e.currentTarget.style.boxShadow = "";
                      }}
                    >
                      <div className="relative w-10 h-10 flex items-center justify-center select-none">
                        <img
                          src={tool.icon}
                          alt={tool.name}
                          className="w-8 h-8 object-contain transition-transform duration-300 group-hover/tile:scale-110"
                        />
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-foreground/45 mt-2 transition-colors duration-300 group-hover/tile:text-foreground text-center line-clamp-1">
                        {tool.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Development Stack */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/40 mb-6 flex items-center gap-2">
                  <span className="w-8 h-px bg-foreground/20" /> Coding & Technologies
                </h4>
                <div className="flex flex-wrap gap-4 sm:gap-6 justify-start">
                  {techStack.map((tool, index) => (
                    <motion.div
                      key={tool.name}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.03 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="group/tile flex flex-col items-center justify-center p-4 w-24 h-24 rounded-2xl border border-card-border bg-card/40 transition-all duration-300 hover:shadow-lg cursor-pointer"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = tool.color;
                        e.currentTarget.style.boxShadow = `0 0 20px ${tool.color}20`;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "";
                        e.currentTarget.style.boxShadow = "";
                      }}
                    >
                      <div className="relative w-10 h-10 flex items-center justify-center select-none">
                        <img
                          src={tool.icon}
                          alt={tool.name}
                          className="w-8 h-8 object-contain transition-transform duration-300 group-hover/tile:scale-110"
                        />
                      </div>
                      <span className="text-[9px] font-bold uppercase tracking-wider text-foreground/45 mt-2 transition-colors duration-300 group-hover/tile:text-foreground text-center line-clamp-1">
                        {tool.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
    </div>
  );
}
