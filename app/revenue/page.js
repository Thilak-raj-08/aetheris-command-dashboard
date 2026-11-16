'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCommand } from '@/components/CommandContext'
import {
  RiSearchLine,
  RiAddCircleLine,
  RiDownload2Line,
  RiArrowUpRightLine,
  RiArrowDownRightLine,
  RiCloseLine,
  RiCheckDoubleLine,
} from 'react-icons/ri'

export default function RevenueLedgerPage() {
  const {
    transactions,
    formatMoney,
    addWireTransfer,
    totalInflowUsd,
    totalOutflowUsd,
    netTreasuryUsd,
  } = useCommand()

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [showWireModal, setShowWireModal] = useState(false)
  const [exportedBanner, setExportedBanner] = useState(false)

  const [form, setForm] = useState({
    counterparty: '',
    corridor: 'Colombo → Zurich',
    category: 'Enterprise Contract',
    type: 'Inflow',
    amountUsd: '250000',
    method: 'SWIFT gpi',
  })

  const filtered = transactions.filter((t) => {
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter
    const q = search.toLowerCase()
    const matchesSearch =
      !q ||
      t.counterparty.toLowerCase().includes(q) ||
      t.id.toLowerCase().includes(q) ||
      t.corridor.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q)
    return matchesStatus && matchesSearch
  })

  const handleCreateWire = (e) => {
    e.preventDefault()
    if (!form.counterparty.trim()) return
    addWireTransfer(form)
    setForm({
      counterparty: '',
      corridor: 'Colombo → Zurich',
      category: 'Enterprise Contract',
      type: 'Inflow',
      amountUsd: '250000',
      method: 'SWIFT gpi',
    })
    setShowWireModal(false)
  }

  const handleExportCsv = () => {
    setExportedBanner(true)
    setTimeout(() => setExportedBanner(false), 3000)
  }

  return (
    <div className="space-y-6">
      {/* Header & Actions */}
      <div className="cmd-panel rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400">
            MODULE 02 • SOVEREIGN TREASURY & WIRE LEDGER
          </span>
          <h2 className="text-2xl font-extrabold text-white mt-1">
            Cross-Border Settlement & Liquidity Ledger
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Audit ISO-20022 SWIFT gpi transfers, SEPA instant settlements, and initiate new institutional wires.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={handleExportCsv}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#181F2A] hover:bg-[#222B3A] text-slate-200 border border-[#293446] text-xs font-mono font-semibold transition-colors"
          >
            <RiDownload2Line className="text-base text-emerald-400" />
            {exportedBanner ? 'ISO-20022 Audit Exported ✓' : 'Export Audit CSV'}
          </button>
          <button
            onClick={() => setShowWireModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors"
          >
            <RiAddCircleLine className="text-base" />
            Initiate Wire Transfer
          </button>
        </div>
      </div>

      {/* Summary Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="cmd-panel rounded-2xl p-5">
          <span className="text-[11px] font-mono text-slate-400 uppercase">
            TOTAL CLEARED INFLOW
          </span>
          <p className="text-2xl font-mono font-extrabold text-emerald-400 mt-1 tabular-nums">
            +{formatMoney(totalInflowUsd)}
          </p>
        </div>
        <div className="cmd-panel rounded-2xl p-5">
          <span className="text-[11px] font-mono text-slate-400 uppercase">
            TOTAL OPERATING OUTFLOW
          </span>
          <p className="text-2xl font-mono font-extrabold text-rose-400 mt-1 tabular-nums">
            -{formatMoney(totalOutflowUsd)}
          </p>
        </div>
        <div className="cmd-panel rounded-2xl p-5">
          <span className="text-[11px] font-mono text-slate-400 uppercase">
            NET TREASURY RESERVE
          </span>
          <p className="text-2xl font-mono font-extrabold text-white mt-1 tabular-nums">
            {formatMoney(netTreasuryUsd)}
          </p>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="cmd-panel rounded-2xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <RiSearchLine className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search counterparty, TXN ID, corridor, or category..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0B0D10] border border-[#222A36] text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {['All', 'Settled', 'Clearing', 'Flagged'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3.5 py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                  statusFilter === st
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-[#0E1217] text-slate-400 hover:text-white border border-[#1E2633]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Institutional Ledger Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#1E2633] text-[11px] font-mono uppercase text-slate-400">
                <th className="py-3 px-3">TXN ID</th>
                <th className="py-3 px-3">Counterparty & Corridor</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Rail / IBAN</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#181F2A] text-xs">
              {filtered.map((txn) => (
                <tr key={txn.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-3.5 px-3 font-mono font-bold text-slate-300">
                    {txn.id}
                    <div className="text-[10px] text-slate-500 font-normal">{txn.timestamp}</div>
                  </td>
                  <td className="py-3.5 px-3">
                    <div className="font-bold text-white">{txn.counterparty}</div>
                    <div className="text-[11px] font-mono text-slate-400">{txn.corridor}</div>
                  </td>
                  <td className="py-3.5 px-3">
                    <span className="px-2.5 py-1 rounded-lg bg-[#161C26] border border-[#242D3C] text-slate-300 font-mono text-[11px]">
                      {txn.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 font-mono text-slate-400">
                    <div className="text-slate-200">{txn.method}</div>
                    <div className="text-[10px] text-slate-500">{txn.account}</div>
                  </td>
                  <td className="py-3.5 px-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono font-semibold ${
                        txn.status === 'Settled'
                          ? 'bg-emerald-500/15 text-emerald-400'
                          : txn.status === 'Clearing'
                          ? 'bg-amber-500/15 text-amber-400'
                          : 'bg-rose-500/15 text-rose-400'
                      }`}
                    >
                      <RiCheckDoubleLine />
                      {txn.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-3 text-right font-mono font-bold tabular-nums">
                    <span
                      className={`inline-flex items-center gap-1 ${
                        txn.type === 'Inflow' ? 'text-emerald-400' : 'text-white'
                      }`}
                    >
                      {txn.type === 'Inflow' ? (
                        <RiArrowUpRightLine className="text-emerald-400" />
                      ) : (
                        <RiArrowDownRightLine className="text-rose-400" />
                      )}
                      {txn.type === 'Inflow' ? '+' : '-'}
                      {formatMoney(txn.amountUsd)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Initiate SWIFT Wire Transfer */}
      <AnimatePresence>
        {showWireModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowWireModal(false)}
              className="fixed inset-0 bg-black/75 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              className="relative z-10 w-full max-w-lg rounded-2xl bg-[#12161B] border border-[#263040] p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#1E2633]">
                <div>
                  <span className="text-[10px] font-mono uppercase text-emerald-400">
                    ISO-20022 SWIFT DISPATCH
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    Initiate Institutional Wire Transfer
                  </h3>
                </div>
                <button
                  onClick={() => setShowWireModal(false)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
                >
                  <RiCloseLine className="text-lg" />
                </button>
              </div>

              <form onSubmit={handleCreateWire} className="mt-4 space-y-4 text-xs">
                <div>
                  <label className="block font-mono text-slate-400 mb-1">
                    COUNTERPARTY INSTITUTION *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.counterparty}
                    onChange={(e) => setForm({ ...form, counterparty: e.target.value })}
                    placeholder="e.g. Dialog Enterprise Cloud LK"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D10] border border-[#242D3C] text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-mono text-slate-400 mb-1">DIRECTION</label>
                    <select
                      value={form.type}
                      onChange={(e) => setForm({ ...form, type: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D10] border border-[#242D3C] text-white"
                    >
                      <option value="Inflow">Inflow (Credit Receipt)</option>
                      <option value="Outflow">Outflow (Treasury Payout)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-mono text-slate-400 mb-1">
                      AMOUNT (USD EQUIVALENT)
                    </label>
                    <input
                      type="number"
                      min="1000"
                      required
                      value={form.amountUsd}
                      onChange={(e) => setForm({ ...form, amountUsd: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D10] border border-[#242D3C] text-white font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-mono text-slate-400 mb-1">SETTLEMENT RAIL</label>
                    <select
                      value={form.method}
                      onChange={(e) => setForm({ ...form, method: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D10] border border-[#242D3C] text-white"
                    >
                      <option value="SWIFT gpi">SWIFT gpi Instant</option>
                      <option value="SEPA Instant">SEPA Instant</option>
                      <option value="Fedwire / Treasury">Fedwire / Treasury</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-mono text-slate-400 mb-1">CORRIDOR</label>
                    <input
                      type="text"
                      value={form.corridor}
                      onChange={(e) => setForm({ ...form, corridor: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D10] border border-[#242D3C] text-white"
                    />
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowWireModal(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold"
                  >
                    Authorize & Settle Wire
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
