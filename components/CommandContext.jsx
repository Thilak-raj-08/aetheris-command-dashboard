'use client'

import { createContext, useContext, useState } from 'react'
import {
  CURRENCY_RATES,
  MONTHLY_CASHFLOW,
  INITIAL_TRANSACTIONS,
  INITIAL_SHIPMENTS,
  INITIAL_REGIONS,
  INITIAL_API_KEYS,
} from '@/data/commandData'

const CommandContext = createContext(null)

export function CommandProvider({ children }) {
  const [currency, setCurrency] = useState('USD')
  const [dateRange, setDateRange] = useState('6M')
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS)
  const [shipments, setShipments] = useState(INITIAL_SHIPMENTS)
  const [regions, setRegions] = useState(INITIAL_REGIONS)
  const [apiKeys, setApiKeys] = useState(INITIAL_API_KEYS)

  const formatMoney = (usdValue, compact = false) => {
    const cfg = CURRENCY_RATES[currency] || CURRENCY_RATES.USD
    const converted = usdValue * cfg.rate
    if (compact && Math.abs(converted) >= 1_000_000) {
      return `${cfg.symbol}${(converted / 1_000_000).toFixed(2)}M`
    }
    if (compact && Math.abs(converted) >= 1_000) {
      return `${cfg.symbol}${(converted / 1_000).toFixed(1)}K`
    }
    return `${cfg.symbol}${Math.round(converted).toLocaleString('en-US')}`
  }

  const addWireTransfer = (payload) => {
    const newTxn = {
      id: `TXN-${Math.floor(94822 + Math.random() * 900)}`,
      counterparty: payload.counterparty,
      corridor: payload.corridor || 'Zurich → Singapore',
      category: payload.category || 'Freight Settlement',
      type: payload.type || 'Outflow',
      amountUsd: Number(payload.amountUsd) || 50000,
      status: 'Settled',
      method: payload.method || 'SWIFT gpi',
      timestamp: 'Just now (Live)',
      account: payload.account || 'CH93-0076-2011-6238',
    }
    setTransactions((prev) => [newTxn, ...prev])
  }

  const toggleShipmentStatus = (id) => {
    setShipments((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s
        if (s.status === 'Customs Hold') {
          return { ...s, status: 'In Transit', customs: 'Pre-Cleared' }
        }
        if (s.status === 'In Transit') {
          return { ...s, status: 'Delivered', progress: 100, customs: 'Released' }
        }
        return s
      })
    )
  }

  const rerouteRegionTraffic = (regionId) => {
    setRegions((prev) =>
      prev.map((r) => {
        if (r.id !== regionId) return r
        const isDegraded = r.status === 'Degraded'
        return {
          ...r,
          status: isDegraded ? 'Operational' : 'Degraded',
          latencyMs: isDegraded ? 16 : 74,
          cpuLoad: isDegraded ? 45 : 88,
          uptime: isDegraded ? '99.998%' : '99.941%',
        }
      })
    )
  }

  const createApiKey = (name, scope) => {
    const randomHex = Math.floor(1000 + Math.random() * 9000)
    const newKey = {
      id: `KEY-0${apiKeys.length + 1}`,
      name,
      prefix: `aeth_live_${randomHex}...e4b9`,
      scope: scope || 'treasury:read, telemetry:stream',
      created: '16 Nov 2026',
      lastUsed: 'Never',
      status: 'Active',
    }
    setApiKeys((prev) => [newKey, ...prev])
  }

  const revokeApiKey = (id) => {
    setApiKeys((prev) =>
      prev.map((k) => (k.id === id ? { ...k, status: k.status === 'Active' ? 'Revoked' : 'Active' } : k))
    )
  }

  const totalInflowUsd = transactions
    .filter((t) => t.type === 'Inflow')
    .reduce((sum, t) => sum + t.amountUsd, 0)
  const totalOutflowUsd = transactions
    .filter((t) => t.type === 'Outflow')
    .reduce((sum, t) => sum + t.amountUsd, 0)
  const netTreasuryUsd = 14820000 + (totalInflowUsd - totalOutflowUsd)

  return (
    <CommandContext.Provider
      value={{
        currency,
        setCurrency,
        dateRange,
        setDateRange,
        transactions,
        shipments,
        regions,
        apiKeys,
        cashflow: MONTHLY_CASHFLOW,
        formatMoney,
        addWireTransfer,
        toggleShipmentStatus,
        rerouteRegionTraffic,
        createApiKey,
        revokeApiKey,
        totalInflowUsd,
        totalOutflowUsd,
        netTreasuryUsd,
      }}
    >
      {children}
    </CommandContext.Provider>
  )
}

export function useCommand() {
  const ctx = useContext(CommandContext)
  if (!ctx) throw new Error('useCommand must be used inside CommandProvider')
  return ctx
}
