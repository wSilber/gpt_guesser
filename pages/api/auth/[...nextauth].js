import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const PROVIDERS = {
    GOOGLE: 'google',
}

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ account, profile} ) {
        if(account.provider === PROVIDERS.GOOGLE) {
            return profile.email_verified && profile.email.endsWith('@gmail.com')
        }
    }
  }
})