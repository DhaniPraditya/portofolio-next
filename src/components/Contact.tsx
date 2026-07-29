"use client";

import { useState } from "react";
import { Mail, Linkedin, Chat, ArrowUpRight, Copy, Check } from "@mynaui/icons-react";
import SpecularButton from "@/components/ui/SpecularButton";
import BorderGlow from "@/components/BorderGlow";

const socialLinks = [
  {
    name: "Email",
    icon: <Mail size={20} />,
    href: "mailto:dhanipraditya@gmail.com",
    lineColor: "#60a5fa",
    baseColor: "#1d4ed8"
  },
  {
    name: "LinkedIn",
    icon: <Linkedin size={20} />,
    href: "https://www.linkedin.com/in/dhanipraditya/",
    lineColor: "#818cf8",
    baseColor: "#4338ca"
  },
  {
    name: "WhatsApp",
    icon: <Chat size={20} />,
    href: "https://wa.me/6281229104873",
    lineColor: "#34d399",
    baseColor: "#047857"
  },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("dhanipraditya@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-20 md:py-32 px-4 relative z-10">
      <div className="max-w-5xl mx-auto text-center">
        <BorderGlow
          borderRadius={48}
          glowColor="217 91 60"
          colors={["#3b82f6", "#06b6d4", "#8b5cf6"]}
          edgeSensitivity={25}
          glowRadius={40}
          glowIntensity={1.3}
          backgroundColor="var(--card-bg)"
          className="p-8 sm:p-12 md:p-24 border-card-border/60 shadow-2xl"
        >
          <span className="text-primary font-bold uppercase tracking-[0.2em] text-xs mb-6 block">
            Let&apos;s Work Together
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-6 md:mb-8 tracking-tight">
            Ready to bring your <br /> <span className="text-gradient">next project</span> to life?
          </h2>
          <p className="text-foreground/60 text-lg md:text-xl max-w-2xl mx-auto mb-12">
            I&apos;m currently available for freelance projects and full-time opportunities. Feel free to reach out if you want to collaborate or just say hi!
          </p>

          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {socialLinks.map((link) => (
              <SpecularButton
                key={link.name}
                href={link.href}
                target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                size="md"
                radius={16}
                tint="#ffffff"
                tintOpacity={0.04}
                blur={8}
                textColor="#f5f5f5"
                lineColor={link.lineColor}
                baseColor={link.baseColor}
                intensity={1.2}
                shineSize={14}
                shineFade={35}
                thickness={1.2}
                speed={0.35}
                followMouse={true}
                proximity={200}
              >
                {link.icon}
                <span className="font-semibold">{link.name}</span>
                <ArrowUpRight size={16} className="opacity-70 group-hover:opacity-100 transition-opacity" />
              </SpecularButton>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs font-semibold text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-all cursor-pointer border border-card-border"
              aria-label="Copy email address"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-emerald-500" />
                  <span className="text-emerald-500 font-bold">Email Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Click to copy email: dhanipraditya@gmail.com</span>
                </>
              )}
            </button>
          </div>

          <div className="mt-16 pt-16 border-t border-card-border">
            <p className="text-foreground/40 text-sm font-medium">
              Based in Indonesia • Available for Remote Work
            </p>
          </div>
        </BorderGlow>
      </div>
    </section>
  );
}

