import CustomButton from '../_components/Button'
import Image from 'next/image'
import featureImage from '../_assets/featureImage.svg'
import Link from 'next/link'
import { Container } from '@mui/material'

const MarketingPage = () => {
  return (
    <div className=''>
        {/* hero section */}
        <section id='hero' className='h-full'>
          <Container maxWidth='xl' >
            <div className='min-h-[80vh] flex flex-col justify-center items-center space-y-10 md:space-y-24 py-16 md:py-20 px-5 md:px-10'>
          <div className='heading-text flex flex-col justify-center items-center space-y-5'>
            <h1 className='text-gray-700 text-3xl md:text-4xl lg:text-5xl font-bold text-center'>Discover Your Next Favorite Book with<br className='hidden md:block' /> BookMatch</h1>
            <p className='text-gray-500 text-lg md:text-xl font-semibold text-center'>Choose your path to personalized book recommendations</p>               
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 w-full h-full gap-10 md:gap-0'>
            <div className='option1 col-span-1 md:col-span-1 flex flex-col justify-between items-center h-full md:p-10 space-y-5 md:space-y-10'>
              <h2 className='text-gray-700 text-2xl md:text-3xl lg:text-4xl font-bold text-center'>Tell Us What You’ve<br className='hidden md:block' /> Read</h2>
              <CustomButton minwidth='w-52' size='medium'><Link href='/marketing/find-similar'>Find Similar</Link></CustomButton>
            </div>
            <div className='option2 col-span-1 md:col-span-1 flex flex-col justify-between items-center h-full md:p-10 space-y-5 md:space-y-10 md:border-l-2'>
              <h2 className='text-gray-700 text-2xl md:text-3xl lg:text-4xl font-bold text-center'>Get recommendations by<br className='hidden md:block' /> rating books</h2>
              <CustomButton minwidth='w-52' variant='outline' size='medium'>Start Rating</CustomButton>
            </div>
          </div>
          </div>
          </Container>
        </section>

        {/* feature section */}
        <section id='feature' className='h-full bg-primary bg-opacity-25 '>
          <Container maxWidth='xl' className='py-16 md:py-20 flex flex-col justify-center items-center'>
        <div className='grid grid-cols-1 md:grid-cols-2  w-full h-full gap-10 md:gap-0 px-5 md:px-10'>
            <div className='col-span-1 md:col-span-1 flex flex-col justify-center items-center md:items-start h-full md:p-10 space-y-5 md:space-y-10'>
              <h2 className='text-gray-700 text-2xl md:text-3xl lg:text-4xl font-bold text-start'>How BookMatch Works</h2>
              <p className='text-gray-500 text-sm md:text-md lg:text-lg font-semibold text-center md:text-start'>BookMatch offers two unique paths to help you find your next great read. Whether you prefer to tell us about books you've enjoyed or rate a selection of books we show you, our advanced recommendation system will find the perfect book for you.</p>
              <CustomButton minwidth='w-52' size='medium'>Find Similar</CustomButton>
            </div>
            <div className='relative col-span-1 md:col-span-1 flex flex-col justify-center items-center h-full w-full'>
            <Image src={featureImage} alt='fearure-section-image' width={700} height={500}/>
            </div>
          </div>
          </Container>
        </section>
    </div>
  )
}

export default MarketingPage