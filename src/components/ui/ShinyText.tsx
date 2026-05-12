"use client";

import { motion } from "framer-motion";

interface ShinyTextProps {
  text: string;
  className?: string;
}

export default function ShinyText({ text, className = "" }: ShinyTextProps) {
  return (
    <span
      className={`inline-block bg-gradient-to-r from-primary via-white to-rose-400 bg-clip-text text-transparent bg-[length:200%_100%] animate-shine ${className}`}
    >
      {text}
    </span>
  );
}
