import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
    // Clear data
    await prisma.transaction.deleteMany()
    await prisma.product.deleteMany()
    await prisma.member.deleteMany()
    await prisma.partner.deleteMany()

    // Create real mock data
    const member = await prisma.member.create({
        data: {
            name: 'Budi Santoso',
            email: 'budi@koperasi.com',
            role: 'PLATINUM',
            balance: 1000000,
            points: 2500,
        }
    })

    const partner1 = await prisma.partner.create({
        data: {
            shopName: 'Warung Barokah',
            category: 'Sembako',
            address: 'Jl. Melati No. 12',
            phone: '08123456789',
            feePerTx: 1000,
            status: 'ACTIVE',
            products: {
                create: [
                    { name: 'Minyak Goreng 1L', price: 14500, originalPrice: 17000, stock: 100 },
                    { name: 'Beras Pandan Wangi 5kg', price: 62000, originalPrice: 68000, stock: 50 },
                    { name: 'Telur Ayam 1kg', price: 26000, originalPrice: 28000, stock: 30 }
                ]
            }
        }
    })

    const partner2 = await prisma.partner.create({
        data: {
            shopName: 'Toko Makmur',
            category: 'Kelontong',
            address: 'Jl. Mawar No. 45',
            phone: '08776655443',
            feePerTx: 500,
            status: 'ACTIVE',
            products: {
                create: [
                    { name: 'Gula Pasir 1kg', price: 13500, originalPrice: 15000, stock: 80 },
                    { name: 'Kopi Kapal Api 165g', price: 12000, originalPrice: 14000, stock: 40 }
                ]
            }
        }
    })

    console.log('Seed data created: ', { member, partners: [partner1.shopName, partner2.shopName] })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
