
export default async function handler(request, response) {

  console.log("Starting test")

  // const user = await prisma.user.findFirst({
  //   where: {
  //     email: 'test@test.com'
  //   }
  // })
 
  return response.status(200).json({ user: "test"});
}