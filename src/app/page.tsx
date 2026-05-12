import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import BackgroundMesh from "@/components/BackgroundMesh";
import ProfileCard from "@/components/ui/ProfileCard";
import Carousel from "@/components/ui/Carousel";
import { CheckCircle, User, Layout, Mobile, Search } from "@mynaui/icons-react";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background">
      <BackgroundMesh />

      <div className="relative z-10">
        <Navbar />
        <Hero />

        {/* About Section */}
        <section id="about" className="py-32 px-4 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative perspective-1000">
              <ProfileCard src="/me.svg" />
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

            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Technical <span className="text-gradient">Proficiency</span></h2>
              <p className="text-foreground/60 max-w-2xl mx-auto text-lg">
                Combining creative vision with technical execution. Here are the tools and methodologies I use to bring ideas to life. Drag to explore.
              </p>
            </div>

            <div className="-mx-12">
              <Carousel />
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
      </div>
    </main>
  );
}
