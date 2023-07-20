import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google'
import { randomBytes, randomUUID } from "crypto";

const PROVIDERS = {
    CREDENTIALS: 'credentials',
    GOOGLE: 'google',
}

export default NextAuth({

  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    Credentials({
      name: 'username',

      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'Username' },
        password: { label: 'Password', type: 'password', placeholder: 'Password' }
      },

      async authorize(credentials, req) {

        console.log({credentals: credentials})

        const username = credentials.username;
        const password = credentials.password;

        if(!username || !password)
          return null;


        
        return credentials
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
    generateSessionToken: () => {
        return randomUUID?.() ?? randomBytes(32).toString("hex")
    }
  },

  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },

  callbacks: {
    async signIn({ account, profile} ) {

      // Check that email has been verified
      if(account.provider === PROVIDERS.GOOGLE) {

          if(!profile.email_verified || !profile.email.endsWith('@gmail.com')) return false;
          
      }

      console.log({profile: profile})

      // Verify that user account already exists
      const userExists = await checkUserExistsByEmail(profile.email)

      // Login user if account exists
      if(userExists) return true

      const userAccount = {
        name: profile.name,
        email: profile.email,
        image: account.provider === PROVIDERS.GOOGLE? profile.picture : null,
        googleId: account.provider === PROVIDERS.GOOGLE? profile.sub : null
      }

      // Create account if does not exist
      const accountCreationSuccessful = createUserAccount(userAccount)

      // Make sure account was created successfully
      if(!accountCreationSuccessful) {
        console.error("ERROR: Could not create account")
        return false
      }

      // Verify that user account already exists
      const userExistsPartTwo = await checkUserExistsByEmail(profile.email)

      // Login user if account exists
      if(userExistsPartTwo) return true

      console.log("BEEG BEEG ERROR")

      // BEEEEG BEEEG PROBLEM IF YOU GET HERE
      return false
    },

    async session({session, token}) {

      // Return session if user id already exists
      if(session.user.id !== undefined) return session

      // Create new session user
      const new_session = {
        user: {
          name: token.name,
          email: token.email,
          image: token.image,
          id: token.id
        },
        expires: session.expires
      }

      // Return new session
      return new_session
    },

    async jwt({ token, user }) {
      
      // Update token id from user id
      if(user) token.id = user.id

      // Return new token
      return token
    }
  }
})

async function checkUserExistsByUsername(username) {

  const request = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username})
  }

  console.log(request)
  
  try {
    const resp = await fetch(`${process.env.NEXTAUTH_URL}/api/users/checkUserExists`, request)

    const jsonResponse = await resp.json()

    return jsonResponse.user !== null
    
  } catch(err) {
    console.error("ERROR: in fetch for checkUserExistsByUsername")
    console.error(err)
    return false
  }

}

async function checkUserExistsByEmail(email) {

  // TODO - ADD REDIS CACHING FOR ACCOUNT BEFORE REQUEST

  const request = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({email})
  }

  console.log(request)

  try {
    const resp = await fetch(`${process.env.NEXTAUTH_URL}/api/users/checkUserExists`, request)

    const jsonResponse = await resp.json()

    return jsonResponse.user !== null

  } catch (err) {
    console.error("ERROR: in fetch for checkUserExists")
    console.error(err)
    return false
  }
}

async function createUserAccount(userAccount) {

  const request = {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({'userAccount': userAccount})
  }

  try {

      const resp = await fetch(`${process.env.NEXTAUTH_URL}/api/users/createUser`, request)

      const jsonResponse = await resp.json()

      return jsonResponse.success

  } catch (err) {
    console.error("ERROR: In fetch from createNewUser")
    console.error(err)
    return false;
  }

}