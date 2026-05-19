"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Layout, Search, Mobile, Code, Sparkles, Check, ChevronRight } from "@mynaui/icons-react";

// ─── Skill Categories Data ───────────────────────────────────────────────────
interface SkillItem {
  id: string;
  title: string;
  label: string;
  icon: React.ReactNode;
  tagline: string;
  description: string;
  tools: string[];
}

const skillCategories: SkillItem[] = [
  {
    id: "ui-design",
    title: "UI Design",
    label: "Design",
    icon: <Layout size={20} />,
    tagline: "Crafting beautiful, pixel-perfect systems",
    description:
      "Crafting intuitive and visually stunning interfaces for web and mobile platforms. Every pixel is placed with purpose, backed by a strong foundation in visual hierarchy, fluid spacing systems, and structured design systems that scale.",
    tools: ["Figma", "Design Systems", "Auto Layout", "Typography", "Color Theory", "Responsive Grid"],
  },
  {
    id: "ux-research",
    title: "UX Research",
    label: "Research",
    icon: <Search size={20} />,
    tagline: "Empathizing and solving user pain points",
    description:
      "Understanding user behavior through rigorous qualitative and quantitative testing. I turn user friction points and analytical data into clean, logical user journeys and high-conversion wireframes.",
    tools: ["User Interviews", "Usability Testing", "Personas", "User Journeys", "A/B Testing", "Information Architecture"],
  },
  {
    id: "prototyping",
    title: "Prototyping",
    label: "Prototype",
    icon: <Mobile size={20} />,
    tagline: "Bringing static layouts to life",
    description:
      "Bridging the gap between static design and real experience. I build high-fidelity interactive models to test micro-interactions, transition timings, elastic spring physics, and complex motion flows.",
    tools: ["Framer", "ProtoPie", "GSAP Motion", "Micro-interactions", "Interactive States", "Wireframing"],
  },
  {
    id: "frontend",
    title: "Frontend Basics",
    label: "Dev",
    icon: <Code size={20} />,
    tagline: "Translating vision into interactive code",
    description:
      "Bridging the gap between design and engineering. Writing clean, semantic, and highly performant code enables me to build fully responsive products, understand constraints, and collaborate closely with developers.",
    tools: ["React.js", "Next.js", "Tailwind CSS", "HTML5 / CSS3", "TypeScript Basics", "Git / GitHub"],
  },
  {
    id: "software-stack",
    title: "Software & Stack",
    label: "Tech Stack",
    icon: <Sparkles size={20} />,
    tagline: "Unifying industry-leading tools and languages",
    description:
      "A versatile toolbelt that enables seamless handoffs, structured code generation, and professional-grade outputs. I leverage specialized design platforms alongside robust development frameworks to deliver high-quality, scalable web solutions.",
    tools: ["HTML", "CSS", "JavaScript", "PHP", "Python", "MySQL", "Laravel", "Figma", "Adobe Illustrator", "Adobe Photoshop", "Canva", "CapCut"],
  }
];

const techStackDetails = {
  html: {
    name: "HTML",
    category: "Frontend Markup",
    mastery: 95,
    color: "rgb(230, 81, 0)",
    gridName: "HTML",
    useCase: "Building semantic, structured, and search-engine optimized document trees for web platforms.",
    icon: <img src="/icons/html.svg" alt="HTML" className="w-6 h-6 shrink-0" />
  },
  css: {
    name: "CSS",
    category: "Styling & Layout",
    mastery: 90,
    color: "rgb(21, 101, 192)",
    gridName: "CSS",
    useCase: "Designing responsive fluid page layouts using Flexbox, CSS Grid, custom keyframe transitions, and animations.",
    icon: <img src="/icons/css.svg" alt="CSS" className="w-6 h-6 shrink-0" />
  },
  javascript: {
    name: "JavaScript",
    category: "Programming Language",
    mastery: 85,
    color: "rgb(234, 179, 8)",
    gridName: "JavaScript",
    useCase: "Enabling client-side interactive widgets, state manipulation, async API requests, and visual transitions.",
    icon: <img src="/icons/javascript.svg" alt="JavaScript" className="w-6 h-6 shrink-0" />
  },
  php: {
    name: "PHP",
    category: "Backend Language",
    mastery: 80,
    color: "rgb(120, 144, 156)",
    gridName: "PHP",
    useCase: "Processing server-side scripts, database communication, and constructing server-side templating logic.",
    icon: <img src="/icons/php.svg" alt="PHP" className="w-6 h-6 shrink-0" />
  },
  python: {
    name: "Python",
    category: "Programming Language",
    mastery: 80,
    color: "rgb(75, 144, 203)",
    gridName: "Python",
    useCase: "Developing automation scripts, parsing data models, and constructing backend micro-services.",
    icon: <img src="/icons/python.svg" alt="Python" className="w-6 h-6 shrink-0" />
  },
  mysql: {
    name: "MySQL",
    category: "Relational Database",
    mastery: 85,
    color: "rgb(0, 117, 143)",
    gridName: "MySQL",
    useCase: "Structuring relational databases, writing queries, managing records, and performing indexing optimizations.",
    icon: <img src="/icons/mysql.svg" alt="MySQL" className="w-6 h-6 shrink-0" />
  },
  laravel: {
    name: "Laravel",
    category: "PHP Framework",
    mastery: 85,
    color: "rgb(240, 83, 64)",
    gridName: "Laravel",
    useCase: "Building robust backend architectures, Eloquent ORM databases, secured endpoints, and robust routing structures.",
    icon: <img src="/icons/laravel.svg" alt="Laravel" className="w-6 h-6 shrink-0" />
  },
  figma: {
    name: "Figma",
    category: "Design Software",
    mastery: 95,
    color: "rgb(242, 78, 29)",
    gridName: "Figma",
    useCase: "Crafting complete high-fidelity UI designs, vector components, interactive prototypes, and scalable design systems.",
    icon: <img src="/icons/figma.svg" alt="Figma" className="w-6 h-6 shrink-0" />
  },
  adobeillustrator: {
    name: "Adobe Illustrator",
    category: "Vector Graphics",
    mastery: 85,
    color: "rgb(255, 154, 0)",
    gridName: "Illustrator",
    useCase: "Creating high-resolution vector assets, branding logos, icons, vector shapes, and print layouts.",
    icon: <img src="/icons/illustrator.svg" alt="Adobe Illustrator" className="w-6 h-6 shrink-0" />
  },
  adobephotoshop: {
    name: "Adobe Photoshop",
    category: "Image Editing",
    mastery: 90,
    color: "rgb(0, 200, 255)",
    gridName: "Photoshop",
    useCase: "Retouching raster graphics, editing high-resolution photos, creating digital composites, and asset pre-processing.",
    icon: <img src="/icons/photoshop.svg" alt="Adobe Photoshop" className="w-6 h-6 shrink-0" />
  },
  canva: {
    name: "Canva",
    category: "Creative Tools",
    mastery: 90,
    color: "rgb(0, 196, 204)",
    gridName: "Canva",
    useCase: "Rapidly designing social media visual assets, corporate presentations, and custom graphic templates.",
    icon: <img src="/icons/canva.svg" alt="Canva" className="w-6 h-6 shrink-0" />
  },
  capcut: {
    name: "CapCut",
    category: "Video Editing",
    mastery: 85,
    color: "rgb(255, 255, 255)",
    gridName: "CapCut",
    useCase: "Assembling short-form videos, adjusting audio tracks, synchronizing frame cuts, and rendering social media video content.",
    icon: <img src="/icons/capcut.svg" alt="CapCut" className="w-6 h-6 shrink-0" />
  },
};

export default function SkillsDeck() {
  const [activeTab, setActiveTab] = useState<string>("ui-design");
  const tabContentRef = useRef<HTMLDivElement>(null);

  // ─── Playgrounds State ──────────────────────────────────────────────────────
  // 5. Software & Stack Playground
  const [selectedTool, setSelectedTool] = useState<string>("figma");

  // 1. UI Design Playground
  const [uiColor, setUiColor] = useState<string>("rgb(59, 130, 246)"); // Blue
  const [uiSpacing, setUiSpacing] = useState<number>(16);

  // 2. UX Research Playground
  const [selectedNode, setSelectedNode] = useState<string>("lands");

  // 3. Prototyping Playground
  const [protoScale, setProtoScale] = useState<number>(1);
  const [protoRotate, setProtoRotate] = useState<number>(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // 4. Frontend Playground
  const [feBlur, setFeBlur] = useState<number>(16);
  const [feOpacity, setFeOpacity] = useState<number>(8);
  const [feGlow, setFeGlow] = useState<boolean>(true);

  // ─── Animate Tab Changes ────────────────────────────────────────────────────
  useEffect(() => {
    let ctx = gsap.context(() => {
      if (tabContentRef.current) {
        gsap.fromTo(
          tabContentRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
        );
      }
    });
    return () => ctx.revert();
  }, [activeTab]);

  // Springy micro-interaction for Prototyping Button
  const handleProtoClick = () => {
    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { scale: 0.9 },
        { scale: 1, duration: 0.6, ease: "elastic.out(1, 0.3)" }
      );
    }
  };

  const activeSkill = skillCategories.find((cat) => cat.id === activeTab) || skillCategories[0];

  return (
    <div className="w-full flex flex-col gap-8">
      {/* ─── Control Deck Structure ────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch w-full">

        {/* Left Side: Navigation Controls (Col 4) */}
        <div className="lg:col-span-4 flex flex-col gap-3 justify-center">
          {skillCategories.map((cat) => {
            const isActive = cat.id === activeTab;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`w-full flex items-center justify-between text-left p-5 rounded-2xl border transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 relative overflow-hidden group ${isActive
                  ? "bg-[#0A1628] border-primary/40 shadow-lg shadow-primary/10"
                  : "bg-[#030712] border-white/10 hover:bg-[#060D18] hover:border-white/20"
                  }`}
              >
                {/* Glow Active Background */}
                {isActive && (
                  <span className="absolute inset-y-0 left-0 w-1 bg-primary rounded-r-full" />
                )}

                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-xl border transition-all duration-300 ${isActive
                      ? "bg-primary/10 border-primary/30 text-primary"
                      : "bg-white/5 border-white/5 text-foreground/50 group-hover:text-foreground/80"
                      }`}
                  >
                    {cat.icon}
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-foreground/40 block mb-0.5">
                      {cat.label}
                    </span>
                    <h3 className={`font-bold transition-all ${isActive ? "text-foreground" : "text-foreground/75"}`}>
                      {cat.title}
                    </h3>
                  </div>
                </div>

                <ChevronRight
                  size={16}
                  className={`transition-transform duration-300 ${isActive ? "translate-x-0 text-primary" : "-translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 text-foreground/30"
                    }`}
                />
              </button>
            );
          })}
        </div>

        {/* Right Side: Immersive Spatial Viewport (Col 8) */}
        <div className="lg:col-span-8 flex flex-col">
          <div
            ref={tabContentRef}
            className="w-full h-full bg-[#0a111a]/95 border border-white/10 rounded-3xl shadow-xl p-6 md:p-8 flex flex-col justify-between relative min-h-[500px]"
          >
              {/* Split Panel: Left Details, Right Live Interactive Widget */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 items-center h-full">

                {activeTab === "software-stack" ? (
                  <>
                    {/* Left Column: Customized 12-Tool Grid Selection */}
                    <div className="flex flex-col justify-center gap-4">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-primary mb-1 block">
                          Interactive Stack
                        </span>
                        <h2 className="text-3xl font-extrabold text-foreground mb-2">
                          My Tech Stack
                        </h2>
                        <p className="text-xs text-foreground/50 leading-relaxed">
                          Click any of the 12 industry-standard software platforms and languages below to inspect my technical workflow and mastery levels.
                        </p>
                      </div>

                      {/* Symmetrical 4-column Grid with brand SVG icons! */}
                      <div className="grid grid-cols-4 gap-2.5 mt-2">
                        {Object.entries(techStackDetails).map(([key, item]) => {
                          const isSelected = selectedTool === key;
                          return (
                            <button
                              key={key}
                              onClick={() => setSelectedTool(key)}
                              className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary/40 ${isSelected
                                ? "bg-white/[0.08] border-white/20 shadow-md scale-105"
                                : "bg-white/[0.02] border-white/5 hover:bg-white/[0.04] hover:border-white/10"
                                }`}
                            >
                              {/* Brand Icon SVG Wrapper */}
                              <div className="transition-transform duration-300 group-hover:scale-110">
                                {item.icon}
                              </div>
                              <span className="text-[10px] font-bold tracking-wider text-foreground/80 truncate w-full text-center">
                                {item.gridName}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right Column: High-Fidelity Active Tool Details Card */}
                    {(() => {
                      const activeTool = techStackDetails[selectedTool as keyof typeof techStackDetails] || techStackDetails.figma;
                      return (
                      <div
                        className="rounded-3xl border h-full min-h-[340px] transition-all duration-500 relative shadow-2xl p-6 flex flex-col justify-between"
                        style={{
                          backgroundColor: `${activeTool.color.replace("rgb", "rgba").replace(")", ", 0.08)")}`,
                          borderColor: `${activeTool.color.replace("rgb", "rgba").replace(")", ", 0.25)")}`,
                          boxShadow: `0 10px 25px rgba(0,0,0,0.2), 0 0 15px ${activeTool.color.replace("rgb", "rgba").replace(")", ", 0.15)")}`,
                        }}
                      >
                            <div className="flex flex-col gap-4">
                              {/* Large Icon Container */}
                              <div className="flex items-center gap-4">
                                <div className="w-14 h-14 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center shadow-inner">
                                  {activeTool.icon}
                                </div>
                                <div>
                                  <span className="text-[10px] uppercase font-black tracking-widest text-foreground/45 block mb-0.5">
                                    {activeTool.category}
                                  </span>
                                  <h4 className="text-xl font-bold text-foreground">
                                    {activeTool.name}
                                  </h4>
                                </div>
                              </div>

                              {/* Mastery Slider & Stat */}
                              <div className="space-y-2 mt-2">
                                <div className="flex justify-between items-end">
                                  <span className="text-[10px] uppercase font-bold tracking-widest text-foreground/45">
                                    Proficiency Level
                                  </span>
                                  <span className="text-sm font-black font-mono text-white" style={{ color: activeTool.color }}>
                                    {activeTool.mastery}%
                                  </span>
                                </div>
                                <div className="w-full h-2.5 rounded-full bg-white/10 overflow-hidden relative">
                                  <div
                                    className="h-full rounded-full transition-all duration-700 ease-out"
                                    style={{
                                      width: `${activeTool.mastery}%`,
                                      backgroundColor: activeTool.color,
                                    }}
                                  />
                                </div>
                              </div>

                              {/* Workflow Use-case */}
                              <div className="space-y-2">
                                <span className="text-[10px] uppercase font-bold tracking-widest text-foreground/45 block">
                                  Professional Workflow
                                </span>
                                <p className="text-sm text-foreground/75 leading-relaxed font-medium">
                                  {activeTool.useCase}
                                </p>
                              </div>
                            </div>

                            <div className="text-[10px] text-foreground/35 uppercase tracking-wider font-semibold border-t border-white/5 pt-3 mt-4 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full animate-ping" style={{ backgroundColor: activeTool.color }} />
                              Interactive Developer Stack Inspection
                            </div>
                        </div>
                      );
                    })()}
                  </>
                ) : (
                  <>
                    {/* Content Panel */}
                    <div className="flex flex-col justify-center">
                      <span className="text-xs font-bold uppercase tracking-widest text-primary mb-2 block">
                        {activeSkill.tagline}
                      </span>
                      <h2 className="text-3xl font-extrabold text-foreground mb-4">
                        {activeSkill.title}
                      </h2>
                      <p className="text-sm md:text-base text-foreground/60 leading-relaxed mb-6">
                        {activeSkill.description}
                      </p>

                      {/* Checklist Tools Grid */}
                      <h4 className="text-xs font-bold uppercase tracking-wider text-foreground/40 mb-3">
                        Core Expertise & Tooling
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {activeSkill.tools.map((tool) => (
                          <div key={tool} className="flex items-center gap-2 text-xs text-foreground/80">
                            <span className="w-4 h-4 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary shrink-0">
                              <Check size={10} />
                            </span>
                            <span>{tool}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Live Interactive Playground Widget Container */}
                    <div className="bg-black/20 border border-white/5 rounded-2xl p-5 flex flex-col justify-between h-full min-h-[300px] relative overflow-hidden shadow-inner">

                      {/* Widget Label Header */}
                      <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-4">
                        <div className="flex items-center gap-2">
                          <Sparkles size={14} className="text-primary animate-pulse" />
                          <span className="text-xs font-bold uppercase tracking-widest text-foreground/60">
                            Spatial Interactive View
                          </span>
                        </div>
                        <span className="text-[10px] bg-white/5 border border-white/5 px-2 py-0.5 rounded-full text-foreground/45 uppercase tracking-wider font-semibold">
                          Live Demo
                        </span>
                      </div>

                      {/* 🎨 Playgrounds ──────────────────────────────────────────────── */}

                      {/* 1. UI Design Playground */}
                      {activeTab === "ui-design" && (
                        <div className="flex-1 flex flex-col justify-between gap-4">
                          {/* Visual Card Example */}
                          <div className="flex-1 flex items-center justify-center p-2">
                            <div
                              className="w-full rounded-2xl border border-white/10 p-5 backdrop-blur-md transition-all duration-300 flex flex-col"
                              style={{
                                backgroundColor: `${uiColor.replace("rgb", "rgba").replace(")", ", 0.08)")}`,
                                gap: `${uiSpacing}px`,
                                boxShadow: `0 12px 24px rgba(0,0,0,0.2), 0 0 20px ${uiColor.replace("rgb", "rgba").replace(")", ", 0.1)")}`,
                                borderColor: `${uiColor.replace("rgb", "rgba").replace(")", ", 0.25)")}`,
                              }}
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: uiColor }}>
                                  <Layout size={18} />
                                </div>
                                <div>
                                  <div className="w-20 h-3.5 rounded-full bg-white/20" />
                                  <div className="w-12 h-2.5 rounded-full bg-white/10 mt-1.5" />
                                </div>
                              </div>
                              <div className="flex flex-col gap-2">
                                <div className="w-full h-2 rounded-full bg-white/10" />
                                <div className="w-4/5 h-2 rounded-full bg-white/10" />
                              </div>
                            </div>
                          </div>

                          {/* Interactive Knobs */}
                          <div className="flex flex-col gap-2.5 border-t border-white/5 pt-3">
                            <div>
                              <span className="text-[10px] text-foreground/40 font-bold uppercase tracking-wider block mb-1">
                                Theme Accent
                              </span>
                              <div className="flex gap-2">
                                {["rgb(59, 130, 246)", "rgb(168, 85, 247)", "rgb(236, 72, 153)", "rgb(20, 184, 166)"].map((color) => (
                                  <button
                                    key={color}
                                    onClick={() => setUiColor(color)}
                                    className="w-5 h-5 rounded-full border border-white/20 cursor-pointer transition hover:scale-110 active:scale-95"
                                    style={{
                                      backgroundColor: color,
                                      outline: uiColor === color ? `2px solid ${color}` : "none",
                                      outlineOffset: "2px",
                                    }}
                                  />
                                ))}
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-[10px] text-foreground/40 font-bold uppercase tracking-wider mb-1">
                                <span>Auto Layout Spacing</span>
                                <span className="text-primary font-mono">{uiSpacing}px</span>
                              </div>
                              <input
                                type="range"
                                min="8"
                                max="28"
                                value={uiSpacing}
                                onChange={(e) => setUiSpacing(Number(e.target.value))}
                                className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 2. UX Research Playground */}
                      {activeTab === "ux-research" && (
                        <div className="flex-1 flex flex-col justify-between gap-4">
                          {/* Node map display */}
                          <div className="flex-1 flex flex-col justify-center gap-4 py-2">
                            <div className="flex items-center justify-between relative px-2">
                              {/* Connecting Line */}
                              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2 z-0" />

                              {/* Node 1 */}
                              <button
                                onClick={() => setSelectedNode("lands")}
                                className={`w-10 h-10 rounded-full flex items-center justify-center border cursor-pointer z-10 transition-all ${selectedNode === "lands"
                                  ? "bg-purple-500 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                                  : "bg-zinc-900 border-white/10 text-foreground/50 hover:border-white/20"
                                  }`}
                              >
                                1
                              </button>

                              {/* Node 2 */}
                              <button
                                onClick={() => setSelectedNode("bento")}
                                className={`w-10 h-10 rounded-full flex items-center justify-center border cursor-pointer z-10 transition-all ${selectedNode === "bento"
                                  ? "bg-purple-500 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                                  : "bg-zinc-900 border-white/10 text-foreground/50 hover:border-white/20"
                                  }`}
                              >
                                2
                              </button>

                              {/* Node 3 */}
                              <button
                                onClick={() => setSelectedNode("conversion")}
                                className={`w-10 h-10 rounded-full flex items-center justify-center border cursor-pointer z-10 transition-all ${selectedNode === "conversion"
                                  ? "bg-purple-500 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                                  : "bg-zinc-900 border-white/10 text-foreground/50 hover:border-white/20"
                                  }`}
                              >
                                3
                              </button>
                            </div>

                            {/* Display Info Box */}
                            <div className="bg-white/5 border border-white/5 rounded-xl p-3.5 min-h-[90px] flex flex-col justify-center">
                              {selectedNode === "lands" && (
                                <>
                                  <h5 className="text-xs font-bold text-purple-400 mb-1">Step 1: User Discovery & Landing</h5>
                                  <p className="text-[11px] text-foreground/60 leading-relaxed">
                                    Measuring bounce rates and initial aesthetic impact. Design decisions are made to hook visual attention within 3 seconds.
                                  </p>
                                </>
                              )}
                              {selectedNode === "bento" && (
                                <>
                                  <h5 className="text-xs font-bold text-purple-400 mb-1">Step 2: Interaction & Bento Layout</h5>
                                  <p className="text-[11px] text-foreground/60 leading-relaxed">
                                    Analyzing scanning patterns and heatmap actions. We ensure accessibility guidelines and natural spatial layout flow are optimized.
                                  </p>
                                </>
                              )}
                              {selectedNode === "conversion" && (
                                <>
                                  <h5 className="text-xs font-bold text-purple-400 mb-1">Step 3: Conversion Achievement</h5>
                                  <p className="text-[11px] text-foreground/60 leading-relaxed">
                                    The ultimate checkout or contact goal. By establishing trust through design clarity, overall conversion rates increase by up to 40%.
                                  </p>
                                </>
                              )}
                            </div>
                          </div>
                          <span className="text-[10px] text-foreground/30 text-center block font-semibold uppercase tracking-wider">
                            Click the stages to test user journey UX data
                          </span>
                        </div>
                      )}

                      {/* 3. Prototyping Playground */}
                      {activeTab === "prototyping" && (
                        <div className="flex-1 flex flex-col justify-between gap-4">
                          {/* Rotating visual board */}
                          <div className="flex-1 flex items-center justify-center p-2">
                            <div
                              className="w-36 h-24 bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/30 rounded-2xl shadow-lg flex flex-col items-center justify-center p-3 text-center transition-all duration-150"
                              style={{
                                transform: `perspective(600px) rotateY(${protoRotate}deg) scale(${protoScale})`,
                              }}
                            >
                              <Mobile size={24} className="text-pink-500 mb-2" />
                              <span className="text-[10px] font-bold tracking-wider uppercase text-white/90">
                                Physics Layer
                              </span>
                            </div>
                          </div>

                          {/* Interactive controls */}
                          <div className="flex flex-col gap-2.5 border-t border-white/5 pt-3">
                            <div className="flex items-center gap-3">
                              <button
                                ref={buttonRef}
                                onClick={handleProtoClick}
                                className="flex-1 py-2 px-3 bg-pink-600 hover:bg-pink-500 active:scale-95 text-xs font-bold text-white rounded-xl cursor-pointer transition-colors shadow-[0_4px_12px_rgba(236,72,153,0.3)] text-center"
                              >
                                Elastic Trigger
                              </button>
                              <button
                                onClick={() => {
                                  setProtoRotate(0);
                                  setProtoScale(1);
                                }}
                                className="py-2 px-3 border border-white/10 hover:bg-white/5 active:scale-95 text-xs text-foreground/60 rounded-xl cursor-pointer transition-colors text-center"
                              >
                                Reset
                              </button>
                            </div>
                            <div className="flex flex-col gap-2">
                              <div>
                                <div className="flex justify-between text-[10px] text-foreground/40 font-bold uppercase tracking-wider mb-0.5">
                                  <span>Z-Perspective Rotate</span>
                                  <span className="text-pink-500 font-mono">{protoRotate}°</span>
                                </div>
                                <input
                                  type="range"
                                  min="-45"
                                  max="45"
                                  value={protoRotate}
                                  onChange={(e) => setProtoRotate(Number(e.target.value))}
                                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-pink-500"
                                />
                              </div>
                              <div>
                                <div className="flex justify-between text-[10px] text-foreground/40 font-bold uppercase tracking-wider mb-0.5">
                                  <span>Scale Factor</span>
                                  <span className="text-pink-500 font-mono">{protoScale.toFixed(2)}x</span>
                                </div>
                                <input
                                  type="range"
                                  min="0.8"
                                  max="1.3"
                                  step="0.05"
                                  value={protoScale}
                                  onChange={(e) => setProtoScale(Number(e.target.value))}
                                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-pink-500"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 4. Frontend Playground */}
                      {activeTab === "frontend" && (
                        <div className="flex-1 flex flex-col justify-between gap-3">
                          {/* Live styled element & code block */}
                          <div className="flex-1 grid grid-cols-12 gap-3 items-center">
                            {/* Left: Code panel */}
                            <div className="col-span-7 bg-black/40 rounded-xl p-2.5 font-mono text-[9px] text-teal-400 border border-white/5 h-full flex flex-col justify-center leading-normal">
                              <div><span className="text-foreground/40">.glass-deck</span> &#123;</div>
                              <div className="pl-3">backdrop-filter: <span className="text-white">blur({feBlur}px)</span>;</div>
                              <div className="pl-3">background: <span className="text-white">rgba(255,255,255,{feOpacity / 100})</span>;</div>
                              <div className="pl-3">border-color: <span className="text-white">{feGlow ? "rgba(20,184,166,0.3)" : "rgba(255,255,255,0.05)"}</span>;</div>
                              <div>&#125;</div>
                            </div>

                            {/* Right: Rendered element */}
                            <div className="col-span-5 flex items-center justify-center h-full">
                              <div
                                className="w-full aspect-square rounded-2xl border transition-all duration-300 flex items-center justify-center shadow-lg"
                                style={{
                                  backdropFilter: `blur(${feBlur}px)`,
                                  backgroundColor: `rgba(255, 255, 255, ${feOpacity / 100})`,
                                  borderColor: feGlow ? "rgba(20, 184, 166, 0.4)" : "rgba(255, 255, 255, 0.08)",
                                  boxShadow: feGlow ? "0 8px 24px rgba(20, 184, 166, 0.2)" : "none",
                                }}
                              >
                                <Code size={20} className={feGlow ? "text-teal-400 animate-pulse" : "text-white/40"} />
                              </div>
                            </div>
                          </div>

                          {/* Interactive controls */}
                          <div className="flex flex-col gap-2 border-t border-white/5 pt-2">
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <div className="flex justify-between text-[10px] text-foreground/40 font-bold uppercase tracking-wider mb-0.5">
                                  <span>Blur</span>
                                  <span className="text-teal-400 font-mono">{feBlur}px</span>
                                </div>
                                <input
                                  type="range"
                                  min="4"
                                  max="32"
                                  value={feBlur}
                                  onChange={(e) => setFeBlur(Number(e.target.value))}
                                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-teal-500"
                                />
                              </div>
                              <div>
                                <div className="flex justify-between text-[10px] text-foreground/40 font-bold uppercase tracking-wider mb-0.5">
                                  <span>Opacity</span>
                                  <span className="text-teal-400 font-mono">{feOpacity}%</span>
                                </div>
                                <input
                                  type="range"
                                  min="2"
                                  max="25"
                                  value={feOpacity}
                                  onChange={(e) => setFeOpacity(Number(e.target.value))}
                                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-teal-500"
                                />
                              </div>
                            </div>
                            <div className="flex items-center justify-between border-t border-white/5 pt-2">
                              <span className="text-[10px] text-foreground/40 font-bold uppercase tracking-wider">
                                Active Border Glow Accent
                              </span>
                              <button
                                onClick={() => setFeGlow(!feGlow)}
                                className={`w-9 h-5 rounded-full p-0.5 cursor-pointer transition-colors duration-300 focus:outline-none ${feGlow ? "bg-teal-500" : "bg-white/10"
                                  }`}
                              >
                                <div
                                  className={`w-4 h-4 rounded-full bg-white transition-transform duration-300 ${feGlow ? "translate-x-4" : "translate-x-0"
                                    }`}
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
