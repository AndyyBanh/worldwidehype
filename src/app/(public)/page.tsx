import { Button } from '@/components/ui/button';
import Footer from '@/components/layout/Footer';
import ImageSlideshow from '@/components/layout/ImageSlideshow';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default function Home() {
  return (
    <div className='flex flex-col'>
        <section className='h-[80vh] flex items-center justify-center px-4'>
          <div className='w-full max-w-3xl text-center'>
            <div className='flex justify-center mb-6'>
              <Image
                src='/wwhdark.png'
                alt='World Wide Hype logo'
                width={160}
                height={53}
                className='h-auto w-40 rounded-4xl dark:hidden'
                priority
              />
              <Image
                src='/wwhbright.png'
                alt='World Wide Hype logo'
                width={160}
                height={53}
                className='h-auto w-40 rounded-4xl hidden dark:block'
                priority
              />
            </div>
            <h1 className='font-bold text-6xl md:text-7xl tracking-tight leading-tight'>
              WORLD WIDE
              <br />
              <span className=''>HYPE</span>
            </h1>
            <p className='mt-4 text-lg text-muted max-w-xl mx-auto'>
              The premier place for high quality sneakers, streetwear, and accessories.
            </p>
            <div className='flex flex-col items-center justify-center gap-4 mt-8'>
              <Link href='/sell'>
                <Button
                  size='lg'
                  className='h-12 px-8 text-base font-semibold rounded-xl border-border-subtle transition-all duration-200 hover:scale-105'
                >
                  Sell to Us
                </Button>
              </Link>
              <p className='text-sm text-muted max-w-xl mx-auto'>We buy anything from sneakers, streetwear, and collectibles.</p>
            </div>
          </div>
        </section>

        <ImageSlideshow />

        <Footer />
    </div>
  )
}
