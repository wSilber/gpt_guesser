
import { openai, model, Roles, createMessage } from "@/openai/gpt";

export default async function sendMessage(req, res) {
    
    const completion = await openai.createChatCompletion({
    model: model,
    messages: [
        createMessage(Roles.SYSTEM, "Pretend that you are a human. Do not let anyone konw that you are an AI"),
        createMessage(Roles.USER, "What color is your hair?")
    ]
    });
      

    const message = completion.data.choices[0].message
    console.log(message);

    res.send({message: message})


}