'use client';

import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  CheckCircle,
  TrendingUp,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return 'Good Morning';
  } else if (hour >= 12 && hour < 17) {
    return 'Good Afternoon';
  } else if (hour >= 17 && hour < 21) {
    return 'Good Evening';
  } else {
    return 'Good Night';
  }
};

const leaveStats = [
  {
    type: 'Annual Leave',
    remaining: 1,
    used: 8,
    total: 9,
  },
  {
    type: 'Compassionate Leave',
    remaining: 0,
    used: 3,
    total: 3,
  },
  {
    type: 'Sick Leave',
    remaining: 2,
    used: 4,
    total: 6,
  },
  {
    type: 'Comp Off',
    remaining: 0,
    used: 0,
    total: 0,
  },
];

const recentLeaves = [
  {
    id: '1',
    type: 'Sick Leave',
    dates: 'Jan 20 - Jan 21',
    days: 2,
    status: 'approved',
  },
  {
    id: '2',
    type: 'Annual Leave',
    dates: 'Mar 10 - Mar 15',
    days: 5,
    status: 'pending',
  },

  {
    id: '3',
    type: 'Personal Leave',
    dates: 'Jan 15 - Jan 16',
    days: 2,
    status: 'cancelled',
  },
];

const upcomingHolidays = [
  { name: 'Republic Day', date: 'Jan 26, 2026', type: 'Public Holiday' },
  { name: 'Holi', date: 'Mar 14, 2026', type: 'Public Holiday' },
  { name: 'Good Friday', date: 'Apr 03, 2026', type: 'Public Holiday' },
];

const teamOnLeave = [
  {
    name: 'Arun Patel',
    department: 'Engineering',
    dates: 'Jan 28 - Jan 29',
    avatar: 'AP',
  },
  {
    name: 'Deepa Reddy',
    department: 'HR',
    dates: 'Feb 15 - Feb 20',
    avatar: 'DR',
  },
];

const Dashboard = () => {
  const getGreeting = (): string => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return 'Good Morning';
    } else if (hour >= 12 && hour < 17) {
      return 'Good Afternoon';
    } else if (hour >= 17 && hour < 21) {
      return 'Good Evening';
    } else {
      return 'Good Night';
    }
  };

  const getTodayDate = (): string => {
    const today = new Date();
    const day = today.toLocaleDateString('en-GB').replaceAll('/', '-');
    const weekday = today.toLocaleDateString('en-IN', { weekday: 'long' });
    return `Today is ${weekday} (${day})`;
  };

  const getLeaveIcon = (type: string) => {
    switch (type) {
      case 'Annual Leave':
        return Calendar;
      case 'Compassionate Leave':
        return CheckCircle;
      case 'Sick Leave':
        return Clock;
      case 'Comp Off':
        return TrendingUp;
      default:
        return Calendar;
    }
  };

  const getLeaveColors = (type: string) => {
    switch (type) {
      case 'Annual Leave':
        return {
          bg: 'bg-blue-500',
          percentageColor: 'bg-blue-600',
          text: 'text-blue-600',
          bgLight: 'bg-blue-50',
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600',
        };
      case 'Compassionate Leave':
        return {
          bg: 'bg-purple-500',
          percentageColor: 'bg-purple-600',
          text: 'text-purple-600',
          bgLight: 'bg-purple-50',
          iconBg: 'bg-purple-100',
          iconColor: 'text-purple-600',
        };
      case 'Sick Leave':
        return {
          bg: 'bg-green-500',
          percentageColor: 'bg-green-600',
          text: 'text-green-600',
          bgLight: 'bg-green-50',
          iconBg: 'bg-green-100',
          iconColor: 'text-green-600',
        };
      case 'Comp Off':
        return {
          bg: 'bg-orange-500',
          percentageColor: 'bg-orange-600',
          text: 'text-orange-600',
          bgLight: 'bg-orange-50',
          iconBg: 'bg-orange-100',
          iconColor: 'text-orange-600',
        };
      default:
        return {
          bg: 'bg-blue-500',
          percentageColor: 'bg-blue-600',
          text: 'text-blue-600',
          bgLight: 'bg-blue-50',
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600',
        };
    }
  };

  return (
    <div className='min-h-screen text-foreground transition-colors duration-300'>
      <div className='bg-background px-8 py-6 border-border border-b'>
        <div className='flex justify-between items-center mx-auto container'>
          <div>
            <h1 className='mb-2 font-bold text-3xl'>
              {getGreeting()}, Rajaguru
            </h1>
            <p className='text-muted-foreground'>{getTodayDate()}</p>
          </div>
          <Button className='flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground'>
            <Calendar className='w-4 h-4' />
            Apply Leave
          </Button>
        </div>
      </div>

      <div className='bg-background p-8'>
        <div className='gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8'>
          {leaveStats.map((stat) => {
            const Icon = getLeaveIcon(stat.type);
            const colors = getLeaveColors(stat.type);
            const percentage =
              stat.total > 0 ? Math.round((stat.used / stat.total) * 100) : 0;
            return (
              <div
                key={stat.type}
                className={`relative overflow-hidden group transition-all duration-300 ${colors.bg} border-2 border-border rounded-xl p-6 hover:shadow-xl `}
              >
                <div
                  className={`top-6 right-6 absolute ${colors.iconBg} p-3 rounded-full group-hover:scale-110 transition-transform shadow-lg hover:scale-105`}
                >
                  <Icon className={`w-6 h-6 ${colors.iconColor}`} />
                </div>
                <div className='flex flex-col justify-between h-full'>
                  <div>
                    <h3 className='mb-1 font-extrabold text-white text-3xl'>
                      {stat.remaining}{' '}
                      <span className='font-semibold text-white/80 text-base'>
                        days left
                      </span>
                    </h3>
                    <p className='mb-4 font-semibold text-white text-lg'>
                      {stat.type}
                    </p>
                  </div>
                  <div className='relative bg-white/20 mt-4 rounded-full w-full h-1 overflow-hidden'>
                    <div
                      className={`relative rounded-full h-full transition-all duration-500 ${colors.percentageColor}`}
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                  <div className='flex justify-between items-center mt-3 text-white/90 text-sm'>
                    <span>
                      Used: <b className='text-white'>{stat.used}</b>
                    </span>
                    <span>
                      Total: <b className='text-white'>{stat.total}</b>
                    </span>
                    <span className='font-medium text-white text-xs'>
                      {percentage}% used
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className='gap-6 grid grid-cols-1 lg:grid-cols-2 mb-8'>
          <div className='bg-card p-6 border border-border rounded-lg'>
            <div className='flex justify-between items-center'>
              <h2 className='mb-4 font-bold text-card-foreground text-xl'>
                Recent Apply
              </h2>
              <Link
                href={'/my-leaves'}
                className='flex items-center font-bold gap-1 text-primary hover:text-primary/80 transition-colors'
              >
                View All
                <ChevronRight className='w-4 h-4' />
              </Link>
            </div>
            <div className='space-y-4'>
              {recentLeaves.map((leave) => {
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
                    className={`flex items-center justify-between rounded-lg
        bg-card p-4
        border border-border
        border-l-4 border-l-solid ${statusStyles.border}`}
                  >
                    <div>
                      <p className='font-medium text-foreground'>
                        {leave.type}
                      </p>
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

          <div className='bg-card p-6 border border-border rounded-lg'>
            <h2 className='mb-4 font-bold text-card-foreground text-xl'>
              Upcoming Holidays
            </h2>
            <div className='space-y-4'>
              {upcomingHolidays.map((holiday, index) => (
                <div
                  key={index}
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
        </div>

        <div className='bg-card p-6 border border-border rounded-lg'>
          <h2 className='mb-4 font-bold text-card-foreground text-xl'>
            Team on Leave
          </h2>
          <div className='gap-4 grid grid-cols-1 md:grid-cols-2'>
            {teamOnLeave.map((member, index) => (
              <div
                key={index}
                className='flex items-center gap-4 bg-muted p-4 rounded-lg'
              >
                <div className='flex justify-center items-center bg-gradient-to-br from-primary to-primary/80 rounded-full w-12 h-12 font-semibold text-primary-foreground text-sm'>
                  {member.avatar}
                </div>
                <div className='flex-1'>
                  <p className='font-medium text-card-foreground'>
                    {member.name}
                  </p>
                  <p className='text-muted-foreground text-sm'>
                    {member.department}
                  </p>
                  <p className='mt-1 text-muted-foreground text-xs'>
                    {member.dates}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
