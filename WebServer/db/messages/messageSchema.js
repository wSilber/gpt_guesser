import { Schema, Repository } from 'redis-om'
import { redis } from '@db/redis'

const messageStruct = {
    id: { type: 'string' },
    message: { type: 'string' },
    user_id: { type: 'string' }
}

export const userSchema = new Schema('message', messageStruct, {
    dataStructure: 'JSON'
})

export const messageRepo = new Repository(messageSchema, redis)

await messageRepo.createIndex()

