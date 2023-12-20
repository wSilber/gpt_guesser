import { messageRepo } from "./messageSchema";

export async function createMessage(user_id, text) {

    const message = {
        id: '',
        text: test,
        userid: user_id
    }

    const message_id = await messageRepo.save(message)

    return {success: true, message: message_id }

}