"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import Image from "next/image";

export default function ProfileCard({ src }: { src: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Map mouse movement to rotation degrees
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], ["15deg", "-15deg"]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], ["-15deg", "15deg"]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  // Dynamic spotlight effect following the mouse
  const spotlightX = useTransform(mouseX, v => v + 250); 
  const spotlightY = useTransform(mouseY, v => v + 250);
  const background = useMotionTemplate`radial-gradient(circle at ${spotlightX}px ${spotlightY}px, rgba(255,255,255,0.15) 0%, transparent 60%)`;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full aspect-square rounded-[3rem] overflow-hidden glass border-white/10 shadow-2xl cursor-pointer group"
    >
      {/* 3D Inner Layer */}
      <motion.div
        style={{ translateZ: 40 }}
        className="absolute inset-0 z-10 w-full h-full"
      >
        <Image
          src={src}
          alt="Profile"
          fill
          className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
          unoptimized
        />
      </motion.div>

      {/* Spotlight Overlay */}
      <motion.div 
        className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: isHovered ? 1 : 0,
          background,
          translateZ: 50
        }}
      />
    </motion.div>
  );
}
