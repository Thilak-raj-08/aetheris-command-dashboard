'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCommand } from './CommandContext'
import { CURRENCY_RATES } from '@/data/commandData'
import {
  RiDashboard3Line,
  RiExchangeDollarLine,
  RiShip2Line,
  RiServerLine,
  RiShieldKeyholeLine,
  RiPulseLine,
  RiMenuLine,
  RiCloseLine,
  RiArrowRightUpLine,
  RiRadarLine,
} from 'react-icons/ri'

const navItems = [
  {
    href: '/',
    label: 'Command Overview',
    sub: 'Liquidity & NOC Feed',
    icon: RiDashboard3Line,
    code: '01',
  },
  {
    href: '/revenue',
    label: 'Treasury & Ledger',
    sub: 'SWIFT Wires & Audit',
    icon: RiExchangeDollarLine,
    code: '02',
  },
  {
    href: '/logistics',
    label: 'Fleet & Supply Chain',
    sub: 'Maritime & Air Cargo',
    icon: RiShip2Line,
    code: '03',
  },
  {
    href: '/infrastructure',
    label: 'Cloud Nodes & SLA',
    sub: '6-Region Telemetry',
    icon: RiServerLine,
    code: '04',
  },
  {
    href: '/settings',
    label: 'RBAC & API Security',
    sub: 'Keys & Compliance',
    icon: RiShieldKeyholeLine,
    code: '05',
  },
]

export default function SidebarNav({ children }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { currency, setCurrency, netTreasuryUsd, formatMoney, regions } = useCommand()

  const degradedCount = regions.filter((r) => r.status !== 'Operational').length

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-[#0B0D10] text-[#F3F4F6]">
      {/* Left Fixed Institutional Command Sidebar (Desktop) */}
      <aside className="hidden lg:flex lg:w-72 xl:w-76 flex-col justify-between bg-[#0E1217] border-r border-[#1D2430] shrink-0 select-none">
        <div>
          {/* Brand Crest */}
          <div className="p-5 border-b border-[#1D2430] flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-inner">
                <RiRadarLine className="text-xl" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold tracking-tight text-white text-base">
                    AETHERIS
                  </span>
                  <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    v4.8
                  </span>
                </div>
                <p className="text-[11px] font-mono text-slate-400">
                  TREASURY & FLEET OS
                </p>
              </div>
            </Link>
          </div>

          {/* Live Sovereign Balance Widget */}
          <div className="mx-4 mt-4 p-4 rounded-xl bg-[#131820] border border-[#222A38]">
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
              <span>NET LIQUIDITY POOL</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                LIVE
              </span>
            </div>
            <p className="text-xl font-mono font-bold text-white tabular-nums tracking-tight">
              {formatMoney(netTreasuryUsd)}
            </p>
            <p className="text-[11px] text-emerald-400 font-mono mt-1">
              +14.2% vs prior 30d clearing
            </p>
          </div>

          {/* Navigation Links */}
          <div className="px-3 py-5">
            <p className="px-3 text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-2.5">
              Command Modules (5 Pages)
            </p>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const active = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group flex items-center justify-between px-3.5 py-3 rounded-xl transition-all ${
                      active
                        ? 'bg-emerald-500/15 text-white border border-emerald-500/35 shadow-lg shadow-emerald-950/30'
                        : 'text-slate-400 hover:text-white hover:bg-white/[0.03] border border-transparent'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Icon
                        className={`text-lg shrink-0 ${
                          active ? 'text-emerald-400' : 'text-slate-500 group-hover:text-slate-300'
                        }`}
                      />
                      <div className="truncate">
                        <p className="text-xs font-semibold leading-tight truncate">
                          {item.label}
                        </p>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">
                          {item.sub}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                        active
                          ? 'bg-emerald-500 text-slate-950 font-bold'
                          : 'bg-slate-800/80 text-slate-500'
                      }`}
                    >
                      {item.code}
                    </span>
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>

        {/* Bottom Operator Status */}
        <div className="p-4 border-t border-[#1D2430] space-y-3">
          <div className="p-3 rounded-xl bg-[#12171F] border border-[#1E2633] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <RiPulseLine
                className={`text-lg ${
                  degradedCount > 0 ? 'text-amber-400' : 'text-emerald-400'
                }`}
              />
              <div>
                <p className="text-xs font-semibold text-white">
                  {degradedCount > 0 ? `${degradedCount} Node Degraded` : 'All 6 Nodes Nominal'}
                </p>
                <p className="text-[10px] font-mono text-slate-400">
                  Global SLA: 99.989%
                </p>
              </div>
            </div>
            <Link
              href="/infrastructure"
              className="text-[11px] font-mono text-emerald-400 hover:underline"
            >
              Inspect
            </Link>
          </div>

          <div className="flex items-center justify-between px-1 text-[11px] text-slate-400">
            <div>
              <p className="font-semibold text-slate-200">Jeyarajan Thilakraj</p>
              <p className="font-mono text-[10px] text-slate-500">
                Principal Systems Architect
              </p>
            </div>
            <a
              href="https://portfolio-six-lyart-fyjdxl16rt.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-mono transition-colors"
            >
              Portfolio <RiArrowRightUpLine />
            </a>
          </div>
        </div>
      </aside>

      {/* Main Content Column */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Operational Header Bar */}
        <header className="sticky top-0 z-40 bg-[#0B0D10]/90 backdrop-blur-md border-b border-[#1D2430] px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-lg bg-[#141921] border border-[#232B38] text-slate-200"
              aria-label="Toggle Menu"
            >
              {mobileOpen ? <RiCloseLine className="text-xl" /> : <RiMenuLine className="text-xl" />}
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                  ZURICH / SINGAPORE / COLOMBO
                </span>
                <span className="hidden sm:inline-block text-slate-600">•</span>
                <span className="hidden sm:inline-block text-xs font-mono text-slate-400">
                  UTC SYNC: 2026-11-16
                </span>
              </div>
              <h1 className="text-sm sm:text-base font-bold text-white">
                Aetheris Global Command & Treasury Terminal
              </h1>
            </div>
          </div>

          {/* Right Controls: Currency Selector & Quick Wire CTA */}
          <div className="flex items-center gap-2.5">
            <div className="flex items-center bg-[#12161B] border border-[#222936] rounded-xl p-1">
              {Object.keys(CURRENCY_RATES).map((code) => (
                <button
                  key={code}
                  onClick={() => setCurrency(code)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                    currency === code
                      ? 'bg-emerald-500 text-slate-950 shadow'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {code}
                </button>
              ))}
            </div>

            <Link
              href="/revenue"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors"
            >
              <RiExchangeDollarLine className="text-base" />
              <span>New Wire</span>
            </Link>
          </div>
        </header>

        {/* Mobile Drawer Navigation */}
        {mobileOpen && (
          <div className="lg:hidden bg-[#0E1217] border-b border-[#1D2430] px-4 py-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                    active
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'text-slate-300 hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className="text-base" />
                    {item.label}
                  </span>
                  <span className="font-mono text-[10px] opacity-75">{item.sub}</span>
                </Link>
              )
            })}
          </div>
        )}

        {/* Page Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 cmd-grid-bg">{children}</main>

        {/* Institutional Footer */}
        <footer className="border-t border-[#1A202B] bg-[#0B0D10] px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 font-mono">
          <div>
            AETHERIS COMMAND TERMINAL • ISO-20022 SWIFT GPI COMPLIant • SOC2 TYPE II
          </div>
          <div>
            ENGINEERED BY{' '}
            <a
              href="https://github.com/Thilak-raj-08"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:underline"
            >
              JEYARAJAN THILAKRAJ (@Thilak-raj-08)
            </a>
          </div>
        </footer>
      </div>
    </div>
  )
}
