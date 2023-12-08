import { blankUser, validateUser } from "@/db/users/users"


export default async function handler(req, res) {

  try {

   const user = blankUser()
   const validate = validateUser(user)

   console.log({
    user: user,
    validate: validate
   })
   res.status(200).json({users: user, validate: validate})
   return

  } catch (err) {

    console.log(err)
    res.status(400).json({error: err.message})

  }


  
}