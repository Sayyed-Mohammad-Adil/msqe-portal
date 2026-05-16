"use client";

import { motion, AnimatePresence } from "framer-motion";
import { SectionHeader } from "../ui/SectionHeader";
import { CodeBlock } from "../ui/CodeBlock";
import * as Tabs from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Server, Terminal, Monitor, Layout, ArrowRight, Container } from "lucide-react";

export function InstallSection() {
  const [dockerMode, setDockerMode] = useState<'single'|'compose'>('single');
  return (
    <section id="install" className="py-16 sm:py-24 bg-dark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Get Running in"
          highlight="60 Seconds"
          subtitle="Three deployment modes. Same binary. Only .env changes."
        />

        <Tabs.Root defaultValue="single" className="w-full">
          <Tabs.List className="flex max-w-full gap-2 mb-8 sm:mb-12 bg-dark-900 p-1.5 rounded-2xl border border-white/5 w-full sm:w-fit mx-auto overflow-x-auto">
            <Tabs.Trigger
              value="single"
              className={cn(
                "flex shrink-0 items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-mono transition-all",
                "data-[state=active]:bg-neon-cyan data-[state=active]:text-dark-950 data-[state=active]:font-bold shadow-lg shadow-neon-cyan/10",
                "data-[state=inactive]:text-slate-500 data-[state=inactive]:hover:text-white"
              )}
            >
              <Monitor className="w-4 h-4" />
              Single Node
            </Tabs.Trigger>
            <Tabs.Trigger
              value="pm2"
              className={cn(
                "flex shrink-0 items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-mono transition-all",
                "data-[state=active]:bg-neon-purple data-[state=active]:text-dark-950 data-[state=active]:font-bold shadow-lg shadow-neon-purple/10",
                "data-[state=inactive]:text-slate-500 data-[state=inactive]:hover:text-white"
              )}
            >
              <Terminal className="w-4 h-4" />
              Multi-Node (PM2)
            </Tabs.Trigger>
            <Tabs.Trigger
              value="cluster"
              className={cn(
                "flex shrink-0 items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-mono transition-all",
                "data-[state=active]:bg-neon-amber data-[state=active]:text-dark-950 data-[state=active]:font-bold shadow-lg shadow-neon-amber/10",
                "data-[state=inactive]:text-slate-500 data-[state=inactive]:hover:text-white"
              )}
            >
              <Server className="w-4 h-4" />
              Full Cluster
            </Tabs.Trigger>
            <Tabs.Trigger
              value="docker"
              id="trigger-docker"
              className={cn(
                "flex shrink-0 items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-mono transition-all",
                "data-[state=active]:bg-neon-blue data-[state=active]:text-white data-[state=active]:font-bold shadow-lg shadow-neon-blue/10",
                "data-[state=inactive]:text-slate-500 data-[state=inactive]:hover:text-white"
              )}
            >
              <Container className="w-4 h-4" />
              Docker
            </Tabs.Trigger>
          </Tabs.List>


            <Tabs.Content key="single" value="single" asChild>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid md:grid-cols-2 gap-8 lg:gap-12"
              >
                <div className="space-y-10">
                  <Step
                    num={1}
                    title="Clone & Install"
                    desc="Clone the repo and install all dependencies with one command."
                    code={`git clone https://github.com/Sayyed-Mohammad-Adil/msqe-enterprise\ncd msqe-enterprise\nnpm run install:all`}
                    color="cyan"
                  />
                  <Step
                    num={2}
                    title="Start Everything"
                    desc="One command starts both the broker and the dashboard UI."
                    code={`npm run dev`}
                    color="cyan"
                  />
                  <div className="p-6 rounded-2xl bg-dark-900 border border-white/5 space-y-4">
                    <div className="flex items-center gap-3">
                      <Layout className="w-5 h-5 text-neon-cyan" />
                      <h4 className="font-bold font-sans">Setup Wizard</h4>
                    </div>
                    <p className="text-sm text-slate-400">
                      Open <span className="text-white font-mono">localhost:3030</span> in your browser. A guided setup wizard will appear on first launch.
                    </p>
                    {/* Visual mockup of the wizard */}
                    <div className="bg-dark-950 rounded-lg border border-white/10 p-4 font-mono text-[10px] space-y-2">
                      <div className="flex justify-between border-b border-white/5 pb-1">
                        <span className="text-slate-600">MSQE Setup ●●○○</span>
                        <span className="text-slate-600">Step 1 of 4</span>
                      </div>
                      <div className="py-2 space-y-3">
                        <div className="text-white">Create Admin Account</div>
                        <div className="flex gap-2">
                          <span className="text-slate-500">Username:</span>
                          <span className="bg-white/5 px-1 border-b border-white/10 flex-grow">admin</span>
                        </div>
                        <div className="flex gap-2">
                          <span className="text-slate-500">Password:</span>
                          <span className="bg-white/5 px-1 border-b border-white/10 flex-grow">••••••••</span>
                        </div>
                      </div>
                      <div className="flex justify-center gap-4 pt-2">
                        <span className="text-slate-700">[ Back ]</span>
                        <span className="text-neon-cyan">[ Next ]</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="p-6 rounded-2xl bg-dark-900 border border-white/5">
                    <h4 className="font-bold font-sans mb-4">Port Reference</h4>
                    <div className="overflow-hidden rounded-lg border border-white/5">
                      <table className="w-full text-xs font-mono">
                        <thead className="bg-dark-950 text-slate-500 uppercase tracking-widest">
                          <tr>
                            <th className="px-4 py-3 text-left">Service</th>
                            <th className="px-4 py-3 text-left">Port</th>
                            <th className="px-4 py-3 text-left">Proto</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          <tr>
                            <td className="px-4 py-3 text-white">Dashboard</td>
                            <td className="px-4 py-3 text-neon-cyan">3030</td>
                            <td className="px-4 py-3 text-slate-500">HTTP</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-white">Admin API</td>
                            <td className="px-4 py-3 text-neon-cyan">8081</td>
                            <td className="px-4 py-3 text-slate-500">REST</td>
                          </tr>
                          <tr>
                            <td className="px-4 py-3 text-white">Broker</td>
                            <td className="px-4 py-3 text-neon-cyan">9091</td>
                            <td className="px-4 py-3 text-slate-500">WS</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <Step
                    num={4}
                    title="Publish Your First Event"
                    desc="Install the client and send your first event using the Promise-based API."
                    code={`npm install msqe-client\n\nimport { Publisher } from 'msqe-client'\nconst publisher = new Publisher({ urls: ['ws://localhost:9091'] })\nawait publisher.send('hello', { msg: 'It works!' })`}
                    color="cyan"
                  />
                </div>
              </motion.div>
            </Tabs.Content>

            <Tabs.Content key="pm2" value="pm2" asChild>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-12"
              >
                <div className="max-w-3xl mx-auto text-center space-y-4">
                  <h3 className="text-2xl font-bold font-sans">Multi-Node on 1 Machine</h3>
                  <p className="text-slate-400 text-sm">
                    Run 3 MSQE nodes on one machine. PM2 manages each as a separate process. One crash → others continue.
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <Step
                      num={1}
                      title="Install PM2 & Build"
                      desc="Install PM2 globally and compile the project."
                      code={`npm install -g pm2\ncd msqe && npm run build`}
                      color="purple"
                    />
                    <CodeBlock 
                      title="ecosystem.config.js"
                      code={`module.exports = {
  apps: [{
    name: 'msqe-node-1',
    cwd: './backend',
    script: 'dist/index.js',
    env: {
      MSQE_NODE_ID: 'node-1',
      MSQE_WS_PORT: '9091',
      MSQE_ADMIN_PORT: '8081',
      MSQE_CLUSTER_PEERS: 'http://localhost:8082,http://localhost:8083',
      MSQE_LOG_DIR: './logs/node-1',
    },
    autorestart: true
  },
  // Repeat for node-2 (9091) and node-3 (9092)
  ]
}`} />
                  </div>

                  <div className="space-y-6">
                    <div className="p-8 rounded-3xl bg-dark-900 border border-white/10 space-y-6">
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                        <div className="w-24 h-24 rounded-2xl border-2 border-neon-purple flex flex-col items-center justify-center bg-neon-purple/5 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                          <span className="text-xs font-mono text-neon-purple mb-1">node-1 ★</span>
                          <span className="text-[10px] text-white/50">Leader</span>
                        </div>
                        <ArrowRight className="text-slate-700 rotate-90 sm:rotate-0" />
                        <div className="w-24 h-24 rounded-2xl border-2 border-white/10 flex flex-col items-center justify-center bg-white/5 opacity-50">
                          <span className="text-xs font-mono text-white mb-1">node-2</span>
                          <span className="text-[10px] text-white/30">Follower</span>
                        </div>
                        <ArrowRight className="text-slate-700 rotate-90 sm:rotate-0" />
                        <div className="w-24 h-24 rounded-2xl border-2 border-white/10 flex flex-col items-center justify-center bg-white/5 opacity-50">
                          <span className="text-xs font-mono text-white mb-1">node-3</span>
                          <span className="text-[10px] text-white/30">Follower</span>
                        </div>
                      </div>
                      <div className="p-4 bg-dark-950 rounded-xl border border-white/5 font-mono text-[11px] space-y-2">
                        <div className="text-slate-500">$ pm2 stop msqe-node-1</div>
                        <div className="text-neon-amber">→ node-2 becomes leader in ~9s</div>
                        <div className="text-neon-green">→ traffic continues uninterrupted</div>
                      </div>
                    </div>
                    <Step
                      num={3}
                      title="Start & Manage"
                      desc="Start all nodes and monitor health."
                      code={`pm2 start ecosystem.config.js\npm2 status\npm2 logs`}
                      color="purple"
                    />
                  </div>
                </div>
              </motion.div>
            </Tabs.Content>

            <Tabs.Content key="cluster" value="cluster" asChild>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-12"
              >
                <div className="max-w-3xl mx-auto text-center space-y-4">
                  <h3 className="text-2xl font-bold font-sans">Multi-Server Cluster</h3>
                  <p className="text-slate-400 text-sm">
                    3 physical servers. Same npm start command on each. Only MSQE_CLUSTER_PEERS differs.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <EnvCard node="node-a" url="192.168.1.10" peers="1.11, 1.12" />
                  <EnvCard node="node-b" url="192.168.1.11" peers="1.10, 1.12" />
                  <EnvCard node="node-c" url="192.168.1.12" peers="1.10, 1.11" />
                </div>

                <div className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-dark-900 border border-white/10 grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  <div className="space-y-6">
                    <h4 className="text-xl font-bold font-sans">Quorum Reliability</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      MSQE uses a quorum-based replication strategy. A message is only acknowledged once it has been replicated to a majority of nodes.
                    </p>
                    <div className="overflow-hidden rounded-xl border border-white/5">
                      <table className="w-full text-xs font-mono">
                        <thead className="bg-dark-950 text-slate-500 uppercase tracking-widest">
                          <tr>
                            <th className="px-4 py-3 text-left">Nodes</th>
                            <th className="px-4 py-3 text-left">Survive</th>
                            <th className="px-4 py-3 text-left">Quorum</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          <tr><td className="px-4 py-3">3</td><td className="px-4 py-3 text-neon-green">1 fail</td><td className="px-4 py-3">2</td></tr>
                          <tr><td className="px-4 py-3">5</td><td className="px-4 py-3 text-neon-green">2 fail</td><td className="px-4 py-3">3</td></tr>
                          <tr><td className="px-4 py-3">7</td><td className="px-4 py-3 text-neon-green">3 fail</td><td className="px-4 py-3">4</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-dark-950 p-6 rounded-2xl border border-neon-amber/20">
                      <h5 className="text-neon-amber font-bold text-sm mb-2">Scale-up Note</h5>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        Adding a 4th node? Just start it with MSQE_CLUSTER_PEERS pointing to existing nodes. It automatically discovers the leader, syncs all missing data, and joins. No restart needed on existing nodes.
                      </p>
                    </div>
                    <div className="p-6 rounded-2xl bg-dark-950 border border-white/5 font-mono text-[11px] text-neon-cyan">
                      npm run build && npm run start
                    </div>
                  </div>
                </div>
              </motion.div>
            </Tabs.Content>
            <Tabs.Content key="docker" value="docker" asChild>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-8"
              >
                {/* Intro */}
                <div className="p-4 sm:p-8 rounded-2xl sm:rounded-3xl bg-dark-900 border border-neon-blue/20">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <p className="text-slate-300 text-sm leading-relaxed max-w-2xl">
                      Run MSQE in Docker — single container for development, 
                      multi-container with Docker Compose for production clusters.
                      Same configuration, containerized.
                    </p>
                    <div className="flex bg-dark-950 p-1 rounded-xl border border-white/5 shrink-0 w-full sm:w-auto">
                      <button 
                        onClick={() => setDockerMode('single')}
                        className={cn(
                          "px-4 py-2 rounded-lg text-xs font-mono transition-all",
                          dockerMode === 'single' ? "bg-neon-blue text-white font-bold" : "text-slate-500 hover:text-white"
                        )}
                      >
                        🐳 Single
                      </button>
                      <button 
                        onClick={() => setDockerMode('compose')}
                        className={cn(
                          "px-4 py-2 rounded-lg text-xs font-mono transition-all",
                          dockerMode === 'compose' ? "bg-neon-blue text-white font-bold" : "text-slate-500 hover:text-white"
                        )}
                      >
                        🐙 Compose
                      </button>
                    </div>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {dockerMode === 'single' ? (
                    <motion.div
                      key="single"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="grid md:grid-cols-2 gap-12"
                    >
                      <div className="space-y-10">
                        <Step
                          num={1}
                          title="Dockerfile"
                          desc="Create a basic Dockerfile to containerize the MSQE engine."
                          code={`FROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --only=production\nCOPY dist/ ./dist/\nRUN mkdir -p logs data\nEXPOSE 9091 8081\nCMD ["node", "dist/index.js"]`}
                          color="cyan"
                        />
                        <Step
                          num={2}
                          title="Build & Run"
                          desc="Build the image and launch a single-node container."
                          code={`# Build image\ndocker build -t msqe:latest ./backend\n\n# Run single node\ndocker run -d \\\n  --name msqe \\\n  -p 9091:9091 \\\n  -p 8081:8081 \\\n  -v msqe-logs:/app/logs \\\n  -v msqe-data:/app/data \\\n  -e MSQE_NODE_ID=node-1 \\\n  -e MSQE_LOG_DIR=/app/logs \\\n  -e MSQE_DATA_FILE=/app/data/msqe-data.json \\\n  msqe:latest`}
                          color="cyan"
                        />
                      </div>
                      <div className="space-y-8">
                        <div className="p-6 rounded-2xl bg-dark-900 border border-white/5 space-y-4">
                          <div className="flex items-center gap-3">
                            <Layout className="w-5 h-5 text-neon-blue" />
                            <h4 className="font-bold font-sans">Open Dashboard</h4>
                          </div>
                          <p className="text-sm text-slate-400">
                            Open <span className="text-white font-mono">localhost:3030</span> — setup wizard appears on first launch.
                          </p>
                          <div className="bg-dark-950 rounded-lg border border-white/10 p-4 font-mono text-[10px] space-y-2">
                            <div className="flex justify-between border-b border-white/5 pb-1">
                              <span className="text-slate-600">MSQE Setup ●●○○</span>
                              <span className="text-slate-600">Step 1 of 4</span>
                            </div>
                            <div className="py-2 space-y-3">
                              <div className="text-white">Create Admin Account</div>
                              <div className="flex gap-2">
                                <span className="text-slate-500">Username:</span>
                                <span className="bg-white/5 px-1 border-b border-white/10 flex-grow">admin</span>
                              </div>
                              <div className="flex gap-2">
                                <span className="text-slate-500">Password:</span>
                                <span className="bg-white/5 px-1 border-b border-white/10 flex-grow">••••••••</span>
                              </div>
                            </div>
                            <div className="flex justify-center gap-4 pt-2">
                              <span className="text-slate-700">[ Back ]</span>
                              <span className="text-neon-blue">[ Next ]</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="compose"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-12"
                    >
                      <div className="grid lg:grid-cols-2 gap-12">
                        <div className="space-y-6">
                          <Step
                            num={1}
                            title="docker-compose.yml"
                            desc="Define a 3-node high-availability cluster with a shared UI."
                            code={`version: "3.9"\n\nservices:\n  msqe-node-1:\n    build: ./backend\n    container_name: msqe-node-1\n    environment:\n      MSQE_NODE_ID: node-1\n      MSQE_WS_PORT: "9091"\n      MSQE_ADMIN_PORT: "8081"\n      MSQE_PUBLIC_URL: http://msqe-node-1:8081\n      MSQE_CLUSTER_PEERS: http://msqe-node-2:8081,http://msqe-node-3:8081\n      MSQE_CLUSTER_SECRET: your_32char_secret_minimum\n    ports:\n      - "9091:9091"\n      - "8081:8081"\n    volumes:\n      - msqe-logs-1:/app/logs\n      - msqe-data:/app/data\n    networks: [msqe-net]\n\n  msqe-node-2:\n    build: ./backend\n    container_name: msqe-node-2\n    environment:\n      MSQE_NODE_ID: node-2\n      MSQE_WS_PORT: "9091"\n      MSQE_ADMIN_PORT: "8082"\n      MSQE_PUBLIC_URL: http://msqe-node-2:8081\n      MSQE_CLUSTER_PEERS: http://msqe-node-1:8081,http://msqe-node-3:8081\n      MSQE_CLUSTER_SECRET: your_32char_secret_minimum\n    ports:\n      - "9091:9091"\n      - "8082:8082"\n    volumes:\n      - msqe-logs-2:/app/logs\n      - msqe-data:/app/data\n    networks: [msqe-net]\n\n  msqe-ui:\n    build: ./msqe-ui\n    ports:\n      - "3030:3030"\n    networks: [msqe-net]\n\nnetworks:\n  msqe-net:\n    driver: bridge\n\nvolumes:\n  msqe-logs-1:\n  msqe-logs-2:\n  msqe-data:`}
                            color="purple"
                          />
                        </div>
                        <div className="space-y-8">
                          <div className="p-8 rounded-[2rem] bg-dark-900 border border-white/5 relative overflow-hidden">
                            <div className="absolute top-4 left-6 text-[10px] font-mono text-slate-600 uppercase tracking-widest">Network Topology</div>
                            <div className="grid grid-cols-2 gap-4 mt-8">
                              <div className="p-4 rounded-2xl bg-dark-950 border border-neon-blue/30 text-center relative group">
                                <div className="text-[10px] text-neon-blue font-bold mb-1 flex items-center justify-center gap-1">★ Leader</div>
                                <div className="text-xs font-mono text-white">node-1</div>
                                <div className="text-[9px] text-slate-600 mt-1">:9091 / :8081</div>
                              </div>
                              <div className="p-4 rounded-2xl bg-dark-950 border border-white/10 text-center opacity-60">
                                <div className="text-[10px] text-slate-500 mb-1">Follower</div>
                                <div className="text-xs font-mono text-white">node-2</div>
                                <div className="text-[9px] text-slate-600 mt-1">:9091 / :8082</div>
                              </div>
                              <div className="p-4 rounded-2xl bg-dark-950 border border-white/10 text-center opacity-60">
                                <div className="text-[10px] text-slate-500 mb-1">Follower</div>
                                <div className="text-xs font-mono text-white">node-3</div>
                                <div className="text-[9px] text-slate-600 mt-1">:9092 / :8083</div>
                              </div>
                              <div className="p-4 rounded-2xl bg-dark-950 border border-white/10 text-center border-dashed">
                                <div className="text-[10px] text-slate-500 mb-1">UI</div>
                                <div className="text-xs font-mono text-white">Dashboard</div>
                                <div className="text-[9px] text-slate-600 mt-1">:3030</div>
                              </div>
                            </div>
                            <div className="mt-8 p-4 bg-neon-amber/5 border border-neon-amber/20 rounded-xl">
                              <p className="text-[10px] text-neon-amber leading-relaxed font-mono">
                                <span className="font-bold">NOTE:</span> msqe-data volume is SHARED across all nodes for config persistence. Logs are per-node.
                              </p>
                            </div>
                          </div>
                          <Step
                            num={2}
                            title="Start Cluster"
                            desc="Launch the HA stack with one command."
                            code={`docker compose up -d\n\n# Verify health\ndocker compose ps\ndocker compose logs -f msqe-node-1`}
                            color="purple"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </Tabs.Content>

        </Tabs.Root>
      </div>
    </section>
  );
}

function Step({ num, title, desc, code, color }: { num: number; title: string; desc: string; code: string; color: "cyan" | "purple" }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className={cn(
          "w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-bold font-mono",
          color === "cyan" ? "bg-neon-cyan text-dark-950 shadow-[0_0_10px_rgba(0,245,196,0.3)]" : "bg-neon-purple text-dark-950 shadow-[0_0_10px_rgba(168,85,247,0.3)]"
        )}>
          {num}
        </div>
        <h4 className="font-bold font-sans text-white">{title}</h4>
      </div>
      <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
      <CodeBlock code={code} />
    </div>
  );
}

function EnvCard({ node, url, peers }: { node: string; url: string; peers: string }) {
  return (
    <div className="p-6 rounded-2xl bg-dark-900 border border-white/10 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono font-bold text-white">{node}</span>
        <span className="text-[10px] font-mono text-slate-500">.env</span>
      </div>
      <div className="space-y-1 font-mono text-[10px] text-slate-400 overflow-hidden">
        <div>MSQE_NODE_ID={node}</div>
        <div>MSQE_PUBLIC_URL=http://{url}:8081</div>
        <div className="text-neon-cyan truncate">MSQE_CLUSTER_PEERS={peers}</div>
        <div>MSQE_SECRET=shared_secret_32char</div>
      </div>
    </div>
  );
}
