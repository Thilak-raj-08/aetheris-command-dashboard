'use client'

import { motion } from 'framer-motion'
import { useCommand } from '@/components/CommandContext'
import {
  RiShip2Line,
  RiTempColdLine,
  RiTimeLine,
  RiCheckDoubleLine,
  RiAlertLine,
  RiMapPin2Line,
  RiRefreshLine,
} from 'react-icons/ri'

export default function LogisticsFleetPage() {
  const { shipments, toggleShipmentStatus } = useCommand()

  return (
    <div className="space-y-6">
      {/* Maritime Terminal Hero Showcase with Custom Generated Aerial Photo */}
      <div className="cmd-panel rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400">
              MODULE 03 • MARITIME & AIR CARGO TELEMETRY
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Global Intermodal Container & Cold-Chain Fleet
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl leading-relaxed">
              Live AIS satellite vessel positioning, automated port customs clearance status,
              and IoT cryo-container thermal sensors across Colombo, Singapore, Rotterdam, and Tokyo.
            </p>
          </div>

          <div className="mt-6 pt-5 border-t border-[#1E2633] grid grid-cols-3 gap-4 font-mono">
            <div>
              <span className="text-[10px] text-slate-400 uppercase">ACTIVE CORRIDORS</span>
              <p className="text-xl font-bold text-white mt-0.5">{shipments.length} Routes</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase">MEAN COLD-CHAIN</span>
              <p className="text-xl font-bold text-emerald-400 mt-0.5">17.7°C</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase">CUSTOMS SLA</span>
              <p className="text-xl font-bold text-amber-400 mt-0.5">99.2%</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 relative min-h-[220px] border-t lg:border-t-0 lg:border-l border-[#222B38] overflow-hidden">
          <img
            src="/images/cargo-port.jpg"
            alt="Automated International Container Port Terminal at Twilight"
            className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10] via-transparent to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 p-3 rounded-xl bg-[#0B0D10]/85 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs font-mono">
            <span className="text-slate-200 flex items-center gap-1.5">
              <RiShip2Line className="text-amber-400" /> EUROPORT / TUAS MEGA BERTH 14
            </span>
            <span className="text-emerald-400 font-bold">AIS SYNCED</span>
          </div>
        </div>
      </div>

      {/* Shipment Manifest Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {shipments.map((shp, idx) => (
          <motion.div
            key={shp.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: idx * 0.06 }}
            className="cmd-panel rounded-2xl p-6 flex flex-col justify-between space-y-5"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-amber-400">
                      {shp.id}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1A222E] text-slate-300 border border-[#283344]">
                      {shp.priority}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-1">{shp.vessel}</h3>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1 ${
                    shp.status === 'Delivered'
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : shp.status === 'Customs Hold'
                      ? 'bg-rose-500/15 text-rose-400'
                      : 'bg-blue-500/15 text-blue-400'
                  }`}
                >
                  {shp.status === 'Customs Hold' ? <RiAlertLine /> : <RiCheckDoubleLine />}
                  {shp.status}
                </span>
              </div>

              <p className="text-xs text-slate-300 mt-2 font-medium">{shp.cargo}</p>

              {/* Origin -> Destination Corridor */}
              <div className="mt-4 p-3.5 rounded-xl bg-[#0D1116] border border-[#1B222D] flex items-center justify-between text-xs font-mono">
                <div>
                  <span className="text-[10px] text-slate-500 block">ORIGIN PORT</span>
                  <span className="text-slate-200 font-semibold">{shp.origin}</span>
                </div>
                <RiMapPin2Line className="text-amber-400 text-lg shrink-0 mx-2" />
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block">DESTINATION</span>
                  <span className="text-slate-200 font-semibold">{shp.destination}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                  <span className="text-slate-400">CORRIDOR COMPLETION</span>
                  <span className="text-emerald-400 font-bold">{shp.progress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 rounded-full transition-all duration-500"
                    style={{ width: `${shp.progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Bottom Telemetry & Interactive Action */}
            <div className="pt-4 border-t border-[#1D2430] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                <span className="flex items-center gap-1 text-emerald-400">
                  <RiTempColdLine /> {shp.tempC}°C / {shp.humidity}% RH
                </span>
                <span className="flex items-center gap-1">
                  <RiTimeLine /> {shp.eta}
                </span>
              </div>

              {shp.status !== 'Delivered' && (
                <button
                  onClick={() => toggleShipmentStatus(shp.id)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500 hover:text-slate-950 text-emerald-400 border border-emerald-500/30 text-xs font-mono font-bold transition-all"
                >
                  <RiRefreshLine />
                  {shp.status === 'Customs Hold'
                    ? 'Authorize Customs Release'
                    : 'Mark Berth Arrival'}
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
