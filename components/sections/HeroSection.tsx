"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [terminalText, setTerminalText] = useState<string[]>([]);
  const [isCopied, setIsCopied] = useState(false);

  // Particles Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
    }[] = [];

    const createParticles = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      for (let i = 0; i < 20; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.5,
          speedY: (Math.random() - 0.5) * 0.5,
          opacity: Math.random() * 0.3 + 0.1,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.fillStyle = `rgba(0, 245, 196, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    createParticles();
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Terminal Typewriter Effect
  useEffect(() => {
    const lines = [
      "$ sudo docker logs msqe-node-1",
      "🚀 Publisher running at ws://0.0.0.0:9091",
      "[Cluster] Existing leader found: node-2",
      "[Cluster] Following leader node-2 at http://msqe-node-2:8081",
      "[Publisher] Became follower — draining local queues",
      "[Cluster] Syncing from offset 0",
      "[Cluster] Sync complete — 0 messages received",
      "═══════════════════════════════════════",
      " MSQE v3 - Cluster (3 nodes)",
      " Broker → ws://localhost:9091",
      " Control Center → http://localhost:8081",
      " Node ID → node-1",
      " Role → follower",
      " Peers → http://msqe-node-2:8081, http://msqe-node-3:8081",
      " Quorum → 2 of 3",
      "═══════════════════════════════════════",
      "",
      "███╗   ███╗███████╗ ██████╗ ███████╗",
      "████╗ ████║██╔════╝██╔═══██╗██╔════╝",
      "██╔████╔██║███████╗██║   ██║█████╗  ",
      "██║╚██╔╝██║╚════██║██║▄▄ ██║██╔══╝  ",
      "██║ ╚═╝ ██║███████║╚██████╔╝███████╗",
      "╚═╝     ╚═╝╚══════╝ ╚══▀▀═╝ ╚══════╝",
      "",
      "════════════════════════════════════",
      "🚀 ENGINE ONLINE",
      "⚡ Status : READY",
      "🌐 Server : http://0.0.0.0:8081",
      "",
      "════════════════════════════════════",
      "  MSQE first-time setup required",
      "  Open: http://localhost:3030/setup",
    ];

    let currentLineIndex = 0;
    let currentCharIndex = 0;
    let timer: NodeJS.Timeout;

    const type = () => {
      if (currentLineIndex < lines.length) {
        const currentLine = lines[currentLineIndex];
        if (currentCharIndex < currentLine.length) {
          setTerminalText((prev) => {
            const next = [...prev];
            next[currentLineIndex] = currentLine.substring(0, currentCharIndex + 1);
            return next;
          });
          currentCharIndex++;
          timer = setTimeout(type, 8);
        } else {
          currentLineIndex++;
          currentCharIndex = 0;
          timer = setTimeout(type, 120);
        }
      }
    };

    const startTimeout = setTimeout(type, 1000);
    return () => {
      clearTimeout(timer);
      clearTimeout(startTimeout);
    };
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText("npm install msqe");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative min-h-screen flex items-center py-24 sm:pt-28 sm:pb-16 overflow-hidden bg-grid">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left Column */}
          <motion.div
            className="lg:w-3/5 w-full text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >

            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight font-sans mb-6"
            >
              <span className="text-white block">Message Queue</span>
              <span className="text-neon-cyan glow-text">That Just Works.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg md:text-xl text-slate-400 font-body max-w-xl mx-auto lg:mx-0 mb-8 sm:mb-10 leading-relaxed"
            >
Smart routing, wildcard filtering, and reliable delivery — from single-node setups to distributed clusters.
            </motion.p>

            {/* npm badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mt-6 mb-2">
              <a
                href="https://www.npmjs.com/package/msqe-client"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://img.shields.io/npm/v/msqe-client?style=flat-square&color=00f5c4&labelColor=0f1018&label=npm"
                  alt="npm version"
                  className="h-5"
                />
              </a>
              <a
                href="https://www.npmjs.com/package/msqe-client"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://img.shields.io/npm/dm/msqe-client?style=flat-square&color=a855f7&labelColor=0f1018&label=downloads"
                  alt="npm downloads"
                  className="h-5"
                />
              </a>
              <img
                src="https://img.shields.io/npm/l/msqe-client.svg?style=flat-square&color=22c55e&labelColor=0f1018&label=license&cacheSeconds=3600"
                alt="MIT License"
                className="h-5"
              />
              <img
                src="https://img.shields.io/badge/TypeScript-strict-3b82f6?style=flat-square&labelColor=0f1018"
                alt="TypeScript"
                className="h-5"
              />
            </div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:flex-wrap justify-center lg:justify-start gap-4 mb-10">
              <button
                onClick={copyToClipboard}
                className="flex items-center justify-center gap-3 bg-neon-cyan text-dark-950 px-5 sm:px-6 py-3.5 rounded-lg font-mono font-bold hover:brightness-110 shadow-lg shadow-neon-cyan/20 transition-all active:scale-95"
              >
                npm install msqe-client
                {isCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4 hover:cursor-pointer" />}
              </button>
              <Link
                href="https://github.com/Sayyed-Mohammad-Adil/msqe-enterprise"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-white/15 px-5 sm:px-6 py-3.5 rounded-lg text-white font-medium hover:bg-white/5 transition-all"
              >
                View on GitHub →
              </Link>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-wrap justify-center lg:justify-start gap-3">
              {["Zero dependencies", "< 5MB install", "TypeScript native", "MIT License"].map((stat) => (
                <div
                  key={stat}
                  className="px-3 py-1 rounded-full border border-white/20 bg-white/5 text-[10px] font-mono text-slate-300 uppercase tracking-widest"
                >
                  {stat}
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Terminal */}
          <motion.div
            className="lg:w-2/5 w-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="bg-dark-800 border border-white/10 rounded-xl overflow-hidden shadow-2xl shadow-black/50">
              <div className="bg-dark-700 px-4 py-3 flex items-center">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="ml-auto font-mono text-[10px] text-slate-500 uppercase tracking-widest">
                  terminal — msqe
                </div>
              </div>
              <div className="p-4 sm:p-6 bg-dark-950 font-mono text-[10px] sm:text-xs h-[300px] sm:h-[360px] flex flex-col leading-relaxed overflow-auto">
                {terminalText.map((line, i) => {
                  if (!line) return null;
                  let colorClass = "text-slate-400";
                  let sizeClass = "";
                  if (line.startsWith("$")) colorClass = "text-slate-500";
                  if (line.includes("READY") || line.includes("ENGINE ONLINE") || line.includes("setup required")) colorClass = "text-neon-green";
                  if (line.includes("Cluster") || line.includes("MSQE")) colorClass = "text-neon-cyan";
                  if (line.includes("════")) colorClass = "text-slate-500";
                  if (line.includes("██") || line.includes("╚") || line.includes("╔") || line.includes("║")) sizeClass = "text-[8px] sm:text-[10px] leading-none";
                  if (/[█╚╔║]/u.test(line)) {
                    sizeClass = "text-[7px] sm:text-[8px] leading-[1.05] tracking-normal text-slate-200 [font-family:Consolas,'Courier_New',monospace]";
                  }

                  return (
                    <div key={i} className={cn("mb-1 whitespace-pre", colorClass, sizeClass)}>
                      {line}
                    </div>
                  );
                })}
                <div className="flex items-center">
                  <span className="w-2 h-5 bg-neon-cyan/80 animate-blink ml-0.5" />
                </div>
              </div>
            </div>
            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <button
                onClick={() => {
                  document.getElementById('install')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs text-white/50 hover:cursor-pointer hover:text-neon-cyan hover:transition-all flex flex-col items-center justify-center gap-3 group mx-auto"
              >
                <span className="font-mono uppercase tracking-[0.2em]">See how to install</span>
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="p-2 rounded-full border border-white/10 group-hover:border-neon-cyan/50 transition-colors"
                >
                  <ArrowRight className="w-4 h-4 rotate-90 text-neon-cyan" />
                </motion.div>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
