'use client';

import {
    Store,
    ArrowLeft,
    Plus,
    ClipboardList,
    CreditCard,
    History,
    Bell,
    ArrowRight,
    ChevronRight,
    TrendingUp,
    Wallet
} from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Logo } from '@/components/Logo';

export default function MitraApp() {
    return (
        <div className="min-h-screen bg-[#f1f5f9] flex items-center justify-center p-4">
            <div className="max-w-[400px] w-full bg-white rounded-[48px] shadow-2xl border-[8px] border-slate-900 overflow-hidden relative aspect-[9/19.5]">

                {/* Status Bar Mockup */}
                <div className="h-12 bg-white flex justify-between items-center px-10 pt-4">
                    <span className="text-sm font-bold">13:24</span>
                    <div className="flex gap-1.5">
                        <div className="w-4 h-4 rounded-full bg-slate-200"></div>
                        <div className="w-4 h-4 rounded-full bg-slate-200"></div>
                    </div>
                </div>

                {/* Content Wrapper */}
                <div className="p-8 h-full overflow-y-auto pb-24 relative">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-3">
                            <Logo size={14} className="bg-slate-900 p-1 shadow-none" />
                            <div>
                                <h1 className="text-lg font-black text-slate-900 leading-none mb-1">Warung Barokah</h1>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Mitra ID #0421</p>
                            </div>
                        </div>
                        <button className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 relative">
                            <Bell size={18} />
                            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
                        </button>
                    </div>

                    {/* Wallet Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-slate-900 rounded-[32px] p-6 text-white mb-8 relative overflow-hidden shadow-2xl"
                    >
                        <div className="relative z-10">
                            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-2 opacity-60">Komisi Terkumpul</p>
                            <p className="text-3xl font-black mb-6 leading-none tracking-tight">Rp 1.482.000</p>
                            <div className="flex gap-3">
                                <button className="flex-1 py-3 bg-emerald-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20">
                                    <Wallet size={16} /> Tarik Saldo
                                </button>
                            </div>
                        </div>
                        {/* Decor */}
                        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl"></div>
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Logo size={40} className="bg-transparent" />
                        </div>
                    </motion.div>

                    {/* Actions Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-white rounded-3xl p-6 flex flex-col items-center justify-center text-center border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                            <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-white mb-3 shadow-lg shadow-amber-200 group-hover:scale-110 transition-transform">
                                <Plus size={24} />
                            </div>
                            <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest leading-tight">Input Transaksi</p>
                        </div>
                        <div className="bg-white rounded-3xl p-6 flex flex-col items-center justify-center text-center border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                            <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white mb-3 shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
                                <History size={24} />
                            </div>
                            <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest leading-tight">Riwayat Sales</p>
                        </div>
                    </div>

                    {/* Sales Summary Mini Chart Concept */}
                    <div className="bg-white border border-slate-100 rounded-[32px] p-6 mb-8 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-black text-slate-900 text-xs uppercase tracking-widest">Target Pekanan</h3>
                            <TrendingUp size={16} className="text-emerald-500" />
                        </div>
                        <div className="w-full h-3 bg-slate-50 border border-slate-100 rounded-full overflow-hidden mb-3">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '75%' }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="h-full bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                            ></motion.div>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest">75% Tercapai</p>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Rp 12,000,000</p>
                        </div>
                    </div>

                    {/* Recent Payments Section */}
                    <div className="pb-12">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-black text-slate-900 text-xs uppercase tracking-widest">Transaksi Terakhir</h3>
                            <button className="text-[10px] font-black uppercase text-emerald-600 tracking-widest">Semua</button>
                        </div>
                        <div className="space-y-4">
                            {[
                                { name: "Siti Aminah", amount: "Rp 120,500", time: "14:10" },
                                { name: "Budi Santoso", amount: "Rp 15,000", time: "12:45" },
                                { name: "Andi Wijaya", amount: "Rp 64,000", time: "11:20" }
                            ].map((tx, i) => (
                                <div key={i} className="flex items-center gap-4 bg-slate-50/50 p-4 rounded-2xl border border-transparent hover:border-slate-200 hover:bg-white hover:shadow-lg transition-all cursor-pointer">
                                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-900 font-black text-xs border border-slate-100">
                                        {tx.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-black text-slate-900 leading-none mb-1">{tx.name}</p>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mt-1">Pukul {tx.time}</p>
                                    </div>
                                    <p className="text-sm font-black text-slate-900">{tx.amount}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Navigation */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-white/90 backdrop-blur-2xl border-t border-slate-100 flex items-center justify-around px-8 pb-4 z-40">
                    <div className="flex flex-col items-center gap-1.5 text-slate-900">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-900 text-white shadow-lg">
                            <Logo size={10} className="bg-transparent shadow-none p-0" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest leading-none">Home</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 text-slate-300 hover:text-slate-900 transition-colors">
                        <ClipboardList size={22} />
                        <span className="text-[10px] font-black uppercase tracking-widest leading-none">Orders</span>
                    </div>
                    <div className="flex flex-col items-center gap-1.5 text-slate-300 hover:text-slate-900 transition-colors">
                        <CreditCard size={22} />
                        <span className="text-[10px] font-black uppercase tracking-widest leading-none">Wallet</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
