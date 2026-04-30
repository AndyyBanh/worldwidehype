"use client"
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import React from 'react'

export default function Login() {
  return (
    <div className='flex min-h-screen w-full items-center justify-center p-4'>
        
      <Card className="w-full max-w-md border-border shadow-lg">
      <CardHeader className="space-y-3 pb-6 text-center">
        <CardTitle
          className="text-2xl font-bold tracking-tight text-foreground"
        >
          Welcome Back!
        </CardTitle>
        <CardDescription className='text-foreground'>
          Sign into your account to get continue
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <p>Email Address</p>
              <Input
                id="email"
                type="email"
                placeholder="johndoe@gmail.com"
                required
                
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <p>Password</p>
              <Input id="password" type="password" required placeholder="••••••••" />
            </div>
          </div>
        </form>
      </CardContent>
      <div className='flex items-center justify-center p-5'>
         <Button 
          className='w-full rounded-xl border-border-subtle transition-all duration-200 hover:scale-105 hover:bg-transparent'
          variant='outline'
          type='submit'
        >
          Login
        </Button>
      </div>
    </Card>


    </div>
  )
}
