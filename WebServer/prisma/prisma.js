import { PrismaClient } from "@prisma/client";

const prismaGlobal = global

export const prisma = 
    prismaGlobal.prisma ||
    new PrismaClient({
        log: ['query']
    })

if (process.env.NODE_ENV !== 'production') prismaGlobal.prisma