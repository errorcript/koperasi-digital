import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        const session = await getSession();
        if (!session || session.user.role !== 'ADMIN') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const { partnerId } = await req.json();

        const partner = await prisma.partner.update({
            where: { id: partnerId },
            data: { status: 'ACTIVE' }
        });

        return NextResponse.json({ success: true, partner });
    } catch (e: any) {
        return NextResponse.json({ success: false, message: e.message }, { status: 400 });
    }
}
