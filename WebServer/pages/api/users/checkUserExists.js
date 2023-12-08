// import { createClient } from 'redis'

// const client = createClient();

// client.on('error', err => console.log("Redis client error", err));
 
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

    // Check for user by email
    if(email) {

      // const db_response = await client.get(`users/`)
      
      // response.status(200).json({ user: user });



    }

    response.status(400).json({error: 'No user info provided'})
    return;

    // } else if(username) {
    //   user = await prisma.user.findFirst({
    //     where: {
    //       username: username
    //     }
    //   })
    // } else {
    //   console.error(`ERROR: No information provided`)
    //   response.status(400).json({error: 'No user info provided'})
    // }
  
}