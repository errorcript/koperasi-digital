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

        // Perform settlement in a transaction
        const result = await prisma.$transaction(async (tx) => {
            const partner = await tx.partner.findUnique({ where: { id: partnerId } });

            if (!partner) {
                throw new Error('Partner not found');
            }

            if (partner.balance <= 0) {
                throw new Error('No balance to settle');
            }

            const settlementAmount = partner.balance;

            // Clear the partner's balance
            const updatedPartner = await tx.partner.update({
                where: { id: partnerId },
                data: {
                    balance: 0
                }
            });

            // In a real app, you would also create a "Settlement" record here
            // e.g. await tx.settlement.create({ ... })

            return { partner: updatedPartner, settledAmount: settlementAmount };
        });

        return NextResponse.json({ success: true, ...result });

    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
}
