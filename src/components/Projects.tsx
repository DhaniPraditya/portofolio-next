"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github, Figma, X, ArrowRight, CheckCircleOne } from "@mynaui/icons-react";

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
    problem: "Pemasar kesulitan menemukan dan mengevaluasi konten kreator secara efisien. Data tersebar di berbagai platform dan pelacakan ROI kampanye masih dilakukan secara manual, menyebabkan pemborosan waktu dan anggaran.",
    solution: "Merancang dasbor terpusat yang memvisualisasikan metrik kreator dan performa kampanye secara real-time. Menggunakan desain antarmuka yang bersih (clean UI) untuk mempermudah perbandingan data kreator.",
    results: "Mengurangi waktu pencarian kreator hingga 60% dan meningkatkan akurasi pelacakan kampanye secara signifikan, memberikan ROI yang lebih terukur bagi tim marketing.",
    gallery: [
      "/projects/digimar/creator-discovery.svg",
      "/projects/digimar/mockup-creator.png"
    ]
  },
  {
    title: "Interactive E-book Design",
    category: "Digital Publication • UI/UX",
    description: "Creating an immersive and engaging reading experience through modern layout and interactive elements.",
    image: "/projects/ebook/home.svg",
    tags: ["Editorial", "Interactivity", "Layout"],
    figmaLink: "https://www.figma.com/design/Wh35WfhYyWnTM8bYpzx6QG/eBook_Public_Library_Dhani-Praditya?node-id=9-139&t=MsYUBcoGMeA0UkS1-1",
    problem: "Pembaca e-book sering merasa bosan dengan tata letak teks statis tradisional yang kurang interaktif dan sulit dinavigasi, terutama pada perangkat digital berlayar kecil.",
    solution: "Mengembangkan sistem tata letak editorial modern dengan elemen interaktif, tipografi yang sangat terbaca (accessible), serta navigasi bab yang intuitif menyerupai pengalaman aplikasi premium.",
    results: "Meningkatkan retensi membaca pengguna dan memberikan pengalaman membaca yang jauh lebih imersif layaknya majalah digital kelas atas.",
    gallery: [
      "/projects/ebook/home.svg",
      "/projects/ebook/mockup-1.png"
    ]
  },
  {
    title: "NR Project Branding",
    category: "Branding • UI Design",
    description: "Developing a cohesive visual identity and user interface that aligns with modern branding standards.",
    image: "/projects/nr/form.svg",
    tags: ["Branding", "Identity", "UX"],
    figmaLink: "https://www.figma.com/design/qk3oavqR3VLOnw7Lij9HQU/Intern-Project?node-id=0-1&t=lyDb0zrl5krTetlS-1",
    problem: "Identitas visual merek terlihat tidak konsisten di berbagai platform digital, menyebabkan kurangnya kepercayaan pengguna dan konversi yang rendah pada formulir pendaftaran.",
    solution: "Melakukan perombakan identitas visual (rebranding) menyeluruh. Menyederhanakan formulir interaksi dengan prinsip UX form design yang baik (micro-copy jelas, validasi error inline).",
    results: "Menciptakan citra merek yang lebih modern, profesional, serta meningkatkan rasio penyelesaian formulir (form completion rate) dari pengguna baru.",
    gallery: [
      "/projects/nr/form.svg",
      "/projects/nr/mockup-1.png"
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
    problem: "Proses pendaftaran, bimbingan, dan pengarsipan skripsi masih menggunakan sistem lama yang membingungkan mahasiswa dan dosen, sehingga sering terjadi kesalahan administrasi.",
    solution: "Mendesain ulang arsitektur informasi (Information Architecture) dan alur pengguna. Membuat dasbor pelacakan progres bimbingan visual yang jelas bagi kedua belah pihak.",
    results: "Mempercepat proses administrasi skripsi dan secara drastis mengurangi komplain pengguna terkait kebingungan sistem navigasi portal akademik.",
    gallery: [
      "/projects/skripsi/dashboard.svg",
      "/projects/skripsi/mockup-home.png"
    ]
  },
  {
    title: "Artisan Crafts",
    category: "Responsive Web Application • E-commerce",
    description: "A responsive e-commerce platform for artisan crafts with a focus on product visualization and user interaction.",
    image: "/projects/artisan/Home-Desktop.svg",
    tags: ["UI Design", "E-commerce", "Responsive Design"],
    figmaLink: "https://www.figma.com/design/ar0qEXFcdXU2hoqS2keO1u/Capstone_AstisanCrafts?node-id=0-1&t=QKAhIpgw9JGNoeTm-1",
    problem: "Pengrajin lokal kesulitan menjual produk mereka karena platform e-commerce umum tidak bisa menonjolkan nilai estetika premium dan detail karya seni mereka.",
    solution: "Membuat antarmuka e-commerce khusus dengan fokus pada citra produk resolusi tinggi, penggunaan whitespace elegan, dan proses checkout yang disederhanakan tanpa gesekan (frictionless).",
    results: "Memberikan ruang pamer digital yang premium bagi pengrajin, berpotensi meningkatkan konversi penjualan melalui pengalaman berbelanja yang lebih emosional dan visual.",
    gallery: [
      "/projects/artisan/Home-Desktop.svg"
    ]
  }
];

export default function Projects() {
  const headerRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // State for Project Modal
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const modalOverlayRef = useRef<HTMLDivElement>(null);
  const modalContentRef = useRef<HTMLDivElement>(null);

  const closeModal = () => {
    if (!modalOverlayRef.current || !modalContentRef.current) {
      setSelectedProject(null);
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

  // GSAP Animations
  useEffect(() => {
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

    cardsRef.current.forEach((card, index) => {
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
            A collection of digital products I've designed and developed. Click on any project to read the detailed case study.
          </p>
        </div>
        <div
          ref={badgeRef}
          className="flex gap-2 opacity-0"
        >
          <span className="px-4 py-2 rounded-full glass text-sm font-medium border-primary/20 text-primary">All Works</span>
        </div>
      </div>

      <div className="relative w-full max-w-5xl mx-auto pb-32 flex flex-col gap-[10vh]">
        {projects.map((project, index) => (
          <div
            key={project.title}
            className="sticky"
            style={{ top: `calc(15vh + ${index * 1.5}rem)` }}
          >
            <div
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              onClick={() => setSelectedProject(project)}
              className="group relative flex flex-col md:flex-row bg-[#05111E] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-primary/50 hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] shadow-2xl transition-all duration-300 opacity-0 cursor-pointer"
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
              <div className="relative h-52 sm:h-64 md:h-[28rem] md:w-1/2 overflow-hidden border-b md:border-b-0 md:border-r border-white/5 flex items-start justify-center">
                <img
                  src={project.image}
                  alt={project.title}
                  className="object-cover object-top w-full h-full transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                  <span className="px-6 py-3 bg-primary text-white rounded-full font-bold shadow-lg flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    View Case Study <ArrowRight size={18} />
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8 md:p-12 md:w-1/2 flex flex-col justify-center bg-gradient-to-br from-white/[0.02] to-transparent">
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
                    <span key={tag} className="text-xs px-4 py-2 rounded-full bg-white/5 border border-white/10 text-foreground/50 font-bold uppercase tracking-wider">
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
            className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md cursor-pointer"
            onClick={closeModal}
          />

          {/* Modal Content */}
          <div
            ref={modalContentRef}
            className="relative w-full max-w-5xl max-h-full overflow-y-auto bg-[#0a111a] border border-white/10 rounded-3xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5),0_0_40px_rgba(59,130,246,0.1)] custom-scrollbar opacity-0"
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-white/5 hover:bg-white/10 text-white rounded-full backdrop-blur-md border border-white/10 transition-all z-20"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>

              {/* Header Image */}
              <div className="w-full h-64 md:h-80 relative overflow-hidden bg-zinc-900 border-b border-white/5">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover object-top opacity-60 mix-blend-lighten"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a111a] to-transparent" />

                <div className="absolute bottom-6 md:bottom-10 left-6 md:left-12 pr-6">
                  <span className="text-primary font-bold tracking-widest uppercase text-xs mb-2 block">
                    Case Study
                  </span>
                  <h2 className="text-3xl md:text-5xl font-extrabold text-white">
                    {selectedProject.title}
                  </h2>
                </div>
              </div>

              {/* Case Study Body */}
              <div className="p-6 md:p-12 grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-16">

                {/* Main Content (Left) */}
                <div className="lg:col-span-2 space-y-10">
                  {/* Background Problem */}
                  <section>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <span className="w-8 h-px bg-primary/50" /> Latar Belakang Masalah
                    </h3>
                    <p className="text-foreground/70 leading-relaxed text-base md:text-lg">
                      {selectedProject.problem}
                    </p>
                  </section>

                  {/* Solution */}
                  <section>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <span className="w-8 h-px bg-primary/50" /> Solusi Desain
                    </h3>
                    <p className="text-foreground/70 leading-relaxed text-base md:text-lg">
                      {selectedProject.solution}
                    </p>
                  </section>

                  {/* Results */}
                  <section>
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <span className="w-8 h-px bg-primary/50" /> Hasil & Dampak
                    </h3>
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 flex gap-4 items-start">
                      <CheckCircleOne className="text-emerald-500 shrink-0 mt-1" size={24} />
                      <p className="text-emerald-50 font-medium leading-relaxed">
                        {selectedProject.results}
                      </p>
                    </div>
                  </section>

                  {/* Documentation Photos */}
                  {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                    <section>
                      <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <span className="w-8 h-px bg-primary/50" /> Foto Dokumentasi
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedProject.gallery.map((img, i) => (
                          <div key={i} className="rounded-xl overflow-hidden border border-white/10 bg-zinc-900/50 aspect-[4/3]">
                            <img
                              src={img}
                              alt={`Documentation ${i + 1}`}
                              className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-500"
                              loading="lazy"
                            />
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>

                {/* Sidebar Info (Right) */}
                <div className="space-y-8">
                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                    <h4 className="text-sm font-bold text-foreground/40 uppercase tracking-wider mb-4">Informasi Proyek</h4>

                    <div className="space-y-4">
                      <div>
                        <span className="block text-xs text-foreground/50 mb-1">Kategori</span>
                        <span className="text-sm font-medium text-white">{selectedProject.category}</span>
                      </div>

                      <div>
                        <span className="block text-xs text-foreground/50 mb-1">Peran (Role)</span>
                        <span className="text-sm font-medium text-white">UI/UX Designer</span>
                      </div>

                      <div>
                        <span className="block text-xs text-foreground/50 mb-2">Tools & Tech</span>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.tags.map((tag) => (
                            <span key={tag} className="text-[10px] px-2.5 py-1 rounded-md bg-primary/10 text-primary border border-primary/20 font-bold uppercase tracking-wider">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-3">
                      {selectedProject.figmaLink && (
                        <a
                          href={selectedProject.figmaLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-[#F24E1E]/10 hover:bg-[#F24E1E]/20 text-[#F24E1E] font-bold border border-[#F24E1E]/20 transition-colors"
                        >
                          <Figma size={18} /> View in Figma
                        </a>
                      )}

                      {selectedProject.githubLink && (
                        <a
                          href={selectedProject.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold border border-white/10 transition-colors"
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
    </section>
  );
}

