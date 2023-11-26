
import { createClient } from 'redis';

const client = createClient({
    url: process.env.REDIS_URL
});

client.on('error', err => console.log('Redis Client Error', err));


async function connect() {
    await client.connect();
}


async function checkNameValid(key) {
    try {
        // Check if the key exists in Redis
        const exists = await client.exists(key);
        // console.log('key not exists')
    
        // The "exists" variable will be 1 if the key exists, and 0 if it doesn't.
        return exists === 1;
      } catch (error) {
        console.error('Error checking key existence in Redis:', error);
        return true; // Return false in case of an error or when key doesn't exist
      } 
}

export async function createChatRoom(data) {
    await connect();
    const keyName = data.name
    let id = -1
    console.log(keyName)
    const exists = await checkNameValid(keyName)
    if (!exists) {
        // console.log('in conditional')
        id = await client.set(keyName, JSON.stringify(data));
    }
    // console.log("set finished")
    await client.disconnect();
    return id;
}

export default function test(req, res) {
    res.send({test: "test"})
}