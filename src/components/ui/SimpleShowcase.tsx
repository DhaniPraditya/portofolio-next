import Image from "next/image";

interface SimpleShowcaseProps {
  mockupImages: string[];
}

export default function SimpleShowcase({ mockupImages }: SimpleShowcaseProps) {
  // Desktop mockup (first image), Mobile mockup (second image)
  const desktopImage = mockupImages[0];
  const mobileImage = mockupImages[1];


  return (
    <div className="relative w-full max-w-[500px] aspect-[4/3] flex items-center justify-center z-10 select-none">
      {/* ─── Ambient Backdrop Glow (Subtle & Soft) ────────────────────────────── */}
      <div className="absolute w-[60%] h-[60%] bg-primary/10 blur-[50px] rounded-full pointer-events-none" />

      {/* ─── Layer 1: Desktop Browser Mockup ──────────────────────────────────── */}
      <div
        className="absolute w-[85%] aspect-[16/10.5] rounded-2xl bg-white dark:bg-zinc-950/90 border border-slate-200 dark:border-white/10 shadow-[0_25px_60px_rgba(15,23,42,0.12)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col left-4 top-8 animate-float-desktop"
      >
        {/* Browser Header Bar */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-slate-200 dark:border-white/5 bg-slate-100/90 dark:bg-zinc-950/80">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
          </div>
          <div className="w-48 mx-auto h-4.5 rounded-md bg-slate-200/80 dark:bg-white/10 border border-slate-300/80 dark:border-white/10 flex items-center justify-center">
            <span className="text-[8px] text-slate-600 dark:text-foreground/45 font-mono tracking-wider">
              dhanipraditya.com
            </span>
          </div>
        </div>

        {/* Viewport Screen */}
        <div className="flex-1 relative bg-zinc-900 overflow-hidden">
          <Image
            src={desktopImage}
            alt="Desktop UI/UX Project Showcase"
            fill
            sizes="(max-width: 768px) 100vw, 500px"
            priority
            className="object-cover object-top"
          />
        </div>
      </div>

      {/* ─── Layer 2: Overlapping Mobile Phone Mockup ─────────────────────────── */}
      <div
        className="absolute right-4 bottom-4 w-[28%] aspect-[9/18.5] rounded-[1.75rem] bg-zinc-950 border-[3.5px] border-white/10 shadow-[0_20px_45px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col p-1 z-20 animate-float-mobile"
      >
        {/* Dynamic Island Notch */}
        <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-8 h-2.5 rounded-full bg-black z-30" />

        {/* Mobile Screen Viewport */}
        <div className="w-full h-full rounded-[1.5rem] overflow-hidden relative bg-zinc-900">
          <Image
            src={mobileImage}
            alt="Mobile UI/UX Project Showcase"
            fill
            sizes="150px"
            priority
            className="object-cover object-top"
          />
        </div>
      </div>
    </div>
  );
}
