"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Figma } from "@mynaui/icons-react";
import Image from "next/image";

const projects = [
  {
    title: "Digimar Platform",
    category: "Web App • Digital Marketing",
    description: "A comprehensive platform for creator discovery and digital campaign management with a focus on data visualization.",
    image: "/projects/digimar/creator-discovery.svg",
    tags: ["UI Design", "Dashboard", "Marketing"],
    figmaLink: "https://www.figma.com/design/uLqpw7F2BT57DNPdgax6RW/Demo-Project?node-id=52-438&t=Cb1thkR2Q35BAlRi-1"
  },
  {
    title: "Interactive E-book Design",
    category: "Digital Publication • UI/UX",
    description: "Creating an immersive and engaging reading experience through modern layout and interactive elements.",
    image: "/projects/ebook/home.svg",
    tags: ["Editorial", "Interactivity", "Layout"],
    figmaLink: "https://www.figma.com/design/Wh35WfhYyWnTM8bYpzx6QG/eBook_Public_Library_Dhani-Praditya?node-id=9-139&t=MsYUBcoGMeA0UkS1-1"
  },
  {
    title: "NR Project Branding",
    category: "Branding • UI Design",
    description: "Developing a cohesive visual identity and user interface that aligns with modern branding standards.",
    image: "/projects/nr/form.svg",
    tags: ["Branding", "Identity", "UX"],
    figmaLink: "https://www.figma.com/design/qk3oavqR3VLOnw7Lij9HQU/Intern-Project?node-id=0-1&t=lyDb0zrl5krTetlS-1"
  },
  {
    title: "Sistem Informasi Skripsi",
    category: "Web Application • Academic",
    description: "A specialized system designed to streamline academic workflows and data management for thesis projects.",
    image: "/projects/skripsi/dashboard.svg",
    tags: ["System Design", "Academic", "Web App"],
    figmaLink: "https://www.figma.com/design/GIvi6Iu49dVW4UmRK3uFES/SKRIPSI-FIX?node-id=159-2010&t=CbYL7IqzUwm2AWkf-1",
    githubLink: "https://github.com/DhaniPraditya/Redesign-Website-Sistem-Registrasi-UNY"
  },
  {
    title: "Artisan Crafts",
    category: "Responsive Web Application • E-commerce",
    description: "A responsive e-commerce platform for artisan crafts with a focus on product visualization and user interaction.",
    image: "/projects/artisan/Home-Desktop.svg",
    tags: ["UI Design", "E-commerce", "Responsive Design"],
    figmaLink: "https://www.figma.com/design/ar0qEXFcdXU2hoqS2keO1u/Capstone_AstisanCrafts?node-id=0-1&t=QKAhIpgw9JGNoeTm-1",
  }
];


export default function Projects() {
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
              className="group relative flex flex-col md:flex-row bg-[#05111E] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-white/5 hover:border-primary/30 shadow-2xl transition-colors duration-500"
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
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
