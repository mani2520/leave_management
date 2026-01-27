'use client';

import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export interface LeaveMetricCardData {
  key: string;
  title: string;
  isPositive: boolean;
  sparkColor: string;
  usageByMonth?: number[];
  isFixedEvent?: boolean;
  remaining?: number;
  totalAllocation?: number;
  used?: number;
  allocationLabel?: string;
  status?: 'Available' | 'Used' | 'Not Applicable';
}

export interface MonthLabel {
  shortMonth: string;
  fullMonth?: string;
}

export interface LeaveMetricCardsProps {
  cards: LeaveMetricCardData[];
  last6MonthsLeaveData: MonthLabel[];
}

const LeaveMetricCards = ({
  cards,
  last6MonthsLeaveData,
}: LeaveMetricCardsProps) => {
  return (
    <div className='gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-8'>
      {cards.map((card) => {
        const usageByMonth = card.usageByMonth ?? [];
        const allMonths = last6MonthsLeaveData.map((month, i) => ({
          month,
          days: usageByMonth[i] ?? 0,
          index: i,
        }));
        const maxDays = Math.max(1, ...allMonths.map((m) => m.days));

        return (
          <div
            key={card.key}
            className='flex flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition-shadow hover:shadow-md'
          >
            <p className='mb-3 text-sm font-medium text-muted-foreground'>
              {card.title}
            </p>
            <div className='flex min-h-[52px] items-end justify-between gap-3'>
              <div className='min-w-0 flex flex-col gap-2'>
                {card.isFixedEvent ? (
                  <>
                    <p
                      className='font-bold tabular-nums text-lg md:text-xl'
                      style={{ color: card.sparkColor }}
                    >
                      {card.allocationLabel}
                    </p>
                    <p className='mt-0.5 text-muted-foreground text-xs font-medium'>
                      Status: {card.status}
                    </p>
                  </>
                ) : (
                  <>
                    
                      <p
                        className='font-bold tabular-nums text-lg md:text-xl'
                        style={{ color: card.sparkColor }}
                      >
                        {card.remaining} Days Remaining
                      </p>
                      
                    
                    <p className='text-muted-foreground text-xs'>
                      Total: {card.totalAllocation} Days
                    </p>
                    <p
                      className={cn(
                        'flex items-center gap-1 text-xs font-medium',
                        (card.used ?? 0) > 0
                          ? 'text-red-600 dark:text-red-400'
                          : 'text-muted-foreground'
                      )}
                    >
                      {(card.used ?? 0) > 0 ? (
                        <TrendingDown className='h-3.5 w-3.5 shrink-0' aria-hidden />
                      ) : (
                        <TrendingUp className='h-3.5 w-3.5 shrink-0' aria-hidden />
                      )}
                      Used: {card.used ?? 0} Days
                    </p>
                  </>
                )}
              </div>
              <div
                className='flex h-10 min-w-14 shrink-0 items-end justify-end gap-0.5'
                role='img'
                aria-label={`Leave usage last 6 months for ${card.title}`}
              >
                {allMonths.map(({ month, days, index }) => {
                  const pctHeight = maxDays > 0 ? (days / maxDays) * 100 : 0;
                  const minBarHeight = 4;
                  const barHeightPct = Math.max(minBarHeight, pctHeight);
                  const monthLabel = month.fullMonth ?? month.shortMonth;
                  return (
                    <Tooltip key={index}>
                      <TooltipTrigger asChild>
                        <div
                          className='w-1.5 rounded-sm cursor-default transition-opacity hover:opacity-100'
                          style={{
                            height: `${barHeightPct}%`,
                            minHeight: minBarHeight,
                            opacity: days > 0 ? 0.9 : 0.4,
                            backgroundColor: card.sparkColor,
                          }}
                          role='img'
                          aria-label={`${monthLabel}: ${days} days used`}
                        />
                      </TooltipTrigger>
                      <TooltipContent side='top' sideOffset={6} className='text-left'>
                        <p className='text-muted-foreground text-xs font-medium'>
                          {monthLabel}
                        </p>
                        <p className='mt-0.5 flex items-center gap-2 font-semibold text-sm'>
                          <span
                            className='h-2 w-2 shrink-0 rounded-full'
                            style={{ backgroundColor: card.sparkColor }}
                            aria-hidden
                          />
                          {days} {days === 1 ? 'day' : 'days'} used
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LeaveMetricCards;
