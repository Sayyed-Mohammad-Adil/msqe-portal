"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "../ui/SectionHeader";
import { NeonCard } from "../ui/NeonCard";
import { Grid, GitBranch, ShieldCheck, Users, AlertTriangle, Server } from "lucide-react";
import { CodeBlock } from "../ui/CodeBlock";

export function FeaturesSection() {
  const features = [
    {
      title: "Topic Partitions",
      body: "Messages hash to consistent partitions via routing key. Same key = same partition = strict ordering guaranteed.",
      icon: Grid,
      color: "cyan" as const,
      code: `// Always partition 2 for "user.india.*"
await publisher.send('orders', data, {
  routingKey: 'user.india.upi',
  qos: 1
})`,
    },
    {
      title: "Wildcard Routing",
      body: "RabbitMQ-style topic routing. * matches one word, # matches zero or more words in the routing key.",
      icon: GitBranch,
      color: "purple" as const,
      code: `const sub = new Subscriber({
  urls: ['ws://localhost:9091'],
  topics: ['order.india.#']
  // Matches: order.india.upi
  //          order.india.card.visa
})`,
    },
    {
      title: "3 QoS Levels",
      body: "Choose delivery guarantee per message. Fire-and-forget for metrics, exactly-once for payments.",
      icon: ShieldCheck,
      color: "amber" as const,
      code: `// qos 0: fire & forget
publisher.publish('metrics', cpu, { qos: 0 })
// qos 1: at-least-once
await publisher.send('orders',  data, { qos: 1 })
// qos 2: exactly-once
await publisher.send('payment', data, { qos: 2 })`,
    },
    {
      title: "Consumer Groups",
      body: "Competing consumers with load balancing. Only ONE subscriber in a group receives each message — guaranteed.",
      icon: Users,
      color: "blue" as const,
      code: `// 3 workers - each order processed once
['w1','w2','w3'].forEach(() => {
  const sub = new Subscriber({
    topics: ['orders'],
    groupId: 'fulfilment'
  })
})`,
    },
    {
      title: "Dead Letter Queue",
      body: "Failed messages auto-move to DLQ after N retries. One-click retry from dashboard or via REST API.",
      icon: AlertTriangle,
      color: "red" as const,
      code: `Settings.configure({
  retryLimit: 3,
  ackTimeout: 5000,    // 5s per attempt
  dlqTopic: '__dlq__'  // auto-routing
})`,
    },
    {
      title: "Client-Side Failover",
      body: "Pass an array of URLs. The client automatically hunts for the active leader and handles offline buffering during reconnects.",
      icon: Server,
      color: "green" as const,
      code: `const pub = new Publisher({
  urls: [
    'ws://node-1:9091',
    'ws://node-2:9091'
  ],
  autoReconnect: true
})`,
    },
  ];

  return (
    <section id="features" className="py-16 sm:py-24 bg-dark-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Enterprise messaging."
          highlight="Zero complexity."
          subtitle="No JVM. No ZooKeeper. No Docker required. Just npm install."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <NeonCard glowColor={feature.color} className="h-full flex flex-col">
                <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-4">
                  <div className={`p-2 rounded-lg bg-dark-950 border border-white/5`}>
                    <feature.icon className={`w-5 h-5 text-neon-${feature.color}`} />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold font-sans">{feature.title}</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                  {feature.body}
                </p>
                <div className="mt-auto">
                  <CodeBlock code={feature.code} copyable={false} />
                </div>
              </NeonCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
