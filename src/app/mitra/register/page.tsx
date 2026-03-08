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

export default function MitraRegister() {
    const [step, setStep] = useState(1);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const nextStep = () => setStep(s => s + 1);
    const prevStep = () => setStep(s => s - 1);

    if (isSubmitted) {
        return (
            <div className="min-h-screen bg-emerald-600 flex items-center justify-center p-6 text-white text-center">
                <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
                        <CheckCircle2 size={48} />
                    </div>
                    <h1 className="text-4xl font-black mb-4">Pendaftaran Terkirim!</h1>
                    <p className="text-emerald-100 mb-10 max-w-sm mx-auto text-lg">
                        Admin koperasi akan memverifikasi warung Anda dalam 1x24 jam. Tim lapangan kami akan segera menghubungi Anda.
                    </p>
                    <Link href="/" className="px-10 py-4 bg-white text-emerald-700 font-black rounded-2xl shadow-xl hover:bg-emerald-50 transition-all inline-block">
                        Kembali ke Beranda
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
            <div className="max-w-xl w-full">
                {/* Progress Bar */}
                <div className="flex justify-between items-center mb-12 relative px-4">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -z-10 -translate-y-1/2"></div>
                    <div className={`absolute top-1/2 left-0 h-1 bg-emerald-500 -z-10 -translate-y-1/2 transition-all duration-500`} style={{ width: `${(step - 1) * 50}%` }}></div>
                    {[1, 2, 3].map((s) => (
                        <div key={s} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step >= s ? 'bg-emerald-500 text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-200'}`}>
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
                                <h2 className="text-2xl font-black mb-2 flex items-center gap-3">
                                    <Store className="text-emerald-500" /> Informasi Warung
                                </h2>
                                <p className="text-slate-400 text-sm mb-8 font-medium">Lengkapi data dasar unit usaha Anda.</p>
                                <div className="space-y-6">
                                    <div>
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Nama Warung / Toko</label>
                                        <input type="text" placeholder="Contoh: Warung Barokah Jaya" className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 outline-none focus:ring-2 ring-emerald-500 transition-all font-semibold" />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Kategori Usaha</label>
                                        <select className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 outline-none focus:ring-2 ring-emerald-500 transition-all font-semibold appearance-none">
                                            <option>Sembako & Kelontong</option>
                                            <option>Makanan & Minuman</option>
                                            <option>Pulsa & PPOB</option>
                                            <option>Pakaian</option>
                                        </select>
                                    </div>
                                    <button onClick={nextStep} className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                                        Lanjut Langkah 2 <ArrowRight size={20} />
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <h2 className="text-2xl font-black mb-2 flex items-center gap-3">
                                    <MapPin className="text-emerald-500" /> Lokasi & Kontak
                                </h2>
                                <p className="text-slate-400 text-sm mb-8 font-medium">Bantu kami menemukan lokasi usaha Anda.</p>
                                <div className="space-y-6">
                                    <div>
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Alamat Lengkap</label>
                                        <textarea placeholder="Jalan, Desa, RT/RW..." className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 outline-none focus:ring-2 ring-emerald-500 transition-all font-semibold h-24 resize-none"></textarea>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">No. WhatsApp Aktif</label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                            <input type="tel" placeholder="0812xxxx" className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-4 py-4 outline-none focus:ring-2 ring-emerald-500 transition-all font-semibold" />
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <button onClick={prevStep} className="flex-1 py-5 bg-white border border-slate-200 text-slate-500 font-black rounded-2xl hover:bg-slate-50 transition-all">
                                            Kembali
                                        </button>
                                        <button onClick={nextStep} className="flex-[2] py-5 bg-slate-900 text-white font-black rounded-2xl shadow-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                                            Lanjut Final <ArrowRight size={20} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <h2 className="text-2xl font-black mb-2 flex items-center gap-3">
                                    <FileText className="text-emerald-500" /> Finalisasi Pendaftaran
                                </h2>
                                <p className="text-slate-400 text-sm mb-8 font-medium">Lampirkan foto warung untuk verifikasi cepat.</p>
                                <div className="space-y-8 text-center pt-4">
                                    <div className="aspect-video bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-slate-400 cursor-pointer hover:border-emerald-300 hover:bg-emerald-50 transition-all group">
                                        <Camera size={48} className="mb-2 group-hover:scale-110 transition-transform" />
                                        <p className="text-xs font-bold uppercase tracking-widest">Upload Foto Tampak Depan</p>
                                    </div>

                                    <div className="p-4 bg-amber-50 rounded-2xl text-left border border-amber-100 flex gap-4">
                                        <Clock className="text-amber-600 shrink-0" size={24} />
                                        <p className="text-xs text-amber-900 leading-relaxed font-medium">
                                            Dengan menekan tombol daftar, Anda menyetujui skema bagi hasil <b>Rp 1.000 / transaksi</b> yang dikelola oleh koperasi mitra.
                                        </p>
                                    </div>

                                    <div className="flex gap-4">
                                        <button onClick={prevStep} className="flex-1 py-5 bg-white border border-slate-200 text-slate-500 font-black rounded-2xl hover:bg-slate-50 transition-all">
                                            Kembali
                                        </button>
                                        <button onClick={() => setIsSubmitted(true)} className="flex-[2] py-5 bg-emerald-600 text-white font-black rounded-2xl shadow-xl shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2">
                                            Daftar Jadi Mitra <CheckCircle2 size={20} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                <p className="mt-8 text-center text-slate-400 text-xs font-bold uppercase tracking-widest">Digital Onboarding Unit &middot; Kop-Warung Digi</p>
            </div>
        </div>
    );
}
