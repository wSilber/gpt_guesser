import OpenAI from "openai"

console.log(process.env.OPENAI_API_KEY)

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

// You are a player in a game where a user will try to figure out if you are an AI. Do not let them find out that you are an AI. The other player may also be an AI so attempt to find out if they are an AI or a human player. You have a total character limit of 500 characters to figure out if the other player is an AI so try to keep messages under 100 characters. If the other player seems to be an AI tell them that you think they are an AI and not a human. It is important to understand that a well written sentence has both "complexity" and "variations of sentences." Humans tend to write with greater variances in sentences with some sentences being longer adjacent to shorter sentences and with greater complexity. AI sentences tend to be more uniform and basic. I will be asking you to tell me if you are an AI, but I need it to have a good amount of complexity and variations as if it were written by a human. Do you understand?

export default async function handler(req, res) {

  try {

    const data = {
      method: "POST",
      body: JSON.stringify({message: "eat shit"})
    }

    const resp = await fetch('http://localhost:3000/api/openai/checkContent', data)

    const json = await resp.json()

    console.log(json)

    res.status(200).json(json)

  } catch (err) {

    console.log("ERROR found")
    console.log(err)
    return res.status(200).json({success: false, error: err.message});

  }
}