'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from '@/components/Logo';
import { Mail, Lock, ArrowRight, User, Store, ShieldCheck, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [role, setRole] = useState<'MEMBER' | 'PARTNER' | 'ADMIN'>('MEMBER');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, role })
            });
            const data = await res.json();
            if (data.success) {
                if (role === 'MEMBER') router.push('/');
                else if (role === 'PARTNER') router.push('/mitra');
                else router.push('/dashboard');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (e) {
            setError('Something went wrong. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-slate-50 flex items-center justify-center p-0 md:p-6 font-sans relative overflow-hidden">
            {/* Background Blob */}
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-emerald-100 rounded-full blur-[150px] opacity-60"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-100 rounded-full blur-[150px] opacity-60"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full md:max-w-[480px] bg-white md:rounded-[48px] rounded-none md:shadow-2xl shadow-none md:shadow-slate-200/50 p-8 md:p-14 md:border border-transparent border-slate-100 relative z-10 min-h-screen md:min-h-[auto] flex flex-col justify-center"
            >
                <div className="flex flex-col items-center mb-12">
                    <Logo size={32} className="mb-6 h-[50px] w-[50px]" />
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">Selamat Datang</h1>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Pilih akun KOPWARUNG untuk masuk</p>
                </div>

                <div className="flex bg-slate-100 p-1.5 rounded-[24px] mb-10">
                    {[
                        { id: 'MEMBER', icon: User, label: 'Anggota' },
                        { id: 'PARTNER', icon: Store, label: 'Mitra' },
                        { id: 'ADMIN', icon: ShieldCheck, label: 'Admin' }
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setRole(item.id as any)}
                            className={`flex-1 flex flex-col items-center gap-2 py-4 rounded-[20px] transition-all ${role === item.id
                                ? 'bg-white shadow-xl text-slate-900'
                                : 'text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            <item.icon size={18} />
                            <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                        </button>
                    ))}
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-4">Alamat Email / Username</label>
                        <div className="relative group">
                            <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={20} />
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={role === 'ADMIN' ? 'Username Admin' : 'nama@contoh.com'}
                                className="w-full pl-14 pr-8 py-5 bg-slate-50 border-none rounded-[28px] text-sm font-bold focus:ring-4 ring-emerald-500/10 outline-none transition-all placeholder:text-slate-300"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-4">Kata Sandi</label>
                        <div className="relative group">
                            <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={20} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••••••"
                                className="w-full pl-14 pr-8 py-5 bg-slate-50 border-none rounded-[28px] text-sm font-bold focus:ring-4 ring-emerald-500/10 outline-none transition-all placeholder:text-slate-300"
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-red-50 p-4 rounded-2xl text-[10px] font-black text-red-600 uppercase tracking-widest border border-red-100 text-center"
                        >
                            {error}
                        </motion.div>
                    )}

                    <button
                        disabled={isLoading}
                        className="w-full py-6 bg-slate-900 text-white rounded-[28px] font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-slate-900/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:scale-100"
                    >
                        {isLoading ? (
                            <Loader2 className="animate-spin" size={18} />
                        ) : (
                            <>Masuk Sekarang <ArrowRight size={18} /></>
                        )}
                    </button>
                </form>

                <div className="mt-12 text-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Belum punya akun? <Link href="/mitra/register" className="text-emerald-600">Daftar Mitra</Link></p>
                </div>
            </motion.div>
        </main>
    );
}

// Simple Link Mockup since it's not imported correctly from standard Next
function Link({ children, href, className }: { children: any, href: string, className?: string }) {
    return <a href={href} className={className}>{children}</a>;
}
