import CustomButton from '../_components/Button'

const MarketingPage = () => {
  return (
    <div className='px-5 md:px-10'>
        {/* hero section */}
        <section className='h-full min-h-[80vh] flex flex-col justify-center items-center space-y-16 py-10 md:py-20'>
          <div className='heading-text flex flex-col justify-center items-center space-y-5'>
            <h1 className='text-gray-700 text-3xl md:text-4xl lg:text-5xl font-bold text-center'>Discover Your Next Favorite Book with<br className='hidden md:block' /> BookMatch</h1>
            <p className='text-gray-500 text-lg md:text-xl font-semibold text-center'>Choose your path to personalized book recommendations</p>               
          </div>
          <div className='grid grid-cols-1 md:grid-cols-10 justify-start items-center w-full h-full gap-10 md:gap-0'>
            <div className='option1 col-span-1 md:col-span-5 flex flex-col justify-between items-center h-full md:p-10 space-y-5 md:space-y-10'>
              <h2 className='text-gray-700 text-2xl md:text-3xl lg:text-4xl font-bold text-center'>Tell Us What You’ve<br className='hidden md:block' /> Read</h2>
              <CustomButton minwidth='w-52' size='medium'>Find Similar</CustomButton>
            </div>
            <div className='option2 col-span-1 md:col-span-5 flex flex-col justify-between items-center h-full md:p-10 space-y-5 md:space-y-10 md:border-l-2'>
              <h2 className='text-gray-700 text-2xl md:text-3xl lg:text-4xl font-bold text-center'>Get recommendations by<br className='hidden md:block' /> rating books</h2>
              <CustomButton minwidth='w-52' variant='outline' size='medium'>Start Rating</CustomButton>
            </div>
          </div>
        </section>
    </div>
  )
}

export default MarketingPage