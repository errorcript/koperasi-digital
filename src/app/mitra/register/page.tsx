'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Store,
    MapPin,
    User,
    Phone,
    Camera,
    CheckCircle2,
    ArrowRight,
    ArrowLeft,
    FileText,
    Clock
} from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/Logo';

export default function MitraRegister() {
    const [step, setStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({ shopName: '', category: 'Sembako & Kelontong', address: '', phone: '' });

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    const handleRegister = async () => {
        try {
            const res = await fetch('/api/partners', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) setIsSubmitted(true);
        } catch (e) {
            console.error(e);
        }
    };

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 text-white text-center">
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                    <div className="mb-8">
                        <Logo size={40} className="mx-auto shadow-2xl shadow-emerald-500/20" />
                    </div>
                    <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                        <CheckCircle2 size={40} />
                    </div>
                    <h1 className="text-4xl font-black mb-4 tracking-tight text-white uppercase">Pendaftaran Terkirim!</h1>
                    <p className="text-slate-400 mb-10 max-w-sm mx-auto text-lg font-medium leading-relaxed">
                        Data <span className="text-white font-bold">{formData.shopName}</span> sudah masuk. Admin akan memverifikasi dalam 1x24 jam.
                    </p>
                    <Link href="/" className="px-10 py-5 bg-emerald-600 text-white font-black rounded-2xl shadow-2xl shadow-emerald-600/20 hover:bg-emerald-700 transition-all inline-block uppercase tracking-widest text-sm">
                        Kembali ke Beranda
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] flex flex-col items-center justify-center p-6">
            <div className="max-w-xl w-full">
                {/* Logo & Header */}
                <div className="flex flex-col items-center mb-12">
                    <Logo size={24} className="mb-4" />
                    <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Onboarding Mitra</h2>
                    <p className="text-slate-400 text-sm font-black uppercase tracking-widest mt-1">Ekosistem Koperawung</p>
                </div>

                {/* Progress Bar */}
                <div className="flex justify-between items-center mb-12 relative px-4">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-200 -z-10 -translate-y-1/2"></div>
                    <div className={`absolute top-1/2 left-0 h-0.5 bg-emerald-500 -z-10 -translate-y-1/2 transition-all duration-500`} style={{ width: `${(step - 1) * 50}%` }}></div>
                    {[1, 2, 3].map((s) => (
                        <div key={s} className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black transition-all shadow-sm ${step >= s ? 'bg-emerald-600 text-white shadow-emerald-200' : 'bg-white text-slate-400 border border-slate-100'}`}>
                            {s}
                        </div>
                    ))}
                </div>

                <motion.div
                    key={step}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="bg-white rounded-[40px] p-10 shadow-2xl shadow-slate-200/50 border border-slate-100"
                >
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <div className="p-4 bg-emerald-50 rounded-2xl flex items-center gap-4 mb-8">
                                    <Store className="text-emerald-600" size={32} />
                                    <div>
                                        <h3 className="text-lg font-black text-slate-900 leading-none mb-1">Informasi Warung</h3>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Langkah awal verifikasi unit usaha</p>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Nama Warung / Toko</label>
                                        <input
                                            type="text"
                                            value={formData.shopName}
                                            onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                                            placeholder="Contoh: Warung Barokah Jaya"
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-5 outline-none focus:ring-2 ring-emerald-500 transition-all font-bold text-slate-900 shadow-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Kategori Usaha</label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-5 outline-none focus:ring-2 ring-emerald-500 transition-all font-bold text-slate-900 shadow-sm appearance-none"
                                        >
                                            <option>Sembako & Kelontong</option>
                                            <option>Makanan & Minuman</option>
                                            <option>Pulsa & PPOB</option>
                                            <option>Pakaian</option>
                                        </select>
                                    </div>
                                    <button onClick={nextStep} className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl shadow-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs mt-4">
                                        Lanjut Langkah 2 <ArrowRight size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <div className="p-4 bg-blue-50 rounded-2xl flex items-center gap-4 mb-8">
                                    <MapPin className="text-blue-600" size={32} />
                                    <div>
                                        <h3 className="text-lg font-black text-slate-900 leading-none mb-1">Lokasi & Kontak</h3>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Titik distribusi logistik</p>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Alamat Lengkap</label>
                                        <textarea
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            placeholder="Jalan, Desa, RT/RW..."
                                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-5 outline-none focus:ring-2 ring-emerald-500 transition-all font-bold text-slate-900 shadow-sm h-28 resize-none"
                                        ></textarea>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">No. WhatsApp Aktif</label>
                                        <div className="relative">
                                            <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                placeholder="0812xxxx"
                                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-14 pr-5 py-5 outline-none focus:ring-2 ring-emerald-500 transition-all font-bold text-slate-900 shadow-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <button onClick={prevStep} className="flex-1 py-5 bg-white border border-slate-200 text-slate-500 font-black rounded-2xl hover:bg-slate-50 transition-all uppercase tracking-widest text-[10px]">
                                            Kembali
                                        </button>
                                        <button onClick={nextStep} className="flex-[2] py-5 bg-slate-900 text-white font-black rounded-2xl shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-[10px]">
                                            Lanjut Final <ArrowRight size={18} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <div className="p-4 bg-purple-50 rounded-2xl flex items-center gap-4 mb-8">
                                    <FileText className="text-purple-600" size={32} />
                                    <div>
                                        <h3 className="text-lg font-black text-slate-900 leading-none mb-1">Finalisasi Database</h3>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Validasi data mitra resmi</p>
                                    </div>
                                </div>
                                <div className="space-y-8 text-center pt-4">
                                    <div className="aspect-video bg-slate-900/5 border-2 border-dashed border-slate-200 rounded-[32px] flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:border-emerald-300 hover:bg-emerald-50 transition-all group shadow-inner">
                                        <Camera size={48} className="mb-3 group-hover:scale-110 transition-transform text-slate-300" />
                                        <p className="text-[10px] font-black uppercase tracking-widest">Ambil Foto Tampak Depan Warung</p>
                                    </div>

                                    <div className="p-5 bg-amber-50 rounded-2xl text-left border border-amber-100 flex gap-4">
                                        <Clock className="text-amber-600 shrink-0" size={24} />
                                        <p className="text-[10px] text-amber-900 leading-relaxed font-bold uppercase tracking-tight">
                                            SETUJU SKEMA BAGI HASIL <span className="text-amber-700">Rp 1.000 / TRANSAKSI</span> YANG DIKELOLA KOPERASI.
                                        </p>
                                    </div>

                                    <div className="flex gap-4">
                                        <button onClick={prevStep} className="flex-1 py-5 bg-white border border-slate-200 text-slate-500 font-black rounded-2xl hover:bg-slate-50 transition-all uppercase tracking-widest text-[10px]">
                                            Kembali
                                        </button>
                                        <button onClick={handleRegister} className="flex-[2] py-5 bg-emerald-600 text-white font-black rounded-2xl shadow-2xl shadow-emerald-600/20 hover:bg-emerald-700 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-[10px]">
                                            Daftar Jadi Mitra <CheckCircle2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                <div className="mt-12 flex items-center justify-center gap-3 opacity-40 grayscale">
                    <Logo size={12} />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900">Powered by Koperawung Digi</p>
                </div>
            </div>
        </div>
    );
}
