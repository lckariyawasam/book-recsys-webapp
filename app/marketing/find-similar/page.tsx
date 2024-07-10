import CustomButton from '@/app/_components/Button'
import SearchBar from '@/app/_components/SearchBar'
import React from 'react'

const FindSimilarPage = () => {
  return (
    <div className='px-5 md:px-10'>
        <section className='h-full min-h-[80vh] flex flex-col justify-start items-center space-y-16 py-10 md:py-20'>
          <div className='flex flex-col justify-center items-center space-y-5'>
            <h1 className='text-gray-700 text-3xl md:text-4xl lg:text-5xl font-bold text-center'>Tell Us What You’ve Read</h1>
            <p className='text-gray-500 text-lg md:text-xl font-semibold text-center'>Add books you have read and loved. The more you add, the better we can recommend.</p>        
            <SearchBar />       
          </div>
        </section>
    </div>
  )
}

export default FindSimilarPage