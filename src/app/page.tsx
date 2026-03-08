'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Store,
  Users,
  CreditCard,
  ArrowRight,
  CheckCircle2,
  Calculator,
  Smartphone,
  LayoutDashboard,
  ShieldCheck,
  TrendingUp,
  Wallet
} from 'lucide-react';

export default function Home() {
  const [transactions, setTransactions] = useState(1000);
  const [fee, setFee] = useState(1000);

  const potentialRevenue = useMemo(() => transactions * fee, [transactions, fee]);

  const costs = {
    development: {
      initial: 25000000,
      description: "App Android (React Native), Web Dashboard, Backend API"
    },
    server: {
      monthly: 450000,
      description: "Cloud Hosting (Vercel/AWS), Database, SSL"
    },
    pg: {
      setup: 0,
      fee: "0.7% (QRIS)",
      description: "Integrasi Payment Gateway (Xendit/Midtrans)"
    }
  };

  return (
    <main className="min-h-screen bg-[#f8fafc] overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wider text-emerald-700 uppercase bg-emerald-100 rounded-full">
              Digitalisasi Koperasi Modern
            </span>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-6">
              Ekosistem <span className="text-emerald-600">Koperasi</span> & <span className="text-amber-600">Warung</span> Lokal.
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
              Hubungkan anggota koperasi dengan ratusan warung mitra. Transaksi instan, bagi hasil otomatis, tanpa perlu toko fisik.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2">
                Lihat Demo App <ArrowRight size={20} />
              </button>
              <button className="px-8 py-4 bg-white text-slate-700 font-bold rounded-2xl border border-slate-200 hover:border-slate-300 transition-all shadow-sm">
                Pelajari Dashboard
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative z-10 bg-white p-8 rounded-[40px] shadow-2xl border border-slate-100 max-w-[400px] mx-auto overflow-hidden">
              {/* Mockup App Header */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <p className="text-xs text-slate-400">Saldo Anggota</p>
                  <p className="text-2xl font-bold text-slate-900">Rp 1.250.000</p>
                </div>
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                  <Users size={24} />
                </div>
              </div>

              {/* QR Scan Simulation */}
              <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-[30px] p-8 mb-8 text-center text-slate-400">
                <CreditCard size={48} className="mx-auto mb-4 opacity-20" />
                <p className="text-sm">Scan QR di Warung Mitra</p>
              </div>

              {/* Recent Partners */}
              <h3 className="font-bold text-slate-800 mb-4">Warung Terdekat</h3>
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="flex gap-4 items-center p-3 rounded-2xl hover:bg-slate-50 transition-colors">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center text-amber-600">
                      <Store size={20} />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">Warung Barokah {i}</p>
                      <p className="text-xs text-slate-400">0.4 km • Mitra Silver</p>
                    </div>
                    <div className="text-emerald-500 font-bold text-xs">OPEN</div>
                  </div>
                ))}
              </div>
            </div>
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-emerald-50 rounded-full -z-10 opacity-50 blur-3xl"></div>
          </motion.div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-20 bg-slate-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium border border-emerald-500/20 mb-6">
                <Calculator size={16} /> Budgeting & Profit
              </div>
              <h2 className="text-4xl font-bold mb-8">Estimasi Biaya & <span className="text-emerald-400">Potensi Hasil</span></h2>
              <div className="space-y-8">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-slate-400 mb-4 font-medium uppercase text-xs tracking-widest">Atur Simulasi</p>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-sm">Target Transaksi/Bulan</label>
                        <span className="text-emerald-400 font-bold">{transactions.toLocaleString()} tx</span>
                      </div>
                      <input
                        type="range"
                        min="100"
                        max="50000"
                        step="100"
                        value={transactions}
                        onChange={(e) => setTransactions(parseInt(e.target.value))}
                        className="w-full accent-emerald-500"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between mb-2">
                        <label className="text-sm">Bagi Hasil Per Transaksi</label>
                        <span className="text-emerald-400 font-bold">Rp {fee.toLocaleString()}</span>
                      </div>
                      <input
                        type="range"
                        min="500"
                        max="2000"
                        step="100"
                        value={fee}
                        onChange={(e) => setFee(parseInt(e.target.value))}
                        className="w-full accent-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-emerald-600 rounded-3xl text-center">
                  <p className="text-emerald-100 mb-2">Potensi Revenue Koperasi</p>
                  <p className="text-5xl font-black">Rp {potentialRevenue.toLocaleString()}</p>
                  <p className="text-emerald-200 mt-2 text-sm italic">per bulan (Gross)</p>
                </div>
              </div>
            </div>

            <div className="grid gap-6">
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-emerald-500/50 transition-all group">
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-emerald-500/20 rounded-xl text-emerald-400">
                    <LayoutDashboard size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-1 group-hover:text-emerald-400 transition-colors">Development</h4>
                    <p className="text-slate-400 text-sm mb-4">{costs.development.description}</p>
                    <p className="text-2xl font-bold">Rp {costs.development.initial.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-emerald-500/50 transition-all group">
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-blue-500/20 rounded-xl text-blue-400">
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-1 group-hover:text-blue-400 transition-colors">Server & Maintenance</h4>
                    <p className="text-slate-400 text-sm mb-4">{costs.server.description}</p>
                    <p className="text-2xl font-bold">Rp {costs.server.monthly.toLocaleString()} <span className="text-sm font-normal text-slate-500">/ bln</span></p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 p-6 rounded-2xl border border-white/10 hover:border-emerald-500/50 transition-all group">
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-amber-500/20 rounded-xl text-amber-400">
                    <Wallet size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl mb-1 group-hover:text-amber-400 transition-colors">Payment Gateway</h4>
                    <p className="text-slate-400 text-sm mb-4">{costs.pg.description}</p>
                    <p className="text-2xl font-bold">{costs.pg.fee}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Fitur Utama Ekosistem</h2>
          <p className="text-slate-500">Solusi end-to-end dari frontend koperasi sampai rekonsiliasi warung.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <Smartphone />, title: "App White-label", desc: "Aplikasi Android/iOS khusus brand koperasi Anda dengan fitur scan bayar." },
            { icon: <Store />, title: "Manajemen Warung", desc: "Portal khusus pemilik warung buat pantau setoran & komisi bagi hasil." },
            { icon: <ShieldCheck />, title: "Automated Clearing", desc: "Sistem bagi hasil Rp500-Rp1000 langsung terhitung otomatis per detik." }
          ].map((feature, idx) => (
            <div key={idx} className="p-8 bg-white border border-slate-100 rounded-[32px] hover:shadow-xl hover:-translate-y-1 transition-all">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer className="py-12 border-t border-slate-100 text-center text-slate-400 text-sm">
        &copy; 2026 Koperasi Digital Ecosystem. Ready to Deploy.
      </footer>
    </main>
  );
}
