'use client';

import {
    Users,
    Store,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight,
    Calendar,
    Search,
    Settings,
    Bell,
    MoreVertical,
    Activity,
    ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Dashboard() {
    const stats = [
        { label: 'Total Anggota', value: '1,284', change: '+12%', icon: <Users className="text-blue-600" />, bg: 'bg-blue-50' },
        { label: 'Total Mitra Warung', value: '42', change: '+3', icon: <Store className="text-amber-600" />, bg: 'bg-amber-50' },
        { label: 'Revenue Hari Ini', value: 'Rp 842,500', change: '+24%', icon: <DollarSign className="text-emerald-600" />, bg: 'bg-emerald-50' },
        { label: 'Total Transaksi', value: '12,490', change: '+5%', icon: <Activity className="text-purple-600" />, bg: 'bg-purple-50' }
    ];

    const recentTransactions = [
        { id: 'TX-001', member: 'Budi Santoso', warung: 'Warung Barokah', amount: 'Rp 45,000', fee: 'Rp 1,000', status: 'Success', time: '10:24' },
        { id: 'TX-002', member: 'Siti Aminah', warung: 'Toko Makmur', amount: 'Rp 120,000', fee: 'Rp 1,000', status: 'Success', time: '10:15' },
        { id: 'TX-003', member: 'Andi Wijaya', warung: 'Warung Barokah', amount: 'Rp 15,000', fee: 'Rp 500', status: 'Pending', time: '10:02' },
        { id: 'TX-004', member: 'Lina Marlina', warung: 'Sembako Jaya', amount: 'Rp 64,500', fee: 'Rp 1,000', status: 'Success', time: '09:55' }
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar (Simple Mock) */}
            <aside className="w-64 bg-white border-r border-slate-200 hidden lg:flex flex-col">
                <div className="p-6 border-b border-slate-100 mb-6">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-8 h-8 bg-emerald-600 rounded-lg"></div>
                        <span className="font-black text-xl text-slate-900 tracking-tight">KOP-DIGI</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Admin Control</p>
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
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${item.active
                                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-100'
                                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
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
                    <h1 className="text-xl font-bold text-slate-800">Dashboard Overview</h1>
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder="Cari transaksi..."
                                className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm w-64 focus:ring-2 ring-emerald-500 transition-all outline-none"
                            />
                        </div>
                        <button className="relative w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600">
                            <Bell size={20} />
                            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
                        </button>
                        <div className="w-10 h-10 bg-slate-900 rounded-full"></div>
                    </div>
                </header>

                <div className="p-8 max-w-7xl mx-auto space-y-8">
                    {/* Stats Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, idx) => (
                            <motion.div
                                key={idx}
                                whileHover={{ y: -5 }}
                                className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-3 rounded-2xl ${stat.bg}`}>
                                        {stat.icon}
                                    </div>
                                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${stat.change.startsWith('+') ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
                                        {stat.change}
                                    </span>
                                </div>
                                <p className="text-slate-400 text-sm mb-1">{stat.label}</p>
                                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Transaction Table */}
                        <div className="lg:col-span-2 bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                                <h3 className="font-bold text-slate-900">Transaksi Terakhir</h3>
                                <button className="text-emerald-600 text-sm font-bold flex items-center gap-1 hover:underline">
                                    Lihat Semua <ChevronRight size={16} />
                                </button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="text-xs text-slate-400 uppercase tracking-widest bg-slate-50">
                                            <th className="px-6 py-4 font-bold">Anggota</th>
                                            <th className="px-6 py-4 font-bold">Warung</th>
                                            <th className="px-6 py-4 font-bold">Nominal</th>
                                            <th className="px-6 py-4 font-bold">Fee</th>
                                            <th className="px-6 py-4 font-bold">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {recentTransactions.map((tx) => (
                                            <tr key={tx.id} className="text-sm hover:bg-slate-50/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <p className="font-bold text-slate-900">{tx.member}</p>
                                                    <p className="text-xs text-slate-400">{tx.time}</p>
                                                </td>
                                                <td className="px-6 py-4 text-slate-600 font-medium">{tx.warung}</td>
                                                <td className="px-6 py-4 font-bold text-slate-900">{tx.amount}</td>
                                                <td className="px-6 py-4 text-emerald-600 font-bold">{tx.fee}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${tx.status === 'Success' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                                                        }`}>
                                                        {tx.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Right Panel: Top Mitra */}
                        <div className="bg-slate-900 text-white rounded-[32px] p-8 shadow-xl relative overflow-hidden">
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-6">Top Mitra Warung</h3>
                                <div className="space-y-6">
                                    {[
                                        { name: "Warung Barokah", tx: "142 tx", color: "bg-emerald-500" },
                                        { name: "Toko Sembako Makmur", tx: "98 tx", color: "bg-blue-500" },
                                        { name: "Mitra Jaya Abadi", tx: "76 tx", color: "bg-amber-500" }
                                    ].map((mitra, i) => (
                                        <div key={i} className="flex items-center gap-4">
                                            <div className={`w-12 h-12 ${mitra.color} rounded-2xl flex items-center justify-center font-bold text-white text-lg`}>
                                                {i + 1}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-bold">{mitra.name}</p>
                                                <p className="text-xs text-slate-400">{mitra.tx} minggu ini</p>
                                            </div>
                                            <div className="text-emerald-400">
                                                <ArrowUpRight size={20} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-12 p-6 bg-white/5 rounded-[24px] border border-white/10">
                                    <p className="text-slate-400 text-sm mb-2">Estimasi Settlement Besok</p>
                                    <p className="text-3xl font-black text-emerald-400 leading-none">Rp 24,150,000</p>
                                </div>
                            </div>
                            {/* Background decor */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600/20 blur-[80px] -mr-16 -mt-16 rounded-full"></div>
                        </div>
                    </div>

                    {/* Partner Management Quick View */}
                    <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-slate-900">Status Mitra Warung</h3>
                            <Link href="/mitra/register" className="text-xs font-bold text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full hover:bg-emerald-100 transition-all">+ Tambah Mitra</Link>
                        </div>
                        <div className="space-y-4">
                            {[
                                { name: "Warung Barokah", status: "Active", volume: "Rp 4.2M", color: "bg-emerald-500" },
                                { name: "Toko Sembako Makmur", status: "Active", volume: "Rp 2.8M", color: "bg-emerald-500" },
                                { name: "Sembako Jaya", status: "Pending", volume: "-", color: "bg-amber-500" },
                                { name: "Toko Kelontong Siti", status: "Suspended", volume: "Rp 1.1M", color: "bg-red-500" }
                            ].map((m, i) => (
                                <div key={i} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-2xl transition-all border border-transparent hover:border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${m.color}`}></div>
                                        <span className="text-sm font-bold text-slate-800">{m.name}</span>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] font-black uppercase text-slate-400">{m.status}</p>
                                        <p className="text-xs font-bold text-slate-900">{m.volume}</p>
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

function LayoutDashboard({ size }: { size: number }) {
    return <Activity size={size} />;
}
