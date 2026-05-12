"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Layout, Search, Mobile, Code } from "@mynaui/icons-react";

const skillCards = [
  {
    title: "UI Design",
    icon: <Layout size={32} />,
    color: "text-primary",
    bgColor: "bg-primary/10",
    dotColor: "bg-primary",
    skills: ["Figma", "Adobe XD", "Design Systems", "Typography"]
  },
  {
    title: "UX Research",
    icon: <Search size={32} />,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    dotColor: "bg-purple-500",
    skills: ["User Interviews", "Usability Testing", "Personas", "User Flows"]
  },
  {
    title: "Prototyping",
    icon: <Mobile size={32} />,
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
    dotColor: "bg-emerald-500",
    skills: ["Framer", "Protopie", "Micro-interactions", "Wireframing"]
  },
  {
    title: "Frontend Basics",
    icon: <Code size={32} />,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    dotColor: "bg-blue-500",
    skills: ["HTML/CSS", "Tailwind CSS", "React JS", "Next.js"]
  }
];

export default function Carousel() {
  const [width, setWidth] = useState(0);
  const carousel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
    
    // Update on resize
    const handleResize = () => {
      if (carousel.current) {
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="overflow-hidden cursor-grab active:cursor-grabbing w-full" ref={carousel}>
      <motion.div 
        drag="x" 
        dragConstraints={{ right: 0, left: -width }} 
        className="flex gap-8 px-4 pb-12 pt-4"
        whileTap={{ cursor: "grabbing" }}
      >
        {skillCards.map((card, index) => (
          <motion.div 
            key={index} 
            className="min-w-[280px] md:min-w-[350px] p-8 md:p-10 glass rounded-[2.5rem] border border-white/5 shadow-2xl transition-all duration-300 pointer-events-none"
            whileHover={{ y: -10, borderColor: "rgba(255,255,255,0.1)" }}
          >
            <div className={`p-4 w-16 h-16 rounded-2xl flex items-center justify-center mb-8 ${card.color} ${card.bgColor}`}>
              {card.icon}
            </div>
            <h3 className="text-2xl font-bold mb-6">{card.title}</h3>
            <ul className="space-y-4">
              {card.skills.map(s => (
                <li key={s} className="text-sm font-semibold text-foreground/80 flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${card.dotColor}`} /> {s}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
