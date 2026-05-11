import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface NeonCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: "cyan" | "purple" | "amber" | "red" | "blue" | "green";
}

export function NeonCard({
  children,
  className,
  glowColor = "cyan",
}: NeonCardProps) {
  const glowColors = {
    cyan: "hover:border-neon-cyan/40 hover:shadow-[0_0_20px_rgba(0,245,196,0.15)]",
    purple: "hover:border-neon-purple/40 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]",
    amber: "hover:border-neon-amber/40 hover:shadow-[0_0_20px_rgba(245,158,11,0.15)]",
    red: "hover:border-neon-red/40 hover:shadow-[0_0_20px_rgba(244,63,94,0.15)]",
    blue: "hover:border-neon-blue/40 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]",
    green: "hover:border-neon-green/40 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)]",
  };

  return (
    <div
      className={cn(
        "bg-dark-800 border border-white/10 rounded-xl p-4 sm:p-6 transition-all duration-300",
        glowColors[glowColor],
        className
      )}
    >
      {children}
    </div>
  );
}
