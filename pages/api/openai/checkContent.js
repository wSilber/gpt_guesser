import { openai } from "@/openai/gpt";


export default async function checkContent(req, res) {

    const message = req.query.message;

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