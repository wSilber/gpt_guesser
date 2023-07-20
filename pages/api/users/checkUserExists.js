import { prisma } from "@/prisma/prisma";
 
export default async function checkUserExists(request, response) {

    if(request.method !== 'POST') {
        console.error(`ERROR: ${request.method} attempted on endpoint api/users/checkUserExists`)
        response.status(405).json({error: 'This endpoint only accepts POST requests'})
        return
    }

    const { body } = request
    const email = body.email
    const username = body.username

    let user = null;

    if(email) {
      user = await prisma.user.findFirst({
        where: {
          email: email
        }
      })
    } else if(username) {
      user = await prisma.user.findFirst({
        where: {
          username: username
        }
      })
    } else {
      console.error(`ERROR: No information provided`)
      response.status(400).json({error: 'No user info provided'})
    }

  response.status(200).json({ user: user });
  
}