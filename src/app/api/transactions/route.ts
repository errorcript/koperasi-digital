import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const { memberId, partnerId, totalAmount } = await req.json();

        // In-transaction update: balance and recording TX
        const result = await prisma.$transaction(async (tx) => {
            // 1. Get Member
            const member = await tx.member.findUnique({ where: { id: memberId } });
            if (!member || member.balance < totalAmount) {
                throw new Error('Insufficient balance or member not found');
            }

            // 2. Get Partner for Admin Fee logic
            const partner = await tx.partner.findUnique({ where: { id: partnerId } });
            if (!partner) throw new Error('Partner not found');

            // 3. Deduct Balance from Member
            await tx.member.update({
                where: { id: memberId },
                data: {
                    balance: { decrement: totalAmount },
                    points: { increment: Math.floor(totalAmount / 1000) } // 1 pt per 1000 spent
                }
            });

            // 4. Add Balance to Partner
            await tx.partner.update({
                where: { id: partnerId },
                data: {
                    balance: { increment: totalAmount - partner.feePerTx }
                }
            });

            // 5. Create Transaction
            return await tx.transaction.create({
                data: {
                    memberId,
                    partnerId,
                    totalAmount,
                    adminFee: partner.feePerTx, // This is the Rp500-1000 per transaction
                    pointsEarned: Math.floor(totalAmount / 1000)
                }
            });
        });

        return NextResponse.json({ success: true, transaction: result });
    } catch (error: any) {
        return NextResponse.json({ success: false, message: error.message }, { status: 400 });
    }
}

export async function GET() {
    const txs = await prisma.transaction.findMany({
        include: { member: true, partner: true },
        orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(txs);
}
