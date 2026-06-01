"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Layout, Sparkles, Code, Check } from "@mynaui/icons-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const softwareTools = [
  {
    name: "Figma",
    mastery: 95,
    color: "#F24E1E",
    icon: <img src="/icons/figma.svg" alt="Figma" className="w-5 h-5 shrink-0" />
  },
  {
    name: "Adobe Illustrator",
    mastery: 85,
    color: "#FF9A00",
    icon: <img src="/icons/illustrator.svg" alt="Adobe Illustrator" className="w-5 h-5 shrink-0" />
  },
  {
    name: "Adobe Photoshop",
    mastery: 90,
    color: "#00C8FF",
    icon: <img src="/icons/photoshop.svg" alt="Adobe Photoshop" className="w-5 h-5 shrink-0" />
  },
  {
    name: "Canva",
    mastery: 90,
    color: "#00C4CC",
    icon: <img src="/icons/canva.svg" alt="Canva" className="w-5 h-5 shrink-0" />
  },
  {
    name: "CapCut",
    mastery: 85,
    color: "#00F0FF",
    icon: <img src="/icons/capcut.svg" alt="CapCut" className="w-5 h-5 shrink-0" />
  }
];

const techStack = [
  {
    name: "HTML",
    mastery: 95,
    color: "#E34F26",
    icon: <img src="/icons/html.svg" alt="HTML" className="w-5 h-5 shrink-0" />
  },
  {
    name: "CSS",
    mastery: 90,
    color: "#1572B6",
    icon: <img src="/icons/css.svg" alt="CSS" className="w-5 h-5 shrink-0" />
  },
  {
    name: "JavaScript",
    mastery: 85,
    color: "#F7DF1E",
    icon: <img src="/icons/javascript.svg" alt="JavaScript" className="w-5 h-5 shrink-0" />
  },
  {
    name: "Laravel",
    mastery: 85,
    color: "#FF2D20",
    icon: <img src="/icons/laravel.svg" alt="Laravel" className="w-5 h-5 shrink-0" />
  },
  {
    name: "PHP",
    mastery: 80,
    color: "#777BB4",
    icon: <img src="/icons/php.svg" alt="PHP" className="w-5 h-5 shrink-0" />
  },
  {
    name: "MySQL",
    mastery: 85,
    color: "#4479A1",
    icon: <img src="/icons/mysql.svg" alt="MySQL" className="w-5 h-5 shrink-0" />
  },
  {
    name: "Python",
    mastery: 80,
    color: "#3776AB",
    icon: <img src="/icons/python.svg" alt="Python" className="w-5 h-5 shrink-0" />
  }
];

const uiUxDesignSkills = [
  "User-Centered Design Methodology",
  "User Research & Usability Testing",
  "High-Fidelity Wireframes & User Flows",
  "Information Architecture & Site Mapping",
  "Advanced Component Architecture & Variants in Figma",
  "Advanced Auto Layout Systems & Design Tokens in Figma",
  "High-Fidelity Interactive Prototyping"
];

export default function SkillsDeck() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shouldReduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (shouldReduce) {
      gsap.set(".skills-card", { opacity: 1, y: 0, scale: 1 });
      gsap.set(".progress-bar-fill", {
        width: (index, target) => target.getAttribute("data-target") + "%"
      });
      return;
    }

    const ctx = gsap.context(() => {
      // Staggered cards entrance
      gsap.fromTo(
        ".skills-card",
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true
          }
        }
      );

      // Sweeping progress bar fills
      gsap.fromTo(
        ".progress-bar-fill",
        { width: "0%" },
        {
          width: (index, target) => target.getAttribute("data-target") + "%",
          duration: 1.2,
          ease: "power3.out",
          delay: 0.3,
          stagger: 0.04,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch w-full">
        
        {/* ─── Column 1: UI/UX Design ─────────────────────────────────────────── */}
        <div className="skills-card relative overflow-hidden rounded-[2rem] border border-card-border bg-card/60 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between hover:border-primary/30 transition-all hover:shadow-xl group/card opacity-0">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6">
              <Layout size={24} />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">
              Methodology & Design
            </span>
            <h3 className="text-2xl font-extrabold text-foreground mb-4">
              UI/UX Design
            </h3>
            <p className="text-sm text-foreground/60 leading-relaxed mb-6">
              Understanding user behavior to construct clear information architecture, user journeys, and robust design systems that scale. Advanced Figma workflow expert.
            </p>
            
            <div className="space-y-3">
              {uiUxDesignSkills.map((skill) => (
                <div key={skill} className="flex items-start gap-2.5 text-xs text-foreground/80 leading-normal">
                  <span className="w-4 h-4 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0 mt-0.5">
                    <Check size={10} />
                  </span>
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Column 2: Software & Creative Tools ─────────────────────────────── */}
        <div className="skills-card relative overflow-hidden rounded-[2rem] border border-card-border bg-card/60 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between hover:border-pink-500/20 transition-all hover:shadow-xl group/card opacity-0">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-500 mb-6">
              <Sparkles size={24} />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-pink-500 mb-2 block">
              Creative Suite
            </span>
            <h3 className="text-2xl font-extrabold text-foreground mb-4">
              Software Tools
            </h3>
            <p className="text-sm text-foreground/60 leading-relaxed mb-8">
              Utilizing industry-standard creative tools to design visual layouts, vector assets, high-fidelity prototypes, and short-form videos.
            </p>

            <div className="space-y-6">
              {softwareTools.map((tool) => (
                <div key={tool.name} className="w-full">
                  <div className="flex justify-between items-center mb-1.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 flex items-center justify-center select-none">
                        {tool.icon}
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-foreground/80">
                        {tool.name}
                      </span>
                    </div>
                    <span className="text-xs font-bold font-mono text-foreground/60">
                      {tool.mastery}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-secondary/70 dark:bg-white/5 overflow-hidden">
                    <div
                      className="progress-bar-fill h-full rounded-full"
                      data-target={tool.mastery}
                      style={{
                        backgroundColor: tool.color,
                        width: "0%"
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Column 3: Tech Stack & Coding ──────────────────────────────────── */}
        <div className="skills-card relative overflow-hidden rounded-[2rem] border border-card-border bg-card/60 backdrop-blur-md p-6 sm:p-8 flex flex-col justify-between hover:border-teal-500/20 transition-all hover:shadow-xl group/card opacity-0">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-500 mb-6">
              <Code size={24} />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-teal-500 mb-2 block">
              Development
            </span>
            <h3 className="text-2xl font-extrabold text-foreground mb-4">
              Tech Stack
            </h3>
            <p className="text-sm text-foreground/60 leading-relaxed mb-8">
              Writing clean, structured, and modular code to bridge the gap between static design layouts and fully responsive production web apps.
            </p>

            <div className="space-y-6">
              {techStack.map((tool) => (
                <div key={tool.name} className="w-full">
                  <div className="flex justify-between items-center mb-1.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 flex items-center justify-center select-none">
                        {tool.icon}
                      </div>
                      <span className="text-xs font-bold uppercase tracking-wider text-foreground/80">
                        {tool.name}
                      </span>
                    </div>
                    <span className="text-xs font-bold font-mono text-foreground/60">
                      {tool.mastery}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-secondary/70 dark:bg-white/5 overflow-hidden">
                    <div
                      className="progress-bar-fill h-full rounded-full"
                      data-target={tool.mastery}
                      style={{
                        backgroundColor: tool.color,
                        width: "0%"
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
