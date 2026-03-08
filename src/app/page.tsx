'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
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
  Wallet,
  ShoppingBag,
  Tag,
  MapPin,
  Search,
  Zap,
  HelpCircle,
  Clock,
  Globe,
  Server,
  Code
} from 'lucide-react';

export default function Home() {
  const [transactions, setTransactions] = useState(5000);
  const [fee, setFee] = useState(1000);

  const potentialRevenue = useMemo(() => transactions * fee, [transactions, fee]);

  const costBreakdown = [
    {
      category: "Development (One-Time)",
      items: [
        { name: "Mobile App (Android & iOS)", price: "Rp 35.000.000", desc: "Native-like experience, React Native/Flutter." },
        { name: "Web Admin Dashboard", price: "Rp 15.000.000", desc: "Manajemen Mitra, Anggota, & Settlement." },
        { name: "Backend API & Database", price: "Rp 10.000.000", desc: "Secure transaction engine & cloud storage." }
      ],
      total: "Rp 60.000.000"
    },
    {
      category: "Operational (Recurring)",
      items: [
        { name: "Cloud Server (AWS/Google Cloud)", price: "Rp 750.000/bln", desc: "Auto-scaling server untuk traffic tinggi." },
        { name: "Play Store (Once) / App Store (Yearly)", price: "Rp 350rb / Rp 1.5jt", desc: "Biaya lisensi toko aplikasi resmi." },
        { name: "WhatsApp/SMS OTP", price: "Rp 450 / pesan", desc: "Untuk keamanan login & verifikasi transaksi." }
      ]
    }
  ];

  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold">K</div>
            <span className="font-black text-xl tracking-tighter">KOPWARUNG<span className="text-emerald-600">.DIGITAL</span></span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-bold text-slate-500">
            <a href="#solusi" className="hover:text-emerald-600 transition-colors">Solusi</a>
            <a href="#mockup" className="hover:text-emerald-600 transition-colors">Demo</a>
            <a href="#biaya" className="hover:text-emerald-600 transition-colors">Estimasi Biaya</a>
            <a href="/dashboard" className="text-emerald-600 border-b-2 border-emerald-600 pb-1">Admin Preview</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100 mb-6 uppercase tracking-wider">
              <Zap size={14} /> Ecosystem v1.0 Ready
            </div>
            <h1 className="text-5xl lg:text-7xl font-black leading-[1.1] mb-8">
              Ubah Warung Jadi <span className="text-emerald-600 underline">Outlet Digital</span> Koperasi.
            </h1>
            <p className="text-lg text-slate-500 mb-10 leading-relaxed max-w-lg">
              Anggota belanja di warung terdekat, bayar via aplikasi, koperasi dapat bagi hasil otomatis. <b>Alfagift-style for local communities.</b>
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-xl">
                Download Proposal (PDF)
              </button>
              <Link href="/mitra/register" className="px-8 py-4 bg-white border border-slate-200 text-slate-900 font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center gap-2">
                Pendaftaran Mitra <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>

          {/* Alfagift Style Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            id="mockup"
            className="relative"
          >
            <div className="w-full max-w-[340px] mx-auto bg-white rounded-[40px] border-[10px] border-slate-900 h-[700px] shadow-2xl overflow-hidden relative">
              {/* App Header */}
              <div className="bg-emerald-600 p-6 pt-12 text-white pb-10">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <p className="text-xs opacity-80">Halo, Budi Santoso</p>
                    <p className="text-lg font-bold">Anggota Platinum 🌟</p>
                  </div>
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Users size={20} />
                  </div>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex justify-between items-center">
                  <div>
                    <p className="text-[10px] uppercase font-bold opacity-70">Saldo Koperasi</p>
                    <p className="text-xl font-black">Rp 2.450.000</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase font-bold opacity-70">Poin Belanja</p>
                    <p className="text-lg font-bold text-amber-300">12.450</p>
                  </div>
                </div>
              </div>

              {/* App Features */}
              <div className="p-4 -mt-6 bg-white rounded-t-[30px]">
                <div className="grid grid-cols-4 gap-2 mb-6">
                  {[
                    { icon: <CreditCard />, label: "Bayar", color: "bg-blue-50 text-blue-600" },
                    { icon: <ShoppingBag />, label: "Katalog", color: "bg-amber-50 text-amber-600" },
                    { icon: <Tag />, label: "Promo", color: "bg-red-50 text-red-600" },
                    { icon: <MapPin />, label: "Lokasi", color: "bg-emerald-50 text-emerald-600" }
                  ].map((f, i) => (
                    <div key={i} className="flex flex-col items-center gap-1">
                      <div className={`w-12 h-12 ${f.color} rounded-2xl flex items-center justify-center`}>
                        {f.icon}
                      </div>
                      <span className="text-[10px] font-bold text-slate-500 uppercase">{f.label}</span>
                    </div>
                  ))}
                </div>

                {/* Alfagift Style Product Feed */}
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-extrabold text-sm">Flash Sale Warung ⚡</h3>
                  <button className="text-[10px] text-emerald-600 font-bold">Lihat Semua</button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: "Minyak Goreng 1L", price: "Rp 14.500", ori: "Rp 17.000", img: "🍳" },
                    { name: "Beras Cap Lele 5kg", price: "Rp 62.000", ori: "Rp 68.000", img: "🌾" }
                  ].map((p, i) => (
                    <div key={i} className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                      <div className="aspect-square bg-white rounded-xl mb-2 flex items-center justify-center text-3xl">
                        {p.img}
                      </div>
                      <p className="text-xs font-bold text-slate-800 line-clamp-1">{p.name}</p>
                      <p className="text-emerald-600 font-black text-sm">{p.price}</p>
                      <p className="text-[10px] text-slate-400 line-through">{p.ori}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* App Navigation */}
              <div className="absolute bottom-0 w-full h-16 bg-white border-t border-slate-100 flex items-center justify-around">
                <ShoppingBag size={20} className="text-emerald-600" />
                <MapPin size={20} className="text-slate-300" />
                <div className="w-12 h-12 bg-emerald-600 rounded-full -mt-10 border-4 border-white flex items-center justify-center text-white shadow-lg">
                  <CreditCard size={20} />
                </div>
                <Tag size={20} className="text-slate-300" />
                <Users size={20} className="text-slate-300" />
              </div>
            </div>

            {/* Decorative Blobs */}
            <div className="absolute -z-10 top-20 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-emerald-100 rounded-full blur-[100px] opacity-60"></div>
          </motion.div>
        </div>
      </section>

      {/* Breakdown Biaya Section */}
      <section id="biaya" className="py-24 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4 tracking-tight">Transparansi Biaya <span className="text-emerald-400">Pengerjaan</span></h2>
            <p className="text-slate-400">Estimasi profesional berdasarkan kompleksitas sistem bagi hasil.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              {costBreakdown.map((group, idx) => (
                <div key={idx} className="bg-white/5 rounded-3xl p-8 border border-white/10">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                    {idx === 0 ? <Code className="text-emerald-400" /> : <Server className="text-blue-400" />}
                    {group.category}
                  </h3>
                  <div className="space-y-6">
                    {group.items.map((item, i) => (
                      <div key={i} className="flex justify-between items-start">
                        <div>
                          <p className="font-bold">{item.name}</p>
                          <p className="text-xs text-slate-500 mt-1 max-w-[250px]">{item.desc}</p>
                        </div>
                        <p className="font-black text-emerald-400">{item.price}</p>
                      </div>
                    ))}
                  </div>
                  {group.total && (
                    <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
                      <span className="text-sm font-bold uppercase tracking-wider text-slate-400">Subtotal</span>
                      <span className="text-2xl font-black text-white">{group.total}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="bg-emerald-600 rounded-[40px] p-10 flex flex-col justify-between relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-8">
                  <Calculator size={32} />
                  <h3 className="text-2xl font-black">Simulasi Balik Modal (ROI)</h3>
                </div>

                <div className="space-y-10">
                  <div>
                    <label className="block text-sm font-bold mb-4 opacity-80 uppercase tracking-widest">Total Transaksi Ekosistem / Bulan</label>
                    <input
                      type="range"
                      min="1000"
                      max="50000"
                      step="1000"
                      value={transactions}
                      onChange={(e) => setTransactions(parseInt(e.target.value))}
                      className="w-full h-3 bg-emerald-700 rounded-lg appearance-none cursor-pointer accent-white"
                    />
                    <div className="flex justify-between mt-4">
                      <span className="text-3xl font-black">{transactions.toLocaleString()} <span className="text-sm font-medium opacity-60">tx / bln</span></span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold mb-4 opacity-80 uppercase tracking-widest">Bagi Hasil Per Transaksi</label>
                    <select
                      value={fee}
                      onChange={(e) => setFee(parseInt(e.target.value))}
                      className="w-full bg-emerald-700 border-none rounded-2xl p-4 font-black text-2xl outline-none appearance-none"
                    >
                      <option value={500}>Rp 500 / transaksi</option>
                      <option value={1000}>Rp 1.000 / transaksi</option>
                      <option value={1500}>Rp 1.500 / transaksi</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-8 bg-white/20 backdrop-blur-md rounded-3xl relative z-10 border border-white/20">
                <p className="text-sm font-bold opacity-80 mb-2">Estimasi Kas Koperasi Meningkat:</p>
                <p className="text-5xl font-black">Rp {potentialRevenue.toLocaleString()}</p>
                <p className="mt-4 text-xs font-bold leading-relaxed opacity-60 italic">
                  *Dengan target {transactions.toLocaleString()} transaksi per bulan, pengerjaan aplikasi senilai Rp 60jt dapat balik modal (BEP) dalam waktu {(60000000 / potentialRevenue).toFixed(1)} bulan.
                </p>
              </div>

              {/* Decor */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Logic (Solving Complexity) */}
      <section className="py-24 max-w-7xl mx-auto px-6" id="solusi">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
              <ShieldCheck size={28} />
            </div>
            <h4 className="text-xl font-black mb-4 leading-tight">Sistem Settlement Berjenjang</h4>
            <p className="text-slate-500 text-sm leading-relaxed">
              Sistem dapat mengatur biaya admin yang berbeda tiap produk (contoh: Toko A Rp500, Toko B Rp1000, atau % dari total belanja).
            </p>
          </div>
          <div className="p-8 bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50">
            <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mb-6">
              <Smartphone size={28} />
            </div>
            <h4 className="text-xl font-black mb-4 leading-tight">Offline First Monitoring</h4>
            <p className="text-slate-500 text-sm leading-relaxed">
              Sinkronisasi data otomatis saat internet tidak stabil di lokasi warung mitra, sehingga transaksi tidak terhambat.
            </p>
          </div>
          <div className="p-8 bg-white rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/50">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
              <TrendingUp size={28} />
            </div>
            <h4 className="text-xl font-black mb-4 leading-tight">Auto-Reconcile Payment</h4>
            <p className="text-slate-500 text-sm leading-relaxed">
              Integrasi QRIS & E-Wallet (ShopeePay/Gopay) yang langsung memotong saldo anggota koperasi secara real-time.
            </p>
          </div>
        </div>
      </section>


      {/* Roadmap Section */}
      <section className="py-24 max-w-7xl mx-auto px-6" id="roadmap">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4">Timeline & <span className="text-emerald-600">Roadmap</span></h2>
          <p className="text-slate-500">Tahapan pengerjaan aplikasi sampai go-live.</p>
        </div>
        <div className="relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-slate-100 hidden md:block"></div>
          <div className="space-y-12">
            {[
              { phase: "Bulan 1", title: "Riset & UI/UX Design", desc: "Penentuan alur settlement, skema bagi hasil, dan desain antarmuka.", color: "bg-blue-500" },
              { phase: "Bulan 2-3", title: "App Development", desc: "Coding aplikasi Android/iOS, dashboard admin, dan integrasi API.", color: "bg-emerald-500" },
              { phase: "Bulan 4", title: "Testing & Pilot Project", desc: "Uji coba di 5-10 warung mitra pilihan untuk validasi sistem.", color: "bg-amber-500" },
              { phase: "Bulan 5", title: "Launch & Training", desc: "Full rollout ke semua mitra dan pelatihan pengurus koperasi.", color: "bg-purple-500" }
            ].map((step, idx) => (
              <div key={idx} className={`relative flex items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="flex-1 hidden md:block"></div>
                <div className={`w-12 h-12 rounded-full ${step.color} border-4 border-white shadow-lg z-10 shrink-0`}></div>
                <div className="flex-1 bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
                  <span className={`text-[10px] font-black uppercase text-white px-3 py-1 rounded-full ${step.color} mb-3 inline-block`}>{step.phase}</span>
                  <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                  <p className="text-sm text-slate-500">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-20 bg-slate-50 border-t border-slate-200 text-center">
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-4">Gaskan Proyek Ini Sekarang</p>
        <h2 className="text-3xl font-black mb-8 px-6">Siap Bangun Ekosistem Koperasi Masa Depan?</h2>
        <div className="flex justify-center gap-4">
          <button className="px-10 py-5 bg-emerald-600 text-white font-black rounded-[24px] shadow-2xl shadow-emerald-200 hover:scale-105 transition-all">
            Mulai Diskusi Teknis
          </button>
        </div>
      </footer>
    </main>
  );
}
