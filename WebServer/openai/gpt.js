const { Configuration, OpenAIApi } = require('openai')

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})

const openaiGlobal = global

export const openai = 
    openaiGlobal.openAI ||
    new OpenAIApi(configuration)

export const model = process.env.GPT_MODEL

export const Roles = {
    ASSISTANT: 'assistant',
    SYSTEM: 'system',
    USER: 'user'
}

export function createMessage(role, message) {
    return {
        "role": role, 
        "content": message
    }
}

if (process.env.NODE_ENV !== 'production') openaiGlobal.openai