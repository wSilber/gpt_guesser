import { Schema, Repository } from 'redis-om'
import { redis } from '@db/redis'
import { userSchemaStruct } from '../users/userSchema'

const user = {id: '', username: '', email: ''}

const messageStruct = {
    id: { type: 'string' },
    message: { type: 'string' },
    user: userSchemaStruct
}

export const roomSchema = new Schema('room', {
    id: { type: 'string' },
    users: userSchemaStruct,
    messages: { type: 'message[]'}
}, {
    dataStructure: 'JSON'
})

export const userRepo = new Repository(userSchema, redis)

await userRepo.createIndex()