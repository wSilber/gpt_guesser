import { prisma } from "@/prisma/prisma";
 
export default async function handler(request, response) {

  const user = await prisma.user.findFirst({
    where: {
      email: 'test@test.com'
    }
  })
 
  return response.status(200).json({ user: user});
}