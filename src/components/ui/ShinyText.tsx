"use client";

import { motion } from "framer-motion";

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

export default function ShinyText({ 
  text, 
  disabled = false, 
  speed = 3, 
  className = "" 
}: ShinyTextProps) {
  const animationDuration = `${speed}s`;

  return (
    <span
      className={`inline-block bg-gradient-to-r from-blue-500 via-white to-cyan-400 bg-clip-text text-transparent bg-[length:200%_100%] ${disabled ? "" : "animate-shine"} ${className}`}
      style={{ animationDuration }}
    >
      {text}
    </span>
  );
}
