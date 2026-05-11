"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "../ui/SectionHeader";
import { NeonCard } from "../ui/NeonCard";
import { CodeBlock } from "../ui/CodeBlock";
import { cn } from "@/lib/utils";

export function ClusterSection() {
  const scenarios = [
    {
      title: "Follower Goes Down",
      severity: "low" as const,
      timeline: [
        { time: "T0", text: "Node B (follower) crashes" },
        { time: "T1", text: "Leader continues serving — no interruption" },
        { time: "T2", text: "New messages write to Node A (leader) only" },
        { time: "T3", text: "Node B restarts" },
        { time: "T4", text: "Node B calls /internal/sync → gets missed data" },
        { time: "T5", text: "Node B fully synced, back as follower" },
      ],
      result: "0 messages lost · 0 downtime",
      color: "green",
    },
    {
      title: "Leader Goes Down",
      severity: "medium" as const,
      timeline: [
        { time: "T0", text: "Node A (leader ★) crashes" },
        { time: "T1", text: "Followers miss heartbeats (~9 seconds)" },
        { time: "T2", text: "Bully Algorithm election triggered" },
        { time: "T3", text: "Node B (highest ID) becomes leader ★" },
        { time: "T4", text: "Traffic re-routes to Node B" },
        { time: "T5", text: "Node A restarts → joins as follower" },
      ],
      result: "~9s election · 0 messages lost",
      color: "amber",
    },
    {
      title: "Full Restart",
      severity: "high" as const,
      timeline: [
        { time: "T0", text: "All nodes go down (deploy/reboot)" },
        { time: "T1", text: "Nodes start with Split-Brain prevention jitter" },
        { time: "T2", text: "First node pings peers → no response" },
        { time: "T3", text: "Bully Algorithm declares highest ID = leader" },
        { time: "T4", text: "Others join as followers" },
        { time: "T5", text: "Queue rebuilt from append-only logs" },
      ],
      result: "Full recovery · Offset-based replay",
      color: "red",
    },
  ];

  return (
    <section id="cluster" className="py-16 sm:py-24 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Built for"
          highlight="Reliability"
          subtitle="Crash one server. The others don't miss a beat."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12 sm:mb-16">
          {scenarios.map((scenario, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
            >
              <NeonCard glowColor={scenario.color as any} className="h-full flex flex-col">
                <h4 className={cn(
                  "text-xl font-bold font-sans mb-6",
                  scenario.color === "green" ? "text-neon-green" : scenario.color === "amber" ? "text-neon-amber" : "text-neon-red"
                )}>{scenario.title}</h4>
                
                <div className="space-y-4 flex-grow mb-8">
                  {scenario.timeline.map((step, si) => (
                    <div key={si} className="flex gap-4 items-start">
                      <span className="font-mono text-[10px] text-slate-600 mt-1">{step.time}</span>
                      <p className="text-sm text-slate-400 leading-tight">{step.text}</p>
                    </div>
                  ))}
                </div>

                <div className={cn(
                  "mt-auto px-4 py-3 rounded-lg bg-dark-950 border text-[10px] font-mono font-bold text-center uppercase tracking-widest",
                  scenario.color === "green" ? "border-neon-green/20 text-neon-green" : scenario.color === "amber" ? "border-neon-amber/20 text-neon-amber" : "border-neon-red/20 text-neon-red"
                )}>
                  {scenario.result}
                </div>
              </NeonCard>
            </motion.div>
          ))}
        </div>

        {/* Follower Sync Explainer */}
        <div className="p-4 sm:p-8 lg:p-12 rounded-2xl sm:rounded-3xl bg-dark-950 border border-white/10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <h4 className="text-2xl font-bold font-sans mb-6">Quorum Replication & Sync</h4>
            <p className="text-slate-400 leading-relaxed mb-6">
              MSQE guarantees consistency through Quorum Replication. QoS 1 & 2 messages are synchronously replicated to a majority of nodes before confirmation. When a follower rejoins, it syncs its missing monotonic offsets directly from the leader's append-only logs.
            </p>
            <div className="flex gap-4">
              <div className="flex flex-col items-center gap-1">
                <div className="w-8 h-8 rounded-full bg-neon-cyan/20 border border-neon-cyan/30 flex items-center justify-center text-[10px] font-bold text-neon-cyan font-mono">1</div>
                <div className="h-8 w-px bg-dark-700" />
                <div className="w-8 h-8 rounded-full bg-neon-cyan/20 border border-neon-cyan/30 flex items-center justify-center text-[10px] font-bold text-neon-cyan font-mono">2</div>
                <div className="h-8 w-px bg-dark-700" />
                <div className="w-8 h-8 rounded-full bg-neon-cyan/20 border border-neon-cyan/30 flex items-center justify-center text-[10px] font-bold text-neon-cyan font-mono">3</div>
              </div>
              <div className="space-y-6 pt-1">
                <div>
                  <h5 className="text-sm font-bold text-white mb-1">Read Disk</h5>
                  <p className="text-xs text-slate-500">Read last known offset from local .log files.</p>
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white mb-1">Request Delta</h5>
                  <p className="text-xs text-slate-500">Call /internal/sync?fromOffset=N to the leader.</p>
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white mb-1">Append Log</h5>
                  <p className="text-xs text-slate-500">Write received messages to local disk and rejoin.</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <CodeBlock
              title="follower-sync.ts"
              code={`// Follower on restart
const myLastOffset = fileManager.getLastOffset()
// e.g. 49

// Request missing data from leader
const delta = await api.get('/internal/sync', {
  fromOffset: 50,
  limit: 500
})

// Write to local disk
for (const msg of delta) {
  fileManager.append(msg)
}

// ✓ Fully synced`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
