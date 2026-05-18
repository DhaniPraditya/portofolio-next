"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Linkedin, Dribbble, Instagram, ArrowUpRight } from "@mynaui/icons-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const socialLinks = [
  { name: "Email", icon: <Mail size={20} />, href: "mailto:your.email@example.com", color: "bg-blue-500" },
  { name: "LinkedIn", icon: <Linkedin size={20} />, href: "#", color: "bg-indigo-600" },
  { name: "Instagram", icon: <Instagram size={20} />, href: "#", color: "bg-pink-500" },
  { name: "Dribbble", icon: <Dribbble size={20} />, href: "#", color: "bg-rose-400" },
];

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    }
  }, []);

  return (
    <section id="contact" className="py-20 md:py-32 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <div
          ref={containerRef}
          className="glass rounded-3xl md:rounded-[3rem] border-white/5 p-8 sm:p-12 md:p-24 relative opacity-0"
        >
            <span className="text-primary font-bold uppercase tracking-[0.2em] text-xs mb-6 block">
              Let's Work Together
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 md:mb-8 tracking-tight">
              Ready to bring your <br /> <span className="text-gradient">next project</span> to life?
            </h2>
            <p className="text-foreground/60 text-lg md:text-xl max-w-2xl mx-auto mb-12">
              I'm currently available for freelance projects and full-time opportunities. Feel free to reach out if you want to collaborate or just say hi!
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-3 px-6 py-3 glass rounded-2xl border-white/10 hover:border-primary/50 transition-all hover:scale-105 active:scale-95 group"
                >
                  <span className="text-foreground/70 group-hover:text-primary transition-colors">
                    {link.icon}
                  </span>
                  <span className="font-semibold">{link.name}</span>
                  <ArrowUpRight size={16} className="text-foreground/30 group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>

            <div className="mt-16 pt-16 border-t border-white/5">
              <p className="text-foreground/40 text-sm font-medium">
                Based in Indonesia • Available for Remote Work
              </p>
            </div>
        </div>
      </div>
    </section>
  );
}
