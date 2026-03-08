'use client';

import {
    Users,
    Store,
    DollarSign,
    ArrowUpRight,
    Calendar,
    Search,
    Settings,
    Bell,
    Activity,
    ChevronRight,
    TrendingUp,
    Clock,
    Zap,
    LayoutDashboard,
    CreditCard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState, useMemo } from 'react';
import { Logo } from '@/components/Logo';

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState<'overview' | 'partners' | 'settlement'>('overview');
    const [partners, setPartners] = useState<any[]>([]);
    const [transactions, setTransactions] = useState<any[]>([]);
    const [stats, setStats] = useState({ totalBalance: 0, totalTransactions: 0, totalPartners: 0, totalMemberBalance: 0 });
    const [settlingId, setSettlingId] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            const [resP, resT, resM] = await Promise.all([
                fetch('/api/partners'),
                fetch('/api/transactions'),
                fetch('/api/member')
            ]);
            const p = await resP.json();
            const t = await resT.json();
            const m = await resM.json();

            setPartners(p);
            setTransactions(t);
            setStats({
                totalMemberBalance: m.balance,
                totalTransactions: t.length,
                totalPartners: p.length,
                totalBalance: t.reduce((acc: number, curr: any) => acc + curr.adminFee, 0)
            });
        } catch (e) {
            console.error("Failed to fetch dashboard data", e);
        }
    };

    const handleSettlement = (id: string) => {
        setSettlingId(id);
        setTimeout(() => {
            setSettlingId(null);
            fetchData();
        }, 2000);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans antialiased text-slate-900">
            {/* Sidebar */}
            <aside className="w-72 bg-slate-900 text-white hidden lg:flex flex-col sticky top-0 h-screen overflow-hidden">
                <div className="p-8 border-b border-white/5 mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <Logo size={20} className="bg-white p-1.5 shadow-none" />
                        <span className="font-black text-2xl tracking-tighter">KOPWARUNG</span>
                    </div>
                    <p className="text-[10px] text-emerald-400 font-black uppercase tracking-widest pl-12 opacity-80">Admin Console v1.0</p>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {[
                        { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
                        { id: 'partners', icon: Store, label: 'Management Mitra' },
                        { id: 'settlement', icon: CreditCard, label: 'Pencairan Dana' }
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id as any)}
                            className={`w-full flex items-center gap-4 px-6 py-4 rounded-3xl transition-all font-black uppercase tracking-[0.15em] text-[10px] ${activeTab === item.id
                                    ? 'bg-emerald-600 text-white shadow-2xl shadow-emerald-900/40'
                                    : 'text-slate-500 hover:bg-white/5 hover:text-slate-300'
                                }`}
                        >
                            <item.icon size={18} /> {item.label}
                        </button>
                    ))}
                </nav>

                <div className="p-8 bg-white/5 border-t border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-emerald-500 flex items-center justify-center font-black text-white shadow-lg">NB</div>
                        <div>
                            <p className="text-xs font-black">Neoma Admin</p>
                            <p className="text-[10px] text-slate-500 font-bold">Manager</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="h-24 bg-white/80 backdrop-blur-md border-b border-slate-200 px-10 flex items-center justify-between shrink-0 z-40">
                    <div>
                        <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none mb-1 capitalize">{activeTab} Dashboard</h1>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Real-time Financial Monitor</p>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Cari transaksi atau mitra..."
                                className="pl-12 pr-6 py-3 bg-slate-100 border-none rounded-2xl text-xs w-72 focus:ring-4 ring-emerald-500/10 transition-all outline-none font-bold"
                            />
                        </div>
                        <button className="relative w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-4 border-white rounded-full"></span>
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-10 scrollbar-hide">
                    <AnimatePresence mode="wait">
                        {activeTab === 'overview' ? (
                            <motion.div
                                key="overview"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-10"
                            >
                                {/* Stats Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {[
                                        { label: 'Total Sisa Saldo Koperasi', value: `Rp ${stats.totalMemberBalance.toLocaleString()}`, color: 'bg-emerald-500' },
                                        { label: 'Admin Fee Terkumpul', value: `Rp ${stats.totalBalance.toLocaleString()}`, color: 'bg-slate-900' },
                                        { label: 'Volume Transaksi', value: stats.totalTransactions.toLocaleString(), color: 'bg-blue-600' },
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-white p-8 rounded-[48px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden">
                                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">{stat.label}</p>
                                            <p className="text-4xl font-black text-slate-900 group-hover:scale-105 transition-transform origin-left tracking-tighter">{stat.value}</p>
                                            <div className={`absolute bottom-0 left-0 h-1.5 w-full ${stat.color}`}></div>
                                        </div>
                                    ))}
                                </div>

                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                                    {/* Recent Transactions */}
                                    <div className="lg:col-span-2 bg-white rounded-[48px] p-10 border border-slate-100 shadow-sm">
                                        <div className="flex justify-between items-center mb-10">
                                            <h3 className="text-xl font-black text-slate-900">Recent Transactions</h3>
                                            <button className="text-[10px] font-black uppercase text-emerald-600 px-4 py-2 bg-emerald-50 rounded-full">View All</button>
                                        </div>
                                        <div className="space-y-6">
                                            {transactions.length > 0 ? transactions.slice(0, 5).map((tx) => (
                                                <div key={tx.id} className="flex items-center justify-between p-6 bg-slate-50/50 rounded-[32px] hover:bg-white hover:shadow-xl transition-all group">
                                                    <div className="flex items-center gap-5">
                                                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-xl font-black text-slate-900">
                                                            {tx.partner.shopName[0]}
                                                        </div>
                                                        <div>
                                                            <p className="font-black text-slate-900 text-sm leading-none mb-1">{tx.partner.shopName}</p>
                                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{tx.member.name}</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-lg font-black text-slate-900 leading-none mb-1">Rp {tx.totalAmount.toLocaleString()}</p>
                                                        <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest leading-none">Fee: +Rp {tx.adminFee.toLocaleString()}</p>
                                                    </div>
                                                </div>
                                            )) : (
                                                <div className="py-20 text-center opacity-40 grayscale">
                                                    <Logo size={40} className="mx-auto mb-4 bg-transparent" />
                                                    <p className="text-xs font-black uppercase tracking-widest">No Active Transactions</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Sidebar Panel */}
                                    <div className="space-y-8">
                                        <div className="bg-slate-900 text-white rounded-[48px] p-10 shadow-2xl relative overflow-hidden flex flex-col justify-between h-fit group">
                                            <div className="relative z-10">
                                                <h3 className="text-xl font-black tracking-tight mb-8">Top Performance</h3>
                                                <div className="space-y-8">
                                                    {partners.slice(0, 3).sort((a, b) => (b.transactionsCount || 0) - (a.transactionsCount || 0)).map((m, i) => (
                                                        <div key={i} className="flex items-center gap-4">
                                                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-white ${i === 0 ? 'bg-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.5)]' : 'bg-white/10'}`}>
                                                                {i + 1}
                                                            </div>
                                                            <div className="flex-1">
                                                                <p className="text-sm font-black leading-none mb-1">{m.shopName}</p>
                                                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{(m.transactionsCount || 0).toLocaleString()} TX</p>
                                                            </div>
                                                            <ArrowUpRight size={18} className="text-emerald-500" />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] -mr-32 -mt-32 rounded-full group-hover:scale-125 transition-transform duration-1000"></div>
                                        </div>

                                        <div className="bg-white rounded-[48px] p-10 border border-slate-100 shadow-sm relative overflow-hidden">
                                            <h3 className="font-black text-slate-900 mb-8 flex items-center gap-3">
                                                <Zap size={20} className="text-amber-500" /> Live Feed
                                            </h3>
                                            <div className="space-y-8 relative">
                                                {transactions.slice(0, 4).map((tx, i) => (
                                                    <div key={i} className="flex gap-4 items-start relative pb-8 last:pb-0 border-l border-slate-100 pl-8 ml-2">
                                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute -left-[5px] top-1 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                                                        <div className="flex flex-col">
                                                            <p className="text-[11px] font-bold text-slate-900 leading-tight mb-1">
                                                                {tx.member.name} <span className="text-slate-400 font-medium">belanja di </span> {tx.partner.shopName}
                                                            </p>
                                                            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Rp {tx.totalAmount.toLocaleString()}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                                {transactions.length === 0 && <p className="text-[10px] text-slate-400 font-bold uppercase text-center py-4">Waiting for data...</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ) : activeTab === 'partners' ? (
                            <motion.div
                                key="partners"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <div className="flex justify-between items-center bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm">
                                    <div>
                                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Management Mitra</h2>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Total {partners.length} Unit Usaha Terdaftar</p>
                                    </div>
                                    <Link href="/mitra/register" className="bg-slate-900 text-white px-10 py-5 rounded-[24px] font-black uppercase tracking-widest text-xs shadow-2xl shadow-slate-200">Tambah Mitra Baru</Link>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {partners.map((partner) => (
                                        <div key={partner.id} className="p-10 bg-white rounded-[48px] border border-slate-100 hover:shadow-2xl transition-all group">
                                            <div className="flex justify-between items-start mb-8">
                                                <div className="w-20 h-20 bg-slate-50 rounded-[32px] flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
                                                    {partner.category === 'MAKANAN' ? '🍜' : '🏪'}
                                                </div>
                                                <div className="px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600 border border-emerald-100">
                                                    ACTIVE
                                                </div>
                                            </div>
                                            <h4 className="text-2xl font-black text-slate-900 mb-1">{partner.shopName}</h4>
                                            <p className="text-sm font-medium text-slate-400 mb-8 line-clamp-1">{partner.address}</p>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="p-4 bg-slate-50 rounded-[28px] border border-slate-100">
                                                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1 leading-none text-center">TRANSAKSI</p>
                                                    <p className="text-2xl font-black text-slate-900 text-center">{partner.transactionsCount || 0}</p>
                                                </div>
                                                <div className="p-4 bg-emerald-500 rounded-[28px] text-white">
                                                    <p className="text-[8px] font-black uppercase tracking-widest mb-1 leading-none text-center opacity-70">KOMISI</p>
                                                    <p className="text-lg font-black text-center line-clamp-1 tracking-tighter">Rp {((partner.transactionsCount || 0) * 1000).toLocaleString()}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="settlement"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="bg-white rounded-[48px] p-12 border border-slate-100 shadow-sm"
                            >
                                <div className="mb-12">
                                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Settlement Queue</h2>
                                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-1">Selesaikan Pencairan Dana Mitra Warung</p>
                                </div>

                                <div className="space-y-6">
                                    {partners.map((partner) => (
                                        <div key={partner.id} className="bg-slate-50 p-10 rounded-[40px] border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-10 group hover:bg-white hover:shadow-2xl transition-all">
                                            <div className="flex gap-8 items-center">
                                                <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-3xl shadow-sm group-hover:rotate-12 transition-transform">
                                                    🏦
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-black text-slate-900 mb-1">{partner.shopName}</h4>
                                                    <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] leading-none">BNI Account • **** 9087</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-12 text-center md:text-right">
                                                <div>
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 leading-none">Saldo Belum Dicairkan</p>
                                                    <p className="text-3xl font-black text-slate-900 tracking-tighter">Rp {((partner.transactionsCount || 0) * 1000).toLocaleString()}</p>
                                                </div>
                                                <button
                                                    onClick={() => handleSettlement(partner.id)}
                                                    disabled={settlingId === partner.id || (partner.transactionsCount || 0) === 0}
                                                    className={`px-10 py-5 rounded-[24px] font-black uppercase tracking-widest text-[10px] transition-all ${settlingId === partner.id
                                                            ? 'bg-emerald-600 text-white animate-pulse'
                                                            : (partner.transactionsCount || 0) === 0
                                                                ? 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-50'
                                                                : 'bg-slate-900 text-white shadow-2xl shadow-slate-300 hover:scale-105 active:scale-95'
                                                        }`}
                                                >
                                                    {settlingId === partner.id ? 'Processing...' : 'Transfer Sekarang'}
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
}
