import { Button } from '@/components/ui/button';
import React from 'react';
import { IoLogoInstagram } from "react-icons/io5";

export default function Footer() {
  return (
    <footer className='text-center border-t border-border-subtle bg-surface py-8 px-4'>
      <div className='flex items-center justify-center mb-4'>
        <a
          href='https://www.instagram.com/worldwidehype.ca?igsh=MTljb2ppanoyeW45cA=='
          target='_blank'
          rel='noopener noreferrer'
          aria-label='Instagram'
        >
          <Button
            variant='ghost'
            className='h-12 w-12 rounded-full text-muted hover:text-muted hover:bg-surface-hover transition-colors duration-200'
          >
            <IoLogoInstagram className='size-9' />
          </Button>
        </a>
      </div>

      <p className='text-sm text-muted'>
        © 2026 World Wide Hype. All rights reserved.
      </p>
    </footer>
  );
}
