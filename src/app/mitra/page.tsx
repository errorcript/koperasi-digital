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
import { useEffect, useState } from 'react';
import { Logo } from '@/components/Logo';
import { AnimatePresence } from 'framer-motion';

export default function MitraApp() {
    const [showQR, setShowQR] = useState(false);
    const [withdrawSuccess, setWithdrawSuccess] = useState(false);
    const [activeTab, setActiveTab] = useState<'home' | 'catalog' | 'wallet'>('home');
    const [transactions, setTransactions] = useState<any[]>([]);
    const [products, setProducts] = useState<any[]>([]);
    const [partner, setPartner] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [newProduct, setNewProduct] = useState({ name: '', price: '0', stock: '50' });

    const fetchData = async () => {
        try {
            const [resMe, resTx, resP] = await Promise.all([
                fetch('/api/auth/me'),
                fetch('/api/transactions'),
                fetch('/api/products')
            ]);
            const me = await resMe.json();
            const txs = await resTx.json();
            const ps = await resP.json();

            if (me.authenticated && me.user) {
                setPartner(me.user);
                // Filter transactions for this partner
                const myTxs = txs.filter((t: any) => t.partnerId === me.user.id);
                setTransactions(myTxs);
                setProducts(ps.filter((p: any) => p.partnerId === me.user.id));
            }
        } catch (e) {
            console.error("Failed to fetch mitra data", e);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddProduct = async () => {
        try {
            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newProduct)
            });
            if (res.ok) {
                setShowAddProduct(false);
                setNewProduct({ name: '', price: '0', stock: '50' });
                fetchData();
            }
        } catch (e) {
            console.error('Failed to add product', e);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const commission = partner?.balance || 0;

    if (isLoading) return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center">
            <Logo size={40} className="animate-bounce" />
        </div>
    );
    return (
        <div className="min-h-screen bg-[#f1f5f9] lg:flex items-center justify-center lg:p-4 p-0">
            <div className="lg:max-w-[400px] w-full bg-white lg:rounded-[48px] rounded-none lg:shadow-2xl shadow-none lg:border-[8px] border-none border-slate-900 overflow-hidden relative lg:aspect-[9/19.5] h-screen lg:h-auto">

                {/* Status Bar Mockup */}
                <div className="hidden lg:flex h-12 bg-white justify-between items-center px-10 pt-4">
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
                                <h1 className="text-lg font-black text-slate-900 leading-none mb-1">{partner?.shopName || 'Mitra KOPWARUNG'}</h1>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Mitra ID #{partner?.id.slice(-4) || '----'}</p>
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
                            <p className="text-3xl font-black mb-6 leading-none tracking-tight">Rp {commission.toLocaleString()}</p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        setWithdrawSuccess(true);
                                        setTimeout(() => setWithdrawSuccess(false), 3000);
                                    }}
                                    className="flex-1 py-3 bg-emerald-500 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 active:scale-95 transition-all"
                                >
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
                        <button
                            onClick={() => setShowQR(true)}
                            className="bg-white rounded-3xl p-6 flex flex-col items-center justify-center text-center border border-slate-100 shadow-sm hover:shadow-xl transition-all group"
                        >
                            <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-white mb-3 shadow-lg shadow-amber-200 group-hover:scale-110 transition-transform">
                                <Plus size={24} />
                            </div>
                            <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest leading-tight">Input Transaksi</p>
                        </button>
                        <div className="bg-white rounded-3xl p-6 flex flex-col items-center justify-center text-center border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
                            <div className="w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center text-white mb-3 shadow-lg shadow-blue-200 group-hover:scale-110 transition-transform">
                                <History size={24} />
                            </div>
                            <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest leading-tight">Riwayat Sales</p>
                        </div>
                    </div>

                    {/* Main Content Area Based on Tab */}
                    <AnimatePresence mode="wait">
                        {activeTab === 'home' ? (
                            <motion.div
                                key="home"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 10 }}
                            >
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
                                        {transactions.length > 0 ? transactions.slice(0, 5).map((tx, i) => (
                                            <div key={i} className="flex items-center gap-4 bg-slate-50/50 p-4 rounded-2xl border border-transparent hover:border-slate-200 hover:bg-white hover:shadow-lg transition-all cursor-pointer">
                                                <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-slate-900 font-black text-xs border border-slate-100">
                                                    {tx.member.name.split(' ').map((n: string) => n[0]).join('')}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-sm font-black text-slate-900 leading-none mb-1">{tx.member.name}</p>
                                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest leading-none mt-1">{new Date(tx.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                                </div>
                                                <p className="text-sm font-black text-slate-900">Rp {tx.totalAmount.toLocaleString()}</p>
                                            </div>
                                        )) : (
                                            <div className="text-center py-10 text-slate-400 font-bold uppercase tracking-widest text-[10px]">Belum ada transaksi</div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ) : activeTab === 'catalog' ? (
                            <motion.div
                                key="catalog"
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="pb-12"
                            >
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-black text-slate-900 text-xs uppercase tracking-widest">Katalog Produk</h3>
                                    <button onClick={() => setShowAddProduct(true)} className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                                        <Plus size={16} />
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    {products.map((item, i) => (
                                        <div key={i} className="bg-white border border-slate-100 p-4 rounded-3xl shadow-sm hover:shadow-xl transition-all">
                                            <div className="text-3xl mb-3">{item.name.includes('Minyak') ? '🍳' : (item.name.includes('Beras') ? '🌾' : (item.name.includes('Gula') ? '🍬' : '📦'))}</div>
                                            <p className="text-xs font-black text-slate-900 mb-1 leading-tight">{item.name}</p>
                                            <p className="text-emerald-600 font-black text-sm mb-2">Rp {item.price.toLocaleString()}</p>
                                            <div className="bg-slate-50 rounded-full px-2 py-1 flex items-center justify-center">
                                                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Stok: {item.stock}</p>
                                            </div>
                                        </div>
                                    ))}
                                    {products.length === 0 && (
                                        <div className="col-span-2 text-center py-10 opacity-50">
                                            <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Belum ada produk</p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="wallet"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="pb-12"
                            >
                                <div className="bg-white border border-slate-100 rounded-3xl p-6 mb-6">
                                    <h3 className="font-black text-slate-900 text-xs uppercase tracking-widest mb-4">Rekening Penarikan</h3>
                                    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-100">
                                            🏦
                                        </div>
                                        <div>
                                            <p className="text-xs font-black text-slate-900">Virtual Account BNI</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">**** 9087</p>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="font-black text-slate-900 text-xs uppercase tracking-widest mb-4">Aktivitas Saldo</h3>
                                <div className="space-y-4">
                                    {[
                                        { title: "Penarikan Dana", amount: "-Rp 500k", status: "Selesai", date: "Hari ini" },
                                        { title: "Komisi Transaksi", amount: "+Rp 1,000", status: "Masuk", date: "Kemarin" }
                                    ].map((item, i) => (
                                        <div key={i} className="flex justify-between items-center p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                                            <div>
                                                <p className="text-xs font-black text-slate-900 mb-1">{item.title}</p>
                                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{item.date}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className={`text-xs font-black ${item.amount.startsWith('-') ? 'text-red-500' : 'text-emerald-600'}`}>{item.amount}</p>
                                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{item.status}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer Navigation */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-white/90 backdrop-blur-2xl border-t border-slate-100 flex items-center justify-around px-8 pb-4 z-40">
                    <button
                        onClick={() => setActiveTab('home')}
                        className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'home' ? 'text-slate-900 scale-110' : 'text-slate-300'}`}
                    >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeTab === 'home' ? 'bg-slate-900 text-white shadow-lg' : 'bg-transparent'}`}>
                            <Logo size={10} className="bg-transparent shadow-none p-0" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest leading-none">Beranda</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('catalog')}
                        className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'catalog' ? 'text-slate-900 scale-110' : 'text-slate-300'}`}
                    >
                        <ClipboardList size={22} />
                        <span className="text-[10px] font-black uppercase tracking-widest leading-none">Katalog</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('wallet')}
                        className={`flex flex-col items-center gap-1.5 transition-all ${activeTab === 'wallet' ? 'text-slate-900 scale-110' : 'text-slate-300'}`}
                    >
                        <CreditCard size={22} />
                        <span className="text-[10px] font-black uppercase tracking-widest leading-none">Dompet</span>
                    </button>
                </div>

                {/* Success Animation Overlay */}
                <AnimatePresence>
                    {withdrawSuccess && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="absolute inset-0 bg-emerald-600 z-[120] flex flex-col items-center justify-center text-center p-8 text-white"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', damping: 10, stiffness: 100 }}
                                className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-8 shadow-2xl"
                            >
                                <Logo size={48} className="bg-transparent text-white" />
                            </motion.div>
                            <h2 className="text-2xl font-black mb-4 uppercase tracking-tighter">Penarikan Berhasil!</h2>
                            <p className="text-emerald-100 font-bold uppercase tracking-widest text-[10px]">Dana dalam perjalanan ke rekening Anda.</p>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* QR Display Overlay */}
                <AnimatePresence>
                    {showQR && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-900 z-[100] flex flex-col items-center justify-center p-8 text-center"
                        >
                            <div className="bg-white p-6 rounded-[40px] shadow-2xl mb-8 relative">
                                <div className="absolute -top-2 -left-2 w-10 h-10 border-t-4 border-l-4 border-emerald-500 rounded-tl-2xl"></div>
                                <div className="absolute -top-2 -right-2 w-10 h-10 border-t-4 border-r-4 border-emerald-500 rounded-tr-2xl"></div>
                                <div className="absolute -bottom-2 -left-2 w-10 h-10 border-b-4 border-l-4 border-emerald-500 rounded-bl-2xl"></div>
                                <div className="absolute -bottom-2 -right-2 w-10 h-10 border-b-4 border-r-4 border-emerald-500 rounded-br-2xl"></div>

                                <div className="w-48 h-48 bg-slate-50 rounded-3xl flex items-center justify-center border border-slate-100 shadow-inner">
                                    <Logo size={100} className="bg-slate-900 p-4 shadow-none" />
                                </div>
                            </div>

                            <h3 className="text-white font-black text-xl mb-2">QR Pembayaran</h3>
                            <p className="text-emerald-400 text-xs mb-8 uppercase tracking-[0.2em] font-black">{partner?.shopName || 'Mitra'}</p>

                            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 w-full mb-12">
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Status Scanner</p>
                                <div className="flex items-center justify-center gap-2">
                                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                                    <span className="text-xs text-white font-bold">Menunggu Scan Anggota...</span>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowQR(false)}
                                className="w-full py-5 bg-white text-slate-900 font-black rounded-2xl uppercase tracking-widest text-xs hover:bg-slate-100 transition-all shadow-xl"
                            >
                                Tutup QR
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Add Product Modal Overlay */}
                <AnimatePresence>
                    {showAddProduct && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm z-[100] flex flex-col justify-end p-0"
                        >
                            <motion.div
                                initial={{ y: '100%' }}
                                animate={{ y: 0 }}
                                exit={{ y: '100%' }}
                                className="bg-white rounded-t-[40px] p-8 border-t border-slate-100 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] relative"
                            >
                                <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6"></div>
                                <h3 className="text-lg font-black text-slate-900 mb-1">Tambah Produk</h3>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-6">Masukkan info produk Anda</p>

                                <div className="space-y-4 mb-8">
                                    <div>
                                        <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-2 block">Nama Produk</label>
                                        <input
                                            type="text"
                                            value={newProduct.name}
                                            onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                                            placeholder="Contoh: Beras Pandan"
                                            className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:ring-2 ring-emerald-500 font-bold text-sm"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-2 block">Harga Jual (Rp)</label>
                                            <input
                                                type="number"
                                                value={newProduct.price}
                                                onChange={e => setNewProduct({ ...newProduct, price: e.target.value })}
                                                className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:ring-2 ring-emerald-500 font-bold text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] uppercase font-black tracking-widest text-slate-400 mb-2 block">Stok Awal</label>
                                            <input
                                                type="number"
                                                value={newProduct.stock}
                                                onChange={e => setNewProduct({ ...newProduct, stock: e.target.value })}
                                                className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:ring-2 ring-emerald-500 font-bold text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setShowAddProduct(false)}
                                        className="flex-1 py-4 bg-slate-50 text-slate-400 font-black uppercase text-[10px] tracking-widest rounded-2xl hover:bg-slate-100 transition-colors"
                                    >
                                        Batal
                                    </button>
                                    <button
                                        onClick={handleAddProduct}
                                        className="flex-[2] py-4 bg-emerald-600 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl shadow-xl hover:bg-emerald-700 transition-colors"
                                    >
                                        Simpan Produk
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
}
