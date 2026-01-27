'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, Send } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const ApplyLeaveCard = () => {
  return (
    <div
      className='relative overflow-hidden rounded-2xl min-h-[280px] flex flex-col justify-between p-6 md:p-8'
      style={{
        background:
          'linear-gradient(135deg, #1e3a5f 0%, #312e81 40%, #4c1d95 100%)',
      }}
      aria-label='Apply leave card'
    >
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div
          className='absolute -bottom-8 -right-8 w-40 h-40 rounded-full opacity-25'
          style={{ background: '#6366f1', filter: 'blur(70px)' }}
        />
        <div
          className='absolute top-8 -left-4 w-24 h-24 rounded-full opacity-20'
          style={{ background: '#8b5cf6', filter: 'blur(50px)' }}
        />
      </div>
      <div className='relative z-10 flex justify-between items-start'>
        <span className='font-bold text-white/80 text-xs uppercase tracking-widest'>
          Apply Leave
        </span>
        <div className='flex gap-1' role='tablist' aria-label='Carousel navigation'>
          <button
            type='button'
            className='rounded-full p-1.5 bg-white/10 hover:bg-white/20 transition-colors'
            aria-label='Previous'
          >
            <ChevronLeft className='w-4 h-4 text-white' />
          </button>
          <button
            type='button'
            className='rounded-full p-1.5 bg-white/10 hover:bg-white/20 transition-colors'
            aria-label='Next'
          >
            <ChevronRight className='w-4 h-4 text-white' />
          </button>
        </div>
      </div>
      <div className='relative z-10 flex-1 flex flex-col justify-center'>
        <h2 className='mb-2 font-bold text-white text-2xl md:text-3xl'>
          Submit your leave in a few clicks
        </h2>
        <p className='mb-6 text-white/80 text-sm max-w-sm'>
          Apply for sick, casual, or annual leave — quick and easy.
        </p>
      </div>
      <div className='relative z-10'>
        <Link href='/leaves/apply'>
          <Button
            className='bg-white text-indigo-700 hover:bg-white/90 font-semibold shadow-lg'
            aria-label='Apply leave now'
          >
            Apply now
            <Send className='w-4 h-4' />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ApplyLeaveCard;
