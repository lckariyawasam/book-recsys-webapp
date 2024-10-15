import React from 'react'
import CustomButton from '../_components/Button'
import { auth } from '@/auth'
import { SignOutButton } from '../_components/SignOutButton' 
import BookCardAddBooks from '../_components/BookCardAddBook'

const Testing = async () => {


  const session = await auth()

  return (
    <>
        <CustomButton variant="secondary" >Hello</CustomButton>
        <CustomButton variant="outline" >Hello</CustomButton>
        <CustomButton size="large" minwidth='w-42' >Hello</CustomButton>
        {session?.user ? <p>{session.user.email}</p> : <p>Logged out</p>}
        <SignOutButton />
        {/* <BookCardAddBooks title='test' author='test' rating={5} genres={['test']} coverUrl='https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Goo_%28search_engine%29_logo_2020.svg/1200px-Goo_%28search_engine%29_logo_2020.svg.png'/> */}

    </>
  )
}

export default Testing