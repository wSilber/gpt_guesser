import { createClient } from 'redis'

const client = createClient();

client.on('error', err => console.log("Redis client error", err));

(async () => {
    await client.connect()

    console.log("Client connencted")


    let value = await client.get('key');

    console.log(value)

    await client.set('key', 'value');
    value = await client.get('key');

    console.log(value)

})()