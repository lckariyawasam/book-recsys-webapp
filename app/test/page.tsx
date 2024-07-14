import React from 'react'
import CustomButton from '../_components/Button'
import { auth } from '@/auth'
import { SignOutButton } from '../_components/SignOutButton' 

const Testing = async () => {


  const session = await auth()

  return (
    <>
        <CustomButton variant="secondary" >Hello</CustomButton>
        <CustomButton variant="outline" >Hello</CustomButton>
        <CustomButton size="large" minwidth='w-42' >Hello</CustomButton>
        {session?.user ? <p>{session.user.email}</p> : <p>Logged out</p>}
        <SignOutButton />
    </>
  )
}

export default Testing