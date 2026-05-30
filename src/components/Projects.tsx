"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Github, Figma, X, ArrowRight, CheckCircleOne } from "@mynaui/icons-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projects = [
  {
    title: "Digimar Platform",
    category: "Web App • Digital Marketing",
    description: "A comprehensive platform for creator discovery and digital campaign management with a focus on data visualization.",
    image: "/projects/digimar/creator-discovery.svg",
    tags: ["UI Design", "Dashboard", "Marketing"],
    figmaLink: "https://www.figma.com/design/uLqpw7F2BT57DNPdgax6RW/Demo-Project?node-id=52-438&t=Cb1thkR2Q35BAlRi-1",
    problem: "Marketers struggled to efficiently discover and evaluate content creators. Data was scattered across various platforms, and campaign ROI tracking was done manually, leading to a waste of time and budget.",
    solution: "Designed a centralized dashboard that visualizes creator metrics and campaign performance in real-time. Leveraged a clean user interface to simplify creator data comparison.",
    results: "Reduced creator discovery time by 60% and significantly increased campaign tracking accuracy, providing a more measurable ROI for marketing teams.",
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
    title: "Interactive E-book Design",
    category: "Digital Publication • UI/UX",
    description: "Creating an immersive and engaging reading experience through modern layout and interactive elements.",
    image: "/projects/ebook/home.svg",
    tags: ["Editorial", "Interactivity", "Layout"],
    figmaLink: "https://www.figma.com/design/Wh35WfhYyWnTM8bYpzx6QG/eBook_Public_Library_Dhani-Praditya?node-id=9-139&t=MsYUBcoGMeA0UkS1-1",
    problem: "E-book readers often found traditional static text layouts boring, lacking interactivity, and hard to navigate, especially on small-screen digital devices.",
    solution: "Developed a modern editorial layout system with interactive elements, highly accessible typography, and intuitive chapter navigation resembling a premium app experience.",
    results: "Enhanced user reading retention and delivered a far more immersive reading experience akin to a high-end digital magazine.",
    docsImages: [
      "/projects/ebook/home.svg",
      "/projects/ebook/mockup-1.png",
      "/projects/ebook/mockup-2.png"
    ]
  },
  {
    title: "NR Project Branding",
    category: "Branding • UI Design",
    description: "Developing a cohesive visual identity and user interface that aligns with modern branding standards.",
    image: "/projects/nr/form.svg",
    tags: ["Branding", "Identity", "UX"],
    figmaLink: "https://www.figma.com/design/qk3oavqR3VLOnw7Lij9HQU/Intern-Project?node-id=0-1&t=lyDb0zrl5krTetlS-1",
    problem: "The brand's visual identity was inconsistent across various digital platforms, leading to a lack of user trust and low conversion rates on registration forms.",
    solution: "Conducted a comprehensive rebranding of the visual identity. Simplified interaction forms using solid UX form design principles (clear micro-copy, inline error validation).",
    results: "Created a more modern, professional brand image, and improved the form completion rate of new users.",
    docsImages: [
      "/projects/nr/login.svg",
      "/projects/nr/form.svg",
      "/projects/nr/mockup-1.png",
      "/projects/nr/notification-alert.png"
    ]
  },
  {
    title: "Sistem Informasi Skripsi",
    category: "Web Application • Academic",
    description: "A specialized system designed to streamline academic workflows and data management for thesis projects.",
    image: "/projects/skripsi/dashboard.svg",
    tags: ["System Design", "Academic", "Web App"],
    figmaLink: "https://www.figma.com/design/GIvi6Iu49dVW4UmRK3uFES/SKRIPSI-FIX?node-id=159-2010&t=CbYL7IqzUwm2AWkf-1",
    githubLink: "https://github.com/DhaniPraditya/Redesign-Website-Sistem-Registrasi-UNY",
    problem: "The thesis registration, advising, and archiving process relied on a legacy system that confused both students and advisors, frequently leading to administrative errors.",
    solution: "Redesigned the Information Architecture and user flows. Created a clear visual dashboard to track advising progress for both students and advisors.",
    results: "Sped up the thesis administration process and drastically reduced user complaints regarding academic portal navigation confusion.",
    docsImages: [
      "/projects/skripsi/mockup-home.png",
      "/projects/skripsi/dashboard-no-navbar.svg",
      "/projects/skripsi/dashboard.svg",
      "/projects/skripsi/mockup-biodata.png"
    ]
  },
  {
    title: "Artisan Crafts",
    category: "Responsive Web Application • E-commerce",
    description: "A responsive e-commerce platform for artisan crafts with a focus on product visualization and user interaction.",
    image: "/projects/artisan/Home-Desktop.svg",
    tags: ["UI Design", "E-commerce", "Responsive Design"],
    figmaLink: "https://www.figma.com/design/ar0qEXFcdXU2hoqS2keO1u/Capstone_AstisanCrafts?node-id=0-1&t=QKAhIpgw9JGNoeTm-1",
    problem: "Local artisans struggled to sell their products because general e-commerce platforms failed to showcase the premium aesthetic value and intricate details of their artwork.",
    solution: "Created a specialized e-commerce interface focusing on high-resolution product imagery, elegant use of whitespace, and a streamlined, frictionless checkout process.",
    results: "Provided a premium digital showroom for artisans, potentially boosting sales conversion through a more emotional and visual shopping experience.",
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

const formatImageName = (path: string) => {
  const parts = path.split('/');
  const filename = parts[parts.length - 1];
  const nameWithoutExt = filename.substring(0, filename.lastIndexOf('.'));
  return nameWithoutExt
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

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

    return () => { };
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
        className="absolute inset-0 bg-black/95 backdrop-blur-lg cursor-zoom-out"
      />

      {/* Content wrapper */}
      <div className="relative z-10 flex flex-col items-center max-w-5xl max-h-[90vh] gap-4">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute -top-12 right-0 p-2.5 rounded-full bg-white/10 border border-white/10 hover:border-white/20 text-white hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center shadow-lg backdrop-blur-md"
        >
          <X size={20} />
        </button>

        <img
          ref={imgRef}
          src={src}
          alt={title}
          className="max-w-full max-h-[80vh] object-contain rounded-lg border border-white/10 shadow-2xl bg-black/20"
        />

        {title && (
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white/90 text-center mt-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md">
            {title}
          </span>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const headerRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // State for Project Modal and tabs
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [activeTab, setActiveTab] = useState<"case-study" | "documentation">("case-study");
  const [activeLightboxImg, setActiveLightboxImg] = useState<string | null>(null);

  const modalOverlayRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const closeModal = () => {
    if (!modalOverlayRef.current || !modalContentRef.current) {
      setSelectedProject(null);
      setActiveLightboxImg(null);
      return;
    }

    gsap.to(modalOverlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.inOut"
    });

    gsap.to(modalContentRef.current, {
      opacity: 0,
      y: 20,
      scale: 0.95,
      duration: 0.3,
      ease: "power2.inOut",
      onComplete: () => {
        setSelectedProject(null);
        setActiveLightboxImg(null);
        setActiveTab("case-study");
      }
    });
  };

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  // Modal Entry Animation
  useEffect(() => {
    if (selectedProject && modalOverlayRef.current && modalContentRef.current) {
      gsap.fromTo(modalOverlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );

      gsap.fromTo(modalContentRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.5)", delay: 0.1 }
      );
    }
  }, [selectedProject]);

  // GSAP Animations with proper Context Cleanup (Performance Fix)
  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: headerRef.current, start: "top 85%", once: true },
          }
        );
      }

      if (badgeRef.current) {
        gsap.fromTo(
          badgeRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: { trigger: badgeRef.current, start: "top 85%", once: true },
          }
        );
      }

      cardsRef.current.forEach((card) => {
        if (card) {
          gsap.fromTo(
            card,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                once: true,
              },
            }
          );
        }
      });
    });

    return () => ctx.revert(); // Critical to prevent memory leaks on route changes
  }, []);

  return (
    <section id="projects" className="py-20 md:py-32 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
        <div className="max-w-2xl">
          <h2
            ref={headerRef}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 opacity-0"
          >
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-foreground/60 text-lg">
            A collection of digital products I&apos;ve designed and developed. Click on any project to read the detailed case study.
          </p>
        </div>
        <div
          ref={badgeRef}
          className="flex gap-2 opacity-0"
        >
          <span className="px-4 py-2 rounded-full glass text-sm font-medium border-primary/20 text-primary">All Works</span>
        </div>
      </div>

      <div className="relative w-full max-w-5xl mx-auto pb-32 flex flex-col gap-12 md:gap-[10vh]">
        {projects.map((project, index) => (
          <div
            key={project.title}
            className="relative md:sticky"
            style={{ top: `calc(15vh + ${index * 1.5}rem)` }}
          >
            <div
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              onClick={() => setSelectedProject(project)}
              className="group relative flex flex-col md:flex-row bg-card rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-card-border hover:border-primary/50 shadow-lg md:shadow-xl transition-colors duration-300 opacity-0 cursor-pointer md:will-change-transform"
              role="button"
              tabIndex={0}
              aria-label={`View details for ${project.title}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  setSelectedProject(project);
                }
              }}
            >
              {/* Image Container */}
              <div className="relative h-52 sm:h-64 md:h-[28rem] md:w-1/2 overflow-hidden border-b md:border-b-0 md:border-r border-card-border flex items-start justify-center">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top transition-transform duration-700 md:group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index < 2} // Preload top 2 images for better LCP
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <span className="px-6 py-3 bg-primary text-white rounded-full font-bold shadow-lg flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    View Case Study <ArrowRight size={18} />
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 md:p-12 md:w-1/2 flex flex-col justify-center bg-gradient-to-br from-foreground/[0.02] to-transparent">
                <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 md:mb-4 block">
                  {project.category}
                </span>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 md:mb-6 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-foreground/60 text-lg leading-relaxed mb-10">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-3 mt-auto">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs px-4 py-2 rounded-full bg-secondary border border-card-border text-foreground/60 font-bold uppercase tracking-wider">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ─── Case Study Modal Overlay ───────────────────────────────────────── */}
      {selectedProject && (
        <div
          ref={modalOverlayRef}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 lg:p-12 opacity-0"
        >
          {/* Backdrop Blur */}
          <div
            className="absolute inset-0 bg-modal-overlay backdrop-blur-md cursor-pointer"
            onClick={closeModal}
          />

          {/* Modal Content */}
          <div
            ref={modalContentRef}
            className="relative w-full max-w-5xl max-h-full overflow-y-auto overscroll-contain bg-modal border border-card-border rounded-3xl shadow-2xl custom-scrollbar opacity-0 will-change-scroll flex flex-col"
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 md:top-6 md:right-6 p-2.5 bg-modal/80 hover:bg-modal text-foreground rounded-full border border-card-border shadow-md backdrop-blur-md hover:scale-105 active:scale-95 transition-all duration-300 z-20 cursor-pointer flex items-center justify-center"
              aria-label="Close modal"
            >
              <X size={22} />
            </button>

            {/* Header Image */}
            <div className="w-full h-64 md:h-80 relative overflow-hidden bg-modal border-b border-card-border shrink-0">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                className="object-cover object-top opacity-95 dark:opacity-35"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-modal via-modal/80 to-transparent" />

              <div className="absolute bottom-6 md:bottom-10 left-6 md:left-12 pr-6">
                <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">
                  Case Study
                </span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-foreground">
                  {selectedProject.title}
                </h2>
              </div>
            </div>

            {/* Tabs Bar */}
            <div className="flex border-b border-card-border bg-secondary/50 dark:bg-card/50 px-6 md:px-12 gap-2 sm:gap-4 shrink-0">
              <button
                onClick={() => setActiveTab("case-study")}
                className={`px-4 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 -mb-[1px] transition-all duration-300 cursor-pointer ${activeTab === "case-study"
                  ? "border-primary text-primary font-bold"
                  : "border-transparent text-foreground/60 hover:text-foreground/90 font-medium"
                  }`}
              >
                Case Study
              </button>
              <button
                onClick={() => setActiveTab("documentation")}
                className={`px-4 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider border-b-2 -mb-[1px] transition-all duration-300 cursor-pointer ${activeTab === "documentation"
                  ? "border-primary text-primary font-bold"
                  : "border-transparent text-foreground/60 hover:text-foreground/90 font-medium"
                  }`}
              >
                Documentation
              </button>
            </div>

            {/* Case Study Body */}
            <div className="p-6 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-16 overflow-y-auto">
              {/* Left Column (Content) */}
              {activeTab === "case-study" ? (
                <div className="lg:col-span-2 space-y-10">
                  {/* Background Problem */}
                  <section>
                    <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                      <span className="w-8 h-px bg-primary/50" /> Background & Problem
                    </h3>
                    <p className="text-foreground/80 dark:text-foreground/70 leading-relaxed text-base md:text-lg">
                      {selectedProject.problem}
                    </p>
                  </section>

                  {/* Solution */}
                  <section>
                    <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                      <span className="w-8 h-px bg-primary/50" /> Design Solution
                    </h3>
                    <p className="text-foreground/80 dark:text-foreground/70 leading-relaxed text-base md:text-lg">
                      {selectedProject.solution}
                    </p>
                  </section>

                  {/* Results */}
                  <section>
                    <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                      <span className="w-8 h-px bg-primary/50" /> Results & Impact
                    </h3>
                    <div className="bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/10 dark:border-emerald-500/20 rounded-2xl p-6 flex gap-4 items-start">
                      <CheckCircleOne className="text-emerald-500 shrink-0 mt-1" size={24} />
                      <p className="text-emerald-800 dark:text-emerald-500 font-medium leading-relaxed">
                        {selectedProject.results}
                      </p>
                    </div>
                  </section>
                </div>
              ) : (
                <div className="lg:col-span-2">
                  {/* Documentation Photos Gallery */}
                  {selectedProject.docsImages && selectedProject.docsImages.length > 0 ? (
                    <section>
                      <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                        <span className="w-8 h-px bg-primary/50" /> Project Gallery
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {selectedProject.docsImages.map((imgSrc) => (
                          <div
                            key={imgSrc}
                            onClick={() => setActiveLightboxImg(imgSrc)}
                            className="group/image relative overflow-hidden rounded-xl border border-card-border hover:border-primary/30 hover:shadow-md bg-card p-2 transition-all duration-300 cursor-zoom-in hover:scale-[1.01] active:scale-[0.99]"
                          >
                            <div className="relative overflow-hidden rounded-lg bg-secondary/40 dark:bg-black/40 flex items-center justify-center aspect-[4/3]">
                              <img
                                src={imgSrc}
                                alt={formatImageName(imgSrc)}
                                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/image:scale-[1.02]"
                              />
                            </div>
                            <div className="mt-3 px-2 flex justify-between items-center">
                              <span className="text-xs font-semibold text-foreground/80 dark:text-foreground/70 uppercase tracking-wider">
                                {formatImageName(imgSrc)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  ) : (
                    <p className="text-foreground/50 text-center py-10">No documentation images available.</p>
                  )}
                </div>
              )}

              {/* Sidebar Info (Right Column) */}
              <div className="space-y-8">
                <div className="bg-secondary/50 dark:bg-white/[0.02] border border-card-border rounded-2xl p-6">
                  <h4 className="text-sm font-bold text-foreground/60 dark:text-foreground/40 uppercase tracking-wider mb-4">Project Information</h4>

                  <div className="space-y-4">
                    <div>
                      <span className="block text-xs text-foreground/65 dark:text-foreground/50 mb-1">Category</span>
                      <span className="text-sm font-medium text-foreground">{selectedProject.category}</span>
                    </div>

                    <div>
                      <span className="block text-xs text-foreground/65 dark:text-foreground/50 mb-1">My Role</span>
                      <span className="text-sm font-medium text-foreground">UI/UX Designer</span>
                    </div>

                    <div>
                      <span className="block text-xs text-foreground/65 dark:text-foreground/50 mb-2">Tools & Tech</span>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map((tag) => (
                          <span key={tag} className="text-[10px] px-2.5 py-1 rounded-md bg-primary/10 dark:bg-primary/20 text-primary border border-primary/20 font-bold uppercase tracking-wider">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-card-border flex flex-col gap-3">
                    {selectedProject.figmaLink && (
                      <a
                        href={selectedProject.figmaLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-[#F24E1E]/10 hover:bg-[#F24E1E]/20 text-[#F24E1E] font-bold border border-[#F24E1E]/20 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <Figma size={18} /> View in Figma
                      </a>
                    )}

                    {selectedProject.githubLink && (
                      <a
                        href={selectedProject.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-foreground/5 hover:bg-foreground/10 text-foreground font-bold border border-card-border transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        <Github size={18} /> Source Code
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Render Lightbox when selected */}
      {activeLightboxImg && (
        <Lightbox
          src={activeLightboxImg}
          title={formatImageName(activeLightboxImg)}
          onClose={() => setActiveLightboxImg(null)}
        />
      )}
    </section>
  );
}
