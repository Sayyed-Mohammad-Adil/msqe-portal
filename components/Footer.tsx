"use client";

import Link from "next/link";
import { Github, Share2 } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-950 border-t border-white/8 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <img src="/logo.svg" alt="MSQE Logo" className="w-6 h-6 object-contain" />
              <span className="font-mono font-bold text-xl text-neon-cyan flex items-center">
                MSQE
                <span className="w-2 h-5 bg-neon-cyan ml-1" />
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Lightweight message queue for modern applications. High-performance, distributed, and zero-infrastructure.
            </p>
            <div className="text-xs text-slate-500 font-mono italic">
              Built with ♥ by{" "}
              <a href="https://www.sayyedmohammadadil.online/" target="_blank" rel="noopener noreferrer" className="text-neon-cyan not-italic font-bold hover:underline">
                Sayyed Mohammad Adil
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-mono text-xs uppercase tracking-widest font-bold mb-6">Product</h4>
            <ul className="space-y-4">
              {["Features", "Install", "Demo", "Cluster", "Compare"].map((item) => (
                <li key={item}>
                  <Link href={`#${item.toLowerCase().replace(" ", "-")}`} className="text-sm text-slate-400 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-white font-mono text-xs uppercase tracking-widest font-bold mb-6">Resources</h4>
            <ul className="space-y-4">
              <li>
                <Link href="#how-it-works" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="https://github.com/Sayyed-Mohammad-Adil/msqe-enterprise" target="_blank" className="text-sm text-slate-400 hover:text-white transition-colors">
                  GitHub
                </Link>
              </li>
              <li>
                <Link href="https://www.npmjs.com/package/msqe-client" target="_blank" className="text-sm text-slate-400 hover:text-white transition-colors">
                  npm Package
                </Link>
              </li>
              <li>
                <Link href="#install" className="text-sm text-slate-400 hover:text-white transition-colors" onClick={() => {
                  setTimeout(() => {
                    document.getElementById('trigger-docker')?.click();
                  }, 100);
                }}>
                  Docker
                </Link>
              </li>
              <li>
                <Link href="https://github.com/Sayyed-Mohammad-Adil/msqe-enterprise/releases" target="_blank" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Changelog
                </Link>
              </li>
              <li>
                <Link href="/docs#roadmap" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white font-mono text-xs uppercase tracking-widest font-bold mb-6">Connect</h4>
            <div className="flex gap-4">
              <Link 
                href="https://github.com/Sayyed-Mohammad-Adil/msqe-enterprise" 
                target="_blank"
                className="p-2 bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:text-white hover:border-white/20 transition-all"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link 
                href="https://www.npmjs.com/package/msqe-client"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white/5 border border-white/10 rounded-lg 
                  text-slate-400 hover:text-neon-cyan hover:border-neon-cyan/30 
                  transition-all"
                title="npm"
              >
                <span className="font-mono text-xs font-bold">npm</span>
              </Link>
              <Link href="https://www.msqe.org/" target="_blank" rel="noopener noreferrer" className="p-2 bg-white/5 border border-white/10 rounded-lg text-slate-400 hover:text-white hover:border-white/20 transition-all">
                <Share2 className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 sm:mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center md:items-start justify-between gap-4 text-xs text-slate-500 font-mono text-center md:text-left">
          <div className="leading-relaxed">MIT License · v3.0.0 · © {currentYear} <a href="https://www.sayyedmohammadadil.online/" target="_blank" rel="noopener noreferrer" className="text-neon-cyan hover:underline">Sayyed Mohammad Adil</a> · MSQE</div>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
