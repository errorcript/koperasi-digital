/* eslint-disable @next/next/no-img-element */
import { Triangle } from 'lucide-react';

export const Logo = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
    <div
        className={`bg-slate-900 rounded-full flex items-center justify-center overflow-hidden shadow-lg border border-white/10 ${className}`}
        style={{ width: size * 1.6, height: size * 1.6 }}
    >
        <img
            src="/logo.png"
            alt="KOPWARUNG Logo"
            className="w-full h-full object-cover"
            onError={(e) => {
                // Fallback to Triangle if image fails
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                    parent.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-triangle text-white transform translate-y-[1px]"><path d="M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/></svg>';
                }
            }}
        />
    </div>
);
