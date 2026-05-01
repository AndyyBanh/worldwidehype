import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import ThemeToggle from './ThemeToggle'
import Image from 'next/image'

const NavigationBar = () => {
  return (
    <nav className='fixed w-full z-250 h-16 border-b border-border-subtle bg-background/80 backdrop-blur-md'>
        <div className='flex justify-between items-center h-full w-full px-6'>
            <Link href='/' className='flex items-center'>
                <Image
                  src='/wwhdark.png'
                  alt='World Wide Hype logo'
                  width={120}
                  height={40}
                  className='h-10 w-auto rounded-4xl dark:hidden'
                  priority
                />
                <Image
                  src='/wwhbright.png'
                  alt='World Wide Hype logo'
                  width={120}
                  height={40}
                  className='h-10 w-auto rounded-4xl hidden dark:block'
                  priority
                />
            </Link>
            <div className='flex items-center gap-2'>
                <ThemeToggle />
                <Link href='/login'>
                    <Button
                      className='border-border-subtle transition-all duration-200 hover:scale-105 hover:outline-background-subtle'
                      size='lg'
                    >
                        Admin
                    </Button>
                </Link>
            </div>
        </div>
    </nav>
  )
}

export default NavigationBar