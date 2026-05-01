"use client"
import { useTheme } from 'next-themes'
import React from 'react'
import { Button } from '../ui/button';
import { GoSun } from "react-icons/go";
import { FaMoon } from "react-icons/fa";


export default function ThemeToggle() {
  const {setTheme, resolvedTheme} = useTheme();

    
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className='h-9 w-9 rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-200 hover:scale-105 hover:bg-transparent'
      suppressHydrationWarning
    >

      <GoSun  className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0'/>
      <FaMoon className='absolute h-[1.2rem] w-[1.2rem] rotate-900 scale-0 transition-all dark:rotate-0 dark:scale-100'/>
      <span className="sr-only">Toggle theme</span>
    </Button>



  )
}
