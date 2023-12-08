import * as React from 'react'
import { signIn, signOut } from 'next-auth/react'
import GoogleButton from 'react-google-button'

export default function SignIn() {

    return (
        <GoogleButton
            onClick={() => { signIn('google') }}
        ></GoogleButton>
    )
}