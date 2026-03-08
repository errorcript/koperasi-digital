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
    LayoutDashboard
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState, useMemo } from 'react';
import { Logo } from '@/components/Logo';

export default function Dashboard() {
    const [transactions, setTransactions] = useState<any[]>([]);
    const [partners, setPartners] = useState<any[]>([]);

    useEffect(() => {
        fetch('/api/transactions').then(res => res.json()).then(setTransactions);
        fetch('/api/partners').then(res => res.json()).then(setPartners);
    }, []);

    const totalRevenue = useMemo(() => {
        return transactions.reduce((acc, tx) => acc + tx.adminFee, 0);
    }, [transactions]);

    const stats = [
        { label: 'Total Anggota', value: '1', change: '+0', icon: <Users className="text-blue-600" />, bg: 'bg-blue-50' },
        { label: 'Total Mitra Warung', value: partners.length.toString(), change: `+${partners.length}`, icon: <Store className="text-amber-600" />, bg: 'bg-amber-50' },
        { label: 'Revenue Hari Ini', value: `Rp ${totalRevenue.toLocaleString()}`, change: '+100%', icon: <DollarSign className="text-emerald-600" />, bg: 'bg-emerald-50' },
        { label: 'Total Transaksi', value: transactions.length.toString(), change: `+${transactions.length}`, icon: <Activity className="text-purple-600" />, bg: 'bg-purple-50' }
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar (Simple Mock) */}
            <aside className="w-64 bg-slate-900 text-white hidden lg:flex flex-col">
                <div className="p-8 border-b border-white/5 mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <Logo size={20} className="bg-white p-1.5 shadow-none" />
                        <span className="font-black text-xl tracking-tighter">KOPWARUNG</span>
                    </div>
                    <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest pl-12">Admin Control</p>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    {[
                        { icon: <LayoutDashboard size={20} />, label: "Overview", active: true },
                        { icon: <Store size={20} />, label: "Mitra Warung" },
                        { icon: <Users size={20} />, label: "Anggota" },
                        { icon: <DollarSign size={20} />, label: "Settlement" },
                        { icon: <Settings size={20} />, label: "Konfigurasi" }
                    ].map((item, idx) => (
                        <button
                            key={idx}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-bold transition-all ${item.active
                                ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-900/40'
                                : 'text-slate-400 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            {item.icon}
                            {item.label}
                        </button>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-30">
                    <h1 className="text-xl font-black text-slate-900 tracking-tight">Dashboard Overview</h1>
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Cari transaksi..."
                                className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm w-64 focus:ring-2 ring-emerald-500 transition-all outline-none font-medium"
                            />
                        </div>
                        <button className="relative w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
                        </button>
                        <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white p-2">
                            <Logo size={14} className="bg-transparent shadow-none" />
                        </div>
                    </div>
                </header>

                <div className="p-8 max-w-7xl mx-auto space-y-8">
                    {/* Stats Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -5 }}
                                className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-4 rounded-2xl ${stat.bg} shadow-sm`}>
                                        {stat.icon}
                                    </div>
                                    <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                                        {stat.change}
                                    </span>
                                </div>
                                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</p>
                                <p className="text-2xl font-black text-slate-900 leading-none">{stat.value}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Transaction Table */}
                        <div className="lg:col-span-2 bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                                <h3 className="font-black text-slate-900">Transaksi Terakhir</h3>
                                <button className="text-emerald-600 text-xs font-black uppercase tracking-widest flex items-center gap-1 hover:underline">
                                    Lihat Semua <ChevronRight size={16} />
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="text-[10px] text-slate-400 uppercase font-black tracking-widest bg-slate-50">
                                            <th className="px-6 py-4">Anggota</th>
                                            <th className="px-6 py-4">Warung</th>
                                            <th className="px-6 py-4">Nominal</th>
                                            <th className="px-6 py-4 text-emerald-600">Fee</th>
                                            <th className="px-6 py-4">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {transactions.length > 0 ? transactions.map((tx) => (
                                            <tr key={tx.id} className="text-sm hover:bg-slate-50/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <p className="font-bold text-slate-900 leading-none mb-1">{tx.member.name}</p>
                                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{new Date(tx.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                                </td>
                                                <td className="px-6 py-4 text-slate-600 font-bold">{tx.partner.shopName}</td>
                                                <td className="px-6 py-4 font-black text-slate-900">Rp {tx.totalAmount.toLocaleString()}</td>
                                                <td className="px-6 py-4 text-emerald-600 font-black">Rp {tx.adminFee.toLocaleString()}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${tx.status === 'SUCCESS' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                                                        }`}>
                                                        {tx.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr><td colSpan={5} className="px-6 py-20 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">Belum ada transaksi real.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Right Panel: Top Mitra */}
                        <div className="bg-slate-900 text-white rounded-[40px] p-8 shadow-2xl relative overflow-hidden flex flex-col justify-between">
                            <div className="relative z-10">
                                <h3 className="text-xl font-black mb-8 tracking-tight">Top Mitra Warung</h3>
                                <div className="space-y-6">
                                    {partners.slice(0, 3).map((mitra, i) => (
                                        <div key={mitra.id} className="flex items-center gap-4">
                                            <div className={`w-12 h-12 ${i === 0 ? 'bg-emerald-500' : i === 1 ? 'bg-blue-500' : 'bg-amber-500'} rounded-2xl flex items-center justify-center font-black text-white text-lg shadow-lg`}>
                                                {i + 1}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-bold">{mitra.shopName}</p>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{mitra.transactionsCount || 0} transaksi</p>
                                            </div>
                                            <div className="text-emerald-400">
                                                <ArrowUpRight size={20} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-12 p-8 bg-white/5 rounded-[32px] border border-white/10 relative z-10 backdrop-blur-md">
                                <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">Estimasi Settlement</p>
                                <p className="text-3xl font-black text-white leading-none">Rp 2.4M</p>
                                <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500 mt-2">+12% vs Kemarin</p>
                            </div>

                            {/* Background decor */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 blur-[100px] -mr-32 -mt-32 rounded-full"></div>
                        </div>
                    </div>

                    {/* Partner Management Quick View */}
                    <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm p-8">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="font-black text-slate-900 text-lg">Status Ekosistem Mitra</h3>
                            <Link href="/mitra/register" className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-6 py-3 rounded-full hover:bg-emerald-100 transition-all shadow-sm">+ Tambah Mitra</Link>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {partners.map((m, i) => (
                                <div key={i} className="flex items-center justify-between p-5 bg-slate-50/50 hover:bg-white rounded-[24px] transition-all border border-transparent hover:border-slate-100 shadow-sm hover:shadow-xl">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-3 h-3 rounded-full ${m.status === 'ACTIVE' ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]'}`}></div>
                                        <div className="flex flex-col">
                                            <span className="text-sm font-black text-slate-900 leading-none mb-1">{m.shopName}</span>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{m.category}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 leading-none">{m.status}</p>
                                        <p className="text-xs font-black text-emerald-600 leading-none">Rp {m.feePerTx.toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
