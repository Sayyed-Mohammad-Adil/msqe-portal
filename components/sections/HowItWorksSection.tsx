"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "../ui/SectionHeader";
import { NeonCard } from "../ui/NeonCard";

export function HowItWorksSection() {
  const steps = [
    {
      step: 1,
      title: "Publish",
      body: "Publisher connects via WebSocket to port 9090. Sends typed payload with topic, routingKey, QoS.",
    },
    {
      step: 2,
      title: "Route & Partition",
      body: "Broker hashes routingKey → partition number. Assigns monotonic offset. Persists to append-only log.",
    },
    {
      step: 3,
      title: "Replicate",
      body: "In cluster mode: leader replicates to quorum of followers before ack. Quorum = ⌊N/2⌋+1.",
    },
    {
      step: 4,
      title: "Deliver & Ack",
      body: "Subscriber receives message. Sends ack within ackTimeout. On timeout: retry then → DLQ.",
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-dark-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="How MSQE"
          highlight="Works"
          subtitle="Publisher sends → Broker partitions, persists, replicates → Subscriber consumes & acks"
        />

        {/* Interactive Flow Diagram */}
        <div className="relative mb-16 sm:mb-24 p-4 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl bg-dark-900 border border-white/10 overflow-x-auto">
          <div className="min-w-[720px] sm:min-w-[800px] h-[300px] relative flex items-center justify-between px-6 sm:px-10">
            {/* Arrows SVG Layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
              <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00f5c4" stopOpacity="0" />
                  <stop offset="50%" stopColor="#00f5c4" stopOpacity="1" />
                  <stop offset="100%" stopColor="#00f5c4" stopOpacity="0" />
                </linearGradient>
              </defs>
              
              {/* Path from Publisher to Broker */}
              <path
                d="M 120 150 L 320 150"
                stroke="rgba(0, 245, 196, 0.2)"
                strokeWidth="2"
                fill="none"
              />
              <motion.path
                d="M 120 150 L 320 150"
                stroke="url(#grad1)"
                strokeWidth="3"
                fill="none"
                initial={{ strokeDasharray: "10 50", strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: -60 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />

              {/* Path from Broker to Group A */}
              <path
                d="M 480 150 L 680 80"
                stroke="rgba(168, 85, 247, 0.2)"
                strokeWidth="2"
                fill="none"
              />
              <motion.path
                d="M 480 150 L 680 80"
                stroke="#a855f7"
                strokeWidth="2"
                fill="none"
                initial={{ strokeDasharray: "5 20", strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: -25 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />

              {/* Path from Broker to Group B */}
              <path
                d="M 480 150 L 680 220"
                stroke="rgba(245, 158, 11, 0.2)"
                strokeWidth="2"
                fill="none"
              />
              <motion.path
                d="M 480 150 L 680 220"
                stroke="#f59e0b"
                strokeWidth="2"
                fill="none"
                initial={{ strokeDasharray: "5 20", strokeDashoffset: 0 }}
                animate={{ strokeDashoffset: -25 }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              />
            </svg>

            {/* Publisher */}
            <div className="z-10 bg-dark-800 border border-neon-cyan/50 p-6 rounded-2xl w-40 text-center shadow-[0_0_20px_rgba(0,245,196,0.1)]">
              <div className="text-neon-cyan font-mono text-xs uppercase tracking-widest font-bold mb-2">Publisher</div>
              <div className="text-[10px] text-slate-500 font-mono">Node.js / WS</div>
            </div>

            {/* Broker */}
            <div className="z-10 bg-dark-800 border border-white/20 p-8 rounded-3xl w-64 text-center shadow-2xl">
              <div className="text-white font-mono text-xs uppercase tracking-widest font-bold mb-4">MSQE Broker</div>
              <div className="space-y-2">
                <div className="bg-dark-950 p-2 rounded-lg text-[10px] text-neon-cyan font-mono border border-white/5">Topic: orders</div>
                <div className="bg-dark-950 p-2 rounded-lg text-[10px] text-neon-purple font-mono border border-white/5">Partition: 0,1,2,3</div>
                <div className="bg-dark-950 p-2 rounded-lg text-[10px] text-neon-amber font-mono border border-white/5">Persistence: logs/</div>
              </div>
            </div>

            {/* Subscribers */}
            <div className="z-10 flex flex-col gap-12">
              <div className="bg-dark-800 border border-neon-purple/50 p-6 rounded-2xl w-40 text-center shadow-[0_0_20px_rgba(168,85,247,0.1)]">
                <div className="text-neon-purple font-mono text-xs uppercase tracking-widest font-bold mb-2">Group A</div>
                <div className="text-[10px] text-slate-500 font-mono">Competing</div>
              </div>
              <div className="bg-dark-800 border border-neon-amber/50 p-6 rounded-2xl w-40 text-center shadow-[0_0_20px_rgba(245,158,11,0.1)]">
                <div className="text-neon-amber font-mono text-xs uppercase tracking-widest font-bold mb-2">Group B</div>
                <div className="text-[10px] text-slate-500 font-mono">Wildcard</div>
              </div>
            </div>
          </div>
        </div>

        {/* Process Steps Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: step.step * 0.1 }}
            >
              <div className="relative p-6 rounded-2xl bg-dark-900 border border-white/10 h-full">
                <div className="absolute -top-4 -left-4 w-10 h-10 rounded-xl bg-neon-cyan text-dark-950 font-bold flex items-center justify-center font-mono">
                  {step.step}
                </div>
                <h4 className="text-xl font-bold font-sans mt-2 mb-4">{step.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {step.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
