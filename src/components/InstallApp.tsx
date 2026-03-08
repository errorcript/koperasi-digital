'use client';

import { useState, useEffect } from 'react';
import { Smartphone, Download, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function InstallApp() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [showInstall, setShowInstall] = useState(false);

    useEffect(() => {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js');
            });
        }

        const handler = (e: any) => {
            e.preventDefault();
            setDeferredPrompt(e);
            // Give a little delay before showing the invite
            setTimeout(() => setShowInstall(true), 3000);
        };

        window.addEventListener('beforeinstallprompt', handler);

        return () => window.removeEventListener('beforeinstallprompt', handler);
    }, []);

    const handleInstall = async () => {
        if (!deferredPrompt) return;
        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;
        if (outcome === 'accepted') {
            setDeferredPrompt(null);
            setShowInstall(false);
        }
    };

    return (
        <AnimatePresence>
            {showInstall && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-6 left-6 right-6 md:left-auto md:right-10 md:w-80 z-[200] bg-white rounded-[32px] p-6 shadow-2xl border border-slate-100 ring-4 ring-emerald-500/10"
                >
                    <div className="flex gap-4 items-center">
                        <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                            <Download size={24} />
                        </div>
                        <div className="flex-1">
                            <h4 className="font-black text-slate-900 text-sm leading-tight">Instal KopWarung</h4>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Ke Layar Utama Android</p>
                        </div>
                        <button
                            onClick={() => setShowInstall(false)}
                            className="text-slate-300 hover:text-slate-500"
                        >
                            <X size={20} />
                        </button>
                    </div>
                    <button
                        onClick={handleInstall}
                        className="w-full mt-6 py-4 bg-slate-900 text-white font-black rounded-2xl uppercase tracking-widest text-xs hover:bg-emerald-600 transition-colors shadow-xl"
                    >
                        Pasang Sekarang
                    </button>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
