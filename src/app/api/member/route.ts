import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
    const session = await getSession();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    if (session.user.role === 'ADMIN') {
        const members = await prisma.member.findMany();
        return NextResponse.json(members);
    }

    const member = await prisma.member.findUnique({
        where: { id: session.user.id }
    });
    return NextResponse.json(member);
}
