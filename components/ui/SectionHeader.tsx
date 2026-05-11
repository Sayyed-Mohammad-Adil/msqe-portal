import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  highlight,
  subtitle,
  centered = true,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("max-w-3xl mb-10 sm:mb-16", centered ? "mx-auto text-center" : "", className)}>
      {badge && (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-cyan/10 border border-neon-cyan/20 text-neon-cyan text-xs font-mono mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
          {badge}
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 sm:mb-6 font-sans">
        {title} <span className="text-neon-cyan glow-text">{highlight}</span>
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-slate-400 font-body leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
