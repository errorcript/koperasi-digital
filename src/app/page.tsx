'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Download,
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
  Triangle,
  Code,
  ArrowUpRight,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { Logo } from '@/components/Logo';

export default function Home() {
  const { member, fetchMember } = useAppStore();
  const [products, setProducts] = useState<any[]>([]);
  const [transactionsUI, setTransactionsUI] = useState(5000);
  const [fee, setFee] = useState(1000);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState<any>(null);

  const [activeTab, setActiveTab] = useState<'home' | 'history' | 'account'>('home');
  const [memberTransactions, setMemberTransactions] = useState<any[]>([]);

  useEffect(() => {
    const init = async () => {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      if (data.authenticated) {
        setSession(data.user);
        fetchMember(); // This will fetch via zustand which I should also update to use session
      }

      const [resP, resT] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/transactions')
      ]);
      const pData = await resP.json();
      const tData = await resT.json();

      setProducts(pData);
      if (data.authenticated) {
        setMemberTransactions(tData.filter((t: any) => t.memberId === data.user.id));
      }
    };
    init();
  }, [fetchMember]);

  const potentialRevenue = useMemo(() => transactionsUI * fee, [transactionsUI, fee]);

  const handlePay = async () => {
    if (!scanResult || !member) return;
    setIsLoading(true);
    try {
      const res = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          memberId: member.id,
          partnerId: scanResult.partnerId,
          totalAmount: scanResult.price,
          pointsEarned: Math.floor(scanResult.price / 1000)
        })
      });
      if (res.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          setScanResult(null);
          fetchMember();
        }, 3000);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

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
          <div className="flex items-center gap-3">
            <Logo size={18} />
            <span className="text-2xl font-black text-slate-900 tracking-tighter">KOPWARUNG<span className="text-emerald-500">.</span></span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-bold text-slate-500">
            <a href="#solusi" className="hover:text-emerald-600 transition-colors">Solusi</a>
            <a href="#mockup" className="hover:text-emerald-600 transition-colors">Demo</a>
            <a href="#biaya" className="hover:text-emerald-600 transition-colors">Estimasi Biaya</a>
            {!session ? (
              <Link href="/login" className="px-6 py-2 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-all">Masuk</Link>
            ) : (
              <Link href={session.role === 'ADMIN' ? '/dashboard' : (session.role === 'PARTNER' ? '/mitra' : '/')} className="text-emerald-600 border-b-2 border-emerald-600 pb-1 flex items-center gap-2">
                <ShieldCheck size={14} /> {session.role === 'ADMIN' ? 'Dashboard Admin' : 'App Saya'}
              </Link>
            )}
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
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://github.com/errorcript/koperasi-digital/releases"
                target="_blank"
                className="px-8 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-emerald-600 transition-all shadow-xl flex items-center justify-center gap-2 group"
              >
                <Download size={20} className="group-hover:bounce" /> Unduh APK (Beta)
              </a>
              <Link href="/mitra/register" className="px-8 py-4 bg-white border border-slate-200 text-slate-900 font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
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
              <div className="bg-slate-900 p-6 pt-12 text-white pb-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                <div className="flex justify-between items-center mb-6 relative z-10">
                  <div>
                    <p className="text-[10px] uppercase font-black tracking-widest opacity-60 mb-1 leading-none">Anggota {member?.role || 'Basic'}.</p>
                    <p className="text-xl font-black">{member?.name || 'Halo, Mitra'}</p>
                  </div>
                  <Logo size={20} className="shadow-none border border-white/20" />
                </div>
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 flex justify-between items-center relative z-10 shadow-2xl">
                  <div>
                    <p className="text-[10px] uppercase font-black tracking-widest text-emerald-400 mb-1">Saldo Koperasi</p>
                    <p className="text-2xl font-black">Rp {(member?.balance || 0).toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] uppercase font-black tracking-widest text-amber-400 mb-1">Poin</p>
                    <p className="text-xl font-black">{member?.points || 0}</p>
                  </div>
                </div>
              </div>

              {/* App Features */}
              <div className="p-4 bg-white h-full relative z-20 -mt-6 rounded-t-[30px]">
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

                {/* Alfagift Style Content Area */}
                <div className="flex-1 overflow-y-auto px-4 pb-24 scrollbar-hide pt-4">
                  <AnimatePresence mode="wait">
                    {activeTab === 'home' ? (
                      <motion.div
                        key="home"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        className="space-y-6"
                      >
                        {/* Promo Banner */}
                        <div className="relative h-32 w-full rounded-[28px] overflow-hidden bg-slate-900 group shadow-xl">
                          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-slate-900 opacity-90 transition-all group-hover:scale-110 duration-700"></div>
                          <div className="relative z-10 p-5 h-full flex flex-col justify-center">
                            <p className="text-[10px] font-black tracking-[0.2em] text-emerald-400 uppercase mb-1">PROMO HARI INI</p>
                            <h4 className="text-white font-black text-sm uppercase leading-tight mb-2">Diskon 10% Belanja<br /> di Warung Pak Eko!</h4>
                            <div className="flex items-center gap-2">
                              <span className="text-[8px] bg-white/20 text-white px-2 py-0.5 rounded-full font-black uppercase tracking-widest leading-none">Berakhir: 2 Jm Lagi</span>
                            </div>
                          </div>
                          <div className="absolute bottom-[-10px] right-[-10px] opacity-10 rotate-12">
                            <Logo size={80} className="bg-transparent" />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-4 px-1">
                            <h3 className="font-extrabold text-xs uppercase tracking-tight text-slate-400">Paling Laris 🔥</h3>
                            <button className="text-[9px] text-emerald-600 font-black uppercase tracking-widest">Detail</button>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            {products.length > 0 ? products.map((p, i) => (
                              <div key={i} className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex flex-col group hover:shadow-lg hover:bg-white transition-all">
                                <div className="aspect-square bg-white rounded-xl mb-2 flex items-center justify-center text-3xl shadow-sm group-hover:scale-105 transition-transform relative overflow-hidden">
                                  {p.name.includes('Minyak') ? '🍳' : (p.name.includes('Beras') ? '🌾' : (p.name.includes('Gula') ? '🍬' : '📦'))}
                                  {i === 0 && <div className="absolute top-0 right-0 bg-red-500 text-white text-[8px] font-black px-2 py-1 rounded-bl-xl uppercase">Hot</div>}
                                </div>
                                <p className="text-[9px] font-black text-emerald-600 uppercase tracking-tighter mb-1 leading-none">{p.partner.shopName}</p>
                                <p className="text-xs font-bold text-slate-800 line-clamp-1 mb-1 leading-tight">{p.name}</p>
                                <div className="mt-auto">
                                  <p className="text-emerald-700 font-black text-sm">Rp {p.price.toLocaleString()}</p>
                                  {p.originalPrice && <p className="text-[9px] text-slate-400 line-through">Rp {p.originalPrice.toLocaleString()}</p>}
                                </div>
                              </div>
                            )) : (
                              [1, 2, 3, 4].map(i => <div key={i} className="aspect-[3/4] bg-slate-100 animate-pulse rounded-2xl"></div>)
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ) : activeTab === 'history' ? (
                      <motion.div
                        key="history"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="space-y-4"
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-extrabold text-xs uppercase tracking-tight text-slate-400">E-Statement 🧾</h3>
                        </div>
                        <div className="space-y-3">
                          {memberTransactions.length > 0 ? memberTransactions.map((tx, i) => (
                            <div key={i} className="bg-white border border-slate-100 p-4 rounded-3xl flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                              <div className="w-11 h-11 bg-slate-900 rounded-2xl flex items-center justify-center text-white p-2 shadow-lg group-hover:rotate-6 transition-transform">
                                <Logo size={12} className="bg-transparent shadow-none" />
                              </div>
                              <div className="flex-1">
                                <p className="text-[11px] font-black text-slate-900 leading-none mb-1">{tx.partner.shopName}</p>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }).format(new Date(tx.createdAt))}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-xs font-black text-slate-900 leading-none mb-1">Rp {tx.totalAmount.toLocaleString()}</p>
                                <span className="text-[8px] bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full font-black uppercase tracking-widest border border-emerald-100">Berhasil</span>
                              </div>
                            </div>
                          )) : (
                            <div className="py-20 text-center grayscale opacity-40">
                              <Logo size={40} className="mx-auto mb-4 bg-transparent" />
                              <p className="text-[10px] text-slate-900 font-black uppercase tracking-widest">Belum ada transaksi</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="account"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-6"
                      >
                        <div className="bg-slate-50 p-6 rounded-[32px] border border-slate-100 text-center">
                          <div className="w-16 h-16 bg-slate-900 rounded-[24px] mx-auto mb-4 flex items-center justify-center text-white text-xl font-black">
                            {member?.name?.slice(0, 1) || '?'}
                          </div>
                          <h4 className="font-black text-slate-900 mb-1">{member?.name || 'Guest User'}</h4>
                          <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Anggota {member?.role}</p>
                        </div>

                        <div className="space-y-2">
                          <button className="w-full p-4 bg-white border border-slate-100 rounded-2xl flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center"><Smartphone size={16} /></div>
                              <span className="text-xs font-bold text-slate-600">Pengaturan Akun</span>
                            </div>
                            <ChevronRight size={16} className="text-slate-300" />
                          </button>
                          <button className="w-full p-4 bg-white border border-slate-100 rounded-2xl flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center"><HelpCircle size={16} /></div>
                              <span className="text-xs font-bold text-slate-600">Pusat Bantuan</span>
                            </div>
                            <ChevronRight size={16} className="text-slate-300" />
                          </button>
                          <button
                            onClick={async () => {
                              await fetch('/api/auth/logout', { method: 'POST' });
                              window.location.reload();
                            }}
                            className="w-full p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 mt-4"
                          >
                            <div className="w-8 h-8 bg-white text-red-600 rounded-xl flex items-center justify-center shadow-sm"><LogOut size={16} /></div>
                            <span className="text-xs font-black text-red-600 uppercase tracking-widest">Keluar Aplikasi</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* App Navigation */}
              <div className="absolute bottom-0 w-full h-16 bg-white border-t border-slate-100 flex items-center justify-around z-30">
                <button
                  onClick={() => {
                    setScanResult(null);
                    setActiveTab('home');
                  }}
                  className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'home' && !scanResult ? 'text-emerald-600 scale-110' : 'text-slate-300'}`}
                >
                  <ShoppingBag size={18} />
                  <span className="text-[8px] font-black uppercase tracking-tighter">Katalog</span>
                </button>
                <div className="text-slate-300 flex flex-col items-center gap-1">
                  <MapPin size={18} />
                  <span className="text-[8px] font-black uppercase tracking-tighter">Lokasi</span>
                </div>
                <button
                  onClick={() => {
                    setIsScanning(true);
                  }}
                  className="w-12 h-12 bg-slate-900 rounded-full -mt-10 border-4 border-white flex items-center justify-center text-white shadow-xl hover:scale-110 active:scale-95 transition-all"
                >
                  <Logo size={14} className="bg-transparent shadow-none" />
                </button>
                <button
                  onClick={() => {
                    setScanResult(null);
                    setActiveTab('history');
                  }}
                  className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'history' ? 'text-emerald-600 scale-110' : 'text-slate-300'}`}
                >
                  <CreditCard size={18} />
                  <span className="text-[8px] font-black uppercase tracking-tighter">Riwayat</span>
                </button>
                <button
                  onClick={() => {
                    setScanResult(null);
                    setActiveTab('account');
                  }}
                  className={`flex flex-col items-center gap-1 transition-all ${activeTab === 'account' ? 'text-emerald-600 scale-110' : 'text-slate-300'}`}
                >
                  <Users size={18} />
                  <span className="text-[8px] font-black uppercase tracking-tighter">Akun</span>
                </button>
              </div>

              {/* QR Scanner Simulation Overlay */}
              <AnimatePresence>
                {isScanning && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-slate-900 z-[100] flex flex-col items-center justify-center p-8 text-center"
                  >
                    <div className="w-full aspect-square border-2 border-emerald-500 rounded-3xl relative overflow-hidden mb-8 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                      <motion.div
                        animate={{ top: ['0%', '100%', '0%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        className="absolute left-0 w-full h-1 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)] z-10"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-20">
                        <Logo size={80} className="bg-transparent" />
                      </div>
                    </div>
                    <h3 className="text-white font-black text-lg mb-2">Scan QR Warung</h3>
                    <p className="text-slate-400 text-xs mb-8 uppercase tracking-widest font-bold">Arahkan kamera ke QR mitra</p>

                    <div className="grid grid-cols-1 gap-3 w-full">
                      <p className="text-[10px] text-slate-500 font-bold mb-2 uppercase tracking-widest">Demo: Pilih Produk</p>
                      {products.slice(0, 3).map((p) => (
                        <button
                          key={p.id}
                          onClick={() => {
                            setScanResult(p);
                            setIsScanning(false);
                          }}
                          className="w-full py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black text-white hover:bg-white/10 transition-all uppercase tracking-widest"
                        >
                          {p.partner.shopName} - {p.name}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setIsScanning(false)}
                      className="mt-8 text-white/40 text-xs font-bold uppercase tracking-widest"
                    >
                      Batal
                    </button>
                  </motion.div>
                )}

                {/* Confirm Payment Modal */}
                {scanResult && !showSuccess && (
                  <motion.div
                    initial={{ y: '100%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '100%' }}
                    className="absolute inset-x-0 bottom-0 bg-white z-[110] rounded-t-[40px] shadow-[0_-20px_50px_rgba(0,0,0,0.1)] p-8 border-t border-slate-100"
                  >
                    <div className="w-12 h-1.5 bg-slate-100 rounded-full mx-auto mb-8" />
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                        <Store size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{scanResult.partner.shopName}</p>
                        <h4 className="text-lg font-black text-slate-900 leading-none">{scanResult.name}</h4>
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-3xl p-6 mb-8">
                      <div className="flex justify-between mb-2">
                        <span className="text-xs font-bold text-slate-400">Harga Produk</span>
                        <span className="text-xs font-black text-slate-900">Rp {scanResult.price.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between mb-4 pb-4 border-b border-slate-200">
                        <span className="text-xs font-bold text-slate-400">Admin Koperasi</span>
                        <span className="text-xs font-black text-emerald-600">Rp 1,000</span>
                      </div>
                      <div className="flex justify-between items-center text-slate-900">
                        <span className="text-sm font-black uppercase tracking-widest">Total Bayar</span>
                        <span className="text-2xl font-black italic">Rp {(scanResult.price + 1000).toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => setScanResult(null)}
                        className="flex-1 py-5 bg-slate-50 text-slate-400 font-black rounded-2xl uppercase tracking-widest text-[10px]"
                      >
                        Batal
                      </button>
                      <button
                        onClick={handlePay}
                        disabled={isLoading}
                        className="flex-[2] py-5 bg-slate-900 text-white font-black rounded-2xl uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 shadow-xl"
                      >
                        {isLoading ? 'Memproses...' : 'Konfirmasi Bayar'}
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Success Animation */}
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 bg-emerald-600 z-[120] flex flex-col items-center justify-center text-center p-8 text-white"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', damping: 10, stiffness: 100, delay: 0.2 }}
                      className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-8 shadow-2xl"
                    >
                      <CheckCircle2 size={48} className="text-white" />
                    </motion.div>
                    <h2 className="text-3xl font-black mb-4 uppercase tracking-tighter">Pembayaran Berhasil!</h2>
                    <p className="text-emerald-100 font-bold uppercase tracking-widest text-[10px] mb-8">Terima kasih telah memberdayakan warung lokal.</p>
                    <div className="py-3 px-6 bg-white/10 rounded-full font-black text-xs uppercase tracking-widest">
                      +{Math.floor(scanResult.price / 1000)} Poin Koperasi
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Decorative Blobs */}
            <div className="absolute -z-10 top-20 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-emerald-100 rounded-full blur-[100px] opacity-60"></div>
          </motion.div >
        </div >
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
                      value={transactionsUI}
                      onChange={(e) => setTransactionsUI(parseInt(e.target.value))}
                      className="w-full h-3 bg-emerald-700 rounded-lg appearance-none cursor-pointer accent-white"
                    />
                    <div className="flex justify-between mt-4">
                      <span className="text-3xl font-black">{transactionsUI.toLocaleString()} <span className="text-sm font-medium opacity-60">tx / bln</span></span>
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
                  *Dengan target {transactionsUI.toLocaleString()} transaksi per bulan, pengerjaan aplikasi senilai Rp 60jt dapat balik modal (BEP) dalam waktu {(60000000 / potentialRevenue).toFixed(1)} bulan.
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
                <div className="w-12 h-12 rounded-full bg-white border-4 border-white shadow-lg z-10 shrink-0"></div>
                <div className="flex-1 bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm transition-all hover:shadow-xl">
                  <span className={`text-[10px] font-black uppercase text-white px-3 py-1 rounded-full ${step.color} mb-3 inline-block`}>{step.phase}</span>
                  <h4 className="text-xl font-bold mb-2">{step.title}</h4>
                  <p className="text-sm text-slate-500">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile App Focus Section */}
      <section className="py-24 bg-white relative overflow-hidden" id="get-app">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="bg-slate-900 rounded-[64px] p-12 md:p-24 text-white flex flex-col md:flex-row items-center justify-between gap-16 shadow-[0_50px_100px_-20px_rgba(15,23,42,0.5)] border border-white/10">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Miliki Aplikasi <br /><span className="text-emerald-400">Di Genggaman</span></h2>
              <p className="text-slate-400 text-lg mb-12 max-w-xl">Aplikasi KopWarung sekarang tersedia dalam dua pilihan instalasi. Langsung lewat browser (PWA) atau download file APK melalui GitHub.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-8 bg-white/5 rounded-[32px] border border-white/10 flex flex-col justify-between hover:bg-white/10 transition-all">
                  <div>
                    <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-500/20">
                      <Zap size={24} />
                    </div>
                    <h4 className="text-xl font-black mb-2">Instan (PWA)</h4>
                    <p className="text-xs text-slate-500 leading-relaxed italic mb-8">Paling direkomendasikan. Langsung muncul di menu HP tanpa download file besar.</p>
                  </div>
                  <button
                    onClick={() => {
                      // Trigger custom PWA prompt
                      window.dispatchEvent(new Event('beforeinstallprompt'));
                    }}
                    className="w-full py-4 bg-white text-slate-900 font-black rounded-2xl uppercase tracking-widest text-[10px] items-center gap-2 flex justify-center"
                  >
                    <Smartphone size={14} /> Pasang via Browser
                  </button>
                </div>

                <div className="p-8 bg-white/5 rounded-[32px] border border-white/10 flex flex-col justify-between hover:bg-white/10 transition-all">
                  <div>
                    <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-500/20">
                      <Download size={24} />
                    </div>
                    <h4 className="text-xl font-black mb-2">Build GitHub (APK)</h4>
                    <p className="text-xs text-slate-500 leading-relaxed italic mb-8">Download manual file Android APK yang diproduksi otomatis oleh GitHub Actions.</p>
                  </div>
                  <a
                    href="https://github.com/errorcript/koperasi-digital/releases"
                    target="_blank"
                    className="w-full py-4 bg-emerald-600 text-white font-black rounded-2xl uppercase tracking-widest text-[10px] items-center gap-2 flex justify-center"
                  >
                    <Logo size={12} className="bg-transparent shadow-none" /> Unduh APK Sekarang
                  </a>
                </div>
              </div>
            </div>

            <div className="w-full md:w-[350px] relative hidden lg:block">
              <div className="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full"></div>
              <div className="relative border-[8px] border-white/10 rounded-[40px] overflow-hidden shadow-2xl skew-y-3 rotate-3 hover:rotate-0 hover:skew-y-0 transition-all duration-700">
                <img src="/launcher-icon.png" alt="KopWarung App" className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-20 bg-slate-50 border-t border-slate-200 text-center">
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-4">Gaskan Proyek Ini Sekarang</p>
        <h2 className="text-3xl font-black mb-8 px-6">Siap Bangun Ekosistem Koperasi Masa Depan?</h2>
        <div className="flex flex-col items-center gap-6">
          <div className="flex justify-center gap-4">
            <button className="px-10 py-5 bg-emerald-600 text-white font-black rounded-[24px] shadow-2xl shadow-emerald-200 hover:scale-105 transition-all">
              Mulai Diskusi Teknis
            </button>
          </div>
          <div className="mt-8">
            <p className="text-sm font-bold text-slate-400 mb-2">WHATSAPP DISKUSI NEOMA (BREE)</p>
            <a href="https://wa.me/6287734547944" target="_blank" className="text-2xl font-black text-slate-900 border-b-4 border-emerald-500 hover:text-emerald-600 transition-all">
              +62 877-3454-7944
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
