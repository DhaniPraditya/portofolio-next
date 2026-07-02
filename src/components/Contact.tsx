import { Mail, Linkedin, Chat, ArrowUpRight } from "@mynaui/icons-react";

const socialLinks = [
  { name: "Email", icon: <Mail size={20} />, href: "mailto:dhanipraditya@gmail.com", color: "bg-blue-500" },
  { name: "LinkedIn", icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/dhanipraditya/", color: "bg-indigo-600" },
  { name: "WhatsApp", icon: <Chat size={20} />, href: "https://wa.me/6281229104873", color: "bg-emerald-500" },
];

const brandStyleMap: Record<string, { glow: string; border: string; text: string }> = {
  Email: {
    glow: "rgba(59, 130, 246, 0.15)",
    border: "rgba(59, 130, 246, 0.4)",
    text: "group-hover:text-blue-500"
  },
  LinkedIn: {
    glow: "rgba(79, 70, 229, 0.15)",
    border: "rgba(79, 70, 229, 0.4)",
    text: "group-hover:text-indigo-500"
  },
  WhatsApp: {
    glow: "rgba(16, 185, 129, 0.15)",
    border: "rgba(16, 185, 129, 0.4)",
    text: "group-hover:text-emerald-500"
  }
};

export default function Contact() {
  return (
    <section id="contact" className="py-20 md:py-32 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <div
          className="bg-card/60 backdrop-blur-md border border-card-border rounded-3xl md:rounded-[3rem] p-8 sm:p-12 md:p-24 relative shadow-2xl"
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

          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((link) => {
              const brand = brandStyleMap[link.name] || {
                glow: "rgba(59, 130, 246, 0.15)",
                border: "rgba(59, 130, 246, 0.4)",
                text: "group-hover:text-primary"
              };
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center gap-3 px-6 py-3 bg-secondary/50 dark:bg-card/50 border border-card-border rounded-2xl transition-all hover:scale-105 active:scale-95 group social-link-card"
                  style={{
                    "--hover-glow": brand.glow,
                    "--hover-border": brand.border,
                  } as React.CSSProperties}
                >
                  <span className={`text-foreground/70 ${brand.text} transition-colors`}>
                    {link.icon}
                  </span>
                  <span className="font-semibold">{link.name}</span>
                  <ArrowUpRight size={16} className={`text-foreground/30 ${brand.text} transition-colors`} />
                </a>
              );
            })}
          </div>

          <div className="mt-16 pt-16 border-t border-card-border">
            <p className="text-foreground/40 text-sm font-medium">
              Based in Indonesia • Available for Remote Work
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

