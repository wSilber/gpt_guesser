import { User } from "@/db/users/userTypes"
import { createUser, getUser, userExists } from "@db/users/users";
import { ApiUserResponse } from "./user";
import { NextApiRequest, NextApiResponse } from "next";

 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const userResponse: ApiUserResponse = {
    success: false,
    error: undefined,
    user: undefined
  }

  if(req.method !== 'PUT') {
    console.error(`ERROR: ${req.method} attempted on endpoint api/users/checkUserExists`)

    userResponse.error = {type: 0, message: 'Invalid request method'}

    res.status(405).json(userResponse)
  }

  const body = req.body

  if(!body) {
    console.error(`ERROR: No body in request to endpoint api/users/getUser`)

    userResponse.error = {type: 1, message: 'Invalid message'}

    res.status(400).json(userResponse)

    return
  }

  const user = body.user

  if(!user) {
    console.error(`ERROR: No user in request to endpoint api/users/getUser`)

    userResponse.error = {type: 2, message: 'Invalid message'}

    res.status(400).json(userResponse)

    return
  }
    
  const userGet = await createUser(user)

  if(userGet == null) {
    userResponse.error = {
      type: 3,
      message: 'User exists',
    }

    res.status(200).json(userResponse)
  }

  userResponse.success = true
  userResponse.user = userGet

  res.status(200).json(userResponse);
  
}