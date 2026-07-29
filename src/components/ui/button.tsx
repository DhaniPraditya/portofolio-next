import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "glass" | "destructive";
  size?: "sm" | "md" | "lg" | "icon";
  children?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:pointer-events-none active:scale-[0.97] cursor-pointer";

    const variantStyles = {
      primary: "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20 rounded-2xl",
      secondary: "bg-secondary text-foreground hover:bg-secondary/80 rounded-2xl border border-card-border",
      outline: "border border-card-border bg-transparent text-foreground hover:bg-foreground/5 rounded-2xl",
      ghost: "text-foreground/70 hover:text-foreground hover:bg-foreground/5 rounded-xl",
      glass: "glass text-foreground hover:bg-foreground/10 rounded-2xl",
      destructive: "bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20 rounded-2xl",
    };

    const sizeStyles = {
      sm: "text-xs px-3 py-1.5 gap-1.5",
      md: "text-sm px-5 py-2.5 gap-2",
      lg: "text-base px-7 py-3.5 gap-2.5",
      icon: "p-2 rounded-xl",
    };

    const combinedClassName = `${baseStyles} ${variantStyles[variant] || variantStyles.primary} ${sizeStyles[size] || sizeStyles.md} ${className}`.trim();

    return (
      <button ref={ref} className={combinedClassName} {...props}>
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
