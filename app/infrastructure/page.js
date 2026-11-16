'use client'

import { motion } from 'framer-motion'
import { useCommand } from '@/components/CommandContext'
import {
  RiServerLine,
  RiPulseLine,
  RiCpuLine,
  RiDatabase2Line,
  RiRefreshLine,
  RiCheckboxCircleFill,
  RiErrorWarningFill,
} from 'react-icons/ri'

export default function InfrastructureNodesPage() {
  const { regions, rerouteRegionTraffic } = useCommand()

  const totalRps = regions.reduce((sum, r) => sum + r.rps, 0)
  const avgLatency = Math.round(
    regions.reduce((sum, r) => sum + r.latencyMs, 0) / regions.length
  )

  return (
    <div className="space-y-6">
      {/* Top Cluster Summary */}
      <div className="cmd-panel rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-blue-400">
            MODULE 04 • SOVEREIGN BARE-METAL & CLOUD TELEMETRY
          </span>
          <h2 className="text-2xl font-extrabold text-white mt-1">
            Global 6-Region Cluster Health & P99 Latency Matrix
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Inspect real-time Kubernetes node pools, memory pressure, and trigger automated BGP failover across degraded edges.
          </p>
        </div>

        <div className="flex items-center gap-4 font-mono">
          <div className="px-4 py-2.5 rounded-xl bg-[#0D1116] border border-[#1E2633]">
            <span className="text-[10px] text-slate-400 block">GLOBAL THROUGHPUT</span>
            <span className="text-lg font-bold text-emerald-400 tabular-nums">
              {totalRps.toLocaleString('en-US')} RPS
            </span>
          </div>
          <div className="px-4 py-2.5 rounded-xl bg-[#0D1116] border border-[#1E2633]">
            <span className="text-[10px] text-slate-400 block">MEAN P99 LATENCY</span>
            <span className="text-lg font-bold text-blue-400 tabular-nums">
              {avgLatency} ms
            </span>
          </div>
        </div>
      </div>

      {/* 6 Regional Cluster Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regions.map((reg, idx) => {
          const isOperational = reg.status === 'Operational'
          return (
            <motion.div
              key={reg.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.05 }}
              className={`cmd-panel rounded-2xl p-6 flex flex-col justify-between ${
                !isOperational ? 'border-amber-500/50' : ''
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-xs font-mono font-bold text-blue-400">
                      {reg.code}
                    </span>
                    <h3 className="text-base font-bold text-white mt-0.5">{reg.name}</h3>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-bold ${
                      isOperational
                        ? 'bg-emerald-500/15 text-emerald-400'
                        : 'bg-amber-500/15 text-amber-400'
                    }`}
                  >
                    {isOperational ? <RiCheckboxCircleFill /> : <RiErrorWarningFill />}
                    {reg.status}
                  </span>
                </div>

                {/* Metrics Grid */}
                <div className="mt-5 grid grid-cols-3 gap-2.5 font-mono text-xs">
                  <div className="p-2.5 rounded-xl bg-[#0D1116] border border-[#1B222D]">
                    <span className="text-[10px] text-slate-500 block">P99 LATENCY</span>
                    <span
                      className={`font-bold text-sm ${
                        reg.latencyMs > 40 ? 'text-amber-400' : 'text-emerald-400'
                      }`}
                    >
                      {reg.latencyMs} ms
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#0D1116] border border-[#1B222D]">
                    <span className="text-[10px] text-slate-500 block">THROUGHPUT</span>
                    <span className="font-bold text-sm text-white">
                      {(reg.rps / 1000).toFixed(1)}k/s
                    </span>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#0D1116] border border-[#1B222D]">
                    <span className="text-[10px] text-slate-500 block">SLA UPTIME</span>
                    <span className="font-bold text-sm text-slate-200">{reg.uptime}</span>
                  </div>
                </div>

                {/* CPU & Memory Utilization Bars */}
                <div className="mt-5 space-y-3 font-mono text-xs">
                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-400 flex items-center gap-1">
                        <RiCpuLine /> CPU Compute Load ({reg.activeNodes} Nodes)
                      </span>
                      <span className="text-white font-bold">{reg.cpuLoad}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          reg.cpuLoad > 75 ? 'bg-amber-400' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${reg.cpuLoad}%` }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-slate-400 flex items-center gap-1">
                        <RiDatabase2Line /> NVMe & RAM Allocation
                      </span>
                      <span className="text-white font-bold">{reg.memLoad}%</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full transition-all duration-500"
                        style={{ width: `${reg.memLoad}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="mt-6 pt-4 border-t border-[#1D2430] flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1">
                  <RiServerLine /> BGP Anycast Active
                </span>
                <button
                  onClick={() => rerouteRegionTraffic(reg.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                    isOperational
                      ? 'bg-[#181F2A] hover:bg-[#232D3D] text-slate-300 border border-[#263142]'
                      : 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                  }`}
                >
                  <RiRefreshLine />
                  {isOperational ? 'Simulate Load Spike' : 'Rebalance & Heal Node'}
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
