import React from 'react'
import Image from 'next/image';


function Book() {
  return (
    <div>
        <div className='flex'>
            <div className='flex-1'>
                <Image 
                src='/_assets/images/book_image.jpg' alt='book' className='w-40 h-60'/>
            </div>
            <div className='flex-1'>
                <h1 className='text-2xl'>Fire & Blood</h1>
                <p className='text-sm'>R.R.Martin</p>
                <p className='text-sm'>Published by Crown Business</p>
                <p className='text-sm'>ISBN: 978-0307887894</p>
                <p className='text-sm'>Pages: 336</p>
                <p className='text-sm'>Year: 2011</p>
            </div>

        </div>
    </div>
  )
}

export default Book