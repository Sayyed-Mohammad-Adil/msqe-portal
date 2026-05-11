"use client";

import React, { useState } from "react";
import { SectionHeader } from "../ui/SectionHeader";
import {
  Check,
  X,
  Minus,
  ChevronDown,
  ChevronUp,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type ColumnKey = "msqe" | "redis" | "rabbitmq" | "kafka" | "mqtt";

export function CompareSection() {
  const [activeColumn, setActiveColumn] = useState<ColumnKey>("msqe");

  const columns = [
    {
      key: "msqe",
      label: "MSQE",
      glow: "shadow-[0_0_40px_rgba(0,255,255,0.18)]",
      border: "border-neon-cyan/40",
      bg: "bg-neon-cyan/[0.08]",
      text: "text-neon-cyan",
    },
    {
      key: "redis",
      label: "Redis Streams",
      glow: "shadow-[0_0_30px_rgba(255,0,0,0.12)]",
      border: "border-neon-red/30",
      bg: "bg-neon-red/[0.06]",
      text: "text-neon-red",
    },
    {
      key: "rabbitmq",
      label: "RabbitMQ",
      glow: "shadow-[0_0_30px_rgba(255,170,0,0.12)]",
      border: "border-neon-amber/30",
      bg: "bg-neon-amber/[0.06]",
      text: "text-neon-amber",
    },
    {
      key: "kafka",
      label: "Kafka",
      glow: "shadow-[0_0_30px_rgba(168,85,247,0.12)]",
      border: "border-neon-purple/30",
      bg: "bg-neon-purple/[0.06]",
      text: "text-neon-purple",
    },
    {
      key: "mqtt",
      label: "MQTT",
      glow: "shadow-[0_0_30px_rgba(59,130,246,0.12)]",
      border: "border-blue-400/30",
      bg: "bg-blue-400/[0.06]",
      text: "text-blue-400",
    },
  ];

  const groups = [
    {
      name: "⚙ Infrastructure & Setup",
      rows: [
        {
          feature: "Setup time",
          msqe: "< 2 min",
          redis: "10-20 min",
          rabbitmq: "15-30 min",
          kafka: "1-4 hrs",
          mqtt: "5-10 min",
        },
        {
          feature: "Infrastructure",
          msqe: "Node.js only",
          redis: "Redis server",
          rabbitmq: "Erlang + Broker",
          kafka: "JVM Cluster",
          mqtt: "Broker required",
        },
        {
          feature: "Memory footprint",
          msqe: "~30 MB",
          redis: "~100 MB",
          rabbitmq: "~150 MB",
          kafka: ">1 GB",
          mqtt: "~50 MB",
        },
        {
          feature: "Docker support",
          msqe: true,
          redis: true,
          rabbitmq: true,
          kafka: true,
          mqtt: true,
        },
      ],
    },

    {
      name: "📨 Messaging Features",
      rows: [
        {
          feature: "Topic partitions",
          msqe: true,
          redis: false,
          rabbitmq: false,
          kafka: true,
          mqtt: false,
        },
        {
          feature: "Wildcard routing",
          msqe: true,
          redis: false,
          rabbitmq: true,
          kafka: false,
          mqtt: true,
        },
        {
          feature: "QoS delivery",
          msqe: true,
          redis: false,
          rabbitmq: true,
          kafka: false,
          mqtt: true,
        },
        {
          feature: "Consumer groups",
          msqe: true,
          redis: true,
          rabbitmq: true,
          kafka: true,
          mqtt: false,
        },
        {
          feature: "Dead letter queue",
          msqe: true,
          redis: "partial",
          rabbitmq: true,
          kafka: "partial",
          mqtt: false,
        },
        {
          feature: "Replay support",
          msqe: true,
          redis: false,
          rabbitmq: false,
          kafka: true,
          mqtt: false,
        },
      ],
    },

    {
      name: "🔒 Reliability & Security",
      rows: [
        {
          feature: "High availability",
          msqe: true,
          redis: true,
          rabbitmq: true,
          kafka: true,
          mqtt: false,
        },
        {
          feature: "Leader election",
          msqe: true,
          redis: "partial",
          rabbitmq: false,
          kafka: true,
          mqtt: false,
        },
        {
          feature: "Persistence",
          msqe: true,
          redis: true,
          rabbitmq: true,
          kafka: true,
          mqtt: false,
        },
        {
          feature: "Dashboard",
          msqe: true,
          redis: false,
          rabbitmq: true,
          kafka: false,
          mqtt: false,
        },
        {
          feature: "RBAC/Auth",
          msqe: true,
          redis: false,
          rabbitmq: true,
          kafka: "partial",
          mqtt: false,
        },
        {
          feature: "TypeScript DX",
          msqe: true,
          redis: "partial",
          rabbitmq: "partial",
          kafka: false,
          mqtt: true,
        },
      ],
    },
  ];

  const renderValue = (
    value: any,
    isPrimary: boolean,
    colorClass: string
  ) => {
    if (value === true) {
      return (
        <Check
          className={cn(
            "w-5 h-5 mx-auto",
            isPrimary ? "text-neon-cyan" : colorClass
          )}
        />
      );
    }

    if (value === false) {
      return <X className="w-5 h-5 mx-auto text-red-500/40" />;
    }

    if (value === "partial") {
      return (
        <div className="group relative flex justify-center">
          <Minus className="w-5 h-5 text-yellow-400" />

          <div className="absolute hidden group-hover:block bottom-full mb-3 w-40 p-3 rounded-xl bg-[#111827] border border-white/10 text-[10px] text-slate-300 z-50">
            Requires plugins or extra configuration.
          </div>
        </div>
      );
    }

    return (
      <span
        className={cn(
          "text-[11px] font-semibold tracking-wide",
          isPrimary ? "text-neon-cyan" : "text-slate-300"
        )}
      >
        {value}
      </span>
    );
  };

  const getColumnStyle = (key: ColumnKey) => {
    const column = columns.find((c) => c.key === key);

    if (activeColumn !== key) {
      return "bg-transparent border-transparent";
    }

    return `${column?.bg} ${column?.border} ${column?.glow}`;
  };

  return (
    <section
      id="compare"
      className="relative py-16 sm:py-28 bg-[#060816] overflow-hidden"
    >
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-cyan-500/10 blur-[180px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="MSQE vs"
          highlight="Messaging Systems"
          subtitle="Built for realtime distributed systems without enterprise-level infrastructure complexity."
        />

        {/* Column Selector */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-10">
          {columns.map((col) => (
            <button
              key={col.key}
              onClick={() => setActiveColumn(col.key as ColumnKey)}
              className={cn(
                "px-3 sm:px-5 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl border transition-all duration-300 backdrop-blur-xl",
                "hover:scale-105",
                activeColumn === col.key
                  ? `${col.bg} ${col.border} ${col.glow}`
                  : "bg-white/[0.03] border-white/10"
              )}
            >
              <span
                className={cn(
                  "text-sm font-semibold",
                  activeColumn === col.key ? col.text : "text-slate-400"
                )}
              >
                {col.label}
              </span>
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="rounded-2xl sm:rounded-[2rem] overflow-hidden border border-white/10 bg-white/[0.03] backdrop-blur-xl">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] lg:min-w-[950px] border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="px-8 py-6 text-left text-[11px] uppercase tracking-[0.2em] text-slate-500 font-bold">
                    Feature
                  </th>

                  {columns.map((col) => (
                    <th
                      key={col.key}
                      className={cn(
                        "px-4 lg:px-8 py-5 lg:py-6 text-center transition-all duration-300 border-x",
                        getColumnStyle(col.key as ColumnKey)
                      )}
                    >
                      <button
                        onClick={() =>
                          setActiveColumn(col.key as ColumnKey)
                        }
                        className="flex items-center justify-center gap-2 mx-auto"
                      >
                        <span
                          className={cn(
                            "font-bold text-sm",
                            activeColumn === col.key
                              ? col.text
                              : "text-slate-400"
                          )}
                        >
                          {col.label}
                        </span>

                        {activeColumn === col.key ? (
                          <ChevronUp
                            className={cn("w-4 h-4", col.text)}
                          />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-500" />
                        )}
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {groups.map((group, groupIndex) => (
                  <React.Fragment key={groupIndex}>
                    <tr className="bg-white/[0.02]">
                      <td
                        colSpan={6}
                        className="px-4 lg:px-8 py-4 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.25em] text-slate-500 font-bold"
                      >
                        {group.name}
                      </td>
                    </tr>

                    {group.rows.map((row, rowIndex) => (
                      <motion.tr
                        key={rowIndex}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="border-t border-white/[0.04] hover:bg-white/[0.02] transition-all duration-300"
                      >
                        <td className="px-4 lg:px-8 py-5 text-sm text-slate-300 font-medium">
                          {row.feature}
                        </td>

                        {columns.map((col) => (
                          <td
                            key={col.key}
                            className={cn(
                              "px-4 lg:px-8 py-5 text-center border-x transition-all duration-300",
                              getColumnStyle(col.key as ColumnKey)
                            )}
                          >
                            <AnimatePresence mode="wait">
                              <motion.div
                                key={String(row[col.key as keyof typeof row])}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.15 }}
                              >
                                {renderValue(
                                  row[col.key as keyof typeof row],
                                  col.key === "msqe",
                                  col.text
                                )}
                              </motion.div>
                            </AnimatePresence>
                          </td>
                        ))}
                      </motion.tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-10 sm:mt-14">
          <motion.div
            whileHover={{ y: -6 }}
            className="p-5 sm:p-8 rounded-2xl sm:rounded-[2rem] border border-cyan-400/20 bg-cyan-400/[0.04] backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-neon-cyan" />
              <h3 className="text-lg font-bold text-white">
                Best Fit for MSQE
              </h3>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              Realtime APIs, distributed Node.js services, internal
              event buses, multiplayer infra, IoT systems and lightweight
              microservice orchestration.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -6 }}
            className="p-5 sm:p-8 rounded-2xl sm:rounded-[2rem] border border-yellow-400/20 bg-yellow-400/[0.04] backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-neon-amber" />
              <h3 className="text-lg font-bold text-white">
                When RabbitMQ Wins
              </h3>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              Enterprise queue pipelines, mature AMQP workflows and
              traditional broker-based architectures.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -6 }}
            className="p-5 sm:p-8 rounded-2xl sm:rounded-[2rem] border border-purple-400/20 bg-purple-400/[0.04] backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="w-5 h-5 text-neon-purple" />
              <h3 className="text-lg font-bold text-white">
                When Kafka Wins
              </h3>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              Massive-scale event streaming with multi-terabyte retention,
              analytics pipelines and platform engineering teams.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 
