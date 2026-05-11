import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import { CheckCircle, User, Layout, Mobile, Search } from "@mynaui/icons-react";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background">
      <Navbar />
      <Hero />

      {/* About Section */}
      <section id="about" className="py-32 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-square rounded-[3rem] overflow-hidden glass border-white/10 relative z-10">
              <img
                src="/me.svg"
                alt="Profile"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl -z-10" />
          </div>

          <div>
            <div className="flex items-center gap-2 mb-6 text-primary">
              <User size={20} />
              <span className="font-bold uppercase tracking-widest text-sm">About Me</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
              Crafting Digital Products with a <span className="text-gradient">Human-Centered</span> Approach.
            </h2>
            <p className="text-foreground/60 text-lg leading-relaxed mb-8">
              I'm a UI/UX Designer who believes that great design is not just about how it looks, but how it works for the people who use it. With over 3 years of experience in the creative industry, I've worked on everything from minimalist branding to complex SaaS platforms.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "User-Centered Design",
                "Interaction Design",
                "Rapid Prototyping",
                "Visual Storytelling"
              ].map((item) => (
                <div key={item} className="flex items-center gap-3 text-foreground/80">
                  <CheckCircle className="text-primary" size={18} />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <Projects />

      {/* Skills Section */}
      <section id="skills" className="py-32 px-4">
        <div className="max-w-7xl mx-auto glass rounded-[4rem] p-12 md:p-20 border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -z-10" />

          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Technical <span className="text-gradient">Proficiency</span></h2>
            <p className="text-foreground/60 max-w-2xl mx-auto text-lg">
              Combining creative vision with technical execution. Here are the tools and methodologies I use to bring ideas to life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-6">
              <div className="p-4 w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
                <Layout size={28} />
              </div>
              <h3 className="text-2xl font-bold">UI Design</h3>
              <p className="text-foreground/50">Designing intuitive and visually stunning interfaces for web and mobile platforms.</p>
              <ul className="space-y-3 pt-4">
                {["Figma", "Adobe XD", "Design Systems", "Typography"].map(s => (
                  <li key={s} className="text-sm font-semibold text-foreground/80 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" /> {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6 md:border-x border-white/5 md:px-12">
              <div className="p-4 w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center text-purple-500 mb-6">
                <Search size={28} />
              </div>
              <h3 className="text-2xl font-bold">UX Research</h3>
              <p className="text-foreground/50">Understanding user behavior through rigorous testing and data-driven analysis.</p>
              <ul className="space-y-3 pt-4">
                {["User Interviews", "Usability Testing", "Personas", "User Flows"].map(s => (
                  <li key={s} className="text-sm font-semibold text-foreground/80 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500" /> {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <div className="p-4 w-14 h-14 bg-pink-500/10 rounded-2xl flex items-center justify-center text-pink-500 mb-6">
                <Mobile size={28} />
              </div>
              <h3 className="text-2xl font-bold">Prototyping</h3>
              <p className="text-foreground/50">Bringing designs to life with high-fidelity interactive prototypes.</p>
              <ul className="space-y-3 pt-4">
                {["Prototyping", "Animation", "Micro-interactions", "Framer"].map(s => (
                  <li key={s} className="text-sm font-semibold text-foreground/80 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-500" /> {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <Contact />

      <footer className="py-20 border-t border-white/5 text-center px-4">
        <h2 className="text-2xl font-bold mb-8 tracking-tighter text-gradient">DESIGNER.</h2>
        <p className="text-foreground/20 text-xs uppercase tracking-[0.3em] font-bold">
          © {new Date().getFullYear()} All Rights Reserved • Built with Next.js
        </p>
      </footer>
    </main>
  );
}
