import { openai } from "@/openai/gpt";


export default async function checkContent(req, res) {

    if(request.method !== 'POST') {
        console.error(`ERROR: ${request.method} attempted on endpoint api/openai/checkContent`)
        response.status(405).json({error: 'This endpoint only accepts POST requests'})
        return
    }

    const message = req.body.message;

    console.log(message)

    if(!message) {
        console.error("ERROR: No message given");
        res.status(400).json({error: "No message given"})
    }

    console.log("GOT HERE")

    try {
        const resp = await openai.createModeration({input: message})

        const flagged = resp.data.results[0].flagged

        res.status(200).json({flagged: flagged})
    } catch (err) {
        console.error(err)
        res.status(500).json({error: err.response.data})
    }
}