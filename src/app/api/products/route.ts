import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    const products = await prisma.product.findMany({
        include: { partner: true },
        orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(products);
}

import { getSession } from '@/lib/auth';

export async function POST(req: Request) {
    try {
        const session = await getSession();
        if (!session || session.user.role !== 'PARTNER') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { name, price, stock } = body;

        if (!name || !price) {
            return NextResponse.json({ success: false, message: 'Name and price are required' }, { status: 400 });
        }

        const newProduct = await prisma.product.create({
            data: {
                name,
                price: parseFloat(price),
                stock: parseInt(stock) || 50,
                partnerId: session.user.id
            }
        });

        return NextResponse.json({ success: true, product: newProduct });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
}
