import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface NeonButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "accent";
  className?: string;
  glow?: boolean;
}

export function NeonButton({ 
  children, 
  variant = "primary", 
  className, 
  glow = true,
  ...props 
}: NeonButtonProps) {
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
    accent: "bg-accent text-accent-foreground hover:bg-accent/90",
  };

  const glowColors = {
    primary: "hover:shadow-[0_0_20px_rgba(0,240,255,0.5)]",
    secondary: "hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]",
    accent: "hover:shadow-[0_0_20px_rgba(255,46,136,0.5)]",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative px-8 py-3 font-orbitron font-bold tracking-wider uppercase transition-all duration-300 clip-path-button cursor-pointer border-none outline-none",
        variants[variant],
        glow && glowColors[variant],
        className
      )}
      {...props}
    >
      {children}
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white/50 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white/50 pointer-events-none" />
    </motion.button>
  );
}
