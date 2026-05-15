import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import BackgroundMesh from "@/components/BackgroundMesh";
import ProfileCard from "@/components/ui/ProfileCard";
import MagicBento from "@/components/ui/MagicBento";
import { CheckCircle, User, Layout, Mobile, Search } from "@mynaui/icons-react";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background overflow-x-hidden">
      <BackgroundMesh />

      <div className="relative z-10">
        <Navbar />
        <Hero />

        {/* About Section */}
        <section id="about" className="py-20 md:py-32 px-4 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <div className="relative flex justify-center">
              <ProfileCard avatarUrl="/me-no-bg.svg" />
            </div>

            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-6 text-primary">
                <User size={20} />
                <span className="font-bold uppercase tracking-widest text-sm">About Me</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 md:mb-8 leading-tight text-left">
                Crafting Digital Products with a <span className="text-gradient">Human-Centered</span> Approach.
              </h2>
              <p className="text-foreground/60 text-lg leading-relaxed mb-8 text-left">
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
        <section id="skills" className="py-20 md:py-32 px-4 max-w-7xl mx-auto">
          <div className="text-left mb-10 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">Technical <span className="text-gradient">Proficiency</span></h2>
            <p className="text-left text-foreground/60 mx-auto text-base md:text-lg">
              Combining creative vision with technical execution. Here are the tools and methodologies I use to bring ideas to life.
            </p>
          </div>

          <MagicBento
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={false}
            enableMagnetism={false}
            clickEffect={true}
            spotlightRadius={400}
            particleCount={12}
            glowColor="59, 130, 246"
            disableAnimations={false}
          />
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
