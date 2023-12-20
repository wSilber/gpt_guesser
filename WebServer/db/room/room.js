import { blankUser } from "../users/users";
import { roomRepo } from "./roomSchema";

export function blankRoom() {

    const user = blankUser()

    const message = {
        user: blankUser.id,
        text: ""
    }
    const room = {
        id: "",
        users: [user, user],
        messages: [message, message]
    }

    return room;
}