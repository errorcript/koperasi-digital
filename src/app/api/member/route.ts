import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    const member = await prisma.member.findFirst(); // Get first mock member (Budi)
    return NextResponse.json(member);
}
