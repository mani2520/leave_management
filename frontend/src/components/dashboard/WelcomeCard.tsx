'use client';

import React from 'react';
import { Send } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const WELCOME_ILLUSTRATION_URL =
  'https://res.cloudinary.com/dlg7s0cl6/image/upload/v1769540554/undraw_browsing-online_rozb_ewi43y.svg';

export interface WelcomeCardProps {
  userName: string;
  greeting: string;
  todayDate: string;
  dailyQuote: string | null;
}

const WelcomeCard = ({
  userName,
  greeting,
  todayDate,
  dailyQuote,
}: WelcomeCardProps) => {
  return (
    <div
      className='relative col-span-2 overflow-hidden rounded-2xl min-h-[280px] flex flex-col md:flex-row md:items-center md:justify-between gap-6 p-6 md:p-8'
      style={{
        background:
          'linear-gradient(135deg, var(--welcome-gradient-from) 0%, var(--welcome-gradient-mid) 50%, var(--welcome-gradient-to) 100%)',
      }}
      aria-label='Welcome card'
    >
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div
          className='absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-30'
          style={{ background: 'var(--color-primary)', filter: 'blur(80px)' }}
        />
        <div
          className='absolute top-1/2 -left-8 w-32 h-32 rounded-full opacity-20'
          style={{
            background: 'color-mix(in srgb, var(--color-primary) 80%, white)',
            filter: 'blur(60px)',
          }}
        />
      </div>
      <div className='relative z-10 flex flex-col justify-between min-h-[200px] md:min-h-0'>
        <div>
          <p className='mb-1 font-medium text-white/90 text-base'>
            Welcome back
          </p>
          <h1 className='mb-2 font-bold text-white text-3xl md:text-4xl'>
            {greeting}, {userName}
          </h1>
          <p className='mb-4 text-white/80 text-sm'>{todayDate}</p>
          {dailyQuote && (
            <p className='mb-6 text-white/90 text-sm max-w-md leading-relaxed'>
              {dailyQuote}
            </p>
          )}
        </div>
        <div className='relative z-10'>
          <Link href='/leaves/apply'>
            <Button
              className='flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-lg'
              aria-label='Apply leave'
            >
              Apply Leave
              <Send className='w-4 h-4' />
            </Button>
          </Link>
        </div>
      </div>
      <div className='relative z-10 shrink-0 flex items-end justify-end md:justify-end'>
        <img
          src={WELCOME_ILLUSTRATION_URL}
          alt=''
          className='h-36 w-auto md:h-44 md:max-w-[220px] object-contain object-bottom-right'
          loading='lazy'
          aria-hidden
        />
      </div>
    </div>
  );
};

export default WelcomeCard;
