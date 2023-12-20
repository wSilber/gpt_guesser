import { Schema, Repository } from 'redis-om'
import { redis } from '@db/redis'

export const roomSchema = new Schema('room', {
    id: { type: 'string' },
    users: { type: 'string' },
    messages: { type: 'string'}
}, {
    dataStructure: 'JSON'
})

export const roomRepo = new Repository(roomSchema, redis)

await roomRepo.createIndex()