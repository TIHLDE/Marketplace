import Link from "next/link";
import FeaturedProducts from "./_home/Featured";
import LatestProducts from "./_home/New";
import PreOrderProducts from "./_home/PreOrder";
import { ArrowRightIcon } from "@radix-ui/react-icons";


export default function Home() {
  return (
    <div className='py-12'>
      <div className='max-w-2xl w-full mx-auto mt-6 pb-32'>
        <div className='space-y-6'>
          <h1 className='text-center text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-tihlde-900 to-coral-red-400'>
            TIHLDE Marketplace
          </h1>
          <p className='text-center text-gray-500 font-semibold'>
            Velkommen til TIHLDE sin egen nettbutikk. Her vil du finne produkter som TIHLDE selger, og interesseskjemaer relatert til produkter.
          </p>
          
          <div className='flex justify-center pt-4'>
            <Link 
              href='/products'
              className='text-tihlde-600 flex items-center space-x-2 font-semibold text-lg hover:text-tihlde-900'
            >
              <h1>
                Vis produktkatalog
              </h1>
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </div>

      <div className='space-y-28'>
        <FeaturedProducts />
        <LatestProducts />
        <PreOrderProducts />
      </div>
    </div>
  )
}
