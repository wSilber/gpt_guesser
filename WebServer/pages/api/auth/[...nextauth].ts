import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { randomBytes, randomUUID } from "crypto";
import { getAllUsers, userExists } from '@/db/users/users';
import { User } from '@/db/users/userTypes';
import { ApiUserResponse } from '../users/user';

const PROVIDERS = {
    CREDENTIALS: 'credentials',
    GOOGLE: 'google',
}

export default NextAuth({

  secret: process.env.NEXTAUTH_SECRET,

  providers: [

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
    async signIn({ account, profile } ) {

      if(account.provider === PROVIDERS.GOOGLE) {

        console.log("Logging in with Google")

        const email = profile.email

        if (!email) return false;

        let user: User = {
          email: email,
          id: '-1',
          username: '-1'
        }

        const accountExists = await userExists(user)

        if(accountExists) return true

        console.log("Account does not exist")

        const userId = randomUUID?.() ?? randomBytes(32).toString("hex")

        user = {
          email: email,
          id: userId,
          username: profile.name
        }

        try {

          const request = {
            method: 'PUT',
            body: JSON.stringify({user: user}),
            headers: {
              "Content-Type": "application/json",
              "Accept": "application/json"
            }
          }

          const resp = await fetch('http://localhost:3000/api/users/createUser', request)
          const json = await resp.json()
          const userResponse: ApiUserResponse = json as ApiUserResponse

          console.log(userResponse)

          return userResponse.success

        } catch (err) {
         
          console.error("ERROR in signin google callback")
          console.error(err)

          return false

        }

      }

      return false

    },

    async session({session, token}) {

      // Return session if user id already exists
      if((session.user as any).id) return session

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
      return new_session as any

    },

    async jwt({ token, user }) {
      
      // Update token id from user id
      if(user) token.id = user.id

      // Return new token
      return token
    }
  }
})