"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Figma } from "@mynaui/icons-react";
import { BookOpen, Lightbulb, TrendingUp, X, Palette, Shuffle, Layers } from "lucide-react";
import gsap from "gsap";

const projects = [
  {
    title: "Social Media Analytics",
    category: "Personal Project • UI Design",
    description: "A comprehensive platform for creator discovery and digital campaign management with a focus on data visualization.",
    image: "/projects/digimar/creator-discovery.svg",
    tags: ["UI Design", "Dashboard", "Marketing"],
    figmaLink: "https://www.figma.com/design/uLqpw7F2BT57DNPdgax6RW/Demo-Project?node-id=52-438&t=Cb1thkR2Q35BAlRi-1",
    caseStudy: {
      problem: "Creator discovery and campaign tracking are often manual and fragmented. Marketers waste hours switching between platforms to evaluate creator metrics, leading to inefficient budget spend and inaccurate campaign ROI forecasting.",
      solution: "Designed a unified dashboard featuring predictive data visualization, dynamic filters, and real-time creator performance metrics. Used a clean dark-mode interface with card layouts to group analytical charts and simplify data density.",
      impact: "Reduced creator sourcing time by 45%, increased campaign tracking efficiency, and provided clients with clear, actionable insights through automated visual PDF exports."
    },
    docsImages: [
      "/projects/digimar/home-page.png",
      "/projects/digimar/login-page.png",
      "/projects/digimar/mockup-login.png",
      "/projects/digimar/mockup-creator.png",
      "/projects/digimar/creator-discovery.png",
      "/projects/digimar/creator-discovery-instagram.png",
      "/projects/digimar/creator-discovery-detail.png",
      "/projects/digimar/content-discovery.png",
      "/projects/digimar/content-discovery-detail.png",
      "/projects/digimar/store-discovery-detail.png",
      "/projects/digimar/store-discovery-product-detail.png",
      "/projects/digimar/register-3.png"
    ]
  },
  {
    title: "E-book Digital Library",
    category: "Personal Project • UI/UX",
    description: "Creating an immersive and engaging reading experience through modern layout and interactive elements.",
    image: "/projects/ebook/home.svg",
    tags: ["Responsive Design", "Design System", "UI/UX", "Wireframing"],
    figmaLink: "https://www.figma.com/design/Wh35WfhYyWnTM8bYpzx6QG/eBook_Public_Library_Dhani-Praditya?node-id=9-139&t=MsYUBcoGMeA0UkS1-1",
    caseStudy: {
      problem: "Conventional digital library interfaces are often cluttered and mimic physical bookshelves poorly, leading to eye strain and high bounce rates among avid readers.",
      solution: "Crafted an immersive reading environment using warm color palettes, optimized typography hierarchy, and distraction-free dark and light themes. Included a fluid progress bar and seamless page transitions.",
      impact: "Average reading session duration increased by 35% and active user engagement grew by 20% in post-launch usability tests."
    },
    docsImages: [
      "/projects/ebook/home.svg",
      "/projects/ebook/mockup-1.png",
      "/projects/ebook/mockup-2.png"
    ]
  },
  {
    title: "Nusantara Regas Daily Report",
    category: "Intern Project • UI Design",
    description: "Developing a daily report website for Nusantara Regas with a focus on transforming manual reporting into a digital system.",
    image: "/projects/nr/form.svg",
    tags: ["UI Design", "Digitalization", "Wireframing"],
    figmaLink: "https://www.figma.com/design/qk3oavqR3VLOnw7Lij9HQU/Intern-Project?node-id=0-1&t=lyDb0zrl5krTetlS-1",
    caseStudy: {
      problem: "Operating personnel had to manually log gas distribution data on paper spreadsheets, leading to data entry delays, transcription errors, and slow corporate decision-making.",
      solution: "Developed a digitized, mobile-responsive data input form with real-time field validation, secure database sync, and a dashboard view for immediate supervisor sign-offs.",
      impact: "Eliminated paper waste, reduced reporting latency from 24 hours to instant, and achieved a 100% data entry accuracy rate."
    },
    docsImages: [
      "/projects/nr/login.svg",
      "/projects/nr/form.svg",
      "/projects/nr/mockup-1.png",
      "/projects/nr/notification-alert.png"
    ]
  },
  {
    title: "Registration System",
    category: "Thesis Project • End-to-end System",
    description: "A specialized system designed to streamline academic workflows and data management for thesis projects.",
    image: "/projects/skripsi/dashboard.svg",
    tags: ["Prototyping", "Wireframing", "Web App"],
    figmaLink: "https://www.figma.com/design/GIvi6Iu49dVW4UmRK3uFES/SKRIPSI-FIX?node-id=159-2010&t=CbYL7IqzUwm2AWkf-1",
    githubLink: "https://github.com/DhaniPraditya/Redesign-Website-Sistem-Registrasi-UNY",
    caseStudy: {
      problem: "Students and administrative staff faced bottlenecks during thesis registration, with fragmented communication, slow approval loops, and manual document verification.",
      solution: "Designed a unified end-to-end registration platform with step-by-step progress tracking, automated notification triggers, and a roles-based interface for students, advisors, and administration.",
      impact: "Shortened the average thesis registration workflow from 14 days to just 3 days, leading to higher student satisfaction and reduced administrative workload."
    },
    docsImages: [
      "/projects/skripsi/mockup-home.png",
      "/projects/skripsi/dashboard-no-navbar.svg",
      "/projects/skripsi/dashboard.svg",
      "/projects/skripsi/mockup-biodata.png"
    ]
  },
  {
    title: "Artisan Crafts",
    category: "Personal Project • Responsive Web Application",
    description: "A responsive e-commerce platform for artisan crafts with a focus on product visualization and user interaction.",
    image: "/projects/artisan/Home-Desktop.svg",
    tags: ["Design System", "Prototyping", "Responsive Design", "Wireframing"],
    figmaLink: "https://www.figma.com/design/ar0qEXFcdXU2hoqS2keO1u/Capstone_AstisanCrafts?node-id=0-1&t=QKAhIpgw9JGNoeTm-1",
    caseStudy: {
      problem: "Niche artisan shops struggle to compete with large e-commerce platforms due to poor product storytelling, flat product visualization, and generic check-out workflows.",
      solution: "Created a responsive e-commerce experience highlighting product craftsmanship through high-quality media galleries, interactive brand story cards, and a streamlined, secure 3-step checkout flow.",
      impact: "Increased add-to-cart conversion rate by 18% during dynamic user prototyping tests, showing improved brand affinity and user trust."
    },
    docsImages: [
      "/projects/artisan/home.svg",
      "/projects/artisan/Home-Desktop.svg",
      "/projects/artisan/Home-Mobile.svg",
      "/projects/artisan/ProductDetail-Desktop.svg",
      "/projects/artisan/ProductDetail-Mobile.svg",
      "/projects/artisan/Checkout-Desktop.svg",
      "/projects/artisan/Checkout-Mobile.svg",
      "/projects/artisan/ArtisanProfile-Desktop.svg",
      "/projects/artisan/ArtisanProfile-Mobile.svg"
    ]
  }
];

interface LightboxProps {
  src: string;
  title: string;
  onClose: () => void;
}

function Lightbox({ src, title, onClose }: LightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const shouldReduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = shouldReduce ? 0.05 : 0.3;

    gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration, ease: "power2.out" });
    gsap.fromTo(imgRef.current, { scale: 0.9, opacity: 0 }, { scale: 1, opacity: 1, duration, ease: "power2.out" });

    return () => {};
  }, []);

  const handleClose = () => {
    const shouldReduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = shouldReduce ? 0.05 : 0.25;

    gsap.to(overlayRef.current, { opacity: 0, duration, ease: "power2.in" });
    gsap.to(imgRef.current, {
      scale: 0.9,
      opacity: 0,
      duration,
      ease: "power2.in",
      onComplete: onClose
    });
  };

  return (
    <div className="fixed inset-0 z-[60] flex flex-col items-center justify-center p-4 md:p-8">
      {/* Backdrop overlay */}
      <div
        ref={overlayRef}
        onClick={handleClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-lg cursor-zoom-out"
      />

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col items-center max-w-5xl max-h-[90vh] gap-4">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute -top-12 right-0 p-2.5 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-all duration-300 cursor-pointer flex items-center justify-center"
        >
          <X size={20} />
        </button>

        <img
          ref={imgRef}
          src={src}
          alt={title}
          className="max-w-full max-h-[80vh] object-contain rounded-lg border border-white/10 shadow-2xl"
        />

        {title && (
          <span className="text-sm font-bold uppercase tracking-wider text-white/80 text-center mt-2 px-4 py-1.5 rounded-full bg-black/40 border border-white/5 backdrop-blur-md">
            {title}
          </span>
        )}
      </div>
    </div>
  );
}

interface ProjectModalProps {
  project: typeof projects[number];
  onClose: () => void;
}

function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [activeTab, setActiveTab] = useState<"case-study" | "documentation">("case-study");
  const [activeLightboxImg, setActiveLightboxImg] = useState<string | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shouldReduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = shouldReduce ? 0.05 : 0.4;

    // Open animations
    gsap.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration, ease: "power2.out" }
    );
    gsap.fromTo(
      containerRef.current,
      { scale: 0.95, y: 20, opacity: 0 },
      { scale: 1, y: 0, opacity: 1, duration, ease: "power2.out" }
    );

    // Prevent body scrolling when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleClose = () => {
    const shouldReduce = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = shouldReduce ? 0.05 : 0.3;

    // Close animations
    gsap.to(overlayRef.current, { opacity: 0, duration, ease: "power2.in" });
    gsap.to(containerRef.current, {
      scale: 0.95,
      y: 20,
      opacity: 0,
      duration,
      ease: "power2.in",
      onComplete: onClose
    });
  };

  const formatImageName = (path: string) => {
    const parts = path.split('/');
    const filename = parts[parts.length - 1];
    const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.'));
    return nameWithoutExt
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6">
      {/* Backdrop overlay */}
      <div
        ref={overlayRef}
        onClick={handleClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md cursor-pointer"
      />

      {/* Modal Container */}
      <div
        ref={containerRef}
        className="relative w-full max-w-4xl bg-[#05111E] border border-white/10 rounded-[1.5rem] md:rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] z-10"
      >
        {/* Header */}
        <div className="flex justify-between items-start p-6 md:p-8 border-b border-white/5 bg-[#030c16]">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-1 block">
              {project.category}
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
              {project.title}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-white/5 border border-transparent hover:border-white/10 text-foreground/60 hover:text-foreground transition-all duration-300 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs Bar */}
        <div className="flex border-b border-white/5 bg-[#030c16] px-6 md:px-8 gap-4">
          <button
            onClick={() => setActiveTab("case-study")}
            className={`px-4 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition-all duration-300 cursor-pointer ${
              activeTab === "case-study"
                ? "border-primary text-primary"
                : "border-transparent text-foreground/40 hover:text-foreground/70"
            }`}
          >
            Case Study
          </button>
          <button
            onClick={() => setActiveTab("documentation")}
            className={`px-4 py-3 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 transition-all duration-300 cursor-pointer ${
              activeTab === "documentation"
                ? "border-primary text-primary"
                : "border-transparent text-foreground/40 hover:text-foreground/70"
            }`}
          >
            Documentation
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 md:p-10 bg-gradient-to-br from-white/[0.01] to-transparent">
          {activeTab === "case-study" ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
              {/* Background & Problem */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center">
                    <BookOpen size={20} />
                  </div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-blue-400">
                    01. Background & Problem
                  </h4>
                </div>
                <p className="text-foreground/75 text-sm leading-relaxed font-light pl-1">
                  {project.caseStudy.problem}
                </p>
              </div>

              {/* Design Solution */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
                    <Lightbulb size={20} />
                  </div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-cyan-400">
                    02. Design Solution
                  </h4>
                </div>
                <p className="text-foreground/75 text-sm leading-relaxed font-light pl-1">
                  {project.caseStudy.solution}
                </p>
              </div>

              {/* Results & Impact */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center">
                    <TrendingUp size={20} />
                  </div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-emerald-400">
                    03. Results & Impact
                  </h4>
                </div>
                <p className="text-foreground/75 text-sm leading-relaxed font-light pl-1">
                  {project.caseStudy.impact}
                </p>
              </div>
            </div>
          ) : (
            /* Gallery of project documentation mockups */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.docsImages && project.docsImages.map((imgSrc) => (
                <div
                  key={imgSrc}
                  onClick={() => setActiveLightboxImg(imgSrc)}
                  className="group/image relative overflow-hidden rounded-xl border border-white/5 hover:border-primary/20 bg-white/[0.02] p-2 transition-all duration-300 cursor-zoom-in"
                >
                  <div className="relative overflow-hidden rounded-lg bg-black/40 flex items-center justify-center">
                    <img
                      src={imgSrc}
                      alt={formatImageName(imgSrc)}
                      className="w-full h-auto object-cover max-h-[350px] transition-transform duration-500 group-hover/image:scale-[1.02]"
                    />
                  </div>
                  <div className="mt-3 px-2 flex justify-between items-center">
                    <span className="text-xs font-semibold text-foreground/70 uppercase tracking-wider">
                      {formatImageName(imgSrc)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-between items-center p-6 md:p-8 border-t border-white/5 bg-[#030c16] gap-4">
          <div className="flex gap-4">
            {project.figmaLink && (
              <a
                href={project.figmaLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground/60 hover:text-primary transition-colors"
              >
                <Figma size={16} />
                Figma File
              </a>
            )}
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground/60 hover:text-primary transition-colors"
              >
                <Github size={16} />
                GitHub Repo
              </a>
            )}
          </div>
          <button
            onClick={handleClose}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-foreground text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer"
          >
            Close Details
          </button>
        </div>
      </div>

      {/* Lightbox full-image preview overlay */}
      {activeLightboxImg && (
        <Lightbox
          src={activeLightboxImg}
          title={formatImageName(activeLightboxImg)}
          onClose={() => setActiveLightboxImg(null)}
        />
      )}
    </div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[number] | null>(null);

  return (
    <section id="projects" className="py-20 md:py-32 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
        <div className="max-w-2xl">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6"
          >
            Featured <span className="text-gradient">Projects</span>
          </motion.h2>
          <p className="text-foreground/60 text-lg">
            A collection of digital products I've designed and developed. Each project focuses on solving specific user problems with elegant solutions.
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex gap-2"
        >
          <span className="px-4 py-2 rounded-full glass text-sm font-medium border-primary/20 text-primary">All Works</span>
        </motion.div>
      </div>

      <div className="relative w-full max-w-5xl mx-auto pb-32 flex flex-col gap-[10vh]">
        {projects.map((project, index) => (
          <div
            key={project.title}
            className="sticky"
            style={{ top: `calc(15vh + ${index * 1.5}rem)` }}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onClick={() => setSelectedProject(project)}
              className="group relative flex flex-col md:flex-row bg-[#05111E] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-primary/30 shadow-2xl transition-all duration-500 cursor-pointer hover:shadow-primary/5"
            >
              {/* Image Container */}
              <div className="relative h-52 sm:h-64 md:h-[28rem] md:w-1/2 overflow-hidden border-b md:border-b-0 md:border-r border-white/5 flex items-start justify-center">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover object-top w-full h-full transition-transform duration-700 group-hover:scale-105"
                />
                {(project.githubLink || project.figmaLink) && (
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-4 bg-white text-black rounded-full hover:scale-110 transition-transform flex items-center justify-center"
                      >
                        <Github size={24} />
                      </a>
                    )}
                    {project.figmaLink && (
                      <a
                        href={project.figmaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-4 bg-white/10 text-white backdrop-blur-md rounded-full hover:scale-110 transition-transform border border-white/20 flex items-center justify-center"
                      >
                        <Figma size={24} />
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 md:p-12 md:w-1/2 flex flex-col justify-center bg-gradient-to-br from-white/[0.02] to-transparent">
                <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 md:mb-4 block">
                  {project.category}
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-foreground/60 text-lg leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-4 mt-auto pt-6 border-t border-white/5">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-[10px] sm:text-xs px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-foreground/50 font-bold uppercase tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <span className="flex items-center gap-1.5 text-xs sm:text-sm font-bold uppercase tracking-wider text-foreground/45 group-hover:text-primary transition-colors">
                    Read Case Study
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Render GSAP Modal when selected */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
