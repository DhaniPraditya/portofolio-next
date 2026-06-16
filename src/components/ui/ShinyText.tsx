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
  return (
    <span
      className={`inline-block bg-gradient-to-r from-blue-600 via-slate-800 to-cyan-500 dark:from-blue-500 dark:via-white dark:to-cyan-400 bg-clip-text text-transparent bg-[length:200%_100%] ${disabled ? "" : "animate-shine"} ${className}`}
      style={{ animationDuration: `${speed}s` }}
    >
      {text}
    </span>
  );
}
