"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "../ui/SectionHeader";
import { CodeBlock } from "../ui/CodeBlock";
import * as Tabs from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Message {
  topic: string;
  offset: number;
  partition: number;
  payload: string;
  status: "Ack sent" | "Pending";
}

export function DemoSection() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [simStep, setSimStep] = useState(0); // 0: idle, 1: publishing, 2: broker, 3: subscriber

  const codeExamples = {
    publisher: `import { Publisher } from 'msqe-client'

const publisher = new Publisher({
  urls: ['ws://localhost:9091'],
  autoReconnect: true,
})

// QoS 1 — await acknowledgment from broker
const ack = await publisher.send('orderCreated', {
  orderId: 'ORD-001',
  customer: 'Alice',
  amount: 1500,
  currency: 'INR'
}, { qos: 1, routingKey: 'order.india.upi' })

console.log('Acknowledged:', ack)`,
    subscriber: `import { Subscriber, MessageEnvelope } from 'msqe-client'

const sub = new Subscriber({
  urls: ['ws://localhost:9091'],
  topics: ['orderCreated'],
  autoReconnect: true,
  qos: 1,
})

sub.run({
  eachMessage: async (payload: any, env: MessageEnvelope) => {
    console.log('Topic:', env.topic)
    console.log('Offset:', env.offset)
    console.log('Payload:', payload)
    // ack is automatic for qos > 0
  }
})`,
    group: `import { Subscriber } from 'msqe-client'

// 3 workers compete — each message processed ONCE
for (let i = 1; i <= 3; i++) {
  const worker = new Subscriber({
    urls: ['ws://localhost:9091'],
    topics: ['orderCreated'],
    groupId: 'fulfilment-service',
    qos: 1,
  })
  
  worker.run({
    eachMessage: async (payload) => {
      console.log(\`Worker \${i} processing:\`, payload.orderId)
      await processOrder(payload)
    }
  })
}`,
    failover: `import { Publisher } from 'msqe-client'

// Cluster-aware client with automatic leader hunting
const publisher = new Publisher({
  urls: [
    'ws://node-1:9091', // Node A
    'ws://node-2:9091', // Node B
    'ws://node-3:9091', // Node C
  ],
  autoReconnect: true,
  reconnectDelay: 1000
})

publisher.on('ready', () => {
  console.log('Connected to active MSQE leader!')
})

// If the leader dies, the client auto-hunts
// the next available node — zero config needed.`,
  };

  // Live Simulation logic
  useEffect(() => {
    const interval = setInterval(() => {
      // Start simulation flow
      setSimStep(1);
      
      setTimeout(() => setSimStep(2), 600);
      setTimeout(() => setSimStep(3), 1200);
      setTimeout(() => {
        setSimStep(0);
        // Add new message to log
        const topics = ["orderCreated", "metrics", "payment"];
        const randomTopic = topics[Math.floor(Math.random() * topics.length)];
        setMessages((prev) => {
          const newOffset = prev.length > 0 ? prev[0].offset + 1 : 101;
          const newMessage: Message = {
            topic: randomTopic,
            offset: newOffset,
            partition: Math.floor(Math.random() * 4),
            payload: randomTopic === "metrics" ? '{"cpu": 42}' : '{"id": "ORD-' + Math.floor(Math.random() * 900 + 100) + '"}',
            status: "Ack sent",
          };
          return [newMessage, ...prev].slice(0, 5);
        });
      }, 1800);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="demo" className="py-16 sm:py-24 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Live"
          highlight="Demo"
          badge="Interactive"
          subtitle="See MSQE in action — interactive code playground and live visualization"
        />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Column: Code Tabs */}
          <Tabs.Root defaultValue="publisher" className="w-full">
            <Tabs.List className="flex max-w-full gap-2 mb-6 bg-dark-950 p-1.5 rounded-xl border border-white/5 w-full sm:w-fit overflow-x-auto">
              {["publisher", "subscriber", "group", "failover"].map((tab) => (
                <Tabs.Trigger
                  key={tab}
                  value={tab}
                  className={cn(
                    "shrink-0 px-3 sm:px-4 py-2 rounded-lg text-xs font-mono transition-all",
                    "data-[state=active]:bg-neon-cyan data-[state=active]:text-dark-950 data-[state=active]:font-bold",
                    "data-[state=inactive]:text-slate-500 data-[state=inactive]:hover:text-white"
                  )}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </Tabs.Trigger>
              ))}
            </Tabs.List>


              {Object.entries(codeExamples).map(([key, code]) => (
                <Tabs.Content key={key} value={key} asChild>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <CodeBlock code={code} title={key + ".ts"} />
                  </motion.div>
                </Tabs.Content>
              ))}

          </Tabs.Root>

          {/* Right Column: Simulation */}
          <div className="flex flex-col gap-6">
            <div className="bg-dark-800 border border-white/10 rounded-2xl p-4 sm:p-8 relative overflow-hidden min-h-[400px]">
              <div className="absolute top-4 right-4 flex items-center gap-2 px-2 py-1 bg-neon-green/10 border border-neon-green/20 rounded text-[10px] text-neon-green font-mono uppercase tracking-widest font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
                Live Engine
              </div>

              <div className="flex flex-col items-center justify-between h-full py-6">
                {/* Publisher Box */}
                <motion.div
                  className={cn(
                    "w-full max-w-48 p-4 rounded-xl border border-white/10 bg-dark-950 text-center transition-all",
                    simStep === 1 ? "border-neon-cyan shadow-[0_0_20px_rgba(0,245,196,0.2)] bg-neon-cyan/5" : ""
                  )}
                >
                  <div className="text-[10px] text-slate-500 font-mono mb-1">Publisher</div>
                  <div className="text-sm font-bold text-white font-sans">User Service</div>
                </motion.div>

                {/* Flow Arrow */}
                <div className="h-16 w-0.5 bg-dark-700 relative">
                  <AnimatePresence>
                    {simStep === 1 && (
                      <motion.div
                        initial={{ top: "0%" }}
                        animate={{ top: "100%" }}
                        exit={{ opacity: 0 }}
                        className="absolute w-2 h-2 bg-neon-cyan rounded-full -left-[3px] shadow-[0_0_10px_#00f5c4]"
                      />
                    )}
                  </AnimatePresence>
                </div>

                {/* Broker Box */}
                <motion.div
                  className={cn(
                    "w-full max-w-64 p-5 rounded-2xl border border-white/10 bg-dark-950 shadow-xl transition-all",
                    simStep === 2 ? "border-neon-purple shadow-[0_0_20px_rgba(168,85,247,0.2)] bg-neon-purple/5" : ""
                  )}
                >
                  <div className="text-[10px] text-slate-500 font-mono mb-3 text-center uppercase tracking-widest">Broker</div>
                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                    <div className="bg-dark-900 p-2 rounded border border-white/5">
                      <span className="text-slate-500 block mb-1">Partition</span>
                      <span className="text-neon-cyan">P-0</span>
                    </div>
                    <div className="bg-dark-900 p-2 rounded border border-white/5">
                      <span className="text-slate-500 block mb-1">QoS</span>
                      <span className="text-neon-amber">Level 1</span>
                    </div>
                  </div>
                </motion.div>

                {/* Flow Arrow */}
                <div className="h-16 w-0.5 bg-dark-700 relative">
                  <AnimatePresence>
                    {simStep === 2 && (
                      <motion.div
                        initial={{ top: "0%" }}
                        animate={{ top: "100%" }}
                        exit={{ opacity: 0 }}
                        className="absolute w-2 h-2 bg-neon-purple rounded-full -left-[3px] shadow-[0_0_10px_#a855f7]"
                      />
                    )}
                  </AnimatePresence>
                </div>

                {/* Subscriber Box */}
                <motion.div
                  className={cn(
                    "w-full max-w-48 p-4 rounded-xl border border-white/10 bg-dark-950 text-center transition-all",
                    simStep === 3 ? "border-neon-green shadow-[0_0_20px_rgba(34,197,94,0.2)] bg-neon-green/5" : ""
                  )}
                >
                  <div className="text-[10px] text-slate-500 font-mono mb-1">Subscriber</div>
                  <div className="text-sm font-bold text-white font-sans">Payment API</div>
                  {simStep === 3 && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-[9px] text-neon-green font-mono mt-2"
                    >
                      ✓ Delivered & Acked
                    </motion.div>
                  )}
                </motion.div>
              </div>
            </div>

            {/* Message Log */}
            <div className="bg-dark-950 border border-white/10 rounded-2xl overflow-hidden">
              <div className="bg-dark-800 px-4 py-2 border-b border-white/5 text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">
                Live Message Log
              </div>
              <div className="p-2 space-y-1 max-h-[160px] overflow-hidden">
                <AnimatePresence initial={false}>
                  {messages.map((msg, i) => (
                    <motion.div
                      key={msg.offset}
                      initial={{ opacity: 0, x: -10, height: 0 }}
                      animate={{ opacity: 1, x: 0, height: "auto" }}
                      className="flex items-center gap-2 sm:gap-3 px-3 py-2 bg-white/5 rounded-lg border border-white/5"
                    >
                      <span className={cn(
                        "px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-tighter",
                        msg.topic === "orderCreated" ? "bg-neon-cyan/20 text-neon-cyan" :
                        msg.topic === "metrics" ? "bg-neon-amber/20 text-neon-amber" : "bg-neon-purple/20 text-neon-purple"
                      )}>
                        {msg.topic}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">#{msg.offset}</span>
                      <span className="text-[10px] font-mono text-slate-600">P-{msg.partition}</span>
                      <span className="text-[10px] font-mono text-slate-400 truncate flex-grow">{msg.payload}</span>
                      <span className="text-[10px] font-mono text-neon-green flex shrink-0 items-center gap-1">
                        <Check className="w-3 h-3" />
                        Ack
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {messages.length === 0 && (
                  <div className="py-10 text-center text-xs text-slate-600 italic">
                    Waiting for engine to start...
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
