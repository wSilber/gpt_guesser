import { createClient } from 'redis'

export default async function handler(request, response) {

  console.log("Starting test")

  try {

    const client = createClient({url: "redis://redis:6379"})

    await client.connect()

    let value = await client.get('key');

    await client.set('key', 'value');
    value = await client.get('key');

    await client.disconnect()

    return response.status(200).json({test: value});

  } catch (err) {

    console.log("ERROR found")
    console.log(err)
    return response.status(200).json({error: err});
  }
}