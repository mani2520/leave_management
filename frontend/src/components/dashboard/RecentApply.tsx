'use client';

import React from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export interface RecentLeaveItem {
  id: string;
  type: string;
  dates: string;
  days: number;
  status: 'pending' | 'approved' | 'rejected';
}

export interface RecentApplyProps {
  leaves: RecentLeaveItem[];
}

const RecentApply = ({ leaves }: RecentApplyProps) => {
  return (
    <div className='bg-card p-6 border border-border rounded-lg'>
      <div className='flex justify-between items-center'>
        <h2 className='mb-4 font-bold text-card-foreground text-xl'>
          Recent Apply
        </h2>
        <Link
          href='/my-leaves'
          className='flex items-center font-bold gap-1 text-primary hover:text-primary/80 transition-colors'
        >
          View All
          <ChevronRight className='w-4 h-4' />
        </Link>
      </div>
      <div className='space-y-4'>
        {leaves.map((leave) => {
          const statusStyles =
            leave.status === 'approved'
              ? {
                  border: 'border-l-green-500',
                  badge:
                    'border border-green-500 text-green-600 dark:text-green-400',
                }
              : leave.status === 'pending'
                ? {
                    border: 'border-l-yellow-500',
                    badge:
                      'border border-yellow-500 text-yellow-600 dark:text-yellow-400',
                  }
                : {
                    border: 'border-l-red-500',
                    badge:
                      'border border-red-500 text-red-600 dark:text-red-400',
                  };

          return (
            <div
              key={leave.id}
              className={`flex items-center justify-between rounded-lg bg-card p-4 border border-border border-l-4 border-l-solid ${statusStyles.border}`}
            >
              <div>
                <p className='font-medium text-foreground'>{leave.type}</p>
                <p className='text-muted-foreground text-sm'>
                  {leave.dates} • {leave.days} day
                  {leave.days > 1 ? 's' : ''}
                </p>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles.badge}`}
              >
                {leave.status}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecentApply;
