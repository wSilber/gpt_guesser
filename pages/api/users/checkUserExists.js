import { prisma } from "@/prisma/prisma";
 
export default async function checkUserExists(request, response) {

    if(request.method !== 'POST') {
        console.error(`ERROR: ${request.method} attempted on endpoint api/users/checkUserExists`)
        response.status(405).json({error: 'This endpoint only accepts POST requests'})
        return
    }

    const email = request.body.email

    if(!email) {
        console.error(`ERROR: No email provided`)
        response.status(400).json({error: 'User not provided'})
    }

  const user = await prisma.user.findFirst({
    where: {
      email: email
    }
  })
 
  response.status(200).json({ user: user });
  
}