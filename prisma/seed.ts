const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    // Clear existing data
    await prisma.transaction.deleteMany();
    await prisma.product.deleteMany();
    await prisma.session.deleteMany();
    await prisma.member.deleteMany();
    await prisma.partner.deleteMany();
    await prisma.admin.deleteMany();

    console.log('Database cleared.');

    // Create Admin
    const admin = await prisma.admin.create({
        data: {
            username: 'admin',
            password: 'password123', // In production, hash this!
        }
    });

    // Create Member
    const member = await prisma.member.create({
        data: {
            name: 'Budi Santoso',
            email: 'budi@neoma.id',
            password: 'password123',
            role: 'PREMIUM',
            balance: 1000000,
            points: 250
        }
    });

    // Create Partner
    const partner = await prisma.partner.create({
        data: {
            shopName: 'Warung Pak Eko',
            email: 'eko@warung.id',
            password: 'password123',
            category: 'MAKANAN',
            address: 'Jl. Merdeka No. 10',
            phone: '08123456789',
            feePerTx: 1000,
            status: 'ACTIVE'
        }
    });

    // Create Products
    await prisma.product.createMany({
        data: [
            { partnerId: partner.id, name: 'Beras Premium 5kg', price: 65000, originalPrice: 70000 },
            { partnerId: partner.id, name: 'Minyak Goreng 2L', price: 32000, originalPrice: 35000 },
            { partnerId: partner.id, name: 'Gula Pasir 1kg', price: 14000, originalPrice: 15500 },
            { partnerId: partner.id, name: 'Telur Ayam 1kg', price: 26000 }
        ]
    });

    console.log('Seeding completed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
