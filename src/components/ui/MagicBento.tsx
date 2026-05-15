"use client";

import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { Layout, Search, Mobile, Code } from '@mynaui/icons-react';

// ─── Constants ────────────────────────────────────────────────────────────────
const DEFAULT_PARTICLE_COUNT = 10;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
// Primary blue: #3b82f6 → 59, 130, 246
const GLOW_COLOR = '59, 130, 246';
const MOBILE_BREAKPOINT = 768;

// ─── Skill Card Data ───────────────────────────────────────────────────────────
const cardData = [
  {
    title: 'UI Design',
    description: 'Crafting intuitive and visually stunning interfaces for web and mobile platforms. Every pixel placed with purpose.',
    label: 'Design',
    icon: <Layout size={32} />,
    tools: ['Figma', 'Adobe XD', 'Design Systems', 'Typography'],
    // Desktop: large 2×2 card (top-left)
    gridClass: 'lg:col-span-2 lg:row-span-2',
    minHeight: 'min-h-[380px] lg:min-h-[420px]',
    large: true,
  },
  {
    title: 'UX Research',
    description: 'Understanding user behavior through rigorous testing.',
    label: 'Research',
    icon: <Search size={28} />,
    tools: ['User Interviews', 'Usability Testing', 'Personas', 'User Flows'],
    gridClass: 'lg:col-span-1 lg:row-span-1',
    minHeight: 'min-h-[200px]',
    large: false,
  },
  {
    title: 'Prototyping',
    description: 'Bringing designs to life with high-fidelity interactive prototypes.',
    label: 'Prototype',
    icon: <Mobile size={28} />,
    tools: ['Framer', 'ProtoPie', 'Micro-interactions', 'Wireframing'],
    gridClass: 'lg:col-span-1 lg:row-span-1',
    minHeight: 'min-h-[200px]',
    large: false,
  },
  {
    title: 'Frontend Basics',
    description: 'Bridging the gap between design and development with hands-on code — making designs real.',
    label: 'Dev',
    icon: <Code size={32} />,
    tools: ['HTML / CSS', 'Tailwind CSS', 'React JS', 'Next.js'],
    // Desktop: full-width bottom bar
    gridClass: 'lg:col-span-3 lg:row-span-1',
    minHeight: 'min-h-[180px]',
    large: false,
    wide: true,
  },
];

// ─── Types ────────────────────────────────────────────────────────────────────
interface ParticleCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  disableAnimations?: boolean;
  particleCount?: number;
  glowColor?: string;
  enableTilt?: boolean;
  enableMagnetism?: boolean;
  clickEffect?: boolean;
}

interface GlobalSpotlightProps {
  gridRef: React.RefObject<HTMLDivElement | null>;
  disableAnimations?: boolean;
  enabled?: boolean;
  spotlightRadius?: number;
  glowColor?: string;
}

interface MagicBentoProps {
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  enableTilt?: boolean;
  enableMagnetism?: boolean;
  glowColor?: string;
  clickEffect?: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const createParticleElement = (x: number, y: number, color = GLOW_COLOR) => {
  const el = document.createElement('div');
  el.className = 'mb-particle';
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const calculateSpotlightValues = (radius: number) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75,
});

const updateCardGlowProperties = (
  card: HTMLElement,
  mouseX: number,
  mouseY: number,
  glow: number,
  radius: number
) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;
  card.style.setProperty('--glow-x', `${relativeX}%`);
  card.style.setProperty('--glow-y', `${relativeY}%`);
  card.style.setProperty('--glow-intensity', glow.toString());
  card.style.setProperty('--glow-radius', `${radius}px`);
};

// ─── ParticleCard ─────────────────────────────────────────────────────────────
const ParticleCard = ({
  children,
  className = '',
  style,
  disableAnimations = false,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = GLOW_COLOR,
  enableTilt = true,
  enableMagnetism = false,
  clickEffect = false,
}: ParticleCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLElement[]>([]);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef<HTMLElement[]>([]);
  const particlesInitialized = useRef(false);

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;
    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(Math.random() * width, Math.random() * height, glowColor)
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    particlesRef.current.forEach((particle) => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'back.in(1.7)',
        onComplete: () => particle.parentNode?.removeChild(particle),
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;
    if (!particlesInitialized.current) initializeParticles();

    memoizedParticles.current.forEach((particle, index) => {
      const id = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;
        const clone = particle.cloneNode(true) as HTMLElement;
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);
        gsap.fromTo(clone, { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' });
        gsap.to(clone, { x: (Math.random() - 0.5) * 80, y: (Math.random() - 0.5) * 80, rotation: Math.random() * 360, duration: 2 + Math.random() * 2, ease: 'none', repeat: -1, yoyo: true });
        gsap.to(clone, { opacity: 0.3, duration: 1.5, ease: 'power2.inOut', repeat: -1, yoyo: true });
      }, index * 100);
      timeoutsRef.current.push(id);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;
    const el = cardRef.current;

    const onEnter = () => {
      isHoveredRef.current = true;
      animateParticles();
      if (enableTilt) gsap.to(el, { rotateX: 5, rotateY: 5, duration: 0.3, ease: 'power2.out', transformPerspective: 1000 });
    };

    const onLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();
      if (enableTilt) gsap.to(el, { rotateX: 0, rotateY: 0, duration: 0.3, ease: 'power2.out' });
      if (enableMagnetism) gsap.to(el, { x: 0, y: 0, duration: 0.3, ease: 'power2.out' });
    };

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (enableTilt) {
        gsap.to(el, {
          rotateX: ((y - rect.height / 2) / rect.height) * -10,
          rotateY: ((x - rect.width / 2) / rect.width) * 10,
          duration: 0.1, ease: 'power2.out', transformPerspective: 1000,
        });
      }
      if (enableMagnetism) {
        gsap.to(el, {
          x: (x - rect.width / 2) * 0.05,
          y: (y - rect.height / 2) * 0.05,
          duration: 0.3, ease: 'power2.out',
        });
      }
    };

    const onClick = (e: MouseEvent) => {
      if (!clickEffect) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const maxD = Math.max(Math.hypot(x, y), Math.hypot(x - rect.width, y), Math.hypot(x, y - rect.height), Math.hypot(x - rect.width, y - rect.height));
      const ripple = document.createElement('div');
      ripple.style.cssText = `position:absolute;width:${maxD * 2}px;height:${maxD * 2}px;border-radius:50%;background:radial-gradient(circle,rgba(${glowColor},0.4) 0%,rgba(${glowColor},0.2) 30%,transparent 70%);left:${x - maxD}px;top:${y - maxD}px;pointer-events:none;z-index:1000;`;
      el.appendChild(ripple);
      gsap.fromTo(ripple, { scale: 0, opacity: 1 }, { scale: 1, opacity: 0, duration: 0.8, ease: 'power2.out', onComplete: () => ripple.remove() });
    };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mouseleave', onLeave);
    el.addEventListener('mousemove', onMove);
    el.addEventListener('click', onClick);
    return () => {
      isHoveredRef.current = false;
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mouseleave', onLeave);
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('click', onClick);
      clearAllParticles();
    };
  }, [animateParticles, clearAllParticles, disableAnimations, enableTilt, enableMagnetism, clickEffect, glowColor]);

  return (
    <div ref={cardRef} className={`${className} relative overflow-hidden`} style={style}>
      {children}
    </div>
  );
};

// ─── GlobalSpotlight ──────────────────────────────────────────────────────────
const GlobalSpotlight = ({ gridRef, disableAnimations = false, enabled = true, spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS, glowColor = GLOW_COLOR }: GlobalSpotlightProps) => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;

    const spotlight = document.createElement('div');
    spotlight.style.cssText = `position:fixed;width:600px;height:600px;border-radius:50%;pointer-events:none;background:radial-gradient(circle,rgba(${glowColor},0.12) 0%,rgba(${glowColor},0.06) 20%,rgba(${glowColor},0.02) 40%,transparent 70%);z-index:200;opacity:0;transform:translate(-50%,-50%);mix-blend-mode:screen;`;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const onMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !gridRef.current) return;
      const section = gridRef.current.closest('.mb-section');
      const rect = section?.getBoundingClientRect();
      const inside = rect && e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom;

      const cards = gridRef.current.querySelectorAll<HTMLElement>('.mb-card');
      if (!inside) {
        gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3 });
        cards.forEach(c => c.style.setProperty('--glow-intensity', '0'));
        return;
      }

      const { proximity, fadeDistance } = calculateSpotlightValues(spotlightRadius);
      let minDist = Infinity;

      cards.forEach(card => {
        const r = card.getBoundingClientRect();
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height / 2;
        const dist = Math.max(0, Math.hypot(e.clientX - cx, e.clientY - cy) - Math.max(r.width, r.height) / 2);
        minDist = Math.min(minDist, dist);
        const intensity = dist <= proximity ? 1 : dist <= fadeDistance ? (fadeDistance - dist) / (fadeDistance - proximity) : 0;
        updateCardGlowProperties(card, e.clientX, e.clientY, intensity, spotlightRadius);
      });

      gsap.to(spotlightRef.current, { left: e.clientX, top: e.clientY, duration: 0.1, ease: 'power2.out' });
      const targetOpacity = minDist <= proximity ? 0.8 : minDist <= fadeDistance ? ((fadeDistance - minDist) / (fadeDistance - proximity)) * 0.8 : 0;
      gsap.to(spotlightRef.current, { opacity: targetOpacity, duration: targetOpacity > 0 ? 0.2 : 0.5 });
    };

    const onLeave = () => {
      gridRef.current?.querySelectorAll<HTMLElement>('.mb-card').forEach(c => c.style.setProperty('--glow-intensity', '0'));
      if (spotlightRef.current) gsap.to(spotlightRef.current, { opacity: 0, duration: 0.3 });
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseleave', onLeave);
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};

// ─── Mobile Detection ─────────────────────────────────────────────────────────
const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
};

// ─── MagicBento (Main Export) ─────────────────────────────────────────────────
const MagicBento = ({
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = true,
  enableMagnetism = false,
  glowColor = GLOW_COLOR,
  clickEffect = true,
}: MagicBentoProps) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const isMobile = useMobileDetection();
  const noAnimations = disableAnimations || isMobile;

  const cardStyle: React.CSSProperties = {
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    backdropFilter: 'blur(16px)',
    WebkitBackdropFilter: 'blur(16px)',
    borderColor: 'rgba(255, 255, 255, 0.08)',
    color: '#f8fafc',
    '--glow-x': '50%',
    '--glow-y': '50%',
    '--glow-intensity': '0',
    '--glow-radius': '200px',
  } as React.CSSProperties;

  const baseClass = `mb-card flex flex-col justify-between relative w-full p-6 md:p-8 rounded-3xl border overflow-hidden transition-all duration-300 cursor-pointer ${enableBorderGlow ? 'mb-card--glow' : ''}`;

  return (
    <>
      <style>{`
        .mb-section {
          --glow-color: ${glowColor};
        }
        .mb-card--glow::after {
          content: '';
          position: absolute;
          inset: 0;
          padding: 1px;
          background: radial-gradient(
            var(--glow-radius) circle at var(--glow-x) var(--glow-y),
            rgba(${glowColor}, calc(var(--glow-intensity) * 0.7)) 0%,
            rgba(${glowColor}, calc(var(--glow-intensity) * 0.3)) 40%,
            transparent 70%
          );
          border-radius: inherit;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          pointer-events: none;
          z-index: 1;
        }
        .mb-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 32px rgba(${glowColor}, 0.15);
          border-color: rgba(${glowColor}, 0.4) !important;
        }
      `}</style>

      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={noAnimations}
          enabled={enableSpotlight}
          spotlightRadius={spotlightRadius}
          glowColor={glowColor}
        />
      )}

      <div className="mb-section w-full" ref={gridRef}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full" style={{ gridAutoRows: 'auto' }}>
          {cardData.map((card, index) => {
            const isWide = card.wide ?? false;
            const isLarge = card.large ?? false;

            const content = (
              <>
                {/* Label + Icon */}
                <div className="flex items-start justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                    style={{ background: `rgba(${glowColor}, 0.1)`, color: `rgb(${glowColor})` }}>
                    {card.label}
                  </span>
                  <span style={{ color: `rgba(${glowColor}, 0.6)` }}>
                    {card.icon}
                  </span>
                </div>

                {/* Title & Description */}
                <div className={isWide ? 'flex-1 flex flex-col sm:flex-row sm:items-end sm:gap-8' : 'flex-1'}>
                  <div className={isWide ? 'flex-shrink-0' : ''}>
                    <h3 className={`font-bold mb-2 text-foreground ${isLarge ? 'text-3xl md:text-4xl' : 'text-xl md:text-2xl'}`}>
                      {card.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed mb-4"
                      style={{
                        color: 'rgba(248,250,252,0.5)',
                        ...(textAutoHide && !isLarge ? {
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical' as const,
                          WebkitLineClamp: 2,
                          overflow: 'hidden',
                        } : {})
                      }}
                    >
                      {card.description}
                    </p>
                  </div>

                  {/* Tools */}
                  <div className="flex flex-wrap gap-2">
                    {card.tools.map(tool => (
                      <span key={tool} className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                        style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(248,250,252,0.5)', border: '1px solid rgba(255,255,255,0.07)' }}>
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            );

            const classNames = `${baseClass} ${card.gridClass} ${card.minHeight} flex flex-col justify-between`;

            return enableStars ? (
              <ParticleCard
                key={index}
                className={classNames}
                style={cardStyle}
                disableAnimations={noAnimations}
                particleCount={particleCount}
                glowColor={glowColor}
                enableTilt={enableTilt && !isWide}
                enableMagnetism={enableMagnetism && !isWide}
                clickEffect={clickEffect}
              >
                {content}
              </ParticleCard>
            ) : (
              <div key={index} className={classNames} style={cardStyle}>
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default MagicBento;
