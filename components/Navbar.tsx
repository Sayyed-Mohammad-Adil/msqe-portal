"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X, Github } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Features", href: "#features" },
  { name: "System", href: "#how-it-works" },
  { name: "Setup", href: "#install" },
  // { name: "Deploy", href: "#docker" },
  { name: "Live", href: "#demo" },
  { name: "Cluster", href: "#cluster" },
  { name: "Stats", href: "#compare" },
];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300 border-b border-transparent",
        isScrolled
          ? "bg-dark-900/80 backdrop-blur-md border-white/8 shadow-lg shadow-black/50 py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 group shrink-0">
          <img src="/logo.svg" alt="MSQE Logo" className="w-6 h-6 object-contain" />
          <span className="font-mono font-bold text-xl text-neon-cyan flex items-center">
            MSQE
            <span className="w-2 h-5 bg-neon-cyan ml-1 animate-blink" />
          </span>
          <span className="bg-neon-cyan/10 text-neon-cyan text-[10px] font-bold px-1.5 py-0.5 rounded border border-neon-cyan/20">
            v3.0
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-5 xl:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-mono text-slate-400 hover:text-white transition-colors"
              onClick={link.name === "Docker" ? () => {
                setTimeout(() => {
                  document.getElementById('trigger-docker')?.click();
                }, 100);
              } : undefined}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-3 xl:gap-4">
          <a
            href="https://www.npmjs.com/package/msqe-client"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 
              bg-dark-800 border border-white/10 rounded-lg 
              text-xs font-mono text-slate-400 
              hover:border-neon-cyan/30 hover:text-neon-cyan transition-all"
          >
            <span className="text-neon-cyan">●</span>
            npm
          </a>
          <Link
            href="https://github.com/Sayyed-Mohammad-Adil/msqe-enterprise"
            target="_blank"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/15 text-sm font-medium hover:bg-white/5 transition-colors"
          >
            <Github className="w-4 h-4" />
            GitHub
          </Link>
          <Link
            href="#install"
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById('install');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-4 py-1.5 bg-neon-cyan text-dark-950 font-bold text-sm rounded-lg hover:brightness-110 shadow-lg shadow-neon-cyan/20 transition-all active:scale-95"
          >
            Get Started →
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-white p-1"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={cn(
              "fixed left-0 right-0 bottom-0 bg-dark-950 z-[90] lg:hidden px-6 py-5 flex flex-col overflow-y-auto overscroll-contain",
              isScrolled ? "top-[57px]" : "top-[73px]"
            )}
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-mono text-slate-400 hover:text-neon-cyan transition-colors py-1.5"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="mt-6 pt-5 border-t border-white/10 flex flex-col gap-3">
              <Link
                href="https://github.com/Sayyed-Mohammad-Adil/msqe-enterprise"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-white/15 text-base font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Github /> GitHub
              </Link>
              <Link
                href="#install"
                className="px-4 py-3 bg-neon-cyan text-dark-950 font-bold text-base rounded-xl text-center"
                onClick={(e) => {
                  e.preventDefault();
                  setIsMobileMenuOpen(false);
                  const element = document.getElementById('install');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Get Started →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
