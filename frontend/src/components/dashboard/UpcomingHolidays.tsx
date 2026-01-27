'use client';

import React from 'react';

export interface HolidayItem {
  name: string;
  date: string;
  type: string;
}

export interface UpcomingHolidaysProps {
  holidays: HolidayItem[];
}

const UpcomingHolidays = ({ holidays }: UpcomingHolidaysProps) => {
  return (
    <div className='bg-card p-6 border border-border rounded-lg'>
      <h2 className='mb-4 font-bold text-card-foreground text-xl'>
        Upcoming Holidays
      </h2>
      <div className='space-y-4'>
        {holidays.map((holiday) => (
          <div
            key={`${holiday.name}-${holiday.date}`}
            className='flex justify-between items-center bg-muted p-4 rounded-lg'
          >
            <div>
              <p className='font-medium text-card-foreground'>
                {holiday.name}
              </p>
              <p className='text-muted-foreground text-sm'>
                {holiday.date}
              </p>
            </div>
            <span className='text-muted-foreground text-xs'>
              {holiday.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingHolidays;
