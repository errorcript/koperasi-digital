import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { login } from '@/lib/auth';

export async function POST(req: Request) {
    const { email, password, role } = await req.json();

    if (role === 'ADMIN') {
        const admin = await prisma.admin.findUnique({ where: { username: email } });
        if (admin && admin.password === password) { // In production, use bcrypt.compare
            await login({ id: admin.id, role: 'ADMIN', name: admin.username });
            return NextResponse.json({ success: true, user: admin });
        }
    } else if (role === 'PARTNER') {
        const partner = await prisma.partner.findUnique({ where: { email } });
        if (partner && partner.password === password) {
            await login({ id: partner.id, role: 'PARTNER', name: partner.shopName });
            return NextResponse.json({ success: true, user: partner });
        }
    } else {
        const member = await prisma.member.findUnique({ where: { email } });
        if (member && member.password === password) {
            await login({ id: member.id, role: 'MEMBER', name: member.name });
            return NextResponse.json({ success: true, user: member });
        }
    }

    return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
}
