import { cn } from "@/lib/utils";

export function StatsBar() {
  const stats = [
    { label: "3 Protocols", value: "Partitions · Routing · QoS", color: "text-neon-cyan" },
    { label: "Zero deps", value: "Pure Node.js", color: "text-neon-purple" },
    { label: "1→∞ nodes", value: "Elastic cluster", color: "text-neon-amber" },
    { label: "< 10s", value: "Leader election", color: "text-neon-green" },
  ];

  return (
    <div className="bg-dark-800 border-y border-white/8 py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          {stats.map((stat, i) => (
            <div key={i} className="text-center group">
              <div className={cn("text-xl sm:text-2xl md:text-3xl font-bold font-sans mb-1 transition-transform group-hover:scale-105", stat.color)}>
                {stat.label}
              </div>
              <div className="text-[10px] sm:text-xs md:text-sm text-slate-500 font-mono uppercase tracking-widest">
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
