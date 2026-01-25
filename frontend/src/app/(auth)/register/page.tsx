'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeClosed, LockKeyhole, LogIn, Mail } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className='flex justify-center items-center bg-background w-dvw h-dvh text-foreground transition-colors duration-300'>
      <div className='flex bg-card shadow-lg border border-border rounded-xl max-w-4xl overflow-hidden'>
        <div className='hidden lg:flex justify-center items-center bg-primary/5 p-8 w-1/2'>
          <Image
            src='https://res.cloudinary.com/dlg7s0cl6/image/upload/v1769270568/undraw_referral_ihsd_xkp55g.svg'
            alt='Login illustration'
            width={384}
            height={384}
            className='object-contain'
            priority
          />
        </div>
        <div className='flex flex-col justify-center gap-6 p-8 w-full lg:w-1/2'>
          <div className=''>
            <h1 className='mb-3 font-semibold text-card-foreground text-2xl text-center'>
              Welcome
            </h1>
            <p className='text-center'>
              Create your account to access your workspace
            </p>
          </div>

          <form className='space-y-4' onSubmit={handleRegister}>
            <div className='relative'>
              <Mail className='top-1/2 left-3 absolute w-4 h-4 text-muted-foreground -translate-y-1/2' />
              <Input
                type='email'
                placeholder='Enter your email'
                className='bg-background pl-10'
              />
            </div>
            <div className='relative'>
              <LockKeyhole className='top-1/2 left-3 absolute w-4 h-4 text-muted-foreground -translate-y-1/2' />

              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder='Enter your password'
                className='bg-background pr-10 pl-10'
              />
              <Button
                tabIndex={-1}
                className='top-1/2 right-3 absolute bg-transparent hover:bg-transparent w-4 h-4 text-muted-foreground -translate-y-1/2'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye /> : <EyeClosed />}
              </Button>
            </div>
            <div className='relative'>
              <LockKeyhole className='top-1/2 left-3 absolute w-4 h-4 text-muted-foreground -translate-y-1/2' />

              <Input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder='Re-Enter your password'
                className='bg-background pr-10 pl-10'
              />
              <Button
                type='button'
                tabIndex={-1}
                aria-hidden='true'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className='top-1/2 right-3 absolute bg-transparent hover:bg-transparent w-4 h-4 text-muted-foreground -translate-y-1/2'
              >
                {showConfirmPassword ? <Eye /> : <EyeClosed />}
              </Button>
            </div>

            <Button className='w-full' type='submit'>
              Register
              <LogIn />
            </Button>
          </form>

          <p className='text-muted-foreground text-sm text-center'>
            Do you have an account?{' '}
            <Link
              href='/login'
              className='font-medium text-primary hover:underline'
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
