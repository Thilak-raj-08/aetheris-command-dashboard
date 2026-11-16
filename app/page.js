'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useCommand } from '@/components/CommandContext'
import {
  RiArrowRightUpLine,
  RiArrowRightDownLine,
  RiExchangeDollarLine,
  RiShip2Line,
  RiServerLine,
  RiShieldCheckLine,
  RiRadarLine,
  RiTimeLine,
  RiArrowRightLine,
} from 'react-icons/ri'

export default function CommandOverviewPage() {
  const {
    cashflow,
    transactions,
    shipments,
    regions,
    formatMoney,
    netTreasuryUsd,
    totalInflowUsd,
    totalOutflowUsd,
  } = useCommand()

  const [selectedMonth, setSelectedMonth] = useState(cashflow[cashflow.length - 1])

  const activeShipments = shipments.filter((s) => s.status !== 'Delivered').length
  const avgLatency = Math.round(
    regions.reduce((acc, r) => acc + r.latencyMs, 0) / regions.length
  )

  const maxInflow = Math.max(...cashflow.map((m) => m.inflow))

  return (
    <div className="space-y-6">
      {/* Top Executive NOC Banner with Custom Photography */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="relative rounded-2xl overflow-hidden border border-[#232B38] bg-[#12161B]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                GLOBAL OPERATIONS & TREASURY COMMAND
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Real-Time Sovereign Liquidity, Fleet Telemetry & Cloud SLA.
              </h2>
              <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-2xl leading-relaxed">
                Unified institutional cockpit monitoring cross-border SWIFT gpi settlements,
                maritime container corridors, and 6-region bare-metal cloud clusters in real time.
              </p>
            </div>

            <div className="mt-6 pt-5 border-t border-[#1F2733] flex flex-wrap items-center gap-3">
              <Link
                href="/revenue"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all"
              >
                <RiExchangeDollarLine className="text-base" />
                Open Treasury Ledger
              </Link>
              <Link
                href="/logistics"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#19202B] hover:bg-[#222B3A] text-white border border-[#2A3446] font-semibold text-xs transition-all"
              >
                <RiShip2Line className="text-base text-amber-400" />
                Inspect Cargo Fleet ({shipments.length})
              </Link>
              <Link
                href="/infrastructure"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#19202B] hover:bg-[#222B3A] text-white border border-[#2A3446] font-semibold text-xs transition-all"
              >
                <RiServerLine className="text-base text-blue-400" />
                Region Telemetry ({avgLatency}ms avg)
              </Link>
            </div>
          </div>

          {/* Right Photorealistic NOC Command Center Photo */}
          <div className="lg:col-span-5 relative min-h-[240px] lg:min-h-full overflow-hidden border-t lg:border-t-0 lg:border-l border-[#232B38]">
            <img
              src="/images/datacenter-noc.jpg"
              alt="Aetheris Global Network Operations Command Center"
              className="w-full h-full object-cover object-center brightness-90 hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10] via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#0B0D10]/85 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300 flex items-center gap-1.5">
                <RiRadarLine className="text-emerald-400" /> ZURICH NOC FLOOR 04
              </span>
              <span className="text-emerald-400 font-bold">108,090 RPS</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 4 Primary Institutional KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          {
            label: 'NET TREASURY LIQUIDITY',
            value: formatMoney(netTreasuryUsd, true),
            sub: formatMoney(netTreasuryUsd),
            delta: '+14.2%',
            positive: true,
            accent: 'text-emerald-400',
            href: '/revenue',
          },
          {
            label: 'SETTLED INFLOW (WINDOW)',
            value: formatMoney(totalInflowUsd, true),
            sub: `${transactions.filter((t) => t.type === 'Inflow').length} Institutional Wires`,
            delta: '+8.7%',
            positive: true,
            accent: 'text-blue-400',
            href: '/revenue',
          },
          {
            label: 'ACTIVE MARITIME & AIR CARGO',
            value: `${activeShipments} Corridors`,
            sub: '90 TEU + 6 Air Pallets Tracked',
            delta: '98.4% On-Time',
            positive: true,
            accent: 'text-amber-400',
            href: '/logistics',
          },
          {
            label: 'GLOBAL P99 EDGE LATENCY',
            value: `${avgLatency} ms`,
            sub: '6 Sovereign Cloud Clusters',
            delta: '-3.1ms faster',
            positive: true,
            accent: 'text-emerald-400',
            href: '/infrastructure',
          },
        ].map((kpi, idx) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: idx * 0.06 }}
            className="cmd-panel rounded-2xl p-5 flex flex-col justify-between hover:border-emerald-500/40 transition-colors"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
                {kpi.label}
              </span>
              <span className="inline-flex items-center gap-0.5 text-xs font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400">
                <RiArrowRightUpLine />
                {kpi.delta}
              </span>
            </div>
            <div className="my-3">
              <p className={`text-2xl sm:text-3xl font-mono font-extrabold tabular-nums ${kpi.accent}`}>
                {kpi.value}
              </p>
              <p className="text-xs font-mono text-slate-400 mt-1 tabular-nums">{kpi.sub}</p>
            </div>
            <Link
              href={kpi.href}
              className="text-[11px] font-mono text-slate-400 hover:text-white flex items-center justify-between pt-2.5 border-t border-[#1C232E]"
            >
              <span>Inspect Module</span>
              <RiArrowRightLine />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Middle Row: Interactive Cashflow Telemetry Chart (7 cols) + Selected Month Inspector (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 cmd-panel rounded-2xl p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#1D2430]">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400">
                TREASURY CASHFLOW VELOCITY
              </span>
              <h3 className="text-lg font-bold text-white mt-0.5">
                6-Month Inflow vs. Outflow Clearing Volume
              </h3>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500" /> Gross Inflow
              </span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2.5 h-2.5 rounded-sm bg-slate-600" /> Operating Outflow
              </span>
            </div>
          </div>

          {/* Interactive Dual Bar Telemetry Chart */}
          <div className="mt-6 grid grid-cols-6 gap-3 sm:gap-5 items-end h-60 pt-6 px-2">
            {cashflow.map((m) => {
              const inflowHeight = Math.round((m.inflow / maxInflow) * 100)
              const outflowHeight = Math.round((m.outflow / maxInflow) * 100)
              const isSelected = selectedMonth.month === m.month
              return (
                <button
                  key={m.month}
                  onClick={() => setSelectedMonth(m)}
                  className={`group flex flex-col items-center h-full justify-end rounded-xl p-2 transition-all ${
                    isSelected
                      ? 'bg-emerald-500/10 border border-emerald-500/35'
                      : 'hover:bg-white/[0.03] border border-transparent'
                  }`}
                >
                  <div className="w-full flex items-end justify-center gap-1.5 h-44">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${inflowHeight}%` }}
                      transition={{ duration: 0.6 }}
                      className="w-3 sm:w-5 rounded-t-md bg-gradient-to-t from-emerald-600 to-emerald-400 group-hover:brightness-110"
                      title={`Inflow: ${formatMoney(m.inflow, true)}`}
                    />
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${outflowHeight}%` }}
                      transition={{ duration: 0.6, delay: 0.08 }}
                      className="w-3 sm:w-5 rounded-t-md bg-slate-700 group-hover:bg-slate-600"
                      title={`Outflow: ${formatMoney(m.outflow, true)}`}
                    />
                  </div>
                  <span
                    className={`mt-2.5 text-xs font-mono font-bold ${
                      isSelected ? 'text-emerald-400' : 'text-slate-400'
                    }`}
                  >
                    {m.month}
                  </span>
                </button>
              )
            })}
          </div>
          <p className="text-[11px] font-mono text-slate-400 mt-3 text-center">
            Click any monthly bar column above to inspect detailed clearing metrics on the right →
          </p>
        </div>

        {/* Right: Selected Month Breakdown & Quick Node Matrix */}
        <div className="lg:col-span-4 cmd-panel rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-[#1D2430]">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400">
                  PERIOD INSPECTOR
                </span>
                <h3 className="text-lg font-bold text-white">
                  {selectedMonth.month} 2026 Audit Summary
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500/15 text-emerald-400 font-mono text-xs font-bold">
                {selectedMonth.orders} Wires
              </span>
            </div>

            <div className="mt-5 space-y-3.5 font-mono">
              <div className="p-3.5 rounded-xl bg-[#0E1217] border border-[#1C222C] flex items-center justify-between">
                <span className="text-xs text-slate-400">Gross Settled Inflow</span>
                <span className="text-sm font-bold text-emerald-400 tabular-nums">
                  {formatMoney(selectedMonth.inflow)}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#0E1217] border border-[#1C222C] flex items-center justify-between">
                <span className="text-xs text-slate-400">Operating Outflow</span>
                <span className="text-sm font-bold text-rose-400 tabular-nums">
                  -{formatMoney(selectedMonth.outflow)}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between">
                <span className="text-xs text-emerald-300 font-semibold">Net Retained Surplus</span>
                <span className="text-base font-extrabold text-white tabular-nums">
                  {formatMoney(selectedMonth.net)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#1D2430]">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
              <span className="font-mono">ISO-20022 AUDIT STATUS</span>
              <span className="text-emerald-400 font-mono flex items-center gap-1">
                <RiShieldCheckLine /> Verified
              </span>
            </div>
            <Link
              href="/revenue"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#1A212D] hover:bg-[#232C3C] text-white text-xs font-semibold transition-colors"
            >
              View Full Wire Ledger <RiArrowRightLine />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Row: Recent SWIFT Settlements (7 cols) & Active Freight Watchlist (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 cmd-panel rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400">
                LIVE SETTLEMENT STREAM
              </span>
              <h3 className="text-base font-bold text-white">Recent Institutional Transfers</h3>
            </div>
            <Link
              href="/revenue"
              className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1"
            >
              All ({transactions.length}) <RiArrowRightLine />
            </Link>
          </div>

          <div className="space-y-2.5">
            {transactions.slice(0, 4).map((txn) => (
              <div
                key={txn.id}
                className="p-3.5 rounded-xl bg-[#0E1217] border border-[#1B222C] flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center font-mono text-sm font-bold shrink-0 ${
                      txn.type === 'Inflow'
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}
                  >
                    {txn.type === 'Inflow' ? (
                      <RiArrowRightUpLine className="text-lg" />
                    ) : (
                      <RiArrowRightDownLine className="text-lg" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs sm:text-sm font-bold text-white">
                        {txn.counterparty}
                      </p>
                      <span className="text-[10px] font-mono text-slate-500">{txn.id}</span>
                    </div>
                    <p className="text-[11px] font-mono text-slate-400">
                      {txn.corridor} • {txn.method}
                    </p>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between gap-1">
                  <span
                    className={`text-sm font-mono font-bold tabular-nums ${
                      txn.type === 'Inflow' ? 'text-emerald-400' : 'text-white'
                    }`}
                  >
                    {txn.type === 'Inflow' ? '+' : '-'}
                    {formatMoney(txn.amountUsd)}
                  </span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      txn.status === 'Settled'
                        ? 'bg-emerald-500/15 text-emerald-400'
                        : txn.status === 'Clearing'
                        ? 'bg-amber-500/15 text-amber-400'
                        : 'bg-rose-500/15 text-rose-400'
                    }`}
                  >
                    {txn.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Maritime Corridors */}
        <div className="lg:col-span-5 cmd-panel rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400">
                FLEET TELEMETRY
              </span>
              <h3 className="text-base font-bold text-white">Priority Freight Corridors</h3>
            </div>
            <Link
              href="/logistics"
              className="text-xs font-mono text-amber-400 hover:underline flex items-center gap-1"
            >
              Fleet Map <RiArrowRightLine />
            </Link>
          </div>

          <div className="space-y-3">
            {shipments.slice(0, 3).map((shp) => (
              <div
                key={shp.id}
                className="p-3.5 rounded-xl bg-[#0E1217] border border-[#1B222C] space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{shp.vessel}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-500/15 text-blue-400">
                    {shp.status}
                  </span>
                </div>
                <p className="text-[11px] font-mono text-slate-400">
                  {shp.origin} → {shp.destination}
                </p>
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-amber-400 rounded-full"
                    style={{ width: `${shp.progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span className="flex items-center gap-1">
                    <RiTimeLine /> {shp.eta}
                  </span>
                  <span className="text-emerald-400">{shp.tempC}°C Cold-Chain</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
