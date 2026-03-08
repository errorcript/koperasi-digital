import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    let userDetails = null;
    if (session.user.role === 'ADMIN') {
        userDetails = await prisma.admin.findUnique({ where: { id: session.user.id } });
    } else if (session.user.role === 'PARTNER') {
        userDetails = await prisma.partner.findUnique({ where: { id: session.user.id } });
    } else {
        userDetails = await prisma.member.findUnique({ where: { id: session.user.id } });
    }

    if (!userDetails) return NextResponse.json({ authenticated: false }, { status: 401 });

    return NextResponse.json({ authenticated: true, user: userDetails });
}
