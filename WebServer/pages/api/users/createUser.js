import { prisma } from "@/prisma/prisma";
 
export default async function checkUserExists(request, response) {

  if(request.method !== 'PUT') {
      console.error(`ERROR: ${request.method} attempted on endpoint api/users/checkUserExists`)
      response.status(405).json({error: 'This endpoint only accepts PUT requests'})
      return
  }
  
  const account = request.body.userAccount

  if(!account) {
      console.error(`ERROR: No account provided`)
      response.status(400).json({error: 'User not provided'})
  }

  const prismaUser = await prisma.user.upsert({
    where: {email: account.email},
    update: {},
    create: {
      email: account.email,
      username: account.email,
      image: account.image,
      googleId: account.googleId
    }
  })
 
  response.status(200).json({ user: prismaUser, success: true });
  
}