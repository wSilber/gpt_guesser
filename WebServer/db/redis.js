import { createClient } from 'redis'

export const redis = createClient({
    url: process.env.REDIS_URL,
    password: process.env.REDIS_PASSWORD
})

if(!redis.isOpen) await redis.connect()