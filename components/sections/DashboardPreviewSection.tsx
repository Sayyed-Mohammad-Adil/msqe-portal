"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "../ui/SectionHeader";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie, Legend } from "recharts";
import { cn } from "@/lib/utils";
import React from "react";
import { 
  LayoutDashboard, Database, Users2, AlertCircle, Terminal, 
  ChevronLeft, ChevronRight, RotateCw, ShieldCheck, 
  Lock, User, Rocket, Zap, Cpu, CheckCircle, ArrowRight,
  Play, Pause, MousePointer2, History, Activity, Settings, Users,
  Theater, HelpCircle, Monitor, Layers, TrendingUp, BarChart3,
  Server, Clock, Search, MoreVertical, Trash2, Bell, LogOut,
  Command, X, Radio, Globe, Code2, Shield, Edit2, CheckCircle2,
  XCircle, RotateCcw, Code, Save, Info, ShieldAlert, AlertTriangle, RefreshCcw,
  Filter, UserPlus, Plus, BarChart2 as BarChartIcon
} from "lucide-react";

// --- Mock Data ---
const areaData = [
  { t: "12:00", v: 12 }, { t: "12:10", v: 45 }, { t: "12:20", v: 82 },
  { t: "12:30", v: 94 }, { t: "12:40", v: 78 }, { t: "12:50", v: 110 },
];
const barData = [
  { n: "orders", A: 94, U: 6 }, { n: "payment", A: 100, U: 0 },
  { n: "metrics", A: 71, U: 29 }, { n: "notif", A: 88, U: 12 },
];
const queueData = [ { n: "P-0", d: 42 }, { n: "P-1", d: 12 }, { n: "P-2", d: 89 }, { n: "P-3", d: 24 } ];

type FlowState = "setup_1" | "setup_2" | "setup_3" | "setup_4" | "setup_5" | "login" | "dashboard";
type TabId = "overview" | "topics" | "dlq" | "subscribers" | "logs" | "metrics" | "console" | "settings" | "users" | "roles" | "about";

export function DashboardPreviewSection() {
  const [mounted, setMounted] = useState(false);
  const [isAuto, setIsAuto] = useState(true);
  const [flowState, setFlowState] = useState<FlowState>("setup_1");
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [typedUsername, setTypedUsername] = useState("");
  const [typedPassword, setTypedPassword] = useState("");
  const [isClicking, setIsClicking] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => { setMounted(true); }, []);

  // --- Automation Engine ---
  useEffect(() => {
    if (!isAuto) return;
    let cancelled = false;
    const wait = (ms: number) => new Promise(r => setTimeout(r, ms));
    
    const run = async () => {
      if (cancelled) return;
      setFlowState("setup_1");
      setMousePos({ x: 50, y: 55 });
      await wait(2000);

      // Move to Get Started
      setMousePos({ x: 50, y: 88 });
      await wait(800);
      setIsClicking(true); await wait(300); setIsClicking(false);
      setFlowState("setup_2");
      setMousePos({ x: 50, y: 45 });
      await wait(800);
      
      // Type Admin
      setTypedUsername("");
      for (let char of "admin") { setTypedUsername(p => p + char); await wait(100); }
      setMousePos({ x: 50, y: 65 }); await wait(500);
      setTypedPassword("");
      for (let char of "msqe2026") { setTypedPassword(p => p + "•"); await wait(80); }
      
      // Next Step
      setMousePos({ x: 65, y: 88 }); await wait(1000);
      setIsClicking(true); await wait(300); setIsClicking(false);
      setFlowState("setup_3");
      setMousePos({ x: 50, y: 50 }); await wait(1500);
      
      // Next Step (Config)
      setMousePos({ x: 65, y: 88 }); await wait(800);
      setIsClicking(true); await wait(300); setIsClicking(false);
      setFlowState("setup_4");
      
      // Initialize
      setMousePos({ x: 65, y: 88 }); await wait(1500);
      setIsClicking(true); await wait(300); setIsClicking(false);
      setFlowState("setup_5");
      await wait(2500);
      setFlowState("login");
      setMousePos({ x: 50, y: 78 }); // Login button
      await wait(1500);
      setIsClicking(true); await wait(300); setIsClicking(false);
      setFlowState("dashboard");
      
      // Explore Tabs
      const explore = ["topics", "dlq", "subscribers", "logs", "metrics", "console", "about"];
      for (let tab of explore) {
        await wait(2500);
        // Approximate sidebar positions for the "ghost cursor"
        setMousePos({ x: 15, y: 25 + explore.indexOf(tab) * 7 });
        await wait(600);
        setActiveTab(tab as TabId);
      }
      await wait(5000);
      if (!cancelled) run();
    };

    run();
    return () => { cancelled = true; };
  }, [isAuto]);

  if (!mounted) return null;

  const urlMap: Record<FlowState, string> = {
    setup_1: "localhost:3000/setup",
    setup_2: "localhost:3000/setup/admin",
    setup_3: "localhost:3000/setup/config",
    setup_4: "localhost:3000/setup/review",
    setup_5: "localhost:3000/setup/success",
    login: "localhost:3000/login",
    dashboard: `localhost:3000/${activeTab}`,
  };

  return (
    <section className="py-16 sm:py-24 bg-dark-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeader 
            title="Built-in" 
            highlight="Dashboard" 
            subtitle="Full observability out of the box. No external dependencies required." 
            className="mb-0 text-left" 
            centered={false}
          />
          <div className="flex items-center gap-2 bg-dark-800 p-1 rounded-2xl border border-white/5 self-start w-full sm:w-auto">
            <button onClick={() => setIsAuto(true)} className={cn("flex flex-1 sm:flex-none items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all", isAuto ? "bg-neon-cyan text-dark-950 shadow-lg shadow-neon-cyan/20" : "text-slate-500 hover:text-white")}><Play className="w-3 h-3" /> Auto Play</button>
            <button onClick={() => setIsAuto(false)} className={cn("flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold transition-all", !isAuto ? "bg-white/10 text-white" : "text-slate-500 hover:text-white")}>Manual</button>
          </div>
        </div>

        <div className="rounded-2xl sm:rounded-3xl border border-white/10 bg-dark-800 overflow-x-auto overflow-y-hidden shadow-2xl shadow-black/80 relative group/browser">
          <div className="min-w-[900px]">
          {/* Browser Bar */}
          <div className="bg-[#1a1a1a] border-b border-white/5 flex items-center px-4 py-2.5 gap-4">
            <div className="flex gap-1.5 shrink-0"><div className="w-3 h-3 rounded-full bg-[#ff5f57]" /><div className="w-3 h-3 rounded-full bg-[#febc2e]" /><div className="w-3 h-3 rounded-full bg-[#28c840]" /></div>
            <div className="flex gap-3 text-white/20 shrink-0"><ChevronLeft className="w-4 h-4"/><ChevronRight className="w-4 h-4"/><RotateCw className="w-4 h-4"/></div>
            <div className="flex-1 max-w-2xl mx-auto h-8 bg-black/40 rounded-lg border border-white/5 flex items-center px-3 gap-2">
              <Lock className="w-3 h-3 text-green-400/50" /><span className="text-[11px] font-mono text-white/30 truncate tracking-tight">{urlMap[flowState]}</span>
            </div>
          </div>

          <div className="h-[640px] lg:h-[720px] relative bg-[#0a0a0a] overflow-hidden">
            <AnimatePresence mode="wait">
              {flowState.startsWith("setup") && <SetupSimulator key="setup" step={flowState} setFlowState={setFlowState} username={typedUsername} password={typedPassword} isAuto={isAuto} />}
              {flowState === "login" && <LoginSimulator key="login" username={typedUsername} password={typedPassword} onLogin={() => setFlowState("dashboard")} />}
              {flowState === "dashboard" && <DashboardSimulator key="dash" activeTab={activeTab} setActiveTab={setActiveTab} isAuto={isAuto} setIsAuto={setIsAuto} />}
            </AnimatePresence>

            {isAuto && (
              <motion.div className="absolute pointer-events-none z-[100]" animate={{ left: `${mousePos.x}%`, top: `${mousePos.y}%`, scale: isClicking ? 0.8 : 1 }} transition={{ duration: 0.8, ease: "easeInOut" }}>
                <MousePointer2 className="w-6 h-6 text-white drop-shadow-xl fill-black" />
              </motion.div>
            )}
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Setup Component ---
function SetupSimulator({ step, setFlowState, username, password, isAuto }: any) {
  const steps = [1, 2, 3, 4];
  const currentStep = parseInt(step.split("_")[1]);

  const handleNext = () => {
    if (isAuto) return;
    const nextStep = `setup_${currentStep + 1}` as FlowState;
    if (currentStep === 4) {
      setFlowState("setup_5");
      setTimeout(() => setFlowState("login"), 2000);
    } else {
      setFlowState(nextStep);
    }
  };

  const handleBack = () => {
    if (isAuto || currentStep === 1) return;
    const prevStep = `setup_${currentStep - 1}` as FlowState;
    setFlowState(prevStep);
  };
  
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col items-center justify-center p-6 sm:p-8 bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#333 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="z-10 w-full max-w-lg">
        <div className="text-center mb-10 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-neon-cyan/10 border border-neon-cyan/20 rounded-full text-[10px] font-bold text-neon-cyan uppercase">MSQE v3.0.0</div>
          <h1 className="text-4xl font-bold tracking-tighter">MS<span className="text-neon-cyan">QE</span></h1>
        </div>

        {currentStep < 5 && (
          <div className="flex justify-center gap-3 mb-10">
            {steps.map(s => <div key={s} className={cn("h-1.5 rounded-full transition-all duration-500", s === currentStep ? "w-8 bg-neon-cyan shadow-[0_0_10px_rgba(0,245,196,0.5)]" : s < currentStep ? "w-4 bg-green-500" : "w-4 bg-white/10")} />)}
          </div>
        )}

        <div className="glass rounded-3xl border border-white/10 p-6 sm:p-10 relative overflow-hidden bg-white/[0.02]">
          {currentStep === 1 && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
              <div className="text-center space-y-2"><h2 className="text-2xl font-bold">Welcome to MSQE</h2><p className="text-slate-500 text-sm">High-performance messaging with zero infrastructure.</p></div>
              <div className="grid grid-cols-2 gap-4">
                {[ { l: "Ingress", v: "9090", i: Zap, c: "text-amber-400" }, { l: "Admin", v: "8081", i: Cpu, c: "text-blue-400" }, { l: "Console", v: "3000", i: Terminal, c: "text-neon-cyan" }, { l: "Auth", v: "RBAC", i: ShieldCheck, c: "text-green-400" } ].map(item => (
                  <div key={item.l} className="p-4 bg-white/5 border border-white/5 rounded-2xl"><item.i className={cn("w-4 h-4 mb-2", item.c)} /><p className="text-[9px] text-white/30 uppercase tracking-widest font-bold">{item.l}</p><p className="text-lg font-mono font-bold">{item.v}</p></div>
                ))}
              </div>
              <button onClick={handleNext} className="w-full py-4 bg-neon-cyan text-dark-950 font-bold rounded-2xl flex items-center justify-center gap-2 hover:brightness-110 transition-all">Get Started <ChevronRight className="w-5 h-5"/></button>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="text-center space-y-2"><h2 className="text-2xl font-bold text-neon-cyan">Admin Account</h2><p className="text-slate-500 text-sm">Create the superuser account.</p></div>
              <div className="space-y-4">
                <div className="space-y-2"><label className="text-[9px] font-bold text-white/30 uppercase tracking-widest ml-1">Username</label><div className="relative"><User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20"/><input readOnly value={username} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm font-mono text-white" placeholder="admin"/></div></div>
                <div className="space-y-2"><label className="text-[9px] font-bold text-white/30 uppercase tracking-widest ml-1">Password</label><input readOnly value={password} className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm font-mono text-white" placeholder="••••••••"/></div>
              </div>
              <div className="flex gap-4 pt-4">
                <button onClick={handleBack} className="flex-1 py-4 bg-white/5 rounded-2xl text-center text-xs font-bold text-white/40 hover:bg-white/10 transition-all">Back</button>
                <button onClick={handleNext} className="flex-[2] py-4 bg-neon-cyan text-dark-950 rounded-2xl text-center font-bold hover:brightness-110 transition-all">Next Step</button>
              </div>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="text-center space-y-2"><h2 className="text-2xl font-bold text-neon-cyan">Broker Config</h2><p className="text-slate-500 text-sm">Tune the engine for your needs.</p></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><label className="text-[9px] text-white/30 uppercase font-bold">Partitions</label><div className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm font-mono text-white">4</div></div>
                <div className="space-y-2"><label className="text-[9px] text-white/30 uppercase font-bold">Retries</label><div className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm font-mono text-white">3</div></div>
                <div className="space-y-2 col-span-2"><label className="text-[9px] text-white/30 uppercase font-bold">DLQ Topic</label><div className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm font-mono text-neon-cyan">__dlq__</div></div>
              </div>
              <div className="flex gap-4 pt-4">
                <button onClick={handleBack} className="flex-1 py-4 bg-white/5 rounded-2xl text-center text-xs font-bold text-white/40 hover:bg-white/10 transition-all">Back</button>
                <button onClick={handleNext} className="flex-[2] py-4 bg-neon-cyan text-dark-950 rounded-2xl text-center font-bold hover:brightness-110 transition-all">Final Review</button>
              </div>
            </motion.div>
          )}

          {currentStep === 4 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div className="text-center space-y-2"><h2 className="text-2xl font-bold text-green-400">Ready to Go</h2><p className="text-slate-500 text-sm">Initialize the engine now.</p></div>
              <div className="bg-white/5 rounded-2xl p-6 space-y-3">
                <div className="flex justify-between text-xs"><span className="text-white/30 uppercase">Admin</span><span className="font-bold text-white">{username || "admin"}</span></div>
                <div className="flex justify-between text-xs"><span className="text-white/30 uppercase">Partitions</span><span className="font-bold text-white">4</span></div>
                <div className="flex justify-between text-xs"><span className="text-white/30 uppercase">DLQ</span><span className="font-bold text-neon-cyan">__dlq__</span></div>
              </div>
              <div className="flex gap-4 pt-4">
                <button onClick={handleBack} className="flex-1 py-4 bg-white/5 rounded-2xl text-center text-xs font-bold text-white/40 hover:bg-white/10 transition-all">Back</button>
                <button onClick={handleNext} className="flex-[2] py-4 bg-green-500 text-dark-950 rounded-2xl text-center font-bold flex items-center justify-center gap-2 hover:brightness-110 transition-all">Initialize Engine <CheckCircle className="w-4 h-4"/></button>
              </div>
            </motion.div>
          )}

          {currentStep === 5 && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10 space-y-6">
              <div className="w-20 h-20 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(34,197,94,0.3)]"><CheckCircle className="w-10 h-10 text-green-500" /></div>
              <h2 className="text-3xl font-bold text-white">Setup Complete!</h2>
              <p className="text-slate-500 text-sm max-w-xs mx-auto">Engine initialized. Redirecting to login...</p>
              <div className="flex items-center justify-center gap-2 text-neon-cyan font-bold animate-pulse text-sm">Starting Dashboard <ArrowRight className="w-4 h-4" /></div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// --- Login Simulator ---
function LoginSimulator({ username, password, onLogin }: any) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex items-center justify-center p-6 sm:p-8 bg-[#0a0a0a] relative overflow-hidden">
      <div className="z-10 w-full max-w-md bg-white/[0.03] border border-white/[0.08] p-6 sm:p-10 rounded-3xl glass shadow-2xl space-y-8 sm:space-y-10">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-white/5 rounded-xl border border-white/10">
            <img src="/logo.svg" alt="MSQE Logo" className="w-8 h-8 object-contain" />
          </div>
          <div><h1 className="text-2xl font-bold text-white tracking-tight">MS<span className="text-neon-cyan">QE</span></h1><p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-black">Enterprise Queue System</p></div>
        </div>
        <div className="space-y-6">
          <div className="space-y-2"><label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Username</label><div className="relative"><User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20"/><input readOnly value={username} className="w-full bg-white/[0.05] border border-white/[0.1] rounded-2xl py-4 pl-12 pr-4 text-sm text-white" placeholder="admin"/></div></div>
          <div className="space-y-2"><label className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Password</label><div className="relative"><Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20"/><input readOnly value={password} className="w-full bg-white/[0.05] border border-white/[0.1] rounded-2xl py-4 pl-12 pr-4 text-sm text-white" placeholder="••••••••"/></div></div>
          <button onClick={onLogin} className="w-full bg-white text-black font-bold py-4 rounded-2xl shadow-xl">Sign In</button>
        </div>
      </div>
    </motion.div>
  );
}

// --- Dashboard Simulator ---
function DashboardSimulator({ activeTab, setActiveTab, isAuto, setIsAuto }: any) {
  const [showNotifications, setShowNotifications] = useState(false);
  
  const menuItems = [
    { id: "overview", label: "Dashboard", icon: LayoutDashboard },
    { id: "topics", label: "Topics", icon: Database },
    { id: "dlq", label: "Dead Letter Queue", icon: AlertCircle },
    { id: "subscribers", label: "Subscribers", icon: Users2 },
    { id: "logs", label: "Message Logs", icon: History },
    { id: "metrics", label: "Metrics", icon: Activity },
    { id: "console", label: "Live Console", icon: Monitor },
    { id: "settings", label: "Settings", icon: Settings },
    { id: "users", label: "Users", icon: Users },
    { id: "roles", label: "Roles", icon: Theater },
  ];

  const bottomItems = [
    { id: "about", label: "System Info", icon: HelpCircle },
  ];

  const handleTabClick = (tab: TabId) => {
    setIsAuto(false);
    setActiveTab(tab);
  };

  const handleLogout = () => {
    setIsAuto(false);
    window.location.reload(); 
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex bg-[#0a0a0a]">
      {/* Sidebar */}
      <div className="w-64 border-r border-white/5 bg-[#070707] flex flex-col p-4 shrink-0">
        <div className="flex items-center gap-3 px-4 py-5 mb-6 border-b border-white/5">
          <div className="flex-shrink-0 w-8 h-8">
            <img src="/logo.svg" alt="MSQE Logo" className="object-contain w-full h-full" />
          </div>
          <div className="overflow-hidden whitespace-nowrap">
            <span className="font-bold text-white text-xl tracking-tighter uppercase leading-none">MS<span className="text-neon-cyan">QE</span></span>
            <p className="text-[10px] text-white/25 uppercase tracking-[0.15em] font-medium mt-0.5">
              Message Queue Events
            </p>
          </div>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto pr-2 scrollbar-hide">
          {menuItems.map(item => (
            <button key={item.id} onClick={() => handleTabClick(item.id as TabId)} className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all group relative", activeTab === item.id ? "bg-white/10 text-white" : "text-white/30 hover:text-white/60 hover:bg-white/5")}>
              {activeTab === item.id && <motion.div layoutId="activeTab" className="absolute left-0 w-1 h-5 bg-neon-cyan rounded-r-full" />}
              <item.icon className={cn("w-5 h-5", activeTab === item.id ? "text-neon-cyan" : "text-white/20 group-hover:text-white")} />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="mt-4 pt-4 border-t border-white/5 space-y-1">
          {bottomItems.map(item => (
            <button key={item.id} onClick={() => handleTabClick(item.id as TabId)} className={cn("w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all group", activeTab === item.id ? "bg-white/10 text-white" : "text-white/30 hover:text-white/60 hover:bg-white/5")}>
              <item.icon className={cn("w-5 h-5", activeTab === item.id ? "text-neon-cyan" : "text-white/20 group-hover:text-white")} />
              {item.label}
            </button>
          ))}
          <div className="flex items-center gap-1 px-1 py-1 mt-4 hover:bg-white/5 hover:rounded-2xl hover:border hover:border-white/5">
            <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-bold text-neon-cyan">A</div>
            <div className="flex-1 overflow-hidden text-left">
              <p className="text-xs font-bold text-white truncate">Admin</p>
              <p className="text-[5px] text-white/30 uppercase tracking-tighter font-black">Admin</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-all group mt-2">
            <LogOut className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 border-b border-white/5 bg-[#0a0a0a]/50 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-8">
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-white/60 transition-colors" />
              <input 
                type="text" 
                placeholder="Search topics, messages, or subscribers..." 
                className="w-full bg-white/5 border border-white/10 rounded-lg py-2 pl-10 pr-10 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/20 transition-all"
              />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 rounded border border-white/10 bg-white/5 text-[10px] text-white/30">
                    <Command className="w-2.5 h-2.5" />
                    <span>K</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="relative">
                  <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 text-white/40 hover:text-white transition-colors"
                  >
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 bg-red-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center border-2 border-[#0a0a0a] animate-pulse">
                      1
                    </span>
                  </button>

                  <AnimatePresence>
                    {showNotifications && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 top-full mt-2 w-96 bg-[#0c0c0c] border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden z-50"
                      >
                        <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
                          <h3 className="text-sm font-bold text-white">Notifications</h3>
                          <div className="flex items-center gap-2">
                            <button className="text-[10px] text-neon-cyan hover:text-neon-cyan font-bold uppercase tracking-wider transition-colors">Mark all read</button>
                            <X className="w-3.5 h-3.5 text-white/20 cursor-pointer" onClick={() => setShowNotifications(false)} />
                          </div>
                        </div>
                        <div className="max-h-80 overflow-y-auto">
                          {[
                            { id: "1", type: "dlq", title: "Message moved to DLQ", message: "Topic: payment-processing • ERR_TIMEOUT", timestamp: Date.now() - 1000 * 60 * 5, read: false },
                            { id: "2", type: "system", title: "System Healthy", message: "12 topics • 45 subscribers online", timestamp: Date.now() - 1000 * 60 * 15, read: true },
                            { id: "3", type: "ack", title: "Cluster Synced", message: "Nodes 1-3 synchronized successfully", timestamp: Date.now() - 1000 * 60 * 45, read: true },
                          ].map((n, idx) => (
                            <div key={idx} className={cn("px-5 py-3 border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors cursor-pointer flex items-start gap-3", !n.read && "bg-neon-cyan/[0.03]")}>
                              <div className="mt-0.5 p-1.5 rounded-lg bg-white/5">
                                {n.type === "dlq" ? <AlertTriangle className="w-4 h-4 text-red-400" /> : n.type === "ack" ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Bell className="w-4 h-4 text-neon-cyan" />}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <p className="text-xs font-bold text-white truncate">{n.title}</p>
                                  {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan flex-shrink-0" />}
                                </div>
                                <p className="text-[11px] text-white/40 truncate mt-0.5">{n.message}</p>
                                <p className="text-[10px] text-white/20 mt-1">just now</p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="px-5 py-3 border-t border-white/5 text-center">
                          <button className="text-[10px] text-neon-cyan hover:text-neon-cyan font-bold uppercase tracking-wider transition-colors">View all activity →</button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="h-8 w-[1px] bg-white/10" />

                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-bold text-white">Admin</span>
                    <span className="text-[9px] text-white/40 uppercase tracking-widest font-black">Principal Architect</span>
                  </div>
                  <button 
                    onClick={() => window.location.reload()}
                    className="p-2 bg-white/5 border border-white/10 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-400/10 hover:border-red-400/20 transition-all"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </header>

        <div className="flex-1 p-8 overflow-y-auto scrollbar-hide">
          <AnimatePresence mode="wait">
            {activeTab === "overview" && <ViewOverview key="o"/>}
            {activeTab === "topics" && <ViewTopics key="t"/>}
            {activeTab === "dlq" && <ViewDlq key="d"/>}
            {activeTab === "subscribers" && <ViewSubscribers key="s"/>}
            {activeTab === "logs" && <ViewLogs key="l"/>}
            {activeTab === "metrics" && <ViewMetrics key="m"/>}
            {activeTab === "console" && <ViewConsole key="c"/>}
            {activeTab === "settings" && <ViewSettings key="st"/>}
            {activeTab === "users" && <ViewUsers key="u"/>}
            {activeTab === "roles" && <ViewRoles key="r"/>}
            {activeTab === "about" && <ViewAbout key="a"/>}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

// --- Page Views ---

function ViewOverview() {
  const stats = [
    { label: "Total Messages", value: "1,240,591", icon: Layers, color: "text-neon-cyan", bg: "bg-neon-cyan/10" },
    { label: "Queue Depth", value: "42", icon: Activity, color: "text-amber-400", bg: "bg-amber-400/10" },
    { label: "Active Subs", value: "8", icon: Users2, color: "text-purple-400", bg: "bg-purple-400/10" },
    { label: "Consumer Groups", value: "3", icon: Server, color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: "Users", value: "3", icon: Users, color: "text-orange-400", bg: "bg-orange-400/10" },
    { label: "Roles", value: "3", icon: ShieldCheck, color: "text-pink-400", bg: "bg-pink-400/10" },
    { label: "Throughput/min", value: "12,400", icon: Zap, color: "text-green-400", bg: "bg-green-400/10" },
    { label: "Dead Letters", value: "2", icon: AlertTriangle, color: "text-red-400", bg: "bg-red-400/10" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Dashboard</h1>
          <p className="text-white/40 mt-1 text-sm">Real-time telemetry and engine health.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl">
          <Clock className="w-4 h-4 text-white/40" />
          <span className="text-sm text-white/60 font-mono tabular-nums">{new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {stats.map((stat, i) => (
          <div key={stat.label} className="p-4 glass rounded-2xl border border-white/[0.06] flex flex-col gap-2 group relative overflow-hidden transition-all">
            <div className={cn(stat.bg, "p-2 w-fit rounded-lg", stat.color)}><stat.icon className="w-3.5 h-3.5" /></div>
            <div>
              <p className="text-[8px] font-bold text-white/30 uppercase tracking-widest leading-none mb-1.5">{stat.label}</p>
              <h2 className="text-xl font-bold text-white tabular-nums leading-none">{stat.value}</h2>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-3xl border border-white/5 p-6 space-y-6">
          <div className="flex items-center gap-2"><TrendingUp className="w-5 h-5 text-neon-cyan" /><h3 className="font-bold text-white">Messages Timeline</h3></div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={areaData}>
                <defs><linearGradient id="gradCyan" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3} /><stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis hide dataKey="t" /><YAxis hide />
                <Area type="monotone" dataKey="v" stroke="#22d3ee" strokeWidth={2} fill="url(#gradCyan)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-3xl border border-white/5 p-6 space-y-6">
          <div className="flex items-center gap-2"><BarChart3 className="w-5 h-5 text-green-400" /><h3 className="font-bold text-white">Ack Rate per Topic</h3></div>
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[{n: "orders", A: 1200, U: 45}, {n: "payments", A: 800, U: 0}, {n: "logs", A: 4500, U: 200}]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="n" axisLine={false} tickLine={false} tick={{ fill: "#ffffff35", fontSize: 10 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#ffffff35", fontSize: 10 }} />
                <Bar dataKey="A" fill="#4ade80" radius={[4, 4, 0, 0]} /><Bar dataKey="U" fill="#f87171" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-3xl border border-white/5 p-6 space-y-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2"><Server className="w-5 h-5 text-blue-400" /><h3 className="font-bold text-white">Cluster Architecture</h3></div>
            <div className="flex items-center gap-4">
              <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] font-bold text-blue-400 uppercase tracking-widest">Quorum: 3/3</div>
              <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-[10px] font-bold text-green-400 uppercase tracking-widest">Status: SYNCED</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["Node-A (Leader)", "Node-B (Follower)", "Node-C (Follower)"].map((node, i) => (
              <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl relative overflow-hidden group">
                <div className={cn("absolute top-0 right-0 px-3 py-1 text-[8px] font-black uppercase tracking-tighter rounded-bl-lg", i === 0 ? "bg-amber-500 text-black" : "bg-blue-500 text-white")}>{i === 0 ? "Leader" : "Follower"}</div>
                <div className="flex items-center gap-3 mb-4">
                  <div className={cn("p-2 rounded-lg", i === 0 ? "bg-amber-500/20 text-amber-500" : "bg-blue-500/20 text-blue-500")}><Server className="w-4 h-4" /></div>
                  <div><h4 className="text-sm font-bold text-white">{node}</h4><p className="text-[10px] text-white/30 uppercase font-bold tracking-widest">msqe-cluster-0{i+1}</p></div>
                </div>
                <div className="flex justify-between items-center text-[10px]"><span className="text-white/40">Sync State</span><span className="text-green-400 font-bold">ONLINE</span></div>
              </div>
            ))}
          </div>
        </div>

        {/* Security Snapshot Section */}
        <div className="glass rounded-3xl border border-white/5 p-6 space-y-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2"><Shield className="w-5 h-5 text-pink-400" /><h3 className="font-bold text-white">Security & Access Control</h3></div>
            <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">RBAC Enabled</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-white/[0.03] border border-white/5 rounded-2xl space-y-4">
              <div className="flex items-center justify-between"><h4 className="text-sm font-bold text-white/80">Active Users</h4><Users className="w-4 h-4 text-orange-400" /></div>
              <div className="space-y-2">
                {[1, 2, 3].map(u => (
                  <div key={u} className="flex items-center justify-between text-[11px]"><span className="text-white/40">user-0{u}@msqe.local</span><span className="px-1.5 py-0.5 rounded bg-white/5 text-white/60 font-mono">Principal</span></div>
                ))}
              </div>
            </div>
            <div className="p-5 bg-white/[0.03] border border-white/5 rounded-2xl space-y-4">
              <div className="flex items-center justify-between"><h4 className="text-sm font-bold text-white/80">Permission Groups</h4><ShieldCheck className="w-4 h-4 text-pink-400" /></div>
              <div className="space-y-2">
                {["Super Admin", "Publisher", "Consumer"].map(r => (
                  <div key={r} className="flex items-center justify-between text-[11px]"><span className="text-white/40">{r}</span><CheckCircle2 className="w-3 h-3 text-green-500/50" /></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ViewTopics() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Topics</h1>
          <p className="text-white/40 mt-1 text-sm">Manage and monitor all message queues.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            type="text"
            placeholder="Filter topics…"
            className="bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/20 transition-all w-60"
          />
        </div>
      </div>

      <div className="glass rounded-2xl border border-white/[0.06] overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/[0.06] bg-white/[0.02]">
              {["Topic Name", "Total", "Ack / Unack", "Queue Depth", "Last Activity", "Actions"].map((h) => (
                <th key={h} className={`px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-white/40 ${h === "Actions" ? "text-right" : ""}`}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {["payment_events", "user_logs", "email_notifications", "inventory_updates", "fraud_check"].map((name, i) => (
              <tr key={name} className="hover:bg-white/[0.02] transition-colors group cursor-pointer">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg"><Database className="w-4 h-4 text-blue-400" /></div>
                    <span className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors">{name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-mono text-white/60 tabular-nums">{(12400 + i * 2500).toLocaleString()}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-xs font-bold tabular-nums">
                    <span className="text-green-400">{12000 + i * 2000}</span>
                    <span className="text-white/20">/</span>
                    <span className="text-red-400">{400 + i * 500}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_6px_rgba(59,130,246,0.6)]" />
                    <span className="text-sm font-mono tabular-nums text-white">{400 + i * 100}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-xs text-white/35">2 mins ago</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <button className="p-2 text-white/25 hover:text-white hover:bg-white/5 rounded-lg transition-all"><ArrowRight className="w-4 h-4" /></button>
                    <button className="p-2 text-white/25 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ViewSubscribers() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Subscribers & Groups</h1>
          <p className="text-white/40 mt-1 text-sm">Monitor active connections and consumer group load balancing.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-xl">
          <Zap className="w-4 h-4 text-green-400" />
          <span className="text-sm text-green-400 font-bold tabular-nums">45 Online</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="glass rounded-2xl border border-white/[0.06] overflow-hidden">
            <div className="p-6 border-b border-white/[0.06] flex items-center gap-2">
              <Radio className="w-5 h-5 text-blue-400" />
              <h3 className="font-bold text-white">Direct Subscribers</h3>
            </div>
            <div className="divide-y divide-white/[0.04]">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-6 hover:bg-white/[0.02] transition-all flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <div className="w-6 h-6 bg-neon-cyan/20 rounded-md flex items-center justify-center font-bold text-neon-cyan text-[10px]">SDK</div>
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#0a0a0a]" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-white font-mono">msqe-client-py-{i}284</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider">orders.*</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-10 ml-4">
                    <div className="text-right">
                      <p className="text-xs font-bold text-white/60">QoS 2</p>
                      <p className="text-[10px] text-white/30 uppercase tracking-widest">Policy</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-purple-400 tabular-nums">{i * 2}</p>
                      <p className="text-[10px] text-white/30 uppercase tracking-widest">Pending</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div>
          <div className="glass rounded-2xl border border-white/[0.06] p-6 space-y-6">
            <div className="flex items-center gap-2">
              <Users2 className="w-5 h-5 text-purple-400" />
              <h3 className="font-bold text-white">Consumer Groups</h3>
            </div>
            <div className="space-y-4">
              <div className="p-4 bg-white/[0.03] border border-white/[0.05] rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                      <Users className="w-4 h-4 text-purple-400" />
                    </div>
                    <span className="text-sm font-bold text-white">billing-service</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full bg-white/5 text-white/40 text-[10px] font-bold">3 members</span>
                </div>
                <div className="space-y-2">
                  {[1, 2, 3].map(m => (
                    <div key={m} className="flex items-center justify-between p-2 bg-black/30 rounded-xl border border-white/5">
                      <span className="text-[10px] font-mono text-white/40">node-{m}.billing.local</span>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        <span className="text-[10px] font-bold text-white/60 tabular-nums">0</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between border-t border-white/5 pt-3">
                  <span className="text-[10px] text-white/20 uppercase tracking-widest font-bold">Strategy</span>
                  <span className="text-[10px] text-white/50 font-bold uppercase">Round Robin</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ViewDlq() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <ShieldAlert className="w-8 h-8 text-red-500" />
            Dead Letter Queue
          </h1>
          <p className="text-white/40 mt-1 text-sm">Review and recover messages that exhausted all delivery attempts.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input type="text" placeholder="Search by ID, topic…" className="bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white/20 transition-all w-64" />
        </div>
      </div>

      <div className="glass rounded-2xl border border-white/[0.06] overflow-hidden">
        <div className="p-6 border-b border-white/[0.06] flex items-center justify-between bg-red-500/[0.02]">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <h3 className="font-bold text-white">Quarantined Messages</h3>
            <span className="ml-2 px-2 py-0.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold tabular-nums">42</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-1.5 bg-white/5 border border-white/10 rounded-lg text-white/40"><ChevronLeft className="w-4 h-4" /></button>
            <span className="text-xs text-white/40 font-mono px-1">Page 1</span>
            <button className="p-1.5 bg-white/5 border border-white/10 rounded-lg text-white/40"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>

        <div className="divide-y divide-white/[0.04]">
          {[1,2,3].map((i) => (
            <div key={i} className="p-6 hover:bg-red-400/[0.01] transition-all group cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-3 flex-wrap">
                    <code className="text-sm font-mono font-bold text-white bg-white/5 px-2 py-0.5 rounded border border-white/10">msg_01J8K9P{i}</code>
                    <span className="px-2 py-0.5 rounded-full bg-red-400/10 border border-red-400/20 text-red-400 text-[10px] font-bold uppercase tracking-wider">Delivery Failed</span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-white/40">
                    <span className="font-medium text-blue-400">Origin: payment_gateway</span>
                    <span>12:45:0{i} PM</span>
                    <span className="text-red-400/70 font-bold">5 retries exhausted</span>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 hover:bg-green-500/20 transition-all font-bold text-xs">
                  <RotateCcw className="w-3.5 h-3.5" /> Restore
                </button>
              </div>
              <div className="bg-[#050505] rounded-xl p-4 border border-white/[0.04] group-hover:border-red-400/10 transition-all">
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/[0.03]">
                  <span className="text-[10px] text-white/25 uppercase tracking-widest font-bold">Payload</span>
                </div>
                <pre className="text-[11px] font-mono text-white/55 overflow-x-auto">
                  {`{\n  "event": "PAYMENT_FAILED",\n  "error": "GATEWAY_TIMEOUT",\n  "amount": 450.00,\n  "currency": "USD"\n}`}
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ViewLogs() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const logs = [
    { id: "msg_x9z2k1", t: "12:44:01", m: "PUBLISH", tp: "orders", s: "SUCCESS", d: "2.1ms", q: 1, p: 2, o: 101, ack: true },
    { id: "msg_c4d5n8", t: "12:44:05", m: "ACK", tp: "orders", s: "SUCCESS", d: "0.8ms", q: 1, p: 2, o: 101, ack: true },
    { id: "msg_v8b3m2", t: "12:44:12", m: "CONSUME", tp: "payment", s: "SUCCESS", d: "1.5ms", q: 2, p: 0, o: 452, ack: true },
    { id: "msg_k1l0p9", t: "12:44:18", m: "PUBLISH", tp: "metrics", s: "SUCCESS", d: "3.2ms", q: 0, p: 1, o: 88, ack: false, dlq: true },
  ];
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Message Logs</h1>
        <p className="text-white/40 mt-1">Inspect, filter, and replay all messages across the system.</p>
      </div>
      <div className="glass rounded-2xl border border-white/5 p-4 flex items-center gap-4">
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input readOnly placeholder="Filter by topic..." className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none" />
        </div>
        <div className="flex items-center gap-2 text-white/40 text-xs font-mono px-4 border-l border-white/5">
          <Filter className="w-4 h-4" /> <span>All States</span>
        </div>
      </div>
      <div className="glass rounded-2xl border border-white/5 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.02]">
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-white/40">Status</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-white/40">Message ID</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-white/40">Topic</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-white/40">Partition / Offset</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-white/40 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {logs.map((msg, i) => (
              <React.Fragment key={msg.id}>
                <tr onClick={() => setExpandedId(expandedId === msg.id ? null : msg.id)} className="hover:bg-white/[0.02] transition-colors cursor-pointer">
                  <td className="px-6 py-4">
                    {msg.dlq ? (
                      <span className="flex items-center gap-1.5 text-[10px] font-bold text-red-400 uppercase"><XCircle className="w-3.5 h-3.5" /> DLQ</span>
                    ) : msg.ack ? (
                      <span className="flex items-center gap-1.5 text-[10px] font-bold text-green-400 uppercase"><CheckCircle2 className="w-3.5 h-3.5" /> Acked</span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-[10px] font-bold text-yellow-400 uppercase"><Clock className="w-3.5 h-3.5" /> Pending</span>
                    )}
                  </td>
                  <td className="px-6 py-4"><code className="text-xs text-white/60 font-mono">{msg.id}</code></td>
                  <td className="px-6 py-4"><span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-wider border border-blue-500/10">{msg.tp}</span></td>
                  <td className="px-6 py-4"><span className="text-xs font-mono text-white/60">P{msg.p} / #{msg.o}</span></td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 bg-white/5 border border-white/10 rounded-lg text-white/30"><RotateCcw className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 bg-white/5 border border-white/10 rounded-lg text-white/30"><Code className="w-3.5 h-3.5" /></button>
                    </div>
                  </td>
                </tr>
                {expandedId === msg.id && (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 bg-black/40">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold mb-3">Payload</p>
                          <div className="bg-[#050505] rounded-xl p-4 border border-white/5">
                            <pre className="text-[11px] font-mono text-white/60 overflow-x-auto">{JSON.stringify({ id: msg.id, data: { status: "completed" } }, null, 2)}</pre>
                          </div>
                        </div>
                        <div className="space-y-3 pt-6">
                          {[["Publisher ID", "p_882k"], ["Latency", msg.d], ["QoS", msg.q]].map(([l, v]) => (
                            <div key={l} className="flex justify-between text-xs p-3 bg-white/5 rounded-xl border border-white/5"><span className="text-white/40">{l}</span><span className="text-white/70 font-mono">{v}</span></div>
                          ))}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

function ViewMetrics() {
  const COLORS = ["#3b82f6", "#8b5cf6", "#10b981", "#f59e0b", "#ef4444", "#06b6d4"];
  const topicBars = [
    { topic: "orderCreated", count: 12450 },
    { topic: "payment", count: 8920 },
    { topic: "metrics", count: 45200 },
    { topic: "notif", count: 3200 }
  ].sort((a,b) => b.count - a.count);
  const pieData = [
    { name: "Node-A", value: 45 },
    { name: "Node-B", value: 32 },
    { name: "Node-C", value: 12 }
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Throughput & Metrics</h1>
        <p className="text-white/40 mt-1">Live system performance, queue analytics, and per-topic throughput.</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { l: "Total Msgs / min", v: "45,291", i: Zap, c: "text-yellow-400", b: "bg-yellow-400/10" },
          { l: "Active Topics", v: "12", i: Layers, c: "text-blue-400", b: "bg-blue-400/10" },
          { l: "Subscribers", v: "8", i: Users, c: "text-purple-400", b: "bg-purple-400/10" },
          { l: "DLQ Depth", v: "2", i: Activity, c: "text-red-400", b: "bg-red-400/10" }
        ].map(s => (
          <div key={s.l} className="p-6 glass rounded-2xl border border-white/5 flex items-center gap-4 hover:border-white/10 transition-all">
            <div className={cn(s.b, "p-3 rounded-xl", s.c)}><s.i className="w-6 h-6" /></div>
            <div><p className="text-[10px] uppercase tracking-widest font-bold text-white/40">{s.l}</p><h2 className="text-2xl font-bold text-white">{s.v}</h2></div>
          </div>
        ))}
      </div>
      <div className="glass rounded-2xl border border-white/5 p-6 space-y-6">
        <div className="flex items-center justify-between"><div className="flex items-center gap-2"><TrendingUp className="w-5 h-5 text-blue-400" /><h3 className="font-bold text-white">Live Throughput</h3><span className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-green-400 tracking-widest px-2 py-0.5 rounded-full bg-green-400/10 ml-2">Live</span></div><span className="text-xs text-white/30 font-mono">Rolling 30s window</span></div>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={areaData}>
              <defs><linearGradient id="gM" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35} /><stop offset="95%" stopColor="#3b82f6" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
              <XAxis dataKey="t" axisLine={false} tickLine={false} tick={{ fill: "#ffffff30", fontSize: 11 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#ffffff30", fontSize: 11 }} />
              <Area type="monotone" dataKey="v" stroke="#3b82f6" strokeWidth={2.5} fillOpacity={1} fill="url(#gM)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="glass rounded-2xl border border-white/5 p-6 space-y-6">
          <div className="flex items-center gap-2"><BarChartIcon className="w-5 h-5 text-purple-400" /><h3 className="font-bold text-white">Messages / Topic (last 60s)</h3></div>
          <div className="h-[260px]"><ResponsiveContainer width="100%" height="100%"><BarChart data={topicBars} layout="vertical"><CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" horizontal={false} /><XAxis type="number" hide /><YAxis type="category" dataKey="topic" axisLine={false} tickLine={false} tick={{ fill: "#ffffff60", fontSize: 11 }} width={110} /><Bar dataKey="count" radius={[0, 6, 6, 0]}>{topicBars.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}</Bar></BarChart></ResponsiveContainer></div>
        </div>
        <div className="glass rounded-2xl border border-white/5 p-6 space-y-6">
          <div className="flex items-center gap-2"><Layers className="w-5 h-5 text-green-400" /><h3 className="font-bold text-white">Queue Depth Distribution</h3></div>
          <div className="h-[260px]"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={pieData} innerRadius={65} outerRadius={100} paddingAngle={3} dataKey="value" nameKey="name">{pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}</Pie><Legend formatter={(v) => <span className="text-[10px] text-white/40">{v}</span>}/></PieChart></ResponsiveContainer></div>
        </div>
      </div>
      <div className="glass rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-6 border-b border-white/5"><h3 className="font-bold text-white">Partition Offset Snapshot</h3></div>
        <table className="w-full text-left">
          <thead><tr className="border-b border-white/5 bg-white/[0.02]"><th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-white/40">Queue Key</th><th className="px-6 py-4 text-[10px] uppercase tracking-widest font-bold text-white/40 text-right">Latest Offset</th></tr></thead>
          <tbody className="divide-y divide-white/5">{[ ["orderCreated:P0", 12051], ["payment:P1", 452], ["metrics:P2", 89201] ].map(([k, o]) => (
            <tr key={k as string} className="hover:bg-white/[0.02] transition-colors"><td className="px-6 py-4"><code className="text-sm font-mono text-white/60">{k}</code></td><td className="px-6 py-4 text-right"><span className="text-sm font-mono font-bold text-blue-400">{o}</span></td></tr>
          ))}</tbody>
        </table>
      </div>
    </motion.div>
  );
}

function ViewConsole() {
  const logs = [
    { topic: "orders", payload: { orderId: "ORD-9921", status: "created" } },
    { topic: "payment", payload: { tx: "TX-4421", amount: 250.00 } },
    { topic: "metrics", payload: { cpu: 42, mem: 1024 } }
  ];
  return (
    <div className="h-full flex flex-col gap-4 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <Terminal className="w-8 h-8 text-neon-cyan" />
            Live Console
          </h1>
          <p className="text-white/40 mt-1">Real-time stream of all messages passing through the engine.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white/40 hover:text-white font-bold text-xs"><Pause className="w-3.5 h-3.5" /> Pause</button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white/40 hover:text-white font-bold text-xs"><Trash2 className="w-3.5 h-3.5" /> Clear</button>
        </div>
      </div>

      <div className="flex-1 glass rounded-2xl border border-white/5 flex flex-col overflow-hidden bg-black/40">
        <div className="px-4 py-2 bg-white/5 border-b border-white/5 flex items-center justify-between">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <input type="checkbox" checked readOnly className="w-3 h-3 rounded bg-white/5 border-white/10 text-neon-cyan" />
              <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Auto-Scroll</span>
            </div>
            <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">128 / 200 Entries</span>
          </div>
        </div>
        <div className="flex-1 p-6 overflow-y-auto font-mono text-sm space-y-2">
          {logs.map((log, i) => (
            <div key={i} className="flex items-start gap-4 py-1 border-l-2 border-white/5 pl-4 hover:bg-white/[0.02] transition-colors">
              <span className="text-white/20 shrink-0">12:45:{10+i}</span>
              <span className="shrink-0 font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider bg-blue-500/10 text-blue-400">{log.topic}</span>
              <div className="flex-1 break-all text-white/70">{JSON.stringify(log.payload)}</div>
            </div>
          ))}
          <div className="flex items-start gap-4 py-1 border-l-2 border-amber-500/50 pl-4 bg-amber-500/5">
            <span className="text-white/20 shrink-0">12:46:00</span>
            <span className="shrink-0 font-bold px-2 py-0.5 rounded text-[10px] uppercase tracking-wider bg-amber-500/20 text-amber-400">SYSTEM</span>
            <div className="flex-1 text-white/70">Connected to MSQE Broker cluster. Monitoring real-time traffic...</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ViewSettings() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <Settings className="w-8 h-8 text-neon-cyan" />
            System Settings
          </h1>
          <p className="text-white/40 mt-1">Configure global broker parameters and persistence rules.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-neon-cyan hover:bg-neon-cyan text-black font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)]">
          <Save className="w-4 h-4" /> Save Settings
        </button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-white/60 mb-2">
            <Server className="w-4 h-4" />
            <h2 className="text-xs font-bold uppercase tracking-widest">Broker Engine Configuration</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass rounded-3xl border border-white/5 p-6 space-y-4">
              <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Partitions</label>
              <input type="number" defaultValue="3" className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 focus:outline-none focus:border-neon-cyan/50 transition-all font-mono text-white" />
            </div>
            <div className="glass rounded-3xl border border-white/5 p-6 space-y-4">
              <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Retry Limit</label>
              <input type="number" defaultValue="5" className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 focus:outline-none focus:border-neon-cyan/50 transition-all font-mono text-white" />
            </div>
            <div className="glass rounded-3xl border border-white/5 p-6 space-y-4 md:col-span-2">
              <label className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Dead Letter Queue Topic</label>
              <input type="text" defaultValue="system.dlq.v1" className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 focus:outline-none focus:border-neon-cyan/50 transition-all font-mono text-neon-cyan" />
            </div>
          </div>
        </div>

        <div className="space-y-6 pt-4">
          <div className="flex items-center gap-2 text-red-500/60 mb-2">
            <ShieldAlert className="w-4 h-4" />
            <h2 className="text-xs font-bold uppercase tracking-widest">Danger Zone</h2>
          </div>
          <div className="bg-red-500/[0.02] border border-red-500/10 rounded-3xl p-8 space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03]"><Trash2 className="w-32 h-32 text-red-500" /></div>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
              <div>
                <h3 className="text-xl font-bold text-red-500 flex items-center gap-2"><Trash2 className="w-5 h-5" /> Purge Dead Letter Queue</h3>
                <p className="text-white/40 text-sm mt-1 max-w-md">This will permanently delete all messages currently stored in the Dead Letter Queue. This action cannot be undone.</p>
              </div>
              <button className="px-6 py-3 bg-red-500/10 border border-red-500/20 text-red-500 font-bold rounded-xl hover:bg-red-500 hover:text-black transition-all">Purge All DLQ Messages</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ViewUsers() {
  const users = [
    { u: "Sayyed Adil", r: "Super Admin", s: "Active", l: "2m ago", e: "adil@msqe.io" },
    { u: "service_worker", r: "Operator", s: "Active", l: "1h ago", e: "sw-01@internal" },
    { u: "monitoring_bot", r: "Viewer", s: "Offline", l: "Yesterday", e: "bot@metrics.local" }
  ];
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <Users className="w-8 h-8 text-neon-cyan" />
            User Management
          </h1>
          <p className="text-white/40 mt-1">Manage broker access and role-based permissions.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-neon-cyan hover:bg-neon-cyan text-black font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)]">
          <UserPlus className="w-4 h-4" /> Add User
        </button>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
        <input readOnly placeholder="Search by name, email or role..." className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-white focus:outline-none" />
      </div>

      <div className="glass rounded-3xl border border-white/5 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/[0.02] border-b border-white/5">
              <th className="px-6 py-4 text-[10px] uppercase font-bold text-white/30 tracking-widest">User Details</th>
              <th className="px-6 py-4 text-[10px] uppercase font-bold text-white/30 tracking-widest">Role</th>
              <th className="px-6 py-4 text-[10px] uppercase font-bold text-white/30 tracking-widest">Security Status</th>
              <th className="px-6 py-4 text-[10px] uppercase font-bold text-white/30 tracking-widest">Last Active</th>
              <th className="px-6 py-4 text-[10px] uppercase font-bold text-white/30 tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {users.map((u, idx) => (
              <tr key={idx} className="hover:bg-white/[0.02] transition-colors group cursor-default">
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-cyan/20 to-blue-600/20 border border-neon-cyan/10 flex items-center justify-center font-bold text-neon-cyan text-sm">
                      {u.u[0].toUpperCase()}
                    </div>
                    <div>
                      <p className="font-bold text-white group-hover:text-neon-cyan transition-colors">{u.u}</p>
                      <p className="text-[10px] text-white/20 font-mono">{u.e}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className={cn(
                    "px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border",
                    u.r === "Super Admin" ? "text-red-400 bg-red-400/10 border-red-400/20" : 
                    u.r === "Operator" ? "text-amber-400 bg-amber-400/10 border-amber-400/20" : 
                    "text-neon-cyan bg-neon-cyan/10 border-neon-cyan/20"
                  )}>
                    {u.r}
                  </span>
                </td>
                <td className="px-6 py-5">
                  {u.s === "Active" ? (
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-green-400 text-[10px] font-bold uppercase">Online</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-white/20">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/10" />
                      <span className="text-[10px] font-bold uppercase">Offline</span>
                    </div>
                  )}
                </td>
                <td className="px-6 py-5">
                  <p className="text-[11px] text-white/40 font-mono tracking-tight">{u.l}</p>
                </td>
                <td className="px-6 py-5 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 bg-white/5 border border-white/5 rounded-lg text-white/20 hover:text-neon-cyan hover:border-neon-cyan/50 transition-all">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-2 bg-white/5 border border-white/5 rounded-lg text-white/20 hover:text-red-400 hover:border-red-400/50 transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

function ViewRoles() {
  const roles = [
    { n: "Super Admin", p: ["*"], d: "Full system access", color: "bg-red-500", shadow: "rgba(239, 68, 68, 0.4)" },
    { n: "Publisher", p: ["topics:read", "topics:write"], d: "Publish messages to topics", color: "bg-amber-500", shadow: "rgba(245, 158, 11, 0.4)" },
    { n: "Consumer", p: ["topics:read", "messages:read"], d: "Subscribe and read messages", color: "bg-neon-cyan", shadow: "rgba(6, 182, 212, 0.4)" }
  ];
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-neon-cyan" />
            Role Management
          </h1>
          <p className="text-white/40 mt-1">Configure permission groups for RBAC security.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-neon-cyan hover:bg-neon-cyan text-black font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)]">
          <Plus className="w-4 h-4" /> Create Role
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {roles.map(r => (
          <div key={r.n} className="glass rounded-3xl border border-white/5 p-6 flex flex-col group hover:border-white/10 transition-all">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-neon-cyan transition-colors capitalize">{r.n}</h3>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold text-white/30 uppercase tracking-widest mt-1">
                  <Lock className="w-3 h-3" /> Built-in Role
                </span>
              </div>
              <div className="flex gap-2">
                <button className="p-2 bg-white/5 border border-white/5 rounded-lg text-white/30 hover:text-neon-cyan transition-all">
                  <Edit2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="flex-1 space-y-4 mt-2">
              <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Permissions</p>
              <div className="flex flex-wrap gap-1.5">
                {r.p.includes("*") ? (
                  <span className="px-2 py-0.5 bg-red-400/10 text-red-400 border border-red-400/20 rounded-md text-[10px] font-bold uppercase tracking-wider">Superuser (Full Access)</span>
                ) : (
                  r.p.map(p => (
                    <span key={p} className="px-2 py-0.5 bg-white/5 text-white/60 border border-white/5 rounded-md text-[10px] font-mono">{p}</span>
                  ))
                )}
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">System Role</span>
              <div className={cn("w-2 h-2 rounded-full", r.color)} style={{ boxShadow: `0 0 10px ${r.shadow}` }} />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ViewAbout() {
  const techStack = [
    { name: "Next.js 15", icon: Globe, color: "text-white" },
    { name: "TypeScript", icon: Code2, color: "text-blue-400" },
    { name: "Node.js", icon: Server, color: "text-green-500" },
    { name: "Tailwind CSS", icon: Layers, color: "text-neon-cyan" },
    { name: "Framer Motion", icon: Zap, color: "text-purple-400" },
    { name: "Lucide Icons", icon: Rocket, color: "text-orange-400" },
  ];

  const features = [
    { icon: Zap, title: "Ultra-Fast Brokering", description: "Low-latency message delivery using a high-performance in-memory engine." },
    { icon: Layers, title: "Partitioned Architecture", description: "Support for multi-partitioned topics ensuring high throughput." },
    { icon: Shield, title: "Dead Letter Queues", description: "Automatic isolation of failed messages for manual review." },
    { icon: Radio, title: "WebSocket Native", description: "Real-time communication via WebSockets for both pub/sub." }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-20 pb-20 animate-in fade-in duration-700">
      <section className="text-center space-y-6 pt-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-4">
          <img src="/logo.svg" alt="MSQE Logo" className="w-6 h-6 object-contain" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-neon-cyan">Project MSQE v3.0.0</span>
        </div>
        <h1 className="text-6xl font-bold tracking-tighter text-white">Message Queue <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-blue-600">Events Engine</span></h1>
        <p className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed">A lightweight, high-performance distributed messaging engine designed for modern microservices and real-time data pipelines.</p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Architecture", value: "Distributed", detail: "Multi-Partitioned" },
          { label: "Performance", value: "< 2ms", detail: "Internal Latency" },
          { label: "Protocols", value: "WebSocket / HTTP", detail: "Full Support" },
        ].map((stat) => (
          <div key={stat.label} className="glass p-8 rounded-3xl border border-white/5 text-center group hover:border-white/10 transition-all">
            <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em] mb-2">{stat.label}</p>
            <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-xs text-white/40">{stat.detail}</p>
          </div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-white">Our Mission</h2>
            <p className="text-white/40 leading-relaxed">
              MSQE was born from the need for a message broker that is both simple to deploy and powerful enough to handle enterprise-grade traffic. We've focused on eliminating the complex configuration of traditional brokers while maintaining strict delivery guarantees and real-time visibility.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature, i) => (
              <div key={feature.title} className="space-y-3">
                <div className="relative w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <div className="w-6 h-6 bg-neon-cyan/20 rounded-md flex items-center justify-center font-bold text-neon-cyan text-[10px]">SDK</div>
                </div>
                <h4 className="font-bold text-white text-sm">{feature.title}</h4>
                <p className="text-xs text-white/30 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="glass rounded-3xl border border-white/10 p-2 overflow-hidden aspect-square flex items-center justify-center bg-gradient-to-br from-neon-cyan/10 to-blue-500/10">
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute w-[80%] h-[80%] border border-white/5 rounded-full animate-[spin_10s_linear_infinite]" />
              <div className="absolute w-[60%] h-[60%] border border-white/10 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
              <div className="absolute w-[40%] h-[40%] border border-white/20 rounded-full animate-[spin_20s_linear_infinite]" />
              <div className="z-10 p-10 bg-[#070707] border border-white/10 rounded-3xl shadow-2xl">
                <img src="/logo.svg" alt="MSQE Logo" className="w-16 h-16 object-contain animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="space-y-10">
        <div className="text-center space-y-2"><h2 className="text-2xl font-bold text-white">Built with Modern Tech</h2><p className="text-white/30 text-sm">Engineered using the best tools in the ecosystem.</p></div>
        <div className="flex flex-wrap justify-center gap-4">
          {techStack.map((tech) => (
            <div key={tech.name} className="flex items-center gap-3 px-6 py-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all cursor-default">
              <tech.icon className={cn("w-5 h-5", tech.color)} /><span className="font-bold text-sm text-white/60">{tech.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-10">
        <div className="text-center space-y-2"><h2 className="text-2xl font-bold text-white">Development Team</h2><p className="text-white/30 text-sm">The minds behind the engine.</p></div>
        <div className="flex justify-center">
          <div className="glass p-8 rounded-3xl border border-white/10 flex items-center gap-6 max-w-md group hover:border-neon-cyan/30 transition-all">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-cyan to-blue-600 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-neon-cyan/20">SA</div>
            <div>
              <h3 className="text-xl font-bold text-white group-hover:text-neon-cyan transition-colors">Sayyed Mohammad Adil</h3>
              <p className="text-sm text-white/40 mb-3">Lead Architect & Developer</p>
              <div className="flex gap-3">
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-white/30 uppercase tracking-widest">Full-Stack</span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-white/30 uppercase tracking-widest">DevOps</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="glass rounded-[3rem] p-12 border border-white/10 overflow-hidden relative text-center">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-neon-cyan/5 to-blue-500/5 pointer-events-none" />
        <div className="relative z-10 space-y-6">
          <h2 className="text-3xl font-bold text-white tracking-tight">Ready to scale your infrastructure?</h2>
          <p className="text-white/40 max-w-xl mx-auto">Explore the documentation or start publishing messages right away using our SDKs and real-time dashboard.</p>
          <div className="flex justify-center gap-4 pt-4">
            <button className="px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-white/90 transition-all flex items-center gap-2">Get Started <ArrowRight className="w-4 h-4" /></button>
            <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all">Documentation</button>
          </div>
        </div>
      </section>
    </div>
  );
}
