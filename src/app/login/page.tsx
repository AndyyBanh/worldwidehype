"use client"
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'
import { validateEmail } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async(e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email && !validateEmail(email)) {
      setError("Please enter your email address");
      return;
    }

    if (!password) {
      setError("Please enter password");
      return;
    }

    const supabase = createClient();
    const { data, error: authError } = await supabase.auth.signInWithPassword({email, password});

    if (authError) {
      setError("Invalid credentials. Please try again.");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();

  }

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
            Sign into your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <p>Email Address</p>
                <Input
                  id="email"
                  type="email"
                  placeholder="johndoe@gmail.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className='flex flex-col items-center justify-center p-5'>
              <Button 
                className='w-full rounded-xl border-border-subtle transition-all duration-200 hover:scale-105 hover:bg-transparent'
                variant='outline'
                type='submit'
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Login'}
              </Button>
              {error && <p className='text-red-500 text-sm mt-4'>{error}</p>}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
