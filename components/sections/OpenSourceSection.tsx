import { SectionHeader } from "../ui/SectionHeader";
import { Github, Package, Shield, Container } from "lucide-react";
import { NeonCard } from "../ui/NeonCard";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function OpenSourceSection() {
  return (
    <section className="py-16 sm:py-24 bg-dark-950 text-center relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-cyan/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          title="Free. Open Source."
          highlight="Forever."
          subtitle="MIT License. Self-host on your own servers. Full source on GitHub. No vendor lock-in."
        />

        {/* npm badges */}
        <div className="flex flex-wrap justify-center gap-3 mt-6 mb-12">
          <a href="https://www.npmjs.com/package/msqe-client" target="_blank" rel="noopener noreferrer">
            <img src="https://img.shields.io/npm/v/msqe-client?style=flat-square&color=00f5c4&labelColor=0f1018&label=npm" alt="npm version" className="h-5" />
          </a>
          <a href="https://www.npmjs.com/package/msqe-client" target="_blank" rel="noopener noreferrer">
            <img src="https://img.shields.io/npm/dm/msqe-client?style=flat-square&color=a855f7&labelColor=0f1018&label=downloads" alt="npm downloads" className="h-5" />
          </a>
          <img src="https://img.shields.io/npm/l/msqe-client?style=flat-square&color=22c55e&labelColor=0f1018&label=license" alt="MIT License" className="h-5" />
          <img src="https://img.shields.io/badge/TypeScript-strict-3b82f6?style=flat-square&labelColor=0f1018" alt="TypeScript" className="h-5" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 max-w-6xl mx-auto mb-12 sm:mb-16">
          <Card 
            icon={Shield} 
            title="MIT License" 
            desc="Use in commercial projects, redistribute, and modify without any restrictions."
          />
          <Card 
            icon={Package} 
            title="npm Package" 
            desc="Available as a lightweight npm package. Integrate with any Node.js microservice."
          />
          <Card 
            icon={Github} 
            title="Self-Host" 
            desc="Own your infrastructure. Deploy to any VPS, cloud provider, or bare metal server."
          />
          <Card 
            icon={Container} 
            title="Docker Ready" 
            desc="Official Docker image. Single container or multi-node compose cluster. One command to deploy."
            color="neon-blue"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link
            href="https://github.com/Sayyed-Mohammad-Adil/msqe-enterprise"
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full sm:w-auto items-center justify-center gap-3 bg-neon-cyan text-dark-950 px-8 py-4 rounded-xl font-bold hover:brightness-110 shadow-lg shadow-neon-cyan/20 transition-all active:scale-95"
          >
            <Github className="w-5 h-5" />
            Star on GitHub
          </Link>
          <div className="group relative">
            <div className="flex max-w-full items-center gap-3 sm:gap-4 bg-dark-900 border border-white/10 px-4 sm:px-6 py-4 rounded-xl font-mono text-xs sm:text-sm overflow-x-auto">
              <span className="text-slate-500">$</span>
              <span className="text-white">npm install msqe-client</span>
              <button className="text-neon-cyan hover:text-white transition-colors">
                <Package className="w-4 h-4" />
              </button>
            </div>
          </div>
          <button className="text-slate-400 hover:text-white transition-colors font-medium">
            Read the Docs →
          </button>
        </div>
        {/* Creator Credit */}
        <div className="mt-20 pt-12 border-t border-white/5">
          <p className="text-[11px] font-mono text-slate-600 uppercase tracking-widest mb-4">Designed & Built by</p>
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-dark-900 border border-white/10 rounded-2xl">
            <div className="w-9 h-9 rounded-full bg-neon-cyan/20 border border-neon-cyan/30 flex items-center justify-center text-sm font-bold text-neon-cyan font-mono">SM</div>
            <div className="text-left">
              <div className="text-sm font-bold text-white">Sayyed Mohammad Adil</div>
              <div className="text-[10px] text-slate-500 font-mono">Creator · MSQE Engine · CSND Project</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Card({ icon: Icon, title, desc, color }: any) {
  return (
    <div className="p-5 sm:p-8 rounded-2xl bg-dark-900 border border-white/10 text-center hover:border-white/20 transition-all">
      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6">
        <Icon className={cn("w-6 h-6", color ? `text-${color}` : "text-slate-300")} />
      </div>
      <h5 className="text-lg font-bold text-white mb-3 font-sans">{title}</h5>
      <p className="text-sm text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}
