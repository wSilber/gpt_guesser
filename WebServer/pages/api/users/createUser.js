import { createUser, userExists } from '@db/users/users'
 
export default async function handler(request, response) {

  // if(request.method !== 'PUT') {
  //     console.error(`ERROR: ${request.method} attempted on endpoint api/users/checkUserExists`)
  //     response.status(405).json({error: 'This endpoint only accepts PUT requests'})
  //     return
  // }

  const user = {
    id: '6',
    username: "test6",
    email: "test6@test.com"
  }

  const userCreated = await createUser(user)

  if(!userCreated.success) {
    console.log("ERROR: User already exists")
    response.status(200).json({ success: false })
    return
  }
 
  console.log("SUCCESS: User created")

  response.status(200).json({ user: userCreated, success: true });
  
}