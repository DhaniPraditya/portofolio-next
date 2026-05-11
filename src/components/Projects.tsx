"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "@mynaui/icons-react";
import Image from "next/image";

const projects = [
  {
    title: "Digimar Platform",
    category: "Web App • Digital Marketing",
    description: "A comprehensive platform for creator discovery and digital campaign management with a focus on data visualization.",
    image: "/projects/digimar/mockup-creator.png",
    tags: ["UI Design", "Dashboard", "Marketing"],
  },
  {
    title: "Interactive E-book Design",
    category: "Digital Publication • UI/UX",
    description: "Creating an immersive and engaging reading experience through modern layout and interactive elements.",
    image: "/projects/ebook/mockup-1.png",
    tags: ["Editorial", "Interactivity", "Layout"],
  },
  {
    title: "NR Project Branding",
    category: "Branding • UI Design",
    description: "Developing a cohesive visual identity and user interface that aligns with modern branding standards.",
    image: "/projects/nr/mockup-1.png",
    tags: ["Branding", "Identity", "UX"],
  },
  {
    title: "Sistem Informasi Skripsi",
    category: "Web Application • Academic",
    description: "A specialized system designed to streamline academic workflows and data management for thesis projects.",
    image: "/projects/skripsi/mockup-home.png",
    tags: ["System Design", "Academic", "Web App"],
  },
];


export default function Projects() {
  return (
    <section id="projects" className="py-32 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div className="max-w-2xl">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6"
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative flex flex-col glass rounded-[2.5rem] overflow-hidden border-white/5 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10"
          >
            {/* Image Container */}
            <div className="relative h-64 w-full overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                <button className="p-3 bg-white text-black rounded-full hover:scale-110 transition-transform">
                  <ExternalLink size={20} />
                </button>
                <button className="p-3 bg-white/10 text-white backdrop-blur-md rounded-full hover:scale-110 transition-transform">
                  <Github size={20} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <span className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block">
                {project.category}
              </span>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-foreground/60 text-sm leading-relaxed mb-6">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-[10px] px-3 py-1 rounded-full bg-white/5 border border-white/10 text-foreground/40 font-bold uppercase">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
