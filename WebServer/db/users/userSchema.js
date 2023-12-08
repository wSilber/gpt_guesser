import { Schema, Repository } from 'redis-om'
import { redis } from '@db/redis'

export const userSchemaStruct = {
    id: { type: 'string' },
    username: { type: 'string' },
    email: { type: 'string' }
}

export const userSchema = new Schema('user', userSchemaStruct, {
    dataStructure: 'JSON'
})

export const userRepo = new Repository(userSchema, redis)

await userRepo.createIndex()