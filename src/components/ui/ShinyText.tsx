"use client";

import { useTheme } from "@/components/ThemeProvider";

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
  const { theme } = useTheme();

  const gradientClasses = theme === "dark"
    ? "from-blue-500 via-white to-cyan-400"
    : "from-blue-600 via-slate-800 to-cyan-500";

  return (
    <span
      className={`inline-block bg-gradient-to-r ${gradientClasses} bg-clip-text text-transparent bg-[length:200%_100%] ${disabled ? "" : "animate-shine"} ${className}`}
      style={{ animationDuration }}
    >
      {text}
    </span>
  );
}
