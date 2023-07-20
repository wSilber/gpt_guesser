import { createChatRoom } from "@/pages/api/redis";

export default async function handler(req, res){
    console.log(req.body)
    const id = await createChatRoom(req.body)
    res.status(200).json({id})

}