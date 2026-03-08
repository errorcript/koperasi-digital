import { create } from 'zustand';

interface Member {
    id: string;
    name: string;
    balance: number;
    points: number;
    role: string;
}

interface AppStore {
    member: Member | null;
    setMember: (member: Member) => void;
    fetchMember: () => Promise<void>;
}

export const useAppStore = create<AppStore>((set) => ({
    member: null,
    setMember: (member) => set({ member }),
    fetchMember: async () => {
        const res = await fetch('/api/member');
        const data = await res.json();
        set({ member: data });
    }
}));
