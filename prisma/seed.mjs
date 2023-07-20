import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.upsert({
        where: {email: 'test@test.com'},
        update: {},
        create: {
            email: 'test@test.com',
            password: '$2b$10$QU5K8P6oZDvRNA/VvHYRPuJ5sqgykwyk2fFuGhJ4Pa2BEUwZR12Be' //test
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