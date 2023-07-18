import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.upsert({
        where: {email: 'test@test.com'},
        update: {},
        create: {
            email: 'test@test.com',
            username: 'Test user',
        }
    })

    console.log({user})
}

main()
.then(() => prisma.$disconnect())
.catch(async (err) => {
    console.error(err)
    await prisma.$disconnect()
})