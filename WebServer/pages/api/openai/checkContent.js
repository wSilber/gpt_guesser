import OpenAI from 'openai'

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

export default async function checkContent(req, res) {

    if(req.method !== 'POST') {
        console.error(`ERROR: ${req.method} request attempted on endpoint api/openai/checkContent`)
        res.status(405).json({error: 'This endpoint only accepts POST requests'})
        return
    }

    const body = JSON.parse(req.body)

    const message = body.message;

    if(!message) {
        console.error("ERROR: No message given");
        res.status(400).json({success: false, error: "No message given"})
        return;
    }


    try {
        
        const request = {
            url: 'https://api.openai.com/v1/moderations',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({input: message})
        }

        const resp = await fetch('https://api.openai.com/v1/moderations', request)

        if(resp.status !== 200) {

            console.log("ERROR: Non 200 status received from OpenAI")
            res.status(500).send({success: false, message: resp.statusText})
            return

        }

        const data = await resp.json()

        if(!data.results) {
            console.log("ERROR: OpenAI send invalid response to moderation")
            res.status(500).send({
                success: false, 
                message: "invalid response received from OpenAI",
                error: data
            })
            return
        }

        const flagged = data.results[0].flagged

        res.status(200).json({success: true, flagged: flagged})

    } catch (err) {
        console.error(err)
        res.status(500).json({error: err.res})
    }
}