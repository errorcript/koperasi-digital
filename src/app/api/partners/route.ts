import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    const partners = await prisma.partner.findMany({
        include: {
            _count: {
                select: { transactions: true }
            }
        },
        orderBy: { createdAt: 'desc' }
    });

    // Flattening for frontend
    const formattedPartners = partners.map(p => ({
        ...p,
        transactionsCount: p._count.transactions
    }));

    return NextResponse.json(formattedPartners);
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        // Encrypt password in production
        const partner = await prisma.partner.create({
            data: {
                shopName: body.shopName,
                email: body.email || `shop_${Date.now()}@example.com`,
                password: body.password || 'password123',
                category: body.category,
                address: body.address,
                phone: body.phone,
                feePerTx: 1000, // Default fee
                status: 'PENDING'
            }
        });
        return NextResponse.json(partner);
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 400 });
    }
}
