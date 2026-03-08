import { Triangle } from 'lucide-react';

export const Logo = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
    <div className={`bg-slate-900 rounded-full flex items-center justify-center p-1.5 shadow-lg ${className}`} style={{ width: size * 1.6, height: size * 1.6 }}>
        <Triangle size={size} fill="white" className="text-white transform translate-y-[1px]" />
    </div>
);
