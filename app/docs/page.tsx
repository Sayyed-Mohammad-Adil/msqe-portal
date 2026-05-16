import Link from "next/link";
import { ChevronLeft, Terminal, Server, Code2, ShieldAlert, Cpu, Zap, Activity, Users2, Container, Shield, Settings, GitPullRequest, LayoutDashboard } from "lucide-react";

export default function DocsPage() {
  const sections = [
    { id: "introduction", label: "Introduction" },
    { id: "features", label: "Features" },
    { id: "installation", label: "Installation" },
    { id: "quick-start", label: "Quick Start" },
    { id: "architecture", label: "Architecture" },
    { id: "cluster-support", label: "Cluster Support" },
    { id: "api-reference", label: "API Reference" },
    { id: "comparison", label: "Design Philosophy" },
    { id: "deployment", label: "Docker & Deployment" },
    { id: "security", label: "Security" },
    { id: "roadmap", label: "Roadmap" },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-neon-cyan/30 pt-24">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex items-start gap-12">
        {/* Sidebar Nav */}
        <aside className="hidden lg:block w-64 shrink-0 sticky top-28 h-[calc(100vh-120px)] overflow-y-auto scrollbar-hide border-r border-white/5 pr-6">
          <div className="space-y-8">
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-3">On this page</h4>
              <ul className="space-y-1 text-sm border-l border-white/10 pl-3">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className="block py-1.5 text-white/60 hover:text-neon-cyan transition-colors">
                      {section.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 max-w-4xl space-y-24 pb-32">
          
          {/* Introduction */}
          <section id="introduction" className="scroll-mt-28 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-neon-cyan/10 border border-neon-cyan/20 rounded-full text-[10px] font-bold text-neon-cyan uppercase">MSQE Documentation v3.0.0</div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">MSQE Client Library</h1>
            <p className="text-xl text-white/60 leading-relaxed max-w-2xl">
              High-performance distributed messaging client built for modern Node.js systems.
            </p>
            <div className="flex gap-4">
               <a href="https://www.npmjs.com/package/msqe-client" target="_blank" rel="noopener noreferrer">
                 <img src="https://img.shields.io/npm/v/msqe-client?style=flat-square&color=00f5c4&labelColor=0f1018&label=npm" alt="npm version" className="h-6" />
               </a>
               <img src="https://img.shields.io/badge/TypeScript-Ready-blue.svg?style=flat-square" alt="TypeScript" className="h-6" />
            </div>

            <div className="pt-8">
              <h3 className="text-2xl font-bold text-white mb-4">What is MSQE?</h3>
              <p className="text-lg text-white/60 leading-relaxed mb-6">
                **MSQE (Message Queue Events)** is a distributed messaging and event-streaming platform built entirely with pure Node.js and native Brokers.
              </p>
              <p className="text-lg text-white/60 leading-relaxed mb-6">
                It is designed for modern event-driven systems that require lightweight infrastructure, realtime communication, distributed clustering, and simple deployment workflows.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                <div className="p-5 border border-white/10 rounded-2xl bg-white/5 flex gap-4">
                  <Terminal className="w-6 h-6 text-neon-cyan shrink-0" />
                  <div>
                    <h3 className="font-bold text-white mb-1">Zero Dependencies</h3>
                    <p className="text-xs text-white/40">Pure Node.js implementation without requiring Zookeeper or external databases.</p>
                  </div>
                </div>
                <div className="p-5 border border-white/10 rounded-2xl bg-white/5 flex gap-4">
                  <Server className="w-6 h-6 text-blue-400 shrink-0" />
                  <div>
                    <h3 className="font-bold text-white mb-1">Auto-Clustering</h3>
                    <p className="text-xs text-white/40">Built-in Bully algorithm for automatic leader election and split-brain prevention.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features */}
          <section id="features" className="scroll-mt-28 space-y-8">
            <h2 className="text-3xl font-bold text-white border-b border-white/10 pb-4">Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FeatureCard icon={Zap} title="Lightweight Runtime" items={["Pure Node.js implementation", "Native Broker transport", "Minimal dependencies", "Low memory footprint", "Fast startup time"]} color="text-yellow-400" />
              <FeatureCard icon={Activity} title="Realtime Distributed Messaging" items={["Microservices", "Event-driven systems", "Distributed workers", "Analytics pipelines", "Streaming workloads"]} color="text-purple-400" />
              <FeatureCard icon={Cpu} title="Intelligent Failover" items={["Detects available brokers", "Reconnects during outages", "Automatic failover", "Restores subscriptions"]} color="text-blue-400" />
              <FeatureCard icon={ShieldAlert} title="Reliability Features" items={["Exponential retry backoff", "Offline buffering", "QoS acknowledgements", "Dead letter queue support"]} color="text-red-400" />
            </div>
          </section>

          {/* Installation */}
          <section id="installation" className="scroll-mt-28 space-y-6">
            <h2 className="text-3xl font-bold text-white border-b border-white/10 pb-4">Installation</h2>
            <p className="text-white/60">Requirements: Node.js {`>=`} 18</p>
            
            <CodeBlock title="Terminal">
              {`# npm\nnpm install msqe-client\n\n# yarn\nyarn add msqe-client\n\n# pnpm\npnpm add msqe-client`}
            </CodeBlock>
          </section>

          {/* Quick Start */}
          <section id="quick-start" className="scroll-mt-28 space-y-10">
            <h2 className="text-3xl font-bold text-white border-b border-white/10 pb-4">Quick Start</h2>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2"><Code2 className="w-5 h-5 text-amber-400" /> Producer Example</h3>
              <CodeBlock title="producer.ts">
{`import { Producer } from "msqe-client";

const producer = new Producer({
  urls: [
    "ws://127.0.0.1:9090",
    "ws://127.0.0.1:9091",
    "ws://127.0.0.1:9092"
  ],
  autoReconnect: true,
  reconnectDelay: 1000
});

producer.on("ready", async () => {
  try {
    const response = await producer.send(
      "user.signup",
      { userId: "user_123", email: "hello@example.com" },
      { qos: 1 }
    );
    console.log("Published:", response);
  } catch (error) {
    console.error("Publish failed:", error);
  }
});`}
              </CodeBlock>
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2"><Code2 className="w-5 h-5 text-neon-cyan" /> Subscriber Example</h3>
              <CodeBlock title="subscriber.ts">
{`import { Subscriber, MessageEnvelope } from "msqe-client";

const subscriber = new Subscriber({
  urls: [
    "ws://127.0.0.1:9090",
    "ws://127.0.0.1:9091",
    "ws://127.0.0.1:9092"
  ],
  topics: ["user.signup", "payments.*"],
  groupId: "analytics-service",
  autoReconnect: true
});

subscriber.run({
  eachMessage: async (payload: any, envelope: MessageEnvelope) => {
    console.log("Topic:", envelope.topic);
    console.log("Payload:", payload);
  }
});`}
              </CodeBlock>
            </div>
          </section>

          {/* Architecture */}
          <section id="architecture" className="scroll-mt-28 space-y-6">
            <h2 className="text-3xl font-bold text-white border-b border-white/10 pb-4">Architecture</h2>
            <p className="text-white/60">MSQE uses Broker-based broker communication with distributed node coordination, consumer-group balancing, and partition-aware routing.</p>
            
            <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl flex justify-center text-neon-cyan font-mono text-xs sm:text-sm overflow-x-auto">
              <pre>{`┌────────────┐      ┌─────────────────┐      ┌────────────┐
│ Producer A │─────▶│   MSQE Broker   │◀─────│ Producer B │
└────────────┘      └────────┬────────┘      └────────────┘
                             │
                 ┌───────────┴───────────┐
        ┌────────▼────────┐     ┌────────▼────────┐
        │  Subscriber A   │     │  Subscriber B   │
        └─────────────────┘     └─────────────────┘`}</pre>
            </div>
          </section>

          {/* Cluster Support */}
          <section id="cluster-support" className="scroll-mt-28 space-y-6">
            <h2 className="text-3xl font-bold text-white border-b border-white/10 pb-4">Cluster Support</h2>
            <p className="text-white/60">Passing multiple node URLs enables High-Availability mode.</p>
            <CodeBlock title="cluster.ts">
{`const producer = new Producer({
  urls: [
    "ws://node-1:9090",
    "ws://node-2:9090",
    "ws://node-3:9090"
  ]
});`}
            </CodeBlock>
            <ul className="grid grid-cols-2 gap-4 mt-6">
               {[ "Multi-node clustering", "Automatic failover", "Distributed partitions", "Consumer balancing", "Replication workflows", "Stateful recovery" ].map(item => (
                 <li key={item} className="flex items-center gap-2 text-white/70 bg-white/5 px-4 py-2 rounded-lg border border-white/5">
                   <div className="w-1.5 h-1.5 rounded-full bg-neon-cyan" /> {item}
                 </li>
               ))}
            </ul>
          </section>

          {/* API Reference */}
          <section id="api-reference" className="scroll-mt-28 space-y-10">
            <h2 className="text-3xl font-bold text-white border-b border-white/10 pb-4">API Reference</h2>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white text-neon-cyan">Producer</h3>
              <CodeBlock title="Signature">
{`new Producer({ url?, urls?, autoReconnect?, reconnectDelay? });
await producer.send(topic, payload, options);
producer.publish(topic, payload);
producer.disconnect();`}
              </CodeBlock>
              <div className="overflow-hidden border border-white/10 rounded-xl">
                <table className="w-full text-left bg-white/5 text-sm">
                  <thead className="bg-white/5 border-b border-white/10"><tr className="text-white/40 uppercase tracking-widest"><th className="p-4 font-bold">Method</th><th className="p-4 font-bold">Description</th></tr></thead>
                  <tbody className="divide-y divide-white/5">
                    <tr><td className="p-4 font-mono text-neon-cyan">send()</td><td className="p-4 text-white/70">Acknowledged publish</td></tr>
                    <tr><td className="p-4 font-mono text-neon-cyan">publish()</td><td className="p-4 text-white/70">Fire-and-forget publish</td></tr>
                    <tr><td className="p-4 font-mono text-neon-cyan">disconnect()</td><td className="p-4 text-white/70">Graceful shutdown</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white text-blue-400">Subscriber</h3>
              <CodeBlock title="Signature">
{`new Subscriber({ topics, groupId?, qos?, autoReconnect? });
subscriber.run({ eachMessage: async (payload, envelope) => {} });
subscriber.requestReplay();
subscriber.disconnect();`}
              </CodeBlock>
              <div className="overflow-hidden border border-white/10 rounded-xl">
                <table className="w-full text-left bg-white/5 text-sm">
                  <thead className="bg-white/5 border-b border-white/10"><tr className="text-white/40 uppercase tracking-widest"><th className="p-4 font-bold">Method</th><th className="p-4 font-bold">Description</th></tr></thead>
                  <tbody className="divide-y divide-white/5">
                    <tr><td className="p-4 font-mono text-blue-400">run()</td><td className="p-4 text-white/70">Start consuming messages</td></tr>
                    <tr><td className="p-4 font-mono text-blue-400">requestReplay()</td><td className="p-4 text-white/70">Request historical events</td></tr>
                    <tr><td className="p-4 font-mono text-blue-400">disconnect()</td><td className="p-4 text-white/70">Graceful shutdown</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Comparison */}
          <section id="comparison" className="scroll-mt-28 space-y-6">
            <h2 className="text-3xl font-bold text-white border-b border-white/10 pb-4">Design Philosophy Comparison</h2>
            <div className="overflow-x-auto border border-white/10 rounded-xl">
              <table className="w-full text-left bg-white/5 text-sm whitespace-nowrap">
                <thead className="bg-white/5 border-b border-white/10">
                  <tr className="text-white/40 uppercase tracking-widest">
                    <th className="p-4 font-bold">Capability</th><th className="p-4 font-bold text-neon-cyan">MSQE</th><th className="p-4 font-bold">RabbitMQ</th><th className="p-4 font-bold">Kafka</th><th className="p-4 font-bold">MQTT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr><td className="p-4 text-white/70">Pure Node.js Runtime</td><td className="p-4">✅</td><td className="p-4">❌</td><td className="p-4">❌</td><td className="p-4">❌</td></tr>
                  <tr><td className="p-4 text-white/70">Native Broker Comm.</td><td className="p-4">✅</td><td className="p-4">❌</td><td className="p-4">❌</td><td className="p-4">⚠️</td></tr>
                  <tr><td className="p-4 text-white/70">Lightweight Deployment</td><td className="p-4">✅</td><td className="p-4">⚠️</td><td className="p-4">❌</td><td className="p-4">✅</td></tr>
                  <tr><td className="p-4 text-white/70">Distributed Clustering</td><td className="p-4">✅</td><td className="p-4">✅</td><td className="p-4">✅</td><td className="p-4">⚠️</td></tr>
                  <tr><td className="p-4 text-white/70">Replayable Events</td><td className="p-4">✅</td><td className="p-4">⚠️</td><td className="p-4">✅</td><td className="p-4">❌</td></tr>
                  <tr><td className="p-4 text-white/70">Consumer Groups</td><td className="p-4">✅</td><td className="p-4">✅</td><td className="p-4">✅</td><td className="p-4">❌</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Docker & Deployment */}
          <section id="deployment" className="scroll-mt-28 space-y-6">
            <h2 className="text-3xl font-bold text-white border-b border-white/10 pb-4">Docker & Deployment</h2>
            <CodeBlock title="Terminal">{`docker compose up -d`}</CodeBlock>
            <p className="text-white/60">Supports multi-node orchestration, Docker Swarm, and Kubernetes deployments.</p>
          </section>

          {/* Security */}
          <section id="security" className="scroll-mt-28 space-y-6">
            <h2 className="text-3xl font-bold text-white border-b border-white/10 pb-4">Security</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 border border-white/10 rounded-xl bg-white/5 flex items-center gap-3">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-white/80 font-medium">Token-based authentication</span>
              </div>
              <div className="p-4 border border-white/10 rounded-xl bg-white/5 flex items-center gap-3">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-white/80 font-medium">Topic access control</span>
              </div>
              <div className="p-4 border border-white/10 rounded-xl bg-white/5 flex items-center gap-3">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-white/80 font-medium">Secure Broker (WSS)</span>
              </div>
              <div className="p-4 border border-white/10 rounded-xl bg-white/5 flex items-center gap-3">
                <Shield className="w-5 h-5 text-green-400" />
                <span className="text-white/80 font-medium">Cluster-level permissions</span>
              </div>
            </div>
          </section>

          {/* Roadmap */}
          <section id="roadmap" className="scroll-mt-28 space-y-6">
            <h2 className="text-3xl font-bold text-white border-b border-white/10 pb-4">Roadmap</h2>
            <p className="text-white/60">Upcoming features and milestones for MSQE.</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                "Kubernetes Operator",
                "Persistent distributed storage",
                "Multi-region replication",
                "Stream processing engine",
                "Admin CLI",
                "GraphQL subscriptions",
                "WebAssembly filters",
                "Edge federation"
              ].map(item => (
                <div key={item} className="p-4 border border-white/10 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-neon-cyan shrink-0" />
                  <span className="text-sm text-white/80">{item}</span>
                </div>
              ))}
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, items, color }: any) {
  return (
    <div className="p-6 border border-white/10 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
      <Icon className={`w-6 h-6 mb-4 ${color}`} />
      <h3 className="font-bold text-white mb-4 text-lg">{title}</h3>
      <ul className="space-y-2">
        {items.map((item: string, i: number) => (
          <li key={i} className="text-sm text-white/60 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" /> {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function CodeBlock({ title, children }: any) {
  return (
    <div className="bg-[#0a0a0a] border border-white/10 rounded-xl overflow-hidden">
      <div className="px-4 py-2 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
        <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">{title}</span>
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        </div>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm font-mono text-white/70 leading-relaxed whitespace-pre">
          {children}
        </pre>
      </div>
    </div>
  );
}
