import AddBookCard from '@/app/_components/AddBookCard'
import Book from '@/app/_components/Book'
// import BookCard from '@/app/_components/BookCard'
import BookCardAddBooks from '@/app/_components/BookCardAddBook'
import Footer from '@/app/_components/Footer'
import { AddBox } from '@mui/icons-material'
import React from 'react'
// import Image from 'next/image';



const InputReadBookPage = () => {
    return (
    
      <div className='px-5 md:px-10 mt-5 md:mt-10'>
          <section className='h-full min-h-[80vh] flex flex-col justify-start items-center space-y-16 py-10 md:py-20'>
            <div className='flex flex-col justify-center items-center space-y-5'>
              <h1 className='text-gray-700 text-3xl md:text-4xl lg:text-5xl font-bold text-center'>Tell Us What You've Read</h1>
              <p className='text-gray-500 text-lg md:text-xl font-semibold text-center'>Add books you have read and loved. The more you add, the better we can recommend.</p>        
                    
            </div>
            <div className='flex-col flex gap-8 items-center justify-center'>


    </div>
    <div className='flex flex-row gap-12'>
      <div>
      <BookCardAddBooks
                  title="Fire & Blood"
                  author="R. R. Martin"
                  rating={4}
                  genres={['Fantasy', 'Fantasy Fiction', 'High Fantasy', 'Adventure Fiction']}
                  coverUrl="/book_image.jpg"
                  />
      </div>
    <div>
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Add Another Book Button */}
      <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-full shadow-md">
        Add Another Book
      </button>

      {/* Remove Button */}
      <button className="bg-yellow-100 text-yellow-700 font-medium py-2 px-4 rounded-full shadow-md">
        Remove
      </button>
    </div>
    </div>
    </div>


    <div>
        
    <AddBookCard/>

    </div>
    <div>
   
    </div>
    

          </section>
          <Footer/>     
      </div>
      
    )

}
export default InputReadBookPage 