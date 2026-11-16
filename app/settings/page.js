'use client'

import { useState } from 'react'
import { useCommand } from '@/components/CommandContext'
import {
  RiKey2Line,
  RiShieldKeyholeLine,
  RiFileCopyLine,
  RiCheckLine,
  RiAddCircleLine,
  RiLockPasswordLine,
} from 'react-icons/ri'

export default function SecuritySettingsPage() {
  const { apiKeys, createApiKey, revokeApiKey } = useCommand()
  const [keyName, setKeyName] = useState('')
  const [scope, setScope] = useState('treasury:write, ledger:read')
  const [copiedId, setCopiedId] = useState(null)

  const handleGenerate = (e) => {
    e.preventDefault()
    if (!keyName.trim()) return
    createApiKey(keyName, scope)
    setKeyName('')
  }

  const copyToken = (id, prefix) => {
    navigator.clipboard?.writeText(prefix)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 1800)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="cmd-panel rounded-2xl p-6">
        <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400">
          MODULE 05 • ZERO-TRUST RBAC & CRYPTOGRAPHIC KEYS
        </span>
        <h2 className="text-2xl font-extrabold text-white mt-1">
          Institutional Access Control & HSM API Credentials
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Provision hardware-backed Ed25519 API keys, manage operator permissions, and inspect the immutable SOC2 compliance trail.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Provision New API Key (5 cols) */}
        <div className="lg:col-span-5 cmd-panel rounded-2xl p-6">
          <div className="flex items-center gap-2.5 pb-4 border-b border-[#1E2633]">
            <RiKey2Line className="text-emerald-400 text-xl" />
            <h3 className="text-base font-bold text-white">Provision New HSM Signing Key</h3>
          </div>

          <form onSubmit={handleGenerate} className="mt-4 space-y-4 text-xs">
            <div>
              <label className="block font-mono text-slate-400 mb-1.5">
                KEY IDENTIFIER / SERVICE DESCRIPTION *
              </label>
              <input
                type="text"
                required
                value={keyName}
                onChange={(e) => setKeyName(e.target.value)}
                placeholder="e.g. Frankfurt Settlement Webhook Signer"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D10] border border-[#242D3C] text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="block font-mono text-slate-400 mb-1.5">
                PERMISSION SCOPE
              </label>
              <select
                value={scope}
                onChange={(e) => setScope(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#0B0D10] border border-[#242D3C] text-white font-mono"
              >
                <option value="treasury:write, ledger:read">
                  treasury:write, ledger:read (Full Settlement)
                </option>
                <option value="logistics:write, telemetry:stream">
                  logistics:write, telemetry:stream (Fleet IoT)
                </option>
                <option value="ledger:read, compliance:export">
                  ledger:read, compliance:export (Auditor Read-Only)
                </option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors"
            >
              <RiAddCircleLine className="text-base" />
              Generate Ed25519 API Token
            </button>
          </form>

          {/* Security Posture Box */}
          <div className="mt-6 p-4 rounded-xl bg-[#0D1116] border border-[#1B222D] space-y-2 text-xs font-mono">
            <div className="flex items-center justify-between text-slate-300">
              <span className="flex items-center gap-1.5">
                <RiLockPasswordLine className="text-emerald-400" /> TLS 1.3 mTLS Enforced
              </span>
              <span className="text-emerald-400">ACTIVE</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              All API tokens are bound to hardware security modules (HSM) in Zurich and require IP allowlisting.
            </p>
          </div>
        </div>

        {/* Right: Active API Keys Table (7 cols) */}
        <div className="lg:col-span-7 cmd-panel rounded-2xl p-6">
          <div className="flex items-center justify-between pb-4 border-b border-[#1E2633]">
            <div className="flex items-center gap-2">
              <RiShieldKeyholeLine className="text-emerald-400 text-xl" />
              <h3 className="text-base font-bold text-white">
                Active Institutional API Credentials ({apiKeys.length})
              </h3>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {apiKeys.map((k) => (
              <div
                key={k.id}
                className="p-4 rounded-xl bg-[#0D1116] border border-[#1B222D] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{k.name}</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                        k.status === 'Active'
                          ? 'bg-emerald-500/15 text-emerald-400'
                          : 'bg-rose-500/15 text-rose-400'
                      }`}
                    >
                      {k.status}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-slate-400">
                    Token: <span className="text-slate-200">{k.prefix}</span> • Scope:{' '}
                    <span className="text-amber-400">{k.scope}</span>
                  </p>
                  <p className="text-[11px] font-mono text-slate-500">
                    Created {k.created} • Last used: {k.lastUsed}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => copyToken(k.id, k.prefix)}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#171E29] hover:bg-[#222B3A] text-slate-200 border border-[#263142] text-xs font-mono"
                  >
                    {copiedId === k.id ? (
                      <>
                        <RiCheckLine className="text-emerald-400" /> Copied
                      </>
                    ) : (
                      <>
                        <RiFileCopyLine /> Copy
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => revokeApiKey(k.id)}
                    className="px-3 py-1.5 rounded-lg bg-rose-500/15 hover:bg-rose-500 hover:text-white text-rose-400 text-xs font-mono font-semibold transition-colors"
                  >
                    {k.status === 'Active' ? 'Revoke' : 'Restore'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
