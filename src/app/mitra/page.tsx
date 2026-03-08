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
                <div className="p-8 h-full overflow-y-auto pb-24">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-xl font-black text-slate-800">Warung Barokah</h1>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Mitra Koperasi #0421</p>
                        </div>
                        <button className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 relative">
                            <Bell size={20} />
                            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
                        </button>
                    </div>

                    {/* Wallet Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-slate-900 rounded-[32px] p-6 text-white mb-8 relative overflow-hidden shadow-xl"
                    >
                        <div className="relative z-10">
                            <p className="text-slate-400 text-sm mb-1">Komisi Terkumpul</p>
                            <p className="text-3xl font-black mb-6">Rp 1.482.000</p>
                            <div className="flex gap-3">
                                <button className="flex-1 py-3 bg-emerald-500 text-white rounded-2xl text-sm font-bold flex items-center justify-center gap-2">
                                    <Wallet size={16} /> Tarik Saldo
                                </button>
                            </div>
                        </div>
                        {/* Decor */}
                        <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl"></div>
                    </motion.div>

                    {/* Actions Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        <div className="bg-amber-50 rounded-3xl p-6 flex flex-col items-center justify-center text-center border-2 border-amber-100/50">
                            <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-white mb-3 shadow-lg shadow-amber-200">
                                <Plus size={24} />
                            </div>
                            <p className="text-xs font-black text-amber-900 uppercase">Input Transaksi</p>
                        </div>
                        <div className="bg-blue-50 rounded-3xl p-6 flex flex-col items-center justify-center text-center border-2 border-blue-100/50">
                            <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white mb-3 shadow-lg shadow-blue-200">
                                <History size={24} />
                            </div>
                            <p className="text-xs font-black text-blue-900 uppercase">Riwayat Sales</p>
                        </div>
                    </div>

                    {/* Sales Summary Mini Chart Concept */}
                    <div className="bg-white border border-slate-100 rounded-3xl p-6 mb-8 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-slate-800 text-sm">Target Pekanan</h3>
                            <TrendingUp size={16} className="text-emerald-500" />
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                            <div className="w-[75%] h-full bg-emerald-500 rounded-full"></div>
                        </div>
                        <div className="flex justify-between mt-2">
                            <p className="text-[10px] text-slate-400 font-bold">75% Tercapai</p>
                            <p className="text-[10px] text-slate-400 font-bold">Rp 12,000,000 / bln</p>
                        </div>
                    </div>

                    {/* Recent Payments Section */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-slate-900">Pembayaran Terakhir</h3>
                            <button className="text-[10px] font-black uppercase text-emerald-600 tracking-widest">Detail</button>
                        </div>
                        <div className="space-y-4">
                            {[
                                { name: "Siti Aminah", amount: "Rp 120,500", time: "14:10" },
                                { name: "Budi Santoso", amount: "Rp 15,000", time: "12:45" },
                                { name: "Andi Wijaya", amount: "Rp 64,000", time: "11:20" }
                            ].map((tx, i) => (
                                <div key={i} className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-transparent hover:border-slate-200 transition-all cursor-pointer">
                                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-400 font-bold text-xs">
                                        {tx.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-bold text-slate-900 leading-none mb-1">{tx.name}</p>
                                        <p className="text-[10px] text-slate-400 font-medium">Jam {tx.time}</p>
                                    </div>
                                    <p className="text-sm font-black text-slate-900">{tx.amount}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Navigation */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-white/80 backdrop-blur-xl border-t border-slate-100 flex items-center justify-around px-8 pb-4">
                    <div className="flex flex-col items-center gap-1 text-emerald-600">
                        <Store size={22} strokeWidth={2.5} />
                        <span className="text-[10px] font-black uppercase tracking-tight">Home</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-slate-300">
                        <ClipboardList size={22} />
                        <span className="text-[10px] font-bold uppercase tracking-tight">Orders</span>
                    </div>
                    <div className="flex flex-col items-center gap-1 text-slate-300">
                        <CreditCard size={22} />
                        <span className="text-[10px] font-bold uppercase tracking-tight">Pay</span>
                    </div>
                </div>

            </div>
        </div>
    );
}
