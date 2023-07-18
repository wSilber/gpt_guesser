import NextAuth from 'next-auth'
import AppleProvider from 'next-auth/providers/apple'
import FacebookProvider from 'next-auth/providers/facebook'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'

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